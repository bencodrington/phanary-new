import { logger } from 'firebase-functions/v2';
import { onRequest } from 'firebase-functions/v2/https';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import * as firebaseAdmin from 'firebase-admin';
import Fuse from 'fuse.js';

import { isOneShotData, TrackData } from '../../src/models/DatabaseTypes';
import { ObjectType } from '../../src/models/ObjectTypes';
import { SearchResult } from '../../src/models/SearchResult';

firebaseAdmin.initializeApp();
const db = firebaseAdmin.firestore();
const PACKS = 'packs';
const TRACKS = 'tracks';
const packsRef = db.collection(PACKS);
const tracksRef = db.collection(TRACKS);
const indexRef = db.collection('index');

const MAX_RESULTS = 50;

const FUSE_OPTIONS: Fuse.IFuseOptions<SearchResult> = {
  minMatchCharLength: 2,
  ignoreLocation: true,
  includeScore: true,
  threshold: 0.1,
  keys: [
    {
      name: "name",
      weight: 0.05
    },
    {
      name: "tags",
      weight: 1
    }
  ]
};

let fuse: Fuse<SearchResult>;
let index: firebaseAdmin.firestore.DocumentData;

async function _search(searchText: string): Promise<SearchResult[]> {
  index = index || await indexRef.doc('index').get();
  const { tracks, packs } = index.data() ?? { tracks: [], packs: [] };
  fuse = fuse || new Fuse([...tracks as SearchResult[], ...packs as SearchResult[]], FUSE_OPTIONS);
  const words = searchText.split(' ');
  const resultsMap: {
    [id: string]: {
      item: SearchResult,
      score: number
    }
  } = {};
  // Search for results for each word
  //  and sum up the scores of each result
  words.forEach(word => {
    const fuseResults = fuse.search(word).splice(0, MAX_RESULTS);
    fuseResults.forEach(result => {
      const { item, score = 0 } = result;
      const id = item.id;
      if (resultsMap[id] === undefined) {
        resultsMap[id] = { item, score }
      } else {
        resultsMap[id].score += score;
      }
    });
  });
  // Sort by highest aggregated sum
  return Object.values(resultsMap)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item)
    .splice(0, MAX_RESULTS);
}

export const search = onRequest({ cors: true }, async (request, response) => {
  const { query } = request;
  const searchText = query.searchText;
  if (!searchText || searchText.length === 0) {
    logger.info('Empty searchText, returning.');
    response.send([]);
    return;
  }
  if (typeof searchText !== 'string') {
    logger.info('Unsupported searchtext type "', typeof searchText, '", returning.');
    response.send([]);
    return;
  }
  logger.info(searchText, { structuredData: true });
  const results = await _search(searchText);
  logger.info(`${results.length} results found.`);
  response.send(results);
});

export const fetchTrackDataById = onRequest({ cors: true }, async (request, response) => {

  const { query } = request;
  const trackId = query.trackId;
  if (!trackId || trackId.length === 0) {
    logger.info('Empty trackId, returning.');
    response.send({});
    return;
  }
  if (typeof trackId !== 'string') {
    logger.info('Invalid trackId, returning.', trackId);
    response.send({});
    return;
  }
  logger.info(trackId, { structuredData: true });
  const result = await tracksRef.doc(trackId).get();
  if (!result.exists) {
    logger.info('No tracks found for trackId "' + trackId + '".');
    response.send({});
    return;
  }
  logger.info(`Track with id "${trackId}" found.`);
  const trackData = result.data() as TrackData;
  const { name, source, tags } = trackData;
  if (isOneShotData(trackData)) {
    const track = {
      id: result.id,
      name,
      samples: trackData.samples,
      minSecondsBetween: trackData.minSecondsBetween,
      maxSecondsBetween: trackData.maxSecondsBetween,
      tags,
      source,
      type: ObjectType.ONESHOT
    };
    response.send(track);
    return;
  }
  const track = {
    id: result.id,
    name,
    fileName: trackData.fileName,
    tags,
    source,
    type: ObjectType.LOOP
  };
  response.send(track);
});

// Whenever a pack is added or changed within the PACKS table in Firestore,
//  construct an array of all packs within the table, and store it in the
//  `packs` field in the `index` table in Firestore, to be read by the
//  search endpoint.
export const indexPacks = onDocumentWritten(`${PACKS}/{packId}`, async event => {
  logger.info('index packs');
  const packResults = await packsRef.get();
  let packs: SearchResult[] = [];
  if (packResults.empty) {
    logger.info('No packs found in the packs index.');
  } else {
    logger.info(`${packResults.size} packs found.`);
    packs = packResults.docs.map(doc => {
      const { name, tags, tracks } = doc.data();
      return {
        id: doc.id,
        name,
        tags,
        type: ObjectType.PACK,
        tracks
      };
    });
  }

  indexRef.doc('index').set({ packs }, { merge: true });
});

// TODO: comment
export const indexTracks = onDocumentWritten(`${TRACKS}/{trackId}`, async event => {
  logger.info('index tracks');
  let tracks: SearchResult[] = [];
  const trackResults = await tracksRef.get();
  if (trackResults.empty) {
    logger.info('No tracks found in the tracks index.');
  } else {
    logger.info(`${trackResults.size} tracks found.`);
    tracks = trackResults.docs.map(doc => {
      const { name, tags, type } = doc.data();
      return {
        id: doc.id,
        name,
        tags,
        type
      };
    });
  }
  indexRef.doc('index').set({ tracks }, { merge: true });
});
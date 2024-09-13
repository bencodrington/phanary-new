import { SearchResult } from "../models/SearchResult";
import { Group } from "../models/Group";

export const DEFAULT_GROUP_VOLUME = 1;
export const DEFAULT_TRACK_VOLUME = 0.7;

export function getNextIndex(indexedItems: { index: number }[]) {
  let maxIndex = -1;
  indexedItems.forEach(indexedItems => {
    if (indexedItems.index > maxIndex) {
      maxIndex = indexedItems.index;
    }
  });
  return maxIndex + 1;
}

export function addSearchResultToGroup(
  searchResult: SearchResult,
  group: Group,
  shouldAddToCombatSection: boolean
) {
  const { id, name, type, tags, tracks } = searchResult;
  if (tracks !== undefined) {
    // Result is a pack
    tracks.forEach(track => {
      const { id, volume, oneShotConfig } = track;
      const newTrackObject = {
        id,
        volume,
        isMuted: false,
        index: getNextIndex([...group.tracks, ...group.combatTracks]),
        isPlaying: false,
        shouldLoad: true,
        minSecondsBetween: oneShotConfig?.minSecondsBetween,
        maxSecondsBetween: oneShotConfig?.maxSecondsBetween,
      };
      group.tracks.push(newTrackObject);
    })
    return;
  }
  // Result is an individual track
  const newTrackObject = {
    id,
    index: getNextIndex([...group.tracks, ...group.combatTracks]),
    name,
    type,
    tags,
    volume: DEFAULT_TRACK_VOLUME,
    isMuted: false,
    isPlaying: false,
    shouldLoad: true
  };
  if (shouldAddToCombatSection) {
    group.combatTracks.push(newTrackObject);
  } else {
    group.tracks.push(newTrackObject);
  }
}

export function getGroupByIndex(
  groupIndex: number,
  groups: Group[]
) {
  return groups.find(group => group.index === groupIndex);
}

export function getTrackByIndex(
  trackIndex: number,
  groupIndex: number,
  groups: Group[]
) {
  return getGroupByIndex(groupIndex, groups)
    ?.tracks
    ?.find(track => track.index === trackIndex);
}

export function isGroupPlaying(group: Group) {
  return group.tracks.some(track => track.isPlaying === true);
}
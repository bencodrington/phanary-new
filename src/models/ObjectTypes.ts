export enum ObjectType {
  LOOP = 'LOOP',
  ONESHOT = 'ONESHOT',
  PACK = 'PACK'
};

// If a track has this tag, it will be considered "music" and not "ambiance"
//  for the purposes of filtering search results.
export const MUSIC_TAG = 'music';
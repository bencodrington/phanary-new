export enum SearchResultType {
  Everything = 'EVERYTHING',
  Music = 'MUSIC',
  Ambiance = 'AMBIANCE'
}

export function isSearchResultType(maybeSearchResultType: unknown): maybeSearchResultType is SearchResultType {
  return typeof maybeSearchResultType === 'string' && Object.values<string>(SearchResultType).includes(maybeSearchResultType);
}
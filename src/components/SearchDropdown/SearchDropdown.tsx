import React from "react";
import { useDispatch } from "react-redux";
import { SearchResult } from "../../models/SearchResult";
import { addSearchResult } from "../../slices/groups";
import SearchField from "../../widgets/SearchField";
import SearchItem from "./SearchItem";
import { NEW_GROUP } from "../TrackList/TrackList";

import './SearchDropdown.scss';

type SearchDropdownProps = {
  closeSearchDropdown: () => void,
  searchText: string,
  setSearchText: (newSearchText: string) => void,
  appendSearchText: (newSearchText: string) => void,
  isFetchingResults: boolean,
  results: SearchResult[],
  searchTarget: number | null | typeof NEW_GROUP;
};

export default function SearchDropdown({
  closeSearchDropdown,
  searchText,
  setSearchText,
  appendSearchText,
  isFetchingResults,
  results,
  searchTarget
}: SearchDropdownProps) {
  const dispatch = useDispatch();
  function onSearchItemClick(searchResult: SearchResult) {
    let groupIndex: undefined | number = undefined;
    if (typeof searchTarget === 'number') {
      groupIndex = searchTarget;
    }
    dispatch(addSearchResult({ searchResult, groupIndex, shouldAddToCombatSection: false }));
  }

  const resultElements = results.map(result => (
    <SearchItem
      key={result.id}
      data={result}
      onClick={() => onSearchItemClick(result)}
      isAlreadyAdded={false}
    />
  ));

  const mainContent = isFetchingResults
    ? <p className="message">Loading...</p>
    : resultElements.length > 0
      ? <ul className="results">{resultElements}</ul>
      : searchText.length === 0
        ? null
        : <p className="message">Couldn't find those sounds.</p>;
  return (
    <div className="search-dropdown-container">
      <SearchField
        value={searchText}
        onChange={setSearchText}
        onCancel={closeSearchDropdown}
        placeholderText={`'tavern', 'music', 'horse', ...`}
      />
      {mainContent}
    </div>
  );
}
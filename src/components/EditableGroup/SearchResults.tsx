import React, { useState } from "react";

import "./SearchResults.scss";
import Button from "../../widgets/buttons/Button";
import { SearchResult } from "../../models/SearchResult";
import SearchItem from "../SearchDropdown/SearchItem";
import TabSwitcher, { Tab } from "../TabSwitcher";

interface SearchResultsProps {
  onAddSearchResult: (result: SearchResult) => void,
  onCloseSearch: () => void,
  targetGroupName: string,
  searchText: string,
  setSearchText: (newValue: string) => void,
  isFetchingResults: boolean,
  results: SearchResult[],
  targetGroupId: number,
  soundsInGroup: string[],
}

const TABS: Tab[] = [
  {
    id: 'everything',
    displayName: 'Everything',
    icon: 'magnifying-glass'
  },
  {
    id: 'music',
    displayName: 'Music',
    icon: 'music'
  },
  {
    id: 'ambiance',
    displayName: 'Ambiance',
    icon: 'cloud-sun-rain'
  },
]

export default function SearchResults({
  onAddSearchResult,
  onCloseSearch,
  targetGroupName,
  searchText,
  setSearchText,
  isFetchingResults,
  results,
  targetGroupId,
  soundsInGroup
}: SearchResultsProps) {

  const [selectedTabId, setSelectedTabId] = useState('everything');

  const resultElements = results.map(result => (
    <SearchItem
      key={result.id}
      data={result}
      onClick={() => onAddSearchResult(result)}
      isAlreadyAdded={soundsInGroup.includes(result.id)}
    />
  ));


  const mainContent = isFetchingResults
    ? <div className="spinner">
      <i className="fa-solid fa-circle-notch fa-spin" />
    </div>
    : resultElements.length > 0
      ? <ul className="results">{resultElements}</ul>
      : searchText.length === 0
        ? null
        : <p className="message">Couldn't find those sounds.</p>;

  return (
    <div className="search-results-container">
      <header>
        <div className="title-row">
          <Button
            icon="arrow-left"
            onClick={onCloseSearch}
          />
          <span>Adding to <span className="target-group-name">{targetGroupName}</span>
          </span>
          {/* TODO: combat toggle */}combat
        </div>
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type='text'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search all sounds"
          />
        </div>
        <TabSwitcher selectedTabId={selectedTabId} tabs={TABS} onTabClick={newTabId => setSelectedTabId(newTabId)} />
      </header>
      {
        mainContent
      }

    </div>
  )
}
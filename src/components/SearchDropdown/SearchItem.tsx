import React from "react";
import { SearchResult } from "../../models/SearchResult";
import Tags from "../../widgets/Tags";

import "./SearchItem.scss";
import { MUSIC_TAG, ObjectType } from "../../models/ObjectTypes";

type SearchItemProps = {
  data: SearchResult,
  onClick: () => void,
  isAlreadyAdded: boolean,
};

export default function SearchItem({ data, onClick, isAlreadyAdded }: SearchItemProps) {
  let packCountElement = null;
  if (data.tracks !== undefined) {
    packCountElement = (
      <span className="pack-count">
        Contains {data.tracks.length} sound{data.tracks.length === 1 ? '' : 's'}.
      </span>
    );
  }
  const filteredTags = data.tags.filter(tag => tag !== 'pack');

  function onKeyDown(event: React.KeyboardEvent<HTMLLIElement>) {
    switch (event.key) {
      case 'Enter':
        onClick();
        break;
      case ' ':
        onClick();
        break;
    }
  }

  const icon = data.type === ObjectType.PACK
    ? 'folder'
    : data.tags.includes(MUSIC_TAG)
      ? 'music'
      : 'cloud-sun-rain'

  return (
    <li
      className="search-item-container"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <i className={`item-icon fa-solid fa-${icon}`} />
      <div className="main-column">
        <span className="title">{data.name}</span>
        {packCountElement}
        <Tags tags={filteredTags} />
      </div>
      <i className={`add-icon fa-solid fa-${isAlreadyAdded ? 'check' : 'plus'} ${isAlreadyAdded ? 'already-added' : ''}`} />
    </li>
  );
}
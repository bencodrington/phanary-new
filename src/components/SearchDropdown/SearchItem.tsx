import React from "react";
import { SearchResult } from "../../models/SearchResult";
import Tags from "../../widgets/Tags";

import "./SearchItem.scss";

type SearchItemProps = {
  data: SearchResult,
  onClick: () => void,
  alreadyAdded: boolean,
};

export default function SearchItem({ data, onClick }: SearchItemProps) {
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

  return (
    <li
      className="search-item-container"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <span className="title">{data.name}</span>
      {packCountElement}
      <Tags tags={filteredTags} />
    </li>
  );
}
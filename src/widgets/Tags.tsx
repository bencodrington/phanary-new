import React from "react";

import "./Tags.scss";

type TagsProps = {
  tags: string[],
};

export default function Tags({ tags }: TagsProps) {
  return (
    <p className="tags-container">
      {tags.map(tag => <span key={tag}>{tag}</span>)}
    </p>
  );
}
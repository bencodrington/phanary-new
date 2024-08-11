import React from "react";
import { Group } from "../../models/Group";
import Button from "../../widgets/buttons/Button";

import "./GroupListItem.scss";
import PlayGroupButton from "../../widgets/buttons/PlayGroupButton";

type GroupListItemProps = {
  group: Group,
  editGroup: (groupIndex: number) => void
};


export default function GroupListItem({ group, editGroup }: GroupListItemProps) {

  return (
    <div className="group-list-item-container">
      <div className="labelled-group-name">
        <i className="fa-solid fa-mountain-sun" />
        <p>{group.name}</p>
      </div>
      <div className="buttons">
        <Button
          onClick={() => { editGroup(group.index) }}
          icon="pencil"
        />
        <PlayGroupButton group={group} />
      </div>
    </div>
  );
}
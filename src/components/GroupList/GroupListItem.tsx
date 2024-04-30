import React from "react";
import { Group } from "../../models/Group";
import Button from "../../widgets/buttons/Button";

import "./GroupListItem.scss";
import { useDispatch } from "react-redux";
import { playGroupSolo, stopAllInGroup, startAllInGroup } from "../../slices/groups";
import { isGroupPlaying } from "../../utils/storeUtil";

type GroupListItemProps = {
  group: Group,
  editGroup: (groupIndex: number) => void
};


export default function GroupListItem({ group, editGroup }: GroupListItemProps) {

  const dispatch = useDispatch();

  const playSolo = () => {
    dispatch(playGroupSolo({ groupIndex: group.index }))
  };
  const stop = () => {
    dispatch(stopAllInGroup({ groupIndex: group.index }));
  }

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
        {
          isGroupPlaying(group)
            ?
            <Button
              text="Stop"
              icon="square"
              onClick={stop}
            />
            :
            <div className="play-stop-buttons">
              <Button
                icon="play"
                iconAltText="Play icon"
                onClick={playSolo}
              />
            </div>
        }
      </div>
    </div>
  );
}
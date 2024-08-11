import React from "react";

import { Group } from "../../models/Group";
import { isGroupPlaying } from "../../utils/storeUtil";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { playGroupSolo, stopAllInGroup } from "../../slices/groups";

interface PlayGroupButtonProps {
  group: Group
}
export default function PlayGroupButton({ group }: PlayGroupButtonProps) {

  const dispatch = useDispatch();

  const playSolo = () => {
    dispatch(playGroupSolo({ groupIndex: group.index }))
  };
  const stop = () => {
    dispatch(stopAllInGroup({ groupIndex: group.index }));
  }

  return (
    <div className="play-group-button-container">
      {
        isGroupPlaying(group)
          ? <Button
            icon="pause"
            onClick={stop}
          />
          : <Button
            icon="play"
            onClick={playSolo}
          />
      }
    </div>
  )
}
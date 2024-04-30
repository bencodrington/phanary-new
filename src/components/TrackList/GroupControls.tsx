import React from "react";
import { useDispatch } from "react-redux";
import { startAllInGroup, stopAllInGroup, setGroupIsExpanded } from "../../slices/groups";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import startAllIcon from "../../assets/icon-start-all.svg";
import stopIcon from "../../assets/icon-stop.svg";
import caretDownIcon from "../../assets/icon-caret-down.svg";
import caretRightIcon from "../../assets/icon-caret-right.svg";
import { Track } from "../../models/Track";

import "./GroupControls.scss";

type GroupControlsProps = {
  groupIndex: number,
  isExpanded: boolean,
  tracks: Track[]
};

export default function GroupControls({
  groupIndex,
  isExpanded,
  tracks
}: GroupControlsProps) {
  const dispatch = useDispatch();
  const firstPlayingChild = tracks.find(track => track.isPlaying === true);
  const isChildPlaying = firstPlayingChild !== undefined;
  function startAll() {
    dispatch(startAllInGroup({ groupIndex }));
  }
  function stopAll() {
    dispatch(stopAllInGroup({ groupIndex }));
  }
  function toggleIsExpanded() {
    dispatch(setGroupIsExpanded({
      groupIndex,
      isExpanded: !isExpanded
    }));
  }
  if (tracks.length < 2) return null;
  return (
    <div className={'group-controls-container' + (isExpanded ? ' space-between' : '')}>
      <DefaultButton
        onClick={toggleIsExpanded}
        icon={isExpanded ? caretDownIcon : caretRightIcon}
        text={isExpanded ? 'Collapse' : 'Expand'}
        isRound={true}
      />
      <DefaultButton
        onClick={isChildPlaying ? stopAll : startAll}
        icon={isChildPlaying ? stopIcon : startAllIcon}
        text={(isChildPlaying ? 'Stop' : 'Start') + ' all'}
        className={'fixed-width'}
      />
    </div>
  );
}
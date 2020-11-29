import React from "react";
import useTrackData from "../../hooks/useTrackData";
import { UnloadedTrack } from "../../models/Track";
import { ERROR_TYPE } from "../../services/database";

// import "./UnloadedTrackListItem.scss";

type UnloadedTrackListItemProps = {
  soundscapeIndex: number,
  unloadedTrack: UnloadedTrack
};

export default function UnloadedTrackListItem({ unloadedTrack, soundscapeIndex }: UnloadedTrackListItemProps) {
  const { id, index, type } = unloadedTrack;
  useTrackData(id, index, soundscapeIndex, type === ERROR_TYPE);
  const output = type === ERROR_TYPE ? 'Failed to load track.' : 'Loading ambiguous track';
  return (
    <p>{output}</p>
  );
}
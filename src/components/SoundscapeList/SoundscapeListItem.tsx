import React from "react";
import { useDispatch } from "react-redux";
import useClonedTrackIds from "../../hooks/useClonedTrackIds";
import { Soundscape } from "../../models/Soundscape";
import { openSoundscape, removeSoundscape } from "../../slices/soundscapes";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import ChestBottom from "../../assets/chest-bottom.svg";
import ChestTop from "../../assets/chest-top.svg";
import PlayIcon from "../../assets/icon-play.svg";
import CloseIcon from "../../assets/icon-close.svg";
import SoundscapeSummary from "../../widgets/SoundscapeSummary";
import VolumeControls from "../../widgets/VolumeControls";


import "./SoundscapeListItem.scss";

type SoundscapeListItemProps = {
  soundscape: Soundscape
};

export default function SoundscapeListItem({ soundscape }: SoundscapeListItemProps) {
  const { sourceId, name, tracks, index: soundscapeIndex } = soundscape;
  const { isLoading } = useClonedTrackIds({
    sourceSoundscapeId: sourceId,
    currentTrackCount: tracks.length,
    soundscapeIndex
  });
  const dispatch = useDispatch();

  function open() {
    dispatch(openSoundscape({ soundscapeIndex }));
  }

  function remove() {
    dispatch(removeSoundscape({ soundscapeIndex }));
  }

  return (
    <div className="soundscape-list-item-container">
      <h4>{name}</h4>
      <DefaultButton onClick={open} text="Open" />
      <p>isLoading: {isLoading.toString()}</p>
      <div className="body">
        <VolumeControls
          initialVolume={0.7}  // TODO:
          isMuted={false} // TODO:
          setVolume={(newVol) => { console.log(newVol); }} // TODO:
          toggleIsMuted={() => { console.log('toggle muted'); }}
        />
        <div className="chest">
          <img
            className="chest-top"
            src={ChestTop}
            alt=""
          />
          <SoundscapeSummary tracks={tracks} />
          <img
            className="chest-bottom"
            src={ChestBottom}
            alt=""
          />
          <div className="play-buttons">
            <DefaultButton
              onClick={() => { console.log('soundscape close clicked'); }}
              icon={PlayIcon}
            />
          </div>
        </div>
        <DefaultButton
          className="close-button"
          onClick={remove}
          icon={CloseIcon}
        />
      </div>
    </div>
  );
}
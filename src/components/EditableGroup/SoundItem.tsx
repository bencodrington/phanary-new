import React from "react";
import { useVolume } from "../../hooks/useVolume";
import { Track } from "../../models/Track";
import Button, { ButtonType } from "../../widgets/buttons/Button";
import VolumeControls from "../../widgets/VolumeControls";

import "./SoundItem.scss";
import DropdownMenu from "../../widgets/DropdownMenu";
import { useDispatch } from "react-redux";
import { removeTrack } from "../../slices/groups";

type SoundItemProps = {
  track: Track,
  groupIndex: number,
  isMenuOpen: boolean,
  toggleMenuOpen: () => void,
};

export default function SoundItem({ track, groupIndex, isMenuOpen, toggleMenuOpen }: SoundItemProps) {
  const { name, index, tags } = track;
  const { volume, setVolume } = useVolume({
    initialVolume: track.volume,
    isInitiallyMuted: false,
    groupIndex,
    trackIndex: index
  });

  const dispatch = useDispatch();
  function remove() {
    toggleMenuOpen();
    dispatch(removeTrack({ groupIndex, trackIndex: index }))
  }

  return (
    <div className='sound-item-container'>
      <div className="column">
        <span>{name}</span>
        <VolumeControls
          volume={volume}
          setVolume={setVolume}
          isMuted={false}
          toggleIsMuted={() => { }}
        />
      </div>
      <Button
        onClick={toggleMenuOpen}
        icon="ellipsis-v"
        type={ButtonType.Default}
      />
      {/* TODO: options depend on whether this is music, a loop or a one shot */}
      {isMenuOpen && <DropdownMenu className="sound-item-dropdown" closeDropdown={() => {/* TODO: ... */ }} options={[
        { label: 'Replace', onClick: () => {/* TODO: ... */ } },
        { label: 'Remove', onClick: remove },
        { label: 'Adjust timing', onClick: () => {/* TODO: ... */ } },
        { label: 'See source', onClick: () => {/* TODO: ... */ } },
      ]} />}
    </div>
    // <TrackItem
    //   isAudioReady={isAudioLoaded}
    //   volume={volume}
    //   setVolume={setVolume}
    //   groupIndex={groupIndex}
    //   trackIndex={loop.index}
    //   source={source}
    // />
  );
}
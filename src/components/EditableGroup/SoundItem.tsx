import React from "react";
import { useVolume } from "../../hooks/useVolume";
import { Track } from "../../models/Track";
import Button, { ButtonType } from "../../widgets/buttons/Button";
import VolumeControls from "../../widgets/VolumeControls";
import moreIcon from "../../assets/icon-more.svg";
import Tags from "../../widgets/Tags";

import "./SoundItem.scss";

type SoundItemProps = {
  track: Track,
  isSearchOpen: boolean,
  groupIndex: number,
};

export default function SoundItem({ track, isSearchOpen, groupIndex }: SoundItemProps) {
  const { name, index, tags } = track;
  const { volume, setVolume } = useVolume({
    initialVolume: track.volume,
    isInitiallyMuted: false,
    groupIndex,
    trackIndex: index
  });

  return (
    <div className='sound-item-container'>
      <div className="column">
        <h3>{name}</h3>
        {isSearchOpen
          ? <Tags tags={tags ?? []} />
          /* TODO: if one shot show wick and timings */
          : <VolumeControls
            volume={volume}
            setVolume={setVolume}
            isMuted={false}
            toggleIsMuted={() => { }}
          />
        }
      </div>
      <Button
        onClick={() => {/* TODO: ... */ }}
        icon={moreIcon}
        type={ButtonType.Default}
      />
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
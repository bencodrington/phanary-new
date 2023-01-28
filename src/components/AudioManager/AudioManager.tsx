import React from "react";
import { isLoop, isOneShot, isUnloadedLoop } from "../../models/Track";
import { useGroups } from "../../slices";
import { constructKey } from "../../utils/tsxUtil";
import LoopAudio from "./LoopAudio";

/* This component is responsible for making sure audio is playing for the right
    sounds, at the right times, at the right volumes.

    This includes creating and deleting Howler objects, and fading sounds in and
    out, for all sounds in all groups.

    To accomplish this, the component watches the groups store and updates the
    sounds accordingly.
    
    This component would be a composable, but it is useful
    to create (invisible) child components for each sound to manage its own
    state with hooks and lifecycle events.
*/

type AudioManagerProps = {

};

export default function AudioManager(props: AudioManagerProps) {
  const groups = useGroups();
  // Make an Audio component for each sound in each group
  return (<>{
    groups.map(group =>
      group.tracks.map(track => {
        console.log('track', track, isLoop(track));
        // TODO: keys?
        if (isLoop(track) || isUnloadedLoop(track)) {
          return <LoopAudio loop={track} groupIndex={group.index} key={constructKey(track, group)} />
        } else if (isOneShot(track)) {
          // TODO: return <OneShotAudio />
          return null;
        }
        return null;
      })
    )
  }</>);
}
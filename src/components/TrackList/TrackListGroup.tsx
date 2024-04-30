import React from "react";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import closeIcon from "../../assets/icon-close.svg";
import { Group } from "../../models/Group";

import "./TrackListGroup.scss";
import { isLoop, isOneShot, isUnloaded, isUnloadedLoop, Track } from "../../models/Track";
import LoopTrackItem from "./LoopTrackItem";
import OneShotTrackItem from "./OneShotTrackItem";
import UnloadedTrackItem from "./UnloadedTrackItem";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import { SearchResult } from "../../models/SearchResult";
import { NEW_GROUP } from "./TrackList";
import GroupControls from "./GroupControls";
import { removeGroup, setGroupName } from "../../slices/groups";
import { useDispatch } from "react-redux";
import EditableHeader from "../../widgets/EditableHeader";
import AddSoundsButton from "../../widgets/buttons/AddSoundsButton";

type GroupProps = {
  searchTarget: number | null | typeof NEW_GROUP,
  setSearchTarget: (searchTarget: number | null) => void,
  group: Group,
  results: SearchResult[],
  isFetchingResults: boolean,
  searchText: string,
  setSearchText: (searchText: string) => void,
  appendSearchText: (searchText: string) => void
};

function constructKey(track: Track, group: Group) {
  return group.index + '-' + track.index;
}

function listItemFromTrack(
  track: Track,
  group: Group,
  isSearchOpen: boolean,
  isGroupExpanded: boolean,
  appendSearchText: (text: string) => void
) {
  const { index: groupIndex } = group;
  if (isLoop(track) || isUnloadedLoop(track)) {
    return <LoopTrackItem
      key={constructKey(track, group)}
      groupIndex={groupIndex}
      loop={track}
      isVisible={isGroupExpanded}
      isSearchOpen={isSearchOpen}
      onTagClick={appendSearchText}
      groupVolume={group.volume}
    />
  } else if (isOneShot(track)) {
    return <OneShotTrackItem
      key={constructKey(track, group)}
      groupIndex={groupIndex}
      oneShot={track}
      isVisible={isGroupExpanded}
      isSearchOpen={isSearchOpen}
      onTagClick={appendSearchText}
      groupVolume={group.volume}
    />
  } else if (isUnloaded(track)) {
    return <UnloadedTrackItem
      key={constructKey(track, group)}
      unloadedTrack={track}
      groupIndex={groupIndex}
      isVisible={isGroupExpanded}
      isSearchOpen={isSearchOpen}
      onTagClick={appendSearchText}
    />
  } else {
    return null;
  }
}

export default function TrackListGroup({
  searchTarget,
  setSearchTarget,
  group,
  results,
  isFetchingResults,
  searchText,
  setSearchText,
  appendSearchText
}: GroupProps) {
  const dispatch = useDispatch();
  const isSearchModeActive = searchTarget !== null;
  const { isExpanded, index } = group;
  const isThisGroupSearching = searchTarget === index;

  function onCloseButtonClick() {
    dispatch(removeGroup({ groupIndex: index }));
  }

  function saveGroupName(name: string) {
    dispatch(setGroupName({ groupIndex: index, name }));
  }

  return (
    <div className="group-container">
      <div className="header">
        <EditableHeader
          initialText={group.name}
          onSave={saveGroupName}
        />
        <DefaultButton
          onClick={onCloseButtonClick}
          icon={closeIcon}
          isRound={true}
          isDisabled={isSearchModeActive}
        />
      </div>
      <GroupControls
        groupIndex={index}
        isExpanded={isExpanded}
        tracks={group.tracks}
      />
      <div>
        {group.tracks.map(track =>
          listItemFromTrack(
            track,
            group,
            isSearchModeActive,
            isExpanded,
            appendSearchText
          )
        )}
      </div>
      {
        isThisGroupSearching
          ? <SearchDropdown
            closeSearchDropdown={() => { setSearchTarget(null) }}
            searchText={searchText}
            setSearchText={setSearchText}
            appendSearchText={appendSearchText}
            isFetchingResults={isFetchingResults}
            results={results}
            searchTarget={searchTarget}
          />
          : group.isExpanded && <AddSoundsButton
            onClick={() => setSearchTarget(index)}
            text={`Add sounds to "${group.name}"`}
          />
      }
    </div >
  );
}
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResult } from "../models/SearchResult";
import { Group } from "../models/Group";
import { isLoop, isOneShot } from "../models/Track";
import { ERROR_TYPE, TrackData, TrackDataError } from "../models/DatabaseTypes";
import {
  addSearchResultToGroup,
  getNextIndex,
  getGroupByIndex,
  getTrackByIndex,
  DEFAULT_GROUP_VOLUME
} from "../utils/storeUtil";
import { loadGroups, saveGroups } from "../services/localStorage";
import { ObjectType } from "../models/ObjectTypes";

const DEFAULT_ENVIRONMENT_NAME = 'Untitled environment';

const groupsSlice = createSlice({
  name: 'groups',
  initialState: [] as Group[],
  reducers: {
    newGroup(state, { payload }: PayloadAction<{ index: number }>) {
      state.push({
        name: DEFAULT_ENVIRONMENT_NAME,
        index: payload.index,
        tracks: [],
        volume: DEFAULT_GROUP_VOLUME,
        isExpanded: true
      });
      saveGroups(state);
    },
    addSearchResult(
      state,
      { payload }: PayloadAction<{ searchResult: SearchResult, groupIndex?: number }>
    ) {
      const { searchResult, groupIndex } = payload;
      // Determine which group the new track(s) should be assigned to
      let group;
      if (groupIndex === undefined) {
        const groupName = searchResult.type === ObjectType.PACK
          ? searchResult.name
          : DEFAULT_ENVIRONMENT_NAME;
        // Create new group
        group = {
          name: groupName,
          index: getNextIndex(state),
          tracks: [],
          volume: DEFAULT_GROUP_VOLUME,
          isExpanded: true
        };
        state.unshift(group);
      } else {
        group = getGroupByIndex(groupIndex, state);
      }
      if (group === undefined) return;
      // Add track(s) to that group
      addSearchResultToGroup(searchResult, group);
      saveGroups(state);
    },
    removeTrack(state, { payload }: PayloadAction<{ groupIndex: number, trackIndex: number }>) {
      const { groupIndex, trackIndex } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.tracks = group.tracks.filter(track => track.index !== trackIndex);
      saveGroups(state);
    },
    setTrackData(state, { payload }: PayloadAction<{
      groupIndex: number,
      trackIndex: number,
      trackData: TrackData | TrackDataError
    }>) {
      const { groupIndex, trackIndex, trackData } = payload;
      const track = getTrackByIndex(trackIndex, groupIndex, state);
      if (track === undefined) return;
      if (trackData.type === ERROR_TYPE) {
        Object.assign(track, { type: ERROR_TYPE })
        return;
      }
      Object.assign(track, trackData);
      saveGroups(state);
    },
    setTrackVolume(state, { payload }: PayloadAction<{
      groupIndex: number,
      trackIndex: number,
      volume: number
    }>) {
      const { groupIndex, trackIndex, volume } = payload;
      const track = getTrackByIndex(trackIndex, groupIndex, state);
      if (track === undefined) return;
      track.volume = volume;
      saveGroups(state);
    },
    setTrackIsMuted(state, { payload }: PayloadAction<{
      groupIndex: number,
      trackIndex: number,
      isMuted: boolean
    }>) {
      const { groupIndex, trackIndex, isMuted } = payload;
      const track = getTrackByIndex(trackIndex, groupIndex, state);
      if (track === undefined) return;
      track.isMuted = isMuted;
      saveGroups(state);
    },
    setTrackIsPlaying(state, { payload }: PayloadAction<{
      groupIndex: number,
      trackIndex: number,
      isPlaying: boolean
    }>) {
      const { groupIndex, trackIndex, isPlaying } = payload;
      const track = getTrackByIndex(trackIndex, groupIndex, state);
      if (track === undefined) return;
      track.isPlaying = isPlaying;
      saveGroups(state);
    },
    removeGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      const newGroupList = state.filter(group => group.index !== groupIndex);
      saveGroups(newGroupList);
      return newGroupList;
    },
    setGroupName(state, { payload }: PayloadAction<{
      groupIndex: number,
      name: string
    }>) {
      const { groupIndex, name } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.name = name;
      saveGroups(state);
    },
    setGroupIsPlaying(state, { payload }: PayloadAction<{
      groupIndex: number,
      isPlaying: boolean
    }>) {
      const { groupIndex, isPlaying } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.tracks.map(track => {
        if (isLoop(track) || isOneShot(track)) {
          track.isPlaying = isPlaying;
        }
        return track;
      });
      saveGroups(state);
    },
    setGroupIsExpanded(state, { payload }: PayloadAction<{
      groupIndex: number,
      isExpanded: boolean
    }>) {
      const { groupIndex, isExpanded } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.isExpanded = isExpanded;
      saveGroups(state);
    },
    setGroupVolume(state, { payload }: PayloadAction<{
      groupIndex: number,
      volume: number
    }>) {
      const { groupIndex, volume } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.volume = volume;
      saveGroups(state);
    },
    startAllInGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.tracks.forEach(track => {
        track.isPlaying = true;
      });
      saveGroups(state);
    },
    stopAllInGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.tracks.forEach(track => {
        track.isPlaying = false;
      });
      saveGroups(state);
    },
    playGroupSolo(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      state.forEach(group => {
        group.tracks.forEach(track => {
          // Play track if it's in the group that triggered this action
          // Stop track otherwise
          track.isPlaying = group.index === groupIndex;
        });
        saveGroups(state);
      })
    },
    setOneShotRange(state, { payload }: PayloadAction<{
      groupIndex: number,
      trackIndex: number,
      minSecondsBetween: number,
      maxSecondsBetween: number
    }>) {
      const {
        groupIndex,
        trackIndex,
        minSecondsBetween,
        maxSecondsBetween
      } = payload;
      const track = getTrackByIndex(trackIndex, groupIndex, state);
      if (track === undefined || !isOneShot(track)) return;
      track.minSecondsBetween = minSecondsBetween;
      track.maxSecondsBetween = maxSecondsBetween;
      saveGroups(state);
    },
    loadGroupsFromStorage(state) {
      const newState = [
        ...state,
        ...loadGroups()
      ];
      saveGroups(newState);
      return newState;
    }
  }
});

export const {
  newGroup,
  removeTrack,
  addSearchResult,
  setTrackData,
  setTrackVolume,
  setTrackIsMuted,
  removeGroup,
  setGroupName,
  setGroupIsPlaying,
  setGroupIsExpanded,
  setGroupVolume,
  setTrackIsPlaying,
  startAllInGroup,
  stopAllInGroup,
  playGroupSolo,
  setOneShotRange,
  loadGroupsFromStorage
} = groupsSlice.actions;

export default groupsSlice.reducer;
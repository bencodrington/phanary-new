import { Group } from "../models/Group";

const GROUPS = 'groups';

export function saveGroups(groups: Group[]) {
  localStorage.setItem(GROUPS, JSON.stringify(groups));
}

export function loadGroups() {
  const storedGroupsString = localStorage.getItem(GROUPS);
  if (storedGroupsString === null) return [];
  const parsedGroupsString = JSON.parse(storedGroupsString);
  if (!Array.isArray(parsedGroupsString)) return [];
  const storedGroups = parsedGroupsString as Group[];
  // Make sure all tracks are stopped before returning them
  //  to prevent unwanted autoplay.
  // Similarly, set shouldLoad to false to avoid loading all
  //  previous sounds at once.
  storedGroups.forEach(group => {
    group.tracks.forEach(track => {
      track.isPlaying = false;
      track.shouldLoad = false;
    });
    // September 2024: Added combatTracks field to the data structure.
    if (group.combatTracks === undefined) {
      group.combatTracks = [];
    }
  });
  return storedGroups;
}
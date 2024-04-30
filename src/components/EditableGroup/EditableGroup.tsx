import React, { useEffect, useRef } from "react";
import Button, { ButtonType } from "../../widgets/buttons/Button";
import addIcon from "../../assets/icon-add.svg";
import { removeGroup, setGroupName } from "../../slices/groups";
import "./EditableGroup.scss";
import { useDispatch } from "react-redux";
import { Group } from "../../models/Group";
import useBoolean from "../../hooks/useBoolean";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import useSearchResults from "../SearchDropdown/useSearchResults";
import { constructKey } from "../../utils/tsxUtil";
import SoundItem from "./SoundItem";

type EditableGroupProps = {
  className?: string;
  group: Group;
  stopEditingGroup: () => void;
};

export default function EditableGroup({ className, group, stopEditingGroup }: EditableGroupProps) {
  const dispatch = useDispatch();
  const deleteGroup = () => {
    stopEditingGroup();
    dispatch(removeGroup({ groupIndex: group.index }))
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputHasBeenFocused, setInputHasBeenFocused] = useBoolean(false);
  useEffect(() => {
    if (inputRef.current === null || inputHasBeenFocused) return;
    // Focus and highlight text once when it's first displayed
    inputRef.current.focus();
    inputRef.current.select();
    setInputHasBeenFocused(true);
  })

  const updateGroupName = (newName: string) => {
    dispatch(setGroupName({ groupIndex: group.index, name: newName }));
  }

  const [isSearchOpen, setIsSearchOpen] = useBoolean(false);
  const {
    results,
    isFetchingResults,
    searchText,
    setSearchText,
    appendSearchText
  } = useSearchResults();

  return (
    <div className={`${className ? className + ' ' : ''} editable-group-container`}>
      <header>
        <div className="header-button-group">
          <Button
            icon="arrow-left"
            onClick={stopEditingGroup}
          />
          <Button
            text="Delete group"
            type={ButtonType.Default}
            onClick={deleteGroup}
          />
        </div>
        <input
          type='text'
          ref={inputRef}
          value={group.name}
          onChange={e => updateGroupName(e.target.value)}
        />
      </header>

      <div className="sounds-list">
        {group.tracks.map(track =>
          <SoundItem
            key={constructKey(group, track)}
            track={track}
            isSearchOpen={isSearchOpen}
            groupIndex={group.index}
          />
        )}
        {isSearchOpen
          ? <SearchDropdown
            closeSearchDropdown={() => { setIsSearchOpen(false) }}
            searchText={searchText}
            setSearchText={setSearchText}
            appendSearchText={appendSearchText}
            isFetchingResults={isFetchingResults}
            results={results}
            searchTarget={group.index}
          />
          : <Button
            text="Add sounds"
            type={ButtonType.Default}
            icon={addIcon}
            iconAltText="A plus icon"
            onClick={() => setIsSearchOpen(true)}
          />
        }
      </div>

    </div>
  );
}
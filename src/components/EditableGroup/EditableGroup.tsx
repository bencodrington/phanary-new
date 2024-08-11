import React, { useState } from "react";
import Button, { ButtonType } from "../../widgets/buttons/Button";
import { addSearchResult, removeGroup, setGroupName } from "../../slices/groups";
import "./EditableGroup.scss";
import { useDispatch } from "react-redux";
import { Group } from "../../models/Group";
import useBoolean from "../../hooks/useBoolean";
import useSearchResults from "../SearchDropdown/useSearchResults";
import { constructKey } from "../../utils/tsxUtil";
import SoundItem from "./SoundItem";
import SectionHeader from "../SectionHeader";
import EmptySection from "./EmptySection";
import SearchResults from "./SearchResults";
import { MUSIC_TAG } from "../../models/ObjectTypes";
import PlayGroupButton from "../../widgets/buttons/PlayGroupButton";

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

  const updateGroupName = (newName: string) => {
    dispatch(setGroupName({ groupIndex: group.index, name: newName }));
  }


  const [isSearchOpen, setIsSearchOpen] = useBoolean(false);
  const {
    results,
    isFetchingResults,
    searchText,
    setSearchText,
    appendSearchText,
    searchResultType,
    setSearchResultType,
  } = useSearchResults();

  // TODO: split into combat and non-combat
  const musicTracks = group.tracks.filter(track => track.tags?.includes(MUSIC_TAG));
  const ambianceTracks = group.tracks.filter(track => !track.tags?.includes(MUSIC_TAG));

  const [trackWithOpenMenu, setTrackWithOpenMenu] = useState<number | null>(null);
  const toggleTrackWithOpenMenu = (trackId: number) => {
    if (trackWithOpenMenu === trackId) {
      // Close menu
      setTrackWithOpenMenu(null);
    } else {
      // Switch open menu to the new track
      setTrackWithOpenMenu(trackId);
    }
  }

  return (
    <div className={`${className ? className + ' ' : ''} editable-group-container`}>

      {isSearchOpen && <SearchResults
        onAddSearchResult={result => dispatch(addSearchResult({ searchResult: result, groupIndex: group.index }))}
        onCloseSearch={() => { setIsSearchOpen(false) }}
        targetGroupName={group.name}
        searchText={searchText}
        setSearchText={setSearchText}
        searchResultType={searchResultType}
        setSearchResultType={setSearchResultType}
        isFetchingResults={isFetchingResults}
        results={results}
        targetGroupId={group.index}
        soundsInGroup={group.tracks.map(track => track.id)}
      />}

      <header>
        <div className="header-button-group">
          <Button
            icon="arrow-left"
            onClick={stopEditingGroup}
          />
          <Button
            icon="trash"
            onClick={deleteGroup}
          />
        </div>
        <div className="header-button-group">
          <Button
            icon="face-smile"
            onClick={() => console.log('TODO: EDIT ICON')}
          />
          <input
            type='text'
            value={group.name}
            onChange={e => updateGroupName(e.target.value)}
          />
          <PlayGroupButton group={group} />
        </div>
      </header>

      <main>
        <section>
          <SectionHeader icon="music" text="Music" hasExtraMargin={true} />
          <div className="horizontal-padding">

            {musicTracks.map(track =>
              <SoundItem
                key={constructKey(group, track)}
                track={track}
                groupIndex={group.index}
                isMenuOpen={trackWithOpenMenu === track.index}
                toggleMenuOpen={() => toggleTrackWithOpenMenu(track.index)}
              />
            )}
            {musicTracks.length === 0 && <EmptySection />}
          </div>
        </section>
        <section>
          <SectionHeader icon="cloud-sun-rain" text="Ambiance" hasExtraMargin={true} />
          <div className="horizontal-padding">
            {ambianceTracks.map(track =>
              <SoundItem
                key={constructKey(group, track)}
                track={track}
                groupIndex={group.index}
                isMenuOpen={trackWithOpenMenu === track.index}
                toggleMenuOpen={() => toggleTrackWithOpenMenu(track.index)}
              />
            )}
            {ambianceTracks.length === 0 && <EmptySection isLarge />}
          </div>
        </section>
        <section className="combat-section-header">
          <div className="combat-section-divider">
            <i className="fa-solid fa-hand-fist" />
            <h3>Combat</h3>
          </div>
          <div className="horizontal-padding">
            <p>Sounds in this section
              <strong> replace the music </strong>
              and
              <strong> add to the ambiance </strong>
              during Combat.
            </p>
          </div>
        </section>
        <section>
          <SectionHeader icon="music" text="Music" hasExtraMargin={true} />
          <div className="horizontal-padding">
            <EmptySection />
          </div>
        </section>
        <section>
          <SectionHeader icon="cloud-sun-rain" text="Ambiance" hasExtraMargin={true} />
          <div className="horizontal-padding">
            <EmptySection isLarge />
          </div>
        </section>
      </main>
      <div className="floating-button-group">
        <Button
          text="Add sounds to environment"
          type={ButtonType.Primary}
          icon="plus"
          onClick={() => setIsSearchOpen(true)}
        />
      </div>

    </div>
  );
}
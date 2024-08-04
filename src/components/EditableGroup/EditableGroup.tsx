import React from "react";
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
            onClick={() => console.log('TODO: PLAY')}
          />
          <input
            type='text'
            value={group.name}
            onChange={e => updateGroupName(e.target.value)}
          />
          <Button
            icon="play"
            onClick={() => console.log('TODO: PLAY')}
          />
        </div>
      </header>

      <main>
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
        {group.tracks.map(track =>
          <SoundItem
            key={constructKey(group, track)}
            track={track}
            isSearchOpen={isSearchOpen}
            groupIndex={group.index}
          />
        )}
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
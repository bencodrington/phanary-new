import React, { useState } from "react";
import AppHeader from "../../widgets/AppHeader";
import Button, { ButtonType } from "../../widgets/buttons/Button";

import './GroupList.scss';
import { useGroups } from "../../slices";
import { useDispatch } from "react-redux";
import { newGroup } from "../../slices/groups";
import { getNextIndex } from "../../utils/storeUtil";
import GroupListItem from "./GroupListItem";
import EditableGroup from "../EditableGroup/EditableGroup";
import SectionHeader from "../SectionHeader";

type GroupListProps = {
  openAboutPage: () => void;
};

export default function GroupList({ openAboutPage }: GroupListProps) {
  const groups = useGroups();
  const dispatch = useDispatch();

  const [editableGroupIndex, setEditableGroupIndex] = useState<null | number>(null);
  const editableGroup = groups.find(group => group.index === editableGroupIndex) ?? null;
  const editGroup = (index: number) => setEditableGroupIndex(index);
  const stopEditingGroup = () => setEditableGroupIndex(null);

  const createNewGroup = () => {
    const index = getNextIndex(groups);
    dispatch(newGroup({ index }));
    editGroup(index);
  };

  return (
    <div className="group-list-container">
      {editableGroup !== null && <EditableGroup className="editable-group" stopEditingGroup={stopEditingGroup} group={editableGroup} />}
      <AppHeader
        isAboutOpen={false}
        setIsAboutOpen={openAboutPage}
      />
      <main>
        {groups.length === 0 && <h3 className="empty-state-message">Create a group of sounds to get started.</h3>}
        {groups.length !== 0 && <SectionHeader icon="mountain-sun" text="Environments"/>}
        {
          groups.map(group =>
            <GroupListItem
              key={group.index}
              group={group}
              editGroup={editGroup}
            />
          )
        }
      </main>
      <div className="floating-button-group">
        <Button
          text="Add environment"
          type={ButtonType.Primary}
          icon="plus"
          onClick={createNewGroup}
        />
        <Button
          text="Quick effects"
          icon="bolt"
          onClick={createNewGroup}
        />
      </div>
    </div>
  )
}
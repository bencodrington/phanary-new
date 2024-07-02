import React from "react";
import './GroupListEmptyState.scss';
import Button, { ButtonType } from "../../widgets/buttons/Button";
import AnchorButton from "../../widgets/buttons/AnchorButton";

export default function GroupListEmptyState({ createNewGroup }: { createNewGroup: () => void }) {
  return (
    <div className="group-list-empty-state-container">
      <div className="tagline">
        <h2>Music and effects</h2>
        <h2 className="small">at the</h2>
        <h2>speed of sound.</h2>
      </div>

      <main>
        <p>Spice up your RPGs and immerse your table in rich soundscapes.</p>

        <ul>
          <li>Fade between locations</li>
          <li>Easily find sounds when the party goes somewhere unexpected</li>
          <li>
            <div className="flex-list-item">
              Completely free!
              <AnchorButton text="Donations welcome" isSmall type={ButtonType.Gradient} url="https://ko-fi.com/projectbench" />
            </div>
          </li>
        </ul>

      </main>

      <div className="floating-action">
        <h5>To get started,</h5>
        <Button
          text="Add environment"
          type={ButtonType.Primary}
          icon="plus"
          onClick={createNewGroup}
          className="call-to-action-button"
        />
      </div>
    </div>
  );
};
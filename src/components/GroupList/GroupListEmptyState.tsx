import React from "react";
import './GroupListEmptyState.scss';
import Button from "../../widgets/buttons/Button";

export default function GroupListEmptyState() {
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
          <li>Completely free!
            <Button text="Donations welcome" isSmall onClick={() => console.log('TODO')} />
          </li>
        </ul>

      </main>
    </div>
  );
};
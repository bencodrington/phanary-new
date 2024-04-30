import React from "react";

import kofiIcon from "../assets/ko-fi-icon.png";
import githubIcon from "../assets/github-icon.png";

import "./AboutPage.scss";
import AnchorButton from "../widgets/buttons/AnchorButton";
import AppHeader from "../widgets/AppHeader";
import Button from "../widgets/buttons/Button";

type AboutPageProps = {
  closeAboutPage: () => void;
};

export default function AboutPage({ closeAboutPage }: AboutPageProps) {
  return (
    <div className="about-page-container">
      <AppHeader
        isAboutOpen={true}
        setIsAboutOpen={closeAboutPage}
      />
      <main>
        <section>
          <h2>Music and effects at the speed of sound.</h2>
          <p>
            Spice up your <a href="https://en.wikipedia.org/wiki/Tabletop_role-playing_game"
              target="_blank"
              rel="noopener noreferrer">
              tabletop RPG
            </a> games and boost player immersion.
          </p>
          <ul>
            <li>Fade seamlessly between groups of sounds</li>
            <li>Search hundreds of sounds</li>
            <li>Improvise with ease when the party goes somewhere unexpected</li>
          </ul>
        </section>
        <section>
          <h2>Always leveling up.</h2>
          <p>
            Please send any feedback, bugs, or ideas to <a href="mailto:phanarydev@gmail.com"
              target="_blank"
              rel="noopener noreferrer">
              phanarydev@gmail.com
            </a>
            .
          </p>
          <AnchorButton
            className="github-button"
            url="https://github.com/bencodrington/turbo-bard"
            icon={githubIcon}
            text="Code"
          />
          <p>
            If you'd like, you can <a href="https://ko-fi.com/projectbench"
              target="_blank"
              rel="noopener noreferrer">
              donate
            </a> to help cover the costs of running TurboBard.
          </p>
          <AnchorButton
            className="ko-fi-button"
            url="https://ko-fi.com/projectbench"
            icon={kofiIcon}
            text="Support me"
          />
          <h3>Recent changes</h3>
          <ul>
            <li>Redesign to make the interface easier to learn, and faster to switch between groups during a game session</li>
          </ul>
          <h3>Upcoming features</h3>
          <ul>
            <li>Use sounds from your own device</li>
          </ul>
        </section>
        <section>
          <h2>About the audio.</h2>
          <p>
            I’ve collected sounds from across the Internet with
            permissive licenses.
            I’ve linked the source and listed the author wherever
            possible.
          </p>
          <p>
            If TurboBard features your sound and you’d like it
            to be removed or modified for any reason,
            please contact me at <a href="mailto:phanarydev@gmail.com"
              target="_blank"
              rel="noopener noreferrer">
              phanarydev@gmail.com
            </a>
            .
          </p>
        </section>
        <section>
          <h2>Data policy.</h2>
          <p>
            TurboBard doesn't use any cookies.
            No personal data is recorded at any time.
          </p>
        </section>
        <section>
          <Button
            text="Back"
            onClick={closeAboutPage}
          />
        </section>
      </main>
    </div>
  );
}
import React from "react";

import "./AboutPage.scss";
import AnchorButton from "../widgets/buttons/AnchorButton";
import Button, { ButtonType } from "../widgets/buttons/Button";
import Modal from "./Modal";

type AboutPageProps = {
  closeAboutPage: () => void;
};

export default function AboutPage({ closeAboutPage }: AboutPageProps) {
  return (
    <Modal className="about-page-container" icon="info-circle" title="About" onClose={closeAboutPage}>
      <main>
        <section>
          <h3>TurboBard is a passion project.</h3>
          <p>
            If you'd like, you can <a href="https://ko-fi.com/projectbench"
              target="_blank"
              rel="noopener noreferrer">
              donate
            </a> to help cover the costs of running it.
          </p>
          <AnchorButton className="support-me-button" icon="hand-holding-dollar" text="Support me" type={ButtonType.Primary} url="https://ko-fi.com/projectbench" />
        </section>
        <section>
          <h3>Data policy.</h3>
          <p>
            No personal data is recorded at any time.
          </p>
        </section>
        <section>
          <h3>About the audio.</h3>
          <p>
            I've collected sounds with permissive licenses, and linked the source wherever possible.
          </p>
          <p>
            If TurboBard features your sound and you'd like it
            to be removed or modified for any reason,
            please contact me at <a href="mailto:phanarydev@gmail.com"
              target="_blank"
              rel="noopener noreferrer">
              phanarydev@gmail.com
            </a>
          </p>
        </section>
        <section>
          <h3>Contact me.</h3>
          <p>
            Please send any feedback, bugs, or ideas to <a href="mailto:phanarydev@gmail.com"
              target="_blank"
              rel="noopener noreferrer">
              phanarydev@gmail.com
            </a>
          </p>
        </section>

        <section>
          <Button
            text="Close"
            onClick={closeAboutPage}
          />
        </section>
      </main>
    </Modal>
  );
}
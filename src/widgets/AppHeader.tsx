import React from "react";
import logo from '../logo.svg';

import "./AppHeader.scss";
import Button from "./buttons/Button";

type AppHeaderProps = {
  isAboutOpen: boolean,
  setIsAboutOpen: (newValue: boolean) => void
};

export default function AppHeader({
  isAboutOpen,
  setIsAboutOpen
}: AppHeaderProps) {
  const className = 'app-header-container' +
    (isAboutOpen ? ' about-open' : '');
  return (
    <div className={className}>
      <img src={logo} className="logo" alt="TurboBard logo" />
      <Button
        onClick={() => setIsAboutOpen(!isAboutOpen)}
        icon="info-circle"
      />
    </div>
  );
}
import React from "react";

import "./DefaultButton.scss";

type DefaultButtonProps = {
  text?: string,
  icon?: string, // icon should be an imported image
  onClick: () => void,
  className?: string,
  isDisabled?: boolean,
  isRound?: boolean,
  isActive?: boolean,
  isFullWidth?: boolean
};

export default function DefaultButton({
  text,
  icon,
  onClick,
  className,
  isDisabled = false,
  isRound = false,
  isActive = false,
  isFullWidth = false
}: DefaultButtonProps) {

  if (text === undefined && icon === undefined) return null;
  const textContent = text === undefined ? null : <span>{text}</span>;
  const imgContent = icon === undefined ? null : <img src={icon} />;

  const computedClassName = 'default-button-container '
    + (className ? className + ' ' : '')
    + (icon !== undefined && text === undefined ? 'icon-only ' : '')
    + (isRound ? 'round ' : '')
    + (isActive ? 'active ' : '')
    + (isFullWidth ? 'full-width ' : '');

  return (
    <button
      className={computedClassName}
      onClick={onClick}
      disabled={isDisabled}
    >
      {imgContent}
      {textContent}
    </button>
  )
};
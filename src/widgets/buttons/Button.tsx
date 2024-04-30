import React from "react";

import "./Button.scss";

export enum ButtonType {
  Default = '',
  Primary = 'primary'
}

type ButtonProps = {
  text?: string,
  type?: ButtonType,
  icon?: string, // icon should be a fontawesome class
  iconAltText?: string,
  onClick: () => void,
  className?: string,
  isActive?: boolean,
};

export default function Button({
  text,
  type,
  icon,
  iconAltText,
  onClick,
  className,
  isActive,
}: ButtonProps) {

  if (text === undefined && icon === undefined) return null;
  const textContent = text === undefined ? null : <span>{text}</span>;
  const imgContent = icon === undefined ? null : <i className={`fa-solid fa-${icon}`} />;

  const computedClassName = 'button-container '
    + (className ? className + ' ' : '')
    + (icon !== undefined && text === undefined ? 'icon-only ' : '')
    + (isActive ? 'active ' : '')
    + (type ? type + ' ' : '')

  return (
    <button
      className={computedClassName}
      onClick={onClick}
    >
      {imgContent}
      {textContent}
    </button>
  )
};
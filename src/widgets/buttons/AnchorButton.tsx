import React from "react";

import "./AnchorButton.scss";
import Button, { ButtonType } from "./Button";

type AnchorButtonProps = {
  url: string,
  className?: string,
  text?: string,
  type?: ButtonType
  icon?: string,
  isSmall?: boolean,
};

export default function AnchorButton({
  url,
  className,
  text,
  type,
  icon,
  isSmall
}: AnchorButtonProps) {
  const computedClassName = 'anchor-button-container '
    + (className ? className + ' ' : '')

  return (
    <a
      className={computedClassName}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button text={text} onClick={() => { }} type={type} icon={icon} isSmall={isSmall} />
    </a>
  );
}
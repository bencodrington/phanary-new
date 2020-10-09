import React from "react";
import DefaultButton from "./DefaultButton";

type NewSoundscapeButtonProps = {
  onClick: () => void
};

export default function NewSoundscapeButton({onClick}: NewSoundscapeButtonProps) {

  return (
    <DefaultButton
      text="Create new soundscape"
      onClick={onClick}
    />
  );
}
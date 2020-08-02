import React from "react";

import { Button } from "./button.type";

interface RenderButtonsProps {
  buttons: Button[];
  style?: string;
  additionalStyle?: string;
}

export const renderButtons = ({
  buttons,
  style = "btn btn-info margin-side",
  additionalStyle = ""
}: RenderButtonsProps) => (
  <>
    {buttons.map(([text, onClick], index) => (
      <button
        key={index}
        className={`${style} ${additionalStyle}`}
        type="button"
        onClick={onClick}
      >
        {text}
      </button>
    ))}
  </>
);

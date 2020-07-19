import React from "react";
import { Button } from "./button.type";

export const renderButtons = (
  buttons: Button[],
  buttonStyle: string = "btn btn-info margin-side"
) => (
  <>
    {buttons.map(([text, onClick], index) => (
      <button
        key={index}
        className={`${buttonStyle}`}
        type="button"
        onClick={onClick}
      >
        {text}
      </button>
    ))}
  </>
);

import React from "react";
import { useSelector } from "react-redux";
import { SavedTraining } from "../forms/training-form/types";
import { State } from "../../store";
import { SAVED_TRAININGS } from "../../store/training/slice";

export const SavedTrainings = () => {
  const savedTrainings = useSelector<State, SavedTraining[]>(
    state => state.training[SAVED_TRAININGS]
  );

  return (
    <>
      {savedTrainings.map(savedTraining => (
        <h1>{savedTraining.name}</h1>
      ))}
    </>
  );
};

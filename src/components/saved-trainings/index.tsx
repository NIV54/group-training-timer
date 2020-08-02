import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { SavedTraining } from "../forms/training-form/types";
import { State } from "../../store";
import { SAVED_TRAININGS } from "../../store/training/slice";
import { buildTrainingInputFromStorage } from "../forms/training-form/utils/build-training-input-from-storage";
import { startTraining } from "../utils/tarining/start-training";

import "./saved-trainings.scss";

export const SavedTrainings = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const savedTrainings = useSelector<State, SavedTraining[]>(
    state => state.training[SAVED_TRAININGS]
  );

  const onTrainingClick = (savedTraining: SavedTraining) => {
    const trainingInput = buildTrainingInputFromStorage(savedTraining);
    startTraining(trainingInput, dispatch, history);
  };

  return (
    <div className="container">
      <h1 className="text-center">My Trainings</h1>
      {savedTrainings.length > 0 ? (
        <div className="card mt-3">
          <ul className="list-group list-group-flush"></ul>
          {savedTrainings.map((savedTraining, index) => (
            <div
              key={index}
              className="list-group-item training"
              onClick={() => onTrainingClick(savedTraining)}
            >
              {savedTraining.name}
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center">
          All your saved trainings will show up on this page!
        </h3>
      )}
    </div>
  );
};

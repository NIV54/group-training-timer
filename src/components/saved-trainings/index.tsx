import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { SavedTraining } from "../forms/training-form/types";
import { State } from "../../store";
import {
  SAVED_TRAININGS,
  setTrainingInput,
  removeSavedTraining
} from "../../store/training/slice";
import { buildTrainingInputFromStorage } from "../forms/training-form/utils/build-training-input-from-storage";
import { startTraining } from "../utils/tarining/start-training";
import { NEW_TRAINING } from "../app/routes";

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

  const editTraining = (savedTraining: SavedTraining) => {
    const trainingInput = buildTrainingInputFromStorage(savedTraining);
    dispatch(setTrainingInput(trainingInput));
    history.replace(NEW_TRAINING);
  };

  const removeTraining = ({ id }: SavedTraining) => {
    dispatch(removeSavedTraining(id));
  };

  return (
    <div className="container">
      <h1 className="text-center">My Trainings</h1>
      {savedTrainings.length > 0 ? (
        <div className="card mt-3">
          <ul className="list-group list-group-flush">
            {savedTrainings.map((savedTraining, index) => (
              <div key={index} className="d-flex list-group-item training">
                <p
                  className="training-name"
                  onClick={() => onTrainingClick(savedTraining)}
                >
                  {savedTraining.name}
                </p>
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  className="bi bi-pencil-square edit-icon"
                  fill="currentColor"
                  onClick={() => editTraining(savedTraining)}
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  className="bi bi-trash"
                  fill="currentColor"
                  onClick={() => removeTraining(savedTraining)}
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <h3 className="text-center">
          All your saved trainings will show up on this page!
        </h3>
      )}
    </div>
  );
};

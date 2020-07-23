import watch from "redux-watch";
import { trainingStateName, SAVED_TRAININGS } from "../training/slice";
import { TrainingFormForStorage } from "../../components/forms/training-form/types";
import { Storage } from "../../utils/storage/storage.type";
import { EnhancedStore } from "@reduxjs/toolkit";

export default (
  store: EnhancedStore,
  storage: Storage<TrainingFormForStorage[]>
) => {
  const makeSavedTrainingsSubscriber = watch(
    store.getState,
    `${trainingStateName}.${SAVED_TRAININGS}`
  );
  return makeSavedTrainingsSubscriber(newValue =>
    storage.set(SAVED_TRAININGS, newValue)
  );
};

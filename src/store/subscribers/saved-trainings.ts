import watch from "redux-watch";
import { EnhancedStore } from "@reduxjs/toolkit";

import { trainingStateName, SAVED_TRAININGS } from "../training/slice";
import { SavedTraining } from "../../components/forms/training-form/types";
import { Storage } from "../../utils/storage/storage.type";

export default (store: EnhancedStore, storage: Storage<SavedTraining[]>) => {
  const makeSavedTrainingsSubscriber = watch(
    store.getState,
    `${trainingStateName}.${SAVED_TRAININGS}`
  );
  return makeSavedTrainingsSubscriber(newValue =>
    storage.set(SAVED_TRAININGS, newValue)
  );
};

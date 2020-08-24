import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

import {
  SavedTraining,
  TrainingFormInput
} from "../../components/forms/training-form/types";
import { LocalStorage } from "../../utils/storage/local-storage";

import { Training, ROUNDS, COUNTDOWN } from "./types";

const storage = new LocalStorage<SavedTraining[]>();

export const SAVED_TRAININGS = "savedTrainings";

const trainingSlice = createSlice({
  initialState: {
    [SAVED_TRAININGS]: storage.get(SAVED_TRAININGS) || ([] as SavedTraining[]),
    currentTraining: {
      [ROUNDS]: [{ workTime: 0, breakTime: 0 }],
      [COUNTDOWN]: 0
    } as Training,
    trainingInput: {} as Partial<TrainingFormInput>
  },
  name: "training",
  reducers: {
    setCurrentTraining: (state, action: PayloadAction<Training>) => ({
      ...state,
      currentTraining: action.payload
    }),
    addSavedTraining: (
      state,
      action: PayloadAction<Omit<SavedTraining, "id">>
    ) => ({
      ...state,
      savedTrainings: [
        ...state[SAVED_TRAININGS],
        { ...action.payload, id: v4() }
      ]
    }),
    removeSavedTraining: (state, action: PayloadAction<string>) => ({
      ...state,
      savedTrainings: [
        ...state[SAVED_TRAININGS].filter(({ id }) => id !== action.payload)
      ]
    }),
    setTrainingInput: (
      state,
      action: PayloadAction<Partial<TrainingFormInput>>
    ) => ({
      ...state,
      trainingInput: action.payload
    })
  }
});

export const {
  reducer: trainingReducer,
  actions: {
    setCurrentTraining,
    addSavedTraining,
    removeSavedTraining,
    setTrainingInput
  },
  name: trainingStateName
} = trainingSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Training, ROUNDS, COUNTDOWN } from "./types";
import { SavedTraining } from "../../components/forms/training-form/types";
import { LocalStorage } from "../../utils/storage/local-storage";

const storage = new LocalStorage<SavedTraining[]>();

export const SAVED_TRAININGS = "savedTrainings";

const trainingSlice = createSlice({
  initialState: {
    [SAVED_TRAININGS]: storage.get(SAVED_TRAININGS) || [],
    currentTraining: {
      [ROUNDS]: [{ workTime: 0, breakTime: 0 }],
      [COUNTDOWN]: 0
    } as Training
  },
  name: "training",
  reducers: {
    setCurrentTraining: (state, action: PayloadAction<Training>) => ({
      ...state,
      currentTraining: action.payload
    }),
    addTrainingInput: (state, action: PayloadAction<SavedTraining>) => ({
      ...state,
      savedTrainings: [...state[SAVED_TRAININGS], action.payload]
    })
  }
});

export const {
  reducer: trainingReducer,
  actions: { setCurrentTraining, addTrainingInput },
  name: trainingStateName
} = trainingSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Training, ROUNDS, COUNTDOWN } from "./types";
import { TrainingFormForStorage } from "../../components/forms/training-form/types";

const trainingSlice = createSlice({
  initialState: {
    savedTrainings: [] as TrainingFormForStorage[],
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
    addTrainingInput: (
      state,
      action: PayloadAction<TrainingFormForStorage>
    ) => ({
      ...state,
      savedTrainings: [...state.savedTrainings, action.payload]
    })
  }
});

export const {
  reducer: trainingReducer,
  actions: { setCurrentTraining, addTrainingInput }
} = trainingSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainingFormInput } from "./types";

const trainingSlice = createSlice({
  initialState: {
    workTime: "00:00",
    breakTime: "00:00",
    rounds: "0",
  },
  name: "training",
  reducers: {
    setTraining: (state, action: PayloadAction<TrainingFormInput>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  reducer: trainingReducer,
  actions: { setTraining },
} = trainingSlice;

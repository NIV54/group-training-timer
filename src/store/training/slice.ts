import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainingFormInput } from "./types";

const trainingSlice = createSlice({
  initialState: {
    workTime: "00:05",
    breakTime: "00:03",
    rounds: 3,
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

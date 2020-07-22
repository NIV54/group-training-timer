import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Training } from "./types";

const trainingSlice = createSlice({
  initialState: {
    rounds: [] as Training,
    countdown: 0
  },
  name: "training",
  reducers: {
    setTraining: (state, action: PayloadAction<Training>) => ({
      ...state,
      rounds: [...action.payload]
    }),
    setCountdown: (state, action: PayloadAction<number>) => ({
      ...state,
      countdown: action.payload
    })
  }
});

export const {
  reducer: trainingReducer,
  actions: { setTraining, setCountdown }
} = trainingSlice;

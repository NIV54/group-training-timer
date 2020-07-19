import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Training } from "./types";

const trainingSlice = createSlice({
  initialState: {
    rounds: [] as Training,
    initialTime: 0
  },
  name: "training",
  reducers: {
    setTraining: (state, action: PayloadAction<Training>) => ({
      ...state,
      rounds: [...action.payload]
    }),
    setInitialTime: (state, action: PayloadAction<number>) => ({
      ...state,
      initialTime: action.payload
    })
  }
});

export const {
  reducer: trainingReducer,
  actions: { setTraining, setInitialTime }
} = trainingSlice;

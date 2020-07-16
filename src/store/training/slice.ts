import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Training } from "./types";

const trainingSlice = createSlice({
  initialState: [] as Training,
  name: "training",
  reducers: {
    setTraining: (state, action: PayloadAction<Training>) => [...action.payload]
  }
});

export const {
  reducer: trainingReducer,
  actions: { setTraining }
} = trainingSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Training } from "./types";

const trainingSlice = createSlice({
  initialState: {
    savedTrainings: [] as Training[],
    currentTraining: {} as Training
  },
  name: "training",
  reducers: {
    setCurrentTraining: (state, action: PayloadAction<Training>) => ({
      ...state,
      currentTraining: action.payload
    }),
    addTraining: (state, action: PayloadAction<Training>) => ({
      ...state,
      savedTrainings: [...state.savedTrainings, action.payload]
    })
  }
});

export const {
  reducer: trainingReducer,
  actions: { setCurrentTraining, addTraining }
} = trainingSlice;

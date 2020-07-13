import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { trainingReducer } from "./training/slice";

const rootReducer = combineReducers({
  training: trainingReducer
});

export type State = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });

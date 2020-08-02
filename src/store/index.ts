import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { LocalStorage } from "../utils/storage/local-storage";

import { trainingReducer } from "./training/slice";
import * as subscriberMakers from "./subscriber-makers";

const rootReducer = combineReducers({
  training: trainingReducer
});

export type State = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });

const storage = new LocalStorage<any>();

Object.values(subscriberMakers).forEach(subscriberMaker =>
  store.subscribe(subscriberMaker(store, storage))
);

import React from "react";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import DarkMode from "darkmode-js";

import App from "./components/app";
import * as serviceWorker from "./serviceWorker";
import { SAVED_TRAININGS } from "./store/training/slice";
import { SavedTraining } from "./components/forms/training-form/types";
import { LocalStorage } from "./utils/storage/local-storage";
import { store } from "./store";

import "./index.scss";
import "bootstrap/dist/js/bootstrap";

new DarkMode({
  label: "🌓"
}).showWidget();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// saved training id's patch. remove in the next version
try {
  const storage = new LocalStorage<SavedTraining[]>();
  const savedTrainings: SavedTraining[] | null = storage.get(SAVED_TRAININGS);
  if (savedTrainings && !savedTrainings[0].id) {
    const savedTrainingsWithIds = savedTrainings.map(savedTraining => ({
      ...savedTraining,
      id: v4()
    }));
    storage.set(SAVED_TRAININGS, savedTrainingsWithIds);
  }
} catch {
  // eslint-disable-next-line no-empty
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

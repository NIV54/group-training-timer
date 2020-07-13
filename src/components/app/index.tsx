import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { TrainingRunner } from "../training-runner";

const App = () => (
  <Provider store={store}>
    <TrainingRunner />
  </Provider>
);

export default App;

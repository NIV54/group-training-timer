import React from "react";
import { TrainingForm } from "../forms/training-form";
import { Provider } from "react-redux";
import { store } from "../../store";

const App = () => (
  <Provider store={store}>
    <TrainingForm />
  </Provider>
);

export default App;

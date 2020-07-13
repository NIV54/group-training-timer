import React from "react";
import { TrainingForm } from "../forms/training-form";
import { Provider } from "react-redux";
import { store } from "../../store";
import { Timer } from "../timer";

const App = () => (
  <Provider store={store}>
    <Timer kind="WORK" onTimeout={() => console.log("asd")} time={100000} />
  </Provider>
);

export default App;

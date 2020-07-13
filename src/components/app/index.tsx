import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { store } from "../../store";
import { TrainingRunner } from "../training-runner";
import { TrainingForm } from "../forms/training-form";
import { TRAINING, HOME } from "./routes";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={HOME} component={TrainingForm} />
        <Route exact path={TRAINING} component={TrainingRunner} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;

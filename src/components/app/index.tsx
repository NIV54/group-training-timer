import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { store } from "../../store";
import { TrainingRunner } from "../training-runner";
import { TrainingForm } from "../forms/training-form";
import { TRAINING, HOME, COUNTDOWN } from "./routes";
import { Countdown } from "../countdown";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={HOME}>
          <TrainingForm
            timeFormat={process.env.REACT_APP_TIME_FORMAT as string}
          />
        </Route>
        <Route exact path={COUNTDOWN} component={Countdown} />
        <Route exact path={TRAINING} component={TrainingRunner} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;

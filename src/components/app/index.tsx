import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { store } from "../../store";
import { TrainingRunner } from "../training-runner";
import { TrainingForm } from "../forms/training-form";
import {
  TRAINING_ROUTE,
  HOME_ROUTE,
  COUNTDOWN_ROUTE,
  SAVED_TRAININGS_ROUTE
} from "./routes";
import { Countdown } from "../countdown";
import { SavedTrainings } from "../saved-trainings";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={HOME_ROUTE}>
          <TrainingForm
            timeFormat={process.env.REACT_APP_TIME_FORMAT as string}
          />
        </Route>
        <Route exact path={COUNTDOWN_ROUTE} component={Countdown} />
        <Route exact path={TRAINING_ROUTE} component={TrainingRunner} />
        <Route exact path={SAVED_TRAININGS_ROUTE} component={SavedTrainings} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;

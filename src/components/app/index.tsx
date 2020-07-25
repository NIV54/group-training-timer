import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { store } from "../../store";
import { TrainingRunner } from "../training-runner";
import { TrainingForm } from "../forms/training-form";
import { TRAINING_ROUTE, NEW_TRAINING, COUNTDOWN_ROUTE, HOME } from "./routes";
import { Countdown } from "../countdown";
import { SavedTrainings } from "../saved-trainings";
import { Navbar } from "../general/navbar";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path={NEW_TRAINING}>
          <TrainingForm
            timeFormat={process.env.REACT_APP_TIME_FORMAT as string}
          />
        </Route>
        <Route exact path={COUNTDOWN_ROUTE} component={Countdown} />
        <Route exact path={TRAINING_ROUTE} component={TrainingRunner} />
        <Route exact path={HOME} component={SavedTrainings} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;

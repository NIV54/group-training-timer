import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import { TrainingRunner } from "../training-runner";
import { TrainingForm } from "../forms/training-form";
import { Countdown } from "../countdown";
import { SavedTrainings } from "../saved-trainings";
import { Navbar } from "../general/navbar";
import { noSleep } from "../../utils/no-sleep";

import { TRAINING_ROUTE, NEW_TRAINING, COUNTDOWN_ROUTE, HOME } from "./routes";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname !== COUNTDOWN_ROUTE &&
      location.pathname !== TRAINING_ROUTE
    ) {
      noSleep.disable();
    }
  }, [location]);

  return (
    <>
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
    </>
  );
};

export default App;

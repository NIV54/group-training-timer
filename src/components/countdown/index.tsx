import React from "react";
import { useTimer } from "react-compound-timer/build";
import { useTimeout } from "../../hooks/use-timeout";
import { formatTimeUnit } from "../utils/timer/format-time-unit";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { useHistory } from "react-router-dom";
import { TRAINING_ROUTE } from "../app/routes";
import { COUNTDOWN } from "../../store/training/types";

export const Countdown = () => {
  const countdown = useSelector<State, number>(
    state => state.training.currentTraining[COUNTDOWN]
  );
  const { value } = useTimer({
    direction: "backward",
    initialTime: countdown
  });
  const history = useHistory();
  useTimeout(value, () => history.replace(TRAINING_ROUTE));

  return (
    <div className="container content-center">
      <div className="row text-center">
        <div className="col-12">
          <h1>Countdown</h1>
        </div>
        <div className="col-12">
          <h1>
            {formatTimeUnit(value.m)}:{formatTimeUnit(value.s)}
          </h1>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useTimer } from "react-compound-timer/build";
import { useTimeout } from "../../hooks/use-timeout";
import { formatTimeUnit } from "../utils/timer/format-time-unit";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { useHistory } from "react-router-dom";
import { TRAINING } from "../app/routes";
import { HomeButton } from "../general/links";

export const InitialTimer = () => {
  const initialTime = useSelector<State, number>(
    state => state.training.initialTime
  );
  const { value } = useTimer({
    direction: "backward",
    initialTime
  });
  const history = useHistory();
  useTimeout(value, () => history.replace(TRAINING));

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <HomeButton />
      <div className="row text-center">
        <div className="col-12">
          <h1>Loading</h1>
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

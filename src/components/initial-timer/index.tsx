import React from "react";
import { useTimer } from "react-compound-timer/build";
import { useTimeout } from "../../hooks/use-timeout";
import { formatTimeUnit } from "../utils/timer/format-time-unit";

interface InitialTimerProps {
  time: number;
  timeoutCallback: () => any;
}
export const InitialTimer = ({ time, timeoutCallback }: InitialTimerProps) => {
  const { value } = useTimer({
    direction: "backward",
    initialTime: time
  });
  useTimeout(value, timeoutCallback);
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="row text-center">
        <div className="col-12">
          <h1>
            {formatTimeUnit(value.m)}:{formatTimeUnit(value.s)}
          </h1>
        </div>
      </div>
    </div>
  );
};

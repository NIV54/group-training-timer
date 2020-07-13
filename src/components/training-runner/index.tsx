import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { TrainingFormInput } from "../../store/training/types";
import { buildTimesArray } from "./utils/build-times-array";
import { useTimer } from "react-compound-timer";
import { formatTimeUnit } from "./utils/format-time-unit";

export const TrainingRunner = () => {
  const training = useSelector<State, TrainingFormInput>(
    state => state.training
  );
  const [timesIndex, setTimesIndex] = useState(0);
  const times = useMemo(() => buildTimesArray(training), [training]);
  const {
    controls: { start, pause, resume, setTime },
    value,
  } = useTimer({
    direction: "backward",
    initialTime: times[timesIndex],
    startImmediately: false,
  });

  const { m, s } = value;

  useEffect(() => {
    if (timesIndex < times.length - 1 && m === 0 && s === 0) {
      setTime(times[timesIndex + 1]);
      setTimesIndex(timesIndex => timesIndex + 1);
    }
  }, [timesIndex, setTime, times, m, s]);

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={resume}>Resume</button>
      <button onClick={pause}>Pause</button>
      <h1>
        {formatTimeUnit(m)}:{formatTimeUnit(s)}
      </h1>
    </>
  );
};

import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { Training } from "../../store/training/types";
import { buildTimesArray } from "./utils/build-times-array";
import { useTimer } from "react-compound-timer";
import { formatTimeUnit } from "./utils/format-time-unit";
import { useAudio } from "../../hooks/use-audio";
import "./training-runner.scss";
const ringBell = require("../../assets/audio/ring-bell.mp3");

export const TrainingRunner = () => {
  const training = useSelector<State, Training>(state => state.training);
  const [timesIndex, setTimesIndex] = useState(0);
  const times = useMemo(() => buildTimesArray(training), [training]);
  const {
    controls: { start, pause, resume, setTime },
    value
  } = useTimer({
    direction: "backward",
    initialTime: times[timesIndex],
    startImmediately: false
  });
  const { toggle } = useAudio(ringBell);

  const buttons: [string, () => void][] = [
    ["Start", start],
    ["Pause", pause],
    ["Resume", resume]
  ];

  const { m, s } = value;

  useEffect(() => {
    if (m === 0 && s === 0) {
      setTimesIndex(timesIndex => timesIndex + 1);
    }
  }, [m, s]);

  useEffect(() => {
    if (timesIndex < times.length) {
      setTime(times[timesIndex]);
    }
    if (timesIndex > 0) {
      toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timesIndex]);

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="row text-center">
        <div className="col-12">
          <h1>Round {Math.floor(timesIndex / 2) + 1}</h1>
        </div>
        <div className="col-12">
          {buttons.map(([text, onClick]) => (
            <button
              className="btn btn-info margin-side"
              type="button"
              onClick={onClick}
            >
              {text}
            </button>
          ))}
        </div>
        <div className="col-12">
          <h1 className={`${timesIndex % 2 === 0 ? "work" : "break"}`}>
            {formatTimeUnit(m)}:{formatTimeUnit(s)}
          </h1>
        </div>
      </div>
    </div>
  );
};

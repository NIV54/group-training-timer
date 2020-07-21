import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { Training } from "../../store/training/types";
import { buildTimesArray } from "./utils/build-times-array";
import { useTimer } from "react-compound-timer";
import { formatTimeUnit } from "../utils/timer/format-time-unit";
import { useAudio } from "../../hooks/use-audio";
import "./training-runner.scss";
import { Button } from "../utils/ui/render-buttons/button.type";
import { renderButtons } from "../utils/ui/render-buttons/render-buttons";
import { useTimeout } from "../../hooks/use-timeout";
import { HomeButton } from "../general/links";
const ringBell = require("../../assets/audio/ring-bell.mp3");

export const TrainingRunner = () => {
  const training = useSelector<State, Training>(state => state.training.rounds);
  const [timesIndex, setTimesIndex] = useState(0);
  const times = useMemo(() => buildTimesArray(training), [training]);
  const {
    controls: { pause, resume, setTime },
    value
  } = useTimer({
    direction: "backward",
    initialTime: times[timesIndex]
  });
  const { toggle } = useAudio(ringBell);
  useTimeout(value, () => setTimesIndex(timesIndex => timesIndex + 1));
  useEffect(() => {
    if (timesIndex < times.length) {
      setTime(times[timesIndex]);
    }
    if (timesIndex > 0) {
      toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timesIndex]);

  const buttons: Button[] = [
    ["Pause", pause],
    ["Resume", resume]
  ];

  const getRound = () => {
    const round = Math.floor(timesIndex / 2) + 1;
    const totalRounds = Math.floor(times.length / 2) + 1;
    if (round === totalRounds) {
      return "Last Round";
    }

    return `Round ${round} / ${totalRounds}`;
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <HomeButton />
      <div className="row text-center">
        <div className="col-12">
          <h1>{getRound()}</h1>
        </div>
        <div className="col-12 btn-xl">
          {renderButtons({ buttons, additionalStyle: "btn-lg" })}
        </div>
        <div className="col-12">
          <h1 className={`${timesIndex % 2 === 0 ? "work" : "break"}`}>
            {formatTimeUnit(value.m)}:{formatTimeUnit(value.s)}
          </h1>
        </div>
      </div>
    </div>
  );
};

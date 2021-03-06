import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTimer } from "react-compound-timer";

import { ROUNDS, Round } from "../../store/training/types";
import { State } from "../../store";
import { formatTimeUnit } from "../utils/timer/format-time-unit";
import { useAudio } from "../../hooks/use-audio";
import "./training-runner.scss";
import { Button } from "../utils/ui/render-buttons/button.type";
import { renderButtons } from "../utils/ui/render-buttons/render-buttons";
import { useTimeout } from "../../hooks/use-timeout";
import { noSleep } from "../../utils/no-sleep";

import { buildTimesArray } from "./utils/build-times-array";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellRingShort = require("../../assets/audio/bell-ring-short.mp3");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellRingLong = require("../../assets/audio/bell-ring-long.mp3");

export const TrainingRunner = () => {
  const trainingRounds = useSelector<State, Round[]>(
    state => state.training.currentTraining[ROUNDS]
  );
  const [timesIndex, setTimesIndex] = useState(0);
  const times = useMemo(() => buildTimesArray(trainingRounds), [
    trainingRounds
  ]);
  const {
    controls: { pause, resume, setTime },
    value
  } = useTimer({
    direction: "backward",
    initialTime: times[timesIndex]
  });
  const { toggle: shortRingToggle } = useAudio(bellRingShort);
  const { toggle: longRingToggle } = useAudio(bellRingLong);
  useTimeout(value, () => setTimesIndex(timesIndex => timesIndex + 1));
  useEffect(() => {
    if (timesIndex < times.length) {
      setTime(times[timesIndex]);
      shortRingToggle();
    } else {
      longRingToggle();
      noSleep.disable();
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
    <div className="container content-center">
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

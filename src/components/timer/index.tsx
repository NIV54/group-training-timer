import React, { useEffect } from "react";
import { useTimer } from "react-compound-timer";

import { formatTimeUnit as defaultFormatTimeUnit } from "./utils/format-time-unit";

interface TimerProps {
  kind: "WORK" | "BREAK";
  time: number;
  onTimeout: () => any;
  formatTimeUnit?: (value) => string;
}

export const Timer = ({
  kind,
  time,
  onTimeout,
  formatTimeUnit = defaultFormatTimeUnit,
}: TimerProps) => {
  const {
    controls: { pause, resume },
    value,
  } = useTimer({
    direction: "backward",
    initialTime: time,
  });
  const { m, s } = value;
  useEffect(() => {
    if (m === 0 && s === 0) {
      onTimeout();
    }
  }, [m, onTimeout, s]);

  return (
    <>
      <button onClick={resume}>Resume</button>
      <button onClick={pause}>pause</button>
      <h1>
        {formatTimeUnit(m)}:{formatTimeUnit(s)}
      </h1>
    </>
  );
};

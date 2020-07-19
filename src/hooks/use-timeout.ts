import { TimerValue } from "react-compound-timer/build";
import { useEffect } from "react";

export const useTimeout = ({ m, s }: TimerValue, callback: () => any) => {
  useEffect(() => {
    if (m === 0 && s === 0) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m, s]);
};

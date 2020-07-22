import { Round } from "../../../../store/training/types";
import { TrainingFormOutput } from "../types";
import { defaultTimeValue } from "../constants";

export const buildTraining = (trainingOutput: TrainingFormOutput): Round[] =>
  trainingOutput
    .map(
      ({
        workTime = defaultTimeValue(),
        breakTime = defaultTimeValue(),
        rounds = "1"
      }) => [...Array(parseInt(rounds))].map(() => [workTime, breakTime])
    )
    .flat()
    .map(([workTime, breakTime]) => ({
      workTime: workTime.valueOf(),
      breakTime: breakTime.valueOf()
    }));

import { Round } from "../../../../store/training/types";
import { TrainingFormOutput } from "../types";
import { defaultTimeValue, defaultRoundsValue } from "../constants";

export const buildTrainingRounds = (
  trainingOutput: TrainingFormOutput
): Round[] =>
  trainingOutput
    .map(
      ({
        workTime = defaultTimeValue(),
        breakTime = defaultTimeValue(),
        rounds = defaultRoundsValue
      }) => [...Array(parseInt(rounds))].map(() => [workTime, breakTime])
    )
    .flat()
    .map(([workTime, breakTime]) => ({
      workTime: workTime.valueOf(),
      breakTime: breakTime.valueOf()
    }));

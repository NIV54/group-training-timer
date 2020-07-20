import { Training } from "../../../../store/training/types";
import { TrainingFormOutput } from "../types";
import { defaultTimeValue } from "../constants";

export const buildTraining = (trainingOutput: TrainingFormOutput): Training =>
  trainingOutput.map(
    ({ workTime = defaultTimeValue(), breakTime = defaultTimeValue() }) => ({
      workTime: workTime.valueOf(),
      breakTime: breakTime.valueOf()
    })
  );

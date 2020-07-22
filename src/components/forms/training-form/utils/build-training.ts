import { TrainingFormInput } from "../types";
import { Training } from "../../../../store/training/types";
import {
  countdownInputName,
  defaultTimeValue,
  fieldArrayName
} from "../constants";
import { buildTrainingRounds } from "./build-training-rounds";

export const buildTraining = (values: TrainingFormInput): Training => ({
  countdown: (values[countdownInputName] || defaultTimeValue()).valueOf(),
  rounds: buildTrainingRounds(values[fieldArrayName])
});

import { TrainingFormInput } from "../types";
import { Training } from "../../../../store/training/types";
import {
  countdownInputName,
  defaultTimeValue,
  fieldArrayName
} from "../constants";
import { buildTrainingRounds } from "./build-training-rounds";

export const buildTraining = (
  trainingFormInput: TrainingFormInput
): Training => ({
  countdown: (
    trainingFormInput[countdownInputName] || defaultTimeValue()
  ).valueOf(),
  rounds: buildTrainingRounds(trainingFormInput[fieldArrayName])
});

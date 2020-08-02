import { TrainingFormInput } from "../types";
import { Training } from "../../../../store/training/types";
import { countdownInputName, fieldArrayName } from "../constants";
import { valueOfOrDefault } from "../../../utils/timer/value-of-or-default";

import { buildTrainingRounds } from "./build-training-rounds";

export const buildTraining = (
  trainingFormInput: TrainingFormInput
): Training => ({
  countdown: valueOfOrDefault(trainingFormInput[countdownInputName]),
  rounds: buildTrainingRounds(trainingFormInput[fieldArrayName])
});

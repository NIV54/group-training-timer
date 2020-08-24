import { v4 } from "uuid";

import { TrainingFormInput, SavedTraining } from "../types";
import { valueOfOrDefault } from "../../../utils/timer/value-of-or-default";

export const buildTrainingInputForStorage = (
  trainingName: string,
  trainingInput: TrainingFormInput
): SavedTraining => ({
  id: v4(),
  name: trainingName,
  countdown: valueOfOrDefault(trainingInput.countdown),
  training: trainingInput.trainingForm.map(
    ({ workTime, breakTime, ...rest }) => ({
      ...rest,
      workTime: valueOfOrDefault(workTime),
      breakTime: valueOfOrDefault(breakTime)
    })
  )
});

import { TrainingFormInput, TrainingFormForStorage } from "../types";
import { valueOfOrDefault } from "../../../utils/timer/value-of-or-default";

export const buildTrainingInputForStorage = (
  trainingInput: TrainingFormInput
): TrainingFormForStorage => ({
  countdown: valueOfOrDefault(trainingInput.countdown),
  training: trainingInput.trainingForm.map(
    ({ workTime, breakTime, ...rest }) => ({
      ...rest,
      workTime: valueOfOrDefault(workTime),
      breakTime: valueOfOrDefault(breakTime)
    })
  )
});

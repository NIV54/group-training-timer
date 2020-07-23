import { TrainingFormInput, TrainingFormForStorage } from "../types";
import { valueOfOrDefault } from "../../../utils/timer/value-of-or-default";

export const buildTrainingInputForStorage = (
  trainingName: string,
  trainingInput: TrainingFormInput
): TrainingFormForStorage => ({
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

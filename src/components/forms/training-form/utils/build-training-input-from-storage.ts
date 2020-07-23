import moment from "moment";

import { SavedTraining, TrainingFormInput } from "../types";

export const buildTrainingInputFromStorage = (
  savedTraining: SavedTraining
): TrainingFormInput => ({
  countdown: moment(savedTraining.countdown),
  trainingForm: savedTraining.training.map(
    ({ workTime, breakTime, ...rest }) => ({
      ...rest,
      workTime: moment(workTime),
      breakTime: moment(breakTime)
    })
  )
});

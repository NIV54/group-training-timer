import { TrainingFormInput } from "../../../store/training/types";
import { convertTime } from "../../forms/training-form/utils/convert-time";

export const buildTimesArray = ({
  workTime,
  breakTime,
  rounds,
}: TrainingFormInput) =>
  [...Array(+rounds)]
    .map(() => [convertTime(workTime), convertTime(breakTime)])
    .flat()
    .slice(0, -1);

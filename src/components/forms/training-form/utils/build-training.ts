import { Training } from "../../../../store/training/types";
import { convertTime } from "./convert-time";
import { TrainingFormInput } from "../types";

export const buildTraining = ({
  TrainingForm: trainingInput
}: TrainingFormInput): Training =>
  trainingInput.map(({ workTime = "00:00", breakTime = "00:00" }) => ({
    workTime: convertTime(workTime),
    breakTime: convertTime(breakTime)
  }));

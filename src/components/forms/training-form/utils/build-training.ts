import { Training } from "../../../../store/training/types";
import { convertTime } from "./convert-time";
import { TrainingFormOutput } from "../types";

export const buildTraining = (trainingOutput: TrainingFormOutput): Training =>
  trainingOutput.map(({ workTime = "00:00", breakTime = "00:00" }) => ({
    workTime: convertTime(workTime),
    breakTime: convertTime(breakTime)
  }));

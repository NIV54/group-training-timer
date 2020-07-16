import { Training } from "../../../store/training/types";

export const buildTimesArray = (training: Training) =>
  training
    .map(({ workTime, breakTime }) => [workTime, breakTime])
    .flat()
    .slice(0, -1);

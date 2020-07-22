import { Round } from "../../../store/training/types";

export const buildTimesArray = (training: Round[]) =>
  training
    .map(({ workTime, breakTime }) => [workTime, breakTime])
    .flat()
    .slice(0, -1);

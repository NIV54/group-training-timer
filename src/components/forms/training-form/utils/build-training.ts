import {
  TrainingFormInput,
  Round,
  Training
} from "../../../../store/training/types";
import { convertTime } from "./convert-time";

export const buildTraining = (trainingInput: TrainingFormInput): Training => {
  const entries = Object.entries(trainingInput);
  let training: Partial<Round>[] = [
    ...Array(entries.length / 2)
  ].map(() => ({}));
  entries.forEach(([key, value]) => {
    training[key.slice(-1)][key.slice(0, -1)] = convertTime(value);
  });
  return training as Training;
};

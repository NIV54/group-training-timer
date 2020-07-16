import { Round } from "../../../store/training/types";
import { fieldArrayName } from "./constants";

type RoundStrings = {
  [T in keyof Round]: string;
};

export type TrainingFormInput = { [fieldArrayName]: Partial<RoundStrings>[] };

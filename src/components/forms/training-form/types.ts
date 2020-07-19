import { Round } from "../../../store/training/types";
import { fieldArrayName } from "./constants";

type RoundStrings = {
  [T in keyof Round]: string;
};

export type TrainingFormOutput = Partial<RoundStrings>[];

export type TrainingFormInput = {
  [fieldArrayName]: TrainingFormOutput;
  loading: string;
};

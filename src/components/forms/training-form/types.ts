import { Moment } from "moment";

import { Round } from "../../../store/training/types";
import { fieldArrayName } from "./constants";

type RoundStrings = {
  [T in keyof Round]: Moment;
};

export type TrainingFormOutput = Partial<RoundStrings>[];

export type TrainingFormInput = {
  [fieldArrayName]: TrainingFormOutput;
  initialTime?: Moment;
};

export interface ValidationError {
  errorMessage: string;
}

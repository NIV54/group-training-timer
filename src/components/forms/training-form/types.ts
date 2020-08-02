import { Moment } from "moment";

import { Round } from "../../../store/training/types";

import {
  fieldArrayName,
  roundsInputName,
  countdownInputName
} from "./constants";

export interface SavedTraining {
  name: string;
  [countdownInputName]: number;
  training: Partial<
    { [T in keyof Round]: number } & { [roundsInputName]: string }
  >[];
}

export type TrainingFormOutput = Partial<
  { [T in keyof Round]: Moment } & { [roundsInputName]: string }
>[];

export type TrainingFormInput = {
  [fieldArrayName]: TrainingFormOutput;
  [countdownInputName]?: Moment;
};

export interface ValidationError {
  errorMessage: string;
}

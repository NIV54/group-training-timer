import { Moment } from "moment";

import { Round } from "../../../store/training/types";
import {
  fieldArrayName,
  roundsInputName,
  initialTimeInputName
} from "./constants";

type RoundStrings = {
  [T in keyof Round]: Moment;
};

export type TrainingFormOutput = Partial<
  RoundStrings & { [roundsInputName]: string }
>[];

export type TrainingFormInput = {
  [fieldArrayName]: TrainingFormOutput;
  [initialTimeInputName]?: Moment;
};

export interface ValidationError {
  errorMessage: string;
}

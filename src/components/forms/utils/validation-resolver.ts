import { Resolver } from "react-hook-form";
import { TrainingFormInput } from "../training-form/types";

export const validationResolver: (
  errorMessage: string
) => Resolver<TrainingFormInput> = errorMessage => async values => {
  const noError = values.TrainingForm.every(value =>
    Object.values(value).every(innerValue => innerValue !== "00:00")
  );
  return {
    values: noError ? values : {},
    errors: noError
      ? {}
      : {
          TrainingForm: [{ workTime: { type: "error", message: errorMessage } }]
        }
  };
};

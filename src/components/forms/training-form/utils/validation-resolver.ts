import { Resolver } from "react-hook-form";
import { TrainingFormInput } from "../types";

export const validationResolver: (
  errorMessage: string
) => Resolver<TrainingFormInput> = errorMessage => async ({
  TrainingForm: values
}) => {
  const noError = values.every(value =>
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

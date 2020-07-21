import { Resolver } from "react-hook-form";
import { TrainingFormInput } from "../training-form/types";
import { fieldArrayName } from "../training-form/constants";

/**
 * the type returned in the form in `Moment`.
 * there is no way to match this type with react-hook-form's `DeepMap`
 * so "any" is required
 */
//
export const validationResolver: (
  errorMessage: string
) => Resolver<TrainingFormInput> = errorMessage => async values => {
  const noError = values[fieldArrayName].every(value =>
    Object.values(value).every(
      innerValue => innerValue && innerValue.valueOf() !== 0
    )
  );
  return {
    values: noError ? values : {},
    errors: noError
      ? {}
      : ({
          errorMessage
        } as any)
  };
};

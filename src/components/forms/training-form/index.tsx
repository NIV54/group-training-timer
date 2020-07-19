import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import TimeField from "react-simple-timefield";

import { setTraining } from "../../../store/training/slice";
import { useHistory } from "react-router-dom";
import { TRAINING } from "../../app/routes";
import {
  breakTimeFormName,
  workTimeFormName,
  fieldArrayName,
  errorMessage
} from "./constants";
import { buildTraining } from "../utils/build-training";
import { renderButtons } from "../../utils/ui/render-buttons/render-buttons";
import { Button } from "../../utils/ui/render-buttons/button.type";
import { TrainingFormInput } from "./types";
import { validationResolver } from "../utils/validation-resolver";

export const TrainingForm = () => {
  const { register, handleSubmit, control, errors } = useForm<
    TrainingFormInput
  >({
    reValidateMode: "onSubmit",
    resolver: validationResolver(errorMessage)
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const appendInput = () => append({ name: `x${fields.length}` });
  const removeInput = () => remove(fields.length - 1);

  useEffect(appendInput, [append]);

  const buttons: Button[] = [
    ["append", appendInput],
    ["remove", removeInput]
  ];

  const onSubmit = (values: TrainingFormInput) => {
    dispatch(setTraining(buildTraining(values.TrainingForm)));
    history.replace(TRAINING);
  };

  return (
    <div className="container">
      <div className="row h-100 col-10 justify-content-center align-items-center offset-1">
        <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div className="form-row" key={field.id}>
              <div className="form-group col-6">
                <label htmlFor={`${workTimeFormName}`}>Work Time</label>
                <TimeField
                  input={
                    <input
                      name={`${fieldArrayName}[${index}].${workTimeFormName}`}
                      type="text"
                      className="form-control"
                      placeholder="work time"
                      ref={register({ required: true })}
                    />
                  }
                />
              </div>
              {index < fields.length - 1 && (
                <div className="form-group col-6">
                  <label htmlFor={`${breakTimeFormName}`}>Break Time</label>
                  <TimeField
                    input={
                      <input
                        name={`${fieldArrayName}[${index}].${breakTimeFormName}`}
                        type="text"
                        className="form-control"
                        placeholder="break time"
                        ref={register({ required: true })}
                      />
                    }
                  />
                </div>
              )}
            </div>
          ))}
          <div className="row justify-content-center">
            {renderButtons(buttons)}
          </div>
          <div className="row justify-content-center">
            {errors.TrainingForm &&
              errors.TrainingForm[0]?.workTime &&
              errors.TrainingForm[0]?.workTime.message}
          </div>
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

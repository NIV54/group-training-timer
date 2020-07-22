import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TimePicker } from "antd";

import { setCurrentTraining } from "../../../store/training/slice";
import { useHistory } from "react-router-dom";
import { COUNTDOWN } from "../../app/routes";
import {
  breakTimeInputName,
  workTimeInputName,
  fieldArrayName,
  errorMessage,
  countdownInputName,
  defaultTimeValue,
  roundsInputName
} from "./constants";
import { buildTraining } from "./utils/build-training";
import { renderButtons } from "../../utils/ui/render-buttons/render-buttons";
import { Button } from "../../utils/ui/render-buttons/button.type";
import { TrainingFormInput, ValidationError } from "./types";
import { validationResolver } from "../utils/validation-resolver";

import "antd/dist/antd.css";
import "./training-form.scss";

interface TrainingFormProps {
  timeFormat: string;
}

export const TrainingForm = ({ timeFormat }: TrainingFormProps) => {
  const { handleSubmit, control, errors, register } = useForm<
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

  const appendInput = () => append({});
  const removeInput = () => remove(fields.length - 1);

  useEffect(appendInput, [append]);

  const buttons: Button[] = [
    ["append", appendInput],
    ["remove", removeInput]
  ];

  const onSubmit = (values: TrainingFormInput) => {
    dispatch(setCurrentTraining(buildTraining(values)));
    history.replace(COUNTDOWN);
  };

  return (
    <div className="container content-center">
      <div className="row h-100 w-100 col-12 content-center p-0">
        {/* I don't understand why but handleSubmit won't accept submit although is has the right type (100% right)*/}
        <form className="col-12" onSubmit={handleSubmit(onSubmit as any)}>
          {fields.map((field, index) => (
            <div className="form-row" key={field.id}>
              <div className="form-group col-4">
                <label htmlFor={workTimeInputName}>Work Time</label>
                <Controller
                  as={
                    <TimePicker
                      defaultValue={defaultTimeValue()}
                      format={timeFormat}
                      inputReadOnly={true}
                    />
                  }
                  control={control}
                  name={`${fieldArrayName}[${index}].${workTimeInputName}`}
                  className="form-control"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor={breakTimeInputName}>Break Time</label>
                <Controller
                  as={
                    <TimePicker
                      defaultValue={defaultTimeValue()}
                      format={timeFormat}
                      inputReadOnly={true}
                    />
                  }
                  control={control}
                  name={`${fieldArrayName}[${index}].${breakTimeInputName}`}
                  className="form-control"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor={roundsInputName}>Rounds</label>
                <input
                  name={`${fieldArrayName}[${index}].${roundsInputName}`}
                  className="form-control"
                  type="number"
                  ref={register()}
                  defaultValue={1}
                />
              </div>
            </div>
          ))}
          <hr />
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor={countdownInputName}>Countdown</label>
              <Controller
                as={
                  <TimePicker
                    defaultValue={defaultTimeValue()}
                    format={timeFormat}
                    inputReadOnly={true}
                  />
                }
                control={control}
                name={`${countdownInputName}`}
                className="form-control"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            {renderButtons({ buttons })}
          </div>
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger my-2" role="alert">
              {(errors as ValidationError).errorMessage}
            </div>
          )}
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

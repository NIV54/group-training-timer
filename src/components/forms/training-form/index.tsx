import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import TimeField from "react-simple-timefield";

import { setTraining, setInitialTime } from "../../../store/training/slice";
import { useHistory } from "react-router-dom";
import { INITIAL_TIME } from "../../app/routes";
import {
  breakTimeInputName,
  workTimeInputName,
  fieldArrayName,
  errorMessage,
  initialTimeInputName
} from "./constants";
import { buildTraining } from "./utils/build-training";
import { renderButtons } from "../../utils/ui/render-buttons/render-buttons";
import { Button } from "../../utils/ui/render-buttons/button.type";
import { TrainingFormInput } from "./types";
import { validationResolver } from "../utils/validation-resolver";
import { convertTime } from "../utils/convert-time";

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

  const appendInput = () =>
    append({ name: `${fieldArrayName}${fields.length}` });
  const removeInput = () => remove(fields.length - 1);

  useEffect(appendInput, [append]);

  const buttons: Button[] = [
    ["append", appendInput],
    ["remove", removeInput]
  ];

  const onSubmit = (values: TrainingFormInput) => {
    dispatch(setTraining(buildTraining(values.TrainingForm)));
    dispatch(setInitialTime(convertTime(values.initialTime)));
    history.replace(INITIAL_TIME);
  };

  return (
    <div className="container">
      <div className="row h-100 col-10 justify-content-center align-items-center offset-1">
        <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div className="form-row" key={field.id}>
              <div className="form-group col-6">
                <label htmlFor={`${workTimeInputName}`}>Work Time</label>
                <TimeField
                  input={
                    <input
                      name={`${fieldArrayName}[${index}].${workTimeInputName}`}
                      type="text"
                      className="form-control"
                      ref={register()}
                    />
                  }
                />
              </div>
              <div className="form-group col-6">
                <>
                  <label htmlFor={`${breakTimeInputName}`}>Break Time</label>
                  <TimeField
                    input={
                      <input
                        name={`${fieldArrayName}[${index}].${breakTimeInputName}`}
                        type="text"
                        className="form-control"
                        ref={register()}
                      />
                    }
                  />
                </>
              </div>
            </div>
          ))}
          <hr />
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor={`${initialTimeInputName}`}>Loading</label>
              <TimeField
                input={
                  <input
                    name={`${initialTimeInputName}`}
                    type="text"
                    className="form-control"
                    ref={register()}
                  />
                }
              />
            </div>
          </div>
          <div className="row justify-content-center">
            {renderButtons(buttons)}
          </div>
          {errors.TrainingForm && (
            <div className="alert alert-danger mt-2" role="alert">
              {errors.TrainingForm[0]?.workTime?.message}
            </div>
          )}
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

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import TimeField from "react-simple-timefield";

import { TrainingFormInput } from "../../../store/training/types";
import { setTraining } from "../../../store/training/slice";
import { useHistory } from "react-router-dom";
import { TRAINING } from "../../app/routes";
import { breakTimeFormName, workTimeFormName } from "./constants";
import { buildTraining } from "./utils/build-training";

export const TrainingForm = () => {
  const { register, handleSubmit, control } = useForm<TrainingFormInput>();
  const { fields, append } = useFieldArray({
    control,
    name: "training-form"
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const appendInput = () => append({ name: "training-form" });

  useEffect(appendInput, [append]);

  const onSubmit = (values: TrainingFormInput) => {
    dispatch(setTraining(buildTraining(values)));
    history.replace(TRAINING);
  };

  return (
    <div className="container">
      <div className="row h-100 w-50 justify-content-center align-items-center offset-3">
        <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div className="form-row" key={field.id}>
              <div className="form-group col-6">
                <label htmlFor={`${workTimeFormName}`}>Work Time</label>
                <TimeField
                  input={
                    <input
                      name={`${workTimeFormName}${index}`}
                      type="number"
                      className="form-control"
                      placeholder="work time"
                      ref={register()}
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
                        name={`${breakTimeFormName}${index}`}
                        type="number"
                        className="form-control"
                        placeholder="break time"
                        ref={register()}
                      />
                    }
                  />
                </div>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-info" onClick={appendInput}>
            append
          </button>
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

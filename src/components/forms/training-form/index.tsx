import React from "react";
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

  const onSubmit = (values: TrainingFormInput) => {
    dispatch(setTraining(buildTraining(values)));
    history.replace(TRAINING);
  };

  return (
    <div className="container">
      <div className="row h-100 justify-content-center align-items-center">
        <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => append({ name: "training-form" })}
          >
            append
          </button>
          {fields.map((field, index) => (
            <div className="form-row" key={field.id}>
              <div className="form-group col-6">
                <label htmlFor={`${workTimeFormName}`}>Work Time</label>
                <TimeField
                  input={
                    <input
                      name={`${workTimeFormName}${index}`}
                      type="text"
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
                        type="text"
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
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary col-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

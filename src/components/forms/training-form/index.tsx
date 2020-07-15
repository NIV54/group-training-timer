import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TimeField from "react-simple-timefield";

import { TrainingFormInput } from "../../../store/training/types";
import { setTraining } from "../../../store/training/slice";
import { useHistory } from "react-router-dom";
import { TRAINING } from "../../app/routes";

export const TrainingForm = () => {
  const { register, handleSubmit } = useForm<TrainingFormInput>();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values: TrainingFormInput) => {
    dispatch(setTraining(values));
    history.replace(TRAINING);
  };

  return (
    <div className="container">
      <div className="row h-100 justify-content-center align-items-center">
        <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="workTime">Work Time</label>
              <TimeField
                input={
                  <input
                    name="workTime"
                    type="text"
                    className="form-control"
                    placeholder="work time"
                    ref={register}
                  />
                }
              />
            </div>

            <div className="form-group col-6">
              <label htmlFor="breakTime">Break Time</label>
              <TimeField
                input={
                  <input
                    name="breakTime"
                    type="text"
                    className="form-control"
                    placeholder="break time"
                    ref={register}
                  />
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group w-25">
              <label htmlFor="rounds">Rounds</label>
              <input
                name="rounds"
                type="number"
                className="form-control"
                placeholder="rounds"
                ref={register}
              />
            </div>
          </div>
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

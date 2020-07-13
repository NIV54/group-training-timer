import React from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="workTime">Work Time</label>
        <input
          name="workTime"
          type="time"
          placeholder="work time"
          ref={register}
        />
        <label htmlFor="breakTime">Break Time</label>
        <input
          name="breakTime"
          type="time"
          placeholder="break time"
          ref={register}
        />
        <label htmlFor="rounds">Rounds</label>
        <input
          name="rounds"
          type="number"
          placeholder="rounds"
          ref={register}
        />
        <input type="submit" />
      </form>
    </>
  );
};

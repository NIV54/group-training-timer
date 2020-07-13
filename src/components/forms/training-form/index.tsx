import React from "react";

import { useForm } from "react-hook-form";
import { TrainingFormInput } from "./round-form-input.type";
import { convertTime } from "./utils/convert-time";

export const TrainingForm = () => {
  const { register, handleSubmit } = useForm<TrainingFormInput>();

  const onSubmit = (values: TrainingFormInput) => {
    console.log(
      Object.entries(values).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: convertTime(value),
        }),
        {}
      )
    );
  };
  return (
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
      <input name="rounds" type="number" placeholder="rounds" ref={register} />
      <input type="submit" />
    </form>
  );
};

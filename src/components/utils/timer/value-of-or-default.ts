import { Moment } from "moment";

import { defaultTimeValue } from "../../forms/training-form/constants";

export const valueOfOrDefault = (time: Moment | undefined): number =>
  (time || defaultTimeValue()).valueOf();

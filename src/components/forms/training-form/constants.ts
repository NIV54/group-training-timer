import moment from "moment";

/**
 * These constants corelate to types in ./types.ts file
 * Changing them will change the types
 */
export const workTimeInputName = "workTime";
export const breakTimeInputName = "breakTime";
export const initialTimeInputName = "initialTime";
export const fieldArrayName = "TrainingForm";

export const errorMessage = "Work and break time must be bigger than 00:00";

export const defaultTimeValue = () => moment("1970-01-01Z00:00:00:000");

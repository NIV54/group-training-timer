import moment from "moment";
import { WORK_TIME, BREAK_TIME } from "../../../store/training/types";

/**
 * These constants corelate to types in ./types.ts file
 * Changing them will change the types
 */
export const workTimeInputName = WORK_TIME;
export const breakTimeInputName = BREAK_TIME;
export const initialTimeInputName = "initialTime";
export const roundsInputName = "rounds";
export const fieldArrayName = "trainingForm";

export const errorMessage = "All values must be bigger than 0";

export const defaultTimeValue = () => moment("1970-01-01Z00:00:00:000");

export const WORK_TIME = "workTime";
export const BREAK_TIME = "breakTime";
export interface Round {
  [WORK_TIME]: number;
  [BREAK_TIME]: number;
}

export type Training = Round[];

export const WORK_TIME = "workTime";
export const BREAK_TIME = "breakTime";
export const COUNTDOWN = "countdown";
export const ROUNDS = "rounds";

export interface Round {
  [WORK_TIME]: number;
  [BREAK_TIME]: number;
}

export interface Training {
  [COUNTDOWN]: number;
  [ROUNDS]: Round[];
}

export interface NamedTraining {
  name: string;
  training: Training;
}

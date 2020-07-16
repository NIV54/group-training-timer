export interface Round {
  workTime: number;
  breakTime: number;
}

export type Training = Round[];

export type TrainingFormInput = Record<string, string>;

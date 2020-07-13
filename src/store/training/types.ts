export interface Round {
  workTime: number;
  breakTime: number;
}

export type RoundStrings = {
  [T in keyof Round]: string;
};

export type TrainingFormInput = RoundStrings & {
  rounds: string;
};

import { TrainingFormInput } from "../../forms/training-form/types";
import { setCurrentTraining } from "../../../store/training/slice";
import { buildTraining } from "../../forms/training-form/utils/build-training";
import { COUNTDOWN_ROUTE } from "../../app/routes";
import { Dispatch } from "react";
import { History } from "history";

export const startTraining = (
  trainingInput: TrainingFormInput,
  dispatch: Dispatch<any>,
  history: History<History.PoorMansUnknown>
) => {
  dispatch(setCurrentTraining(buildTraining(trainingInput)));
  history.replace(COUNTDOWN_ROUTE);
};

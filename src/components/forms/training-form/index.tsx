import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { TimePicker } from "antd";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";

import {
  addSavedTraining,
  setTrainingInput
} from "../../../store/training/slice";
import { renderButtons } from "../../utils/ui/render-buttons/render-buttons";
import { Button } from "../../utils/ui/render-buttons/button.type";
import { validationResolver } from "../utils/validation-resolver";
import { startTraining } from "../../utils/tarining/start-training";
import { Modal } from "../../general/modal";
import { HOME } from "../../app/routes";
import { noSleep } from "../../../utils/no-sleep";
import { State } from "../../../store";

import { buildTrainingInputForStorage } from "./utils/build-training-input-for-storage";
import {
  breakTimeInputName,
  workTimeInputName,
  fieldArrayName,
  mainFormErrorMessage,
  countdownInputName,
  defaultTimeValue,
  roundsInputName,
  trainingNameModalErrorMessage
} from "./constants";
import { TrainingFormInput, ValidationError } from "./types";

import "antd/dist/antd.css";
import "./training-form.scss";

interface TrainingFormProps {
  timeFormat: string;
}

export const TrainingForm = ({ timeFormat }: TrainingFormProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const trainingInput = useSelector<State, Partial<TrainingFormInput>>(
    state => state.training.trainingInput
  );

  const {
    handleSubmit,
    control,
    errors,
    register,
    getValues: getFormValues
  } = useForm<TrainingFormInput>({
    reValidateMode: "onSubmit",
    resolver: validationResolver(mainFormErrorMessage),
    defaultValues: trainingInput
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName
  });

  const appendInput = () => append({});
  const removeInput = () => fields.length > 0 && remove(fields.length - 1);

  useEffect(() => {
    isEmpty(trainingInput) && appendInput();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setTrainingInput({}));
    };
  }, []);

  const [actionType, setActionType] = useState<"start" | "save">("save");

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
  const [trainingName, setTrainingName] = useState("");

  const onStart = (values: TrainingFormInput) => {
    startTraining(values, dispatch, history);
  };

  const onSave = () => {
    // TODO: override saved training if name fits
    // maybe set training name if we got here from my training page
    setShowSaveModal(true);
  };

  const onSubmit = (values: TrainingFormInput) => {
    switch (actionType) {
      case "start":
        onStart(values);
        break;
      case "save":
        onSave();
        break;
      default:
        break;
    }
  };

  const handleModalClose = () => {
    setShowSaveModal(false);
    setIsModalErrorVisible(false);
  };

  const buttons: Button[] = [
    ["add", appendInput],
    ["remove", removeInput]
  ];

  const onAdd = () => {
    if (trainingName !== "") {
      const formValues = getFormValues() as TrainingFormInput;
      dispatch(
        addSavedTraining(buildTrainingInputForStorage(trainingName, formValues))
      );
      setShowSaveModal(false);
      setTimeout(() => history.replace(HOME), 0); // wait for async fade
    } else {
      setIsModalErrorVisible(true);
    }
  };

  const onStartClick = () => {
    noSleep.enable();
    setActionType("start");
  };

  return (
    <div className="container content-center">
      <Modal
        id="save-modal"
        title="Add Training"
        show={showSaveModal}
        handleClose={handleModalClose}
        confirmText="Add"
        onConfirm={onAdd}
      >
        <>
          <input
            className="form-control"
            type="text"
            value={trainingName}
            onChange={e => setTrainingName(e.target.value)}
          />
          {isModalErrorVisible && (
            <div className="alert alert-danger my-2" role="alert">
              {trainingNameModalErrorMessage}
            </div>
          )}
        </>
      </Modal>
      <div className="row h-100 w-100 col-12 content-center p-0">
        {/* I don't understand why but handleSubmit won't accept submit although is has the right type (100% right)*/}
        <form className="col-12" onSubmit={handleSubmit(onSubmit as any)}>
          {fields.map((field, index) => (
            <div className="form-row" key={field.id}>
              <div className="form-group col-4">
                <label htmlFor={workTimeInputName}>Work Time</label>
                <Controller
                  as={<TimePicker format={timeFormat} inputReadOnly={true} />}
                  defaultValue={field[workTimeInputName] || defaultTimeValue()}
                  control={control}
                  name={`${fieldArrayName}[${index}].${workTimeInputName}`}
                  className="form-control"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor={breakTimeInputName}>Break Time</label>
                <Controller
                  as={<TimePicker format={timeFormat} inputReadOnly={true} />}
                  defaultValue={field[breakTimeInputName] || defaultTimeValue()}
                  control={control}
                  name={`${fieldArrayName}[${index}].${breakTimeInputName}`}
                  className="form-control"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor={roundsInputName}>Rounds</label>
                <input
                  name={`${fieldArrayName}[${index}].${roundsInputName}`}
                  className="form-control"
                  type="number"
                  ref={register()}
                  defaultValue={field[roundsInputName] || 1}
                  // TODO: disable autofocus for this input
                />
              </div>
            </div>
          ))}
          <div className="row justify-content-center">
            {renderButtons({ buttons, additionalStyle: "col-4 col-md-2" })}
          </div>
          <hr />
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor={countdownInputName}>Countdown</label>
              <Controller
                as={
                  <TimePicker
                    defaultValue={defaultTimeValue()}
                    format={timeFormat}
                    inputReadOnly={true}
                  />
                }
                control={control}
                name={`${countdownInputName}`}
                className="form-control"
              />
            </div>
          </div>
          <hr />
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger my-2" role="alert">
              {(errors as ValidationError).errorMessage}
            </div>
          )}
          <div className="row justify-content-center">
            <button
              type="submit"
              className="confirmation-button"
              onClick={onStartClick}
            >
              Start
            </button>
            <button
              type="submit"
              className="confirmation-button"
              onClick={() => setActionType("save")}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

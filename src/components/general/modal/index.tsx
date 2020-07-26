import React, { useEffect, PropsWithChildren, useRef } from "react";
import $ from "jquery";

interface ModalProps {
  id: string;
  title: string;
  show: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  abortText?: string;
}

export const Modal = ({
  id,
  title,
  show,
  handleClose,
  onConfirm,
  confirmText = "OK",
  abortText = "Cancel",
  children
}: PropsWithChildren<ModalProps>) => {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const action = show ? "show" : "hide";
    $(`#${id}`).modal(action);
  }, [id, show]);

  const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const { currentTarget, relatedTarget } = event;
    if (relatedTarget && !currentTarget.contains(relatedTarget as Node)) {
      handleClose();
    }
  };
  return (
    <div
      id={id}
      className="modal fade"
      ref={modal}
      tabIndex={-1}
      onBlur={onBlur}
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {children && <div className="modal-body">{children}</div>}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              {abortText}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

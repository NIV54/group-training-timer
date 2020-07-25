import React, { useEffect, PropsWithChildren } from "react";
import $ from "jquery";

interface ModalProps {
  title: string;
  show: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  abortText?: string;
}

export const Modal = ({
  title,
  show,
  handleClose,
  onConfirm,
  confirmText = "OK",
  abortText = "Cancel",
  children
}: PropsWithChildren<ModalProps>) => {
  const modalId = "modal";

  const close = () => $(`#${modalId}`).modal("hide");
  const open = () => $(`#${modalId}`).modal("show");

  useEffect(() => {
    show ? open() : close();
  }, [show]);

  return (
    <div id={modalId} className="modal fade" tabIndex={-1} role="dialog">
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

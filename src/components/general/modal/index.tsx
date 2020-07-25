import React, { useEffect, PropsWithChildren } from "react";
import $ from "jquery";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onConfirm: () => boolean;
  onAbort?: () => any;
  confirmText?: string;
  abortText?: string;
}

export const Modal = ({
  title,
  isOpen,
  onConfirm,
  onAbort = () => {},
  confirmText = "OK",
  abortText = "Cancel",
  children
}: PropsWithChildren<ModalProps>) => {
  const modalId = "modal";

  const close = () => $(`#${modalId}`).modal("hide");

  const onUserClose = () => {
    close();
    onAbort();
  };

  const onUserConfirm = () => {
    const shouldCloseModal = onConfirm();
    shouldCloseModal && close();
  };

  useEffect(() => {
    if (isOpen) {
      $(`#${modalId}`).modal("show");
    }
  }, [isOpen]);

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
              onClick={onUserClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {children && <div className="modal-body">{children}</div>}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onUserClose}
            >
              {abortText}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onUserConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

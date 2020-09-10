import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import BaseModal from "./base-modal";
export interface ModalProps {
  visible: boolean;
  onClose?: () => void;
}

interface ModalInterface extends FC<ModalProps> {
  wrapper?: HTMLDivElement | null;
}

const Modal: ModalInterface = ({ visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      if (!Modal.wrapper) {
        Modal.wrapper = document.createElement("div");
        document.body.appendChild(Modal.wrapper);
        ReactDOM.render(<BaseModal onClose={onClose} visible={visible}/>, Modal.wrapper);
      }
    } else {
      if (Modal.wrapper) {
        typeof onClose === 'function' && onClose()
        ReactDOM.unmountComponentAtNode(Modal.wrapper);
        Modal.wrapper.remove();
        Modal.wrapper = null;
      }
    }
  /* eslint-disable-next-line */
  }, [visible]);

  return null
};

export default Modal;

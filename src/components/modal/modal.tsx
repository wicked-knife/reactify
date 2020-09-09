import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import BaseModal from "./base-modal";
import "./modal.scss";
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
        ReactDOM.render(<BaseModal onClose={onClose}/>, Modal.wrapper);
        document.body.appendChild(Modal.wrapper);
      }
    } else {
      if (Modal.wrapper) {
        typeof onClose === 'function' && onClose()
        ReactDOM.unmountComponentAtNode(Modal.wrapper);
        Modal.wrapper.remove();
        Modal.wrapper = null;
      }
    }
  }, [onClose, visible]);

  return null;
};

export default Modal;

import React, { FC, useEffect } from "react";
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
        const unmountHandler = () => {
          ReactDOM.unmountComponentAtNode(Modal.wrapper!);
          Modal.wrapper!.remove();
          Modal.wrapper = null;
        }
        Modal.wrapper = document.createElement("div");
        document.body.appendChild(Modal.wrapper);
        ReactDOM.render(<BaseModal onClose={onClose} visible={visible} onExited={unmountHandler}/>, Modal.wrapper);
      }
    } else {
      if (Modal.wrapper) {
        typeof onClose === 'function' && onClose()
      }
    }
  /* eslint-disable-next-line */
  }, [visible]);

  return null
};

export default Modal;

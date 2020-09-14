import React, { useEffect, ForwardRefRenderFunction, forwardRef, ReactNode} from "react";
import ReactDOM from "react-dom";
import BaseModal from "./base-modal";
export interface ModalProps {
  visible: boolean;
  onClose?: () => void;
  children?: ReactNode
}

interface ModalInterface extends ForwardRefRenderFunction<any, ModalProps>  {
  wrapper?: HTMLDivElement | null;
}

const unmountComponent = (dom: HTMLElement) => {
  ReactDOM.unmountComponentAtNode(dom);
  dom.remove();
}

const Modal: ModalInterface = ({ visible, onClose, children }, ref) => {
  useEffect(() => {
    if (visible) {
      if (!Modal.wrapper) {
        const unmountHandler = () => {
          unmountComponent(Modal.wrapper!)
          Modal.wrapper = null;
        }
        Modal.wrapper = document.createElement("div");
        document.body.appendChild(Modal.wrapper);
        ReactDOM.render(<BaseModal onClose={onClose} visible={visible} onExited={unmountHandler} ref={ref}>{children}</BaseModal>, Modal.wrapper);
      }
    }
  /* eslint-disable-next-line */
  }, [visible]);

  return null
};

export default forwardRef(Modal);

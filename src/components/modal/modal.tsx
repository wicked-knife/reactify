import React, { useEffect, ForwardRefRenderFunction, forwardRef} from "react";
import ReactDOM from "react-dom";
import BaseModal from "./base-modal";
export interface ModalProps {
  visible: boolean;
  onClose?: () => void;
}

interface ModalInterface extends ForwardRefRenderFunction<any, ModalProps>  {
  wrapper?: HTMLDivElement | null;
}

const unmountComponent = (dom: HTMLElement) => {
  ReactDOM.unmountComponentAtNode(dom);
  dom.remove();
}

const Modal: ModalInterface = ({ visible, onClose }, ref) => {
  useEffect(() => {
    if (visible) {
      if (!Modal.wrapper) {
        const unmountHandler = () => {
          unmountComponent(Modal.wrapper!)
          Modal.wrapper = null;
        }
        Modal.wrapper = document.createElement("div");
        document.body.appendChild(Modal.wrapper);
        ReactDOM.render(<BaseModal onClose={onClose} visible={visible} onExited={unmountHandler} ref={ref}/>, Modal.wrapper);
      }
    }
  /* eslint-disable-next-line */
  }, [visible]);

  return null
};

export default forwardRef(Modal);

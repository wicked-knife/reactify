import React, { useEffect, ForwardRefRenderFunction, forwardRef, ReactNode} from "react";
import ReactDOM from "react-dom";
import BaseModal from "./base-modal";

type ModalShowOption = {
  children: ReactNode
} | string
export interface ModalProps {
  visible: boolean;
  onClose?: () => void;
  children?: ReactNode,
}

interface MainModalInterface extends ForwardRefRenderFunction<any, ModalProps>  {
  wrapper?: HTMLDivElement | null;
}

const unmountComponent = (dom: HTMLElement) => {
  ReactDOM.unmountComponentAtNode(dom);
  dom.remove();
}

const MainModal: MainModalInterface = ({ visible, onClose, children }, ref) => {
  useEffect(() => {
    if (visible) {
      if (!MainModal.wrapper) {
        const unmountHandler = () => {
          unmountComponent(MainModal.wrapper!)
          MainModal.wrapper = null;
        }
        MainModal.wrapper = document.createElement("div");
        document.body.appendChild(MainModal.wrapper);
        ReactDOM.render(<BaseModal onClose={onClose} visible={visible} onExited={unmountHandler} ref={ref}>{children}</BaseModal>, MainModal.wrapper);
      }
    }
  /* eslint-disable-next-line */
  }, [visible]);

  return null
};

interface ModalInterface extends ReturnType<typeof forwardRef> {
  show: (opt: ModalShowOption) => Promise<boolean>
}

const m  = forwardRef(MainModal) as ModalInterface

m.show = (config) => {
  return new Promise((resolve, reject) => {
    let wrapper: HTMLElement | null = document.createElement('div')
    document.body.appendChild(wrapper)
    const unmountHandler = () => {
      unmountComponent(wrapper!)
      wrapper = null
    }
    ReactDOM.render(<BaseModal visible={true} onExited={unmountHandler}/>, wrapper)
  })
}

export default m

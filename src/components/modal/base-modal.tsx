import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  ReactNode,
} from "react";
import { CSSTransition } from "react-transition-group";
import Icon from "../icon";
import "./modal.scss";
export interface BaseModalProps {
  maskClosable?: boolean;
  visible: boolean;
  onClose?: () => void;
  onExited: () => void;
  children?: ReactNode;
}

export interface RefInterface {
  closeModal: () => void
}

const BaseModal: ForwardRefRenderFunction<any, BaseModalProps> = (
  { maskClosable, onClose, onExited, visible, children, ...props },
  ref
) => {
  const [v, setV] = useState(false);

  const handleClose = () => {
    typeof onClose === "function" && onClose();
    setV(false);
  };

  const handleMaskClick = () => {
    if (maskClosable) {
      handleClose();
    }
  };

  useEffect(() => {
    setV(visible);
  }, [visible]);

  useImperativeHandle<any, RefInterface>(ref, () => ({
    closeModal: () => handleClose(),
  }));

  return (
    <div className="rf-modal-root" ref={ref} {...props}>
      <CSSTransition
        in={v}
        classNames="modal-fade"
        timeout={300}
        unmountOnExit
        onExited={onExited}
      >
        <div className="rf-modal-mask" onClick={handleMaskClick}></div>
      </CSSTransition>
      <CSSTransition
        in={v}
        classNames="modal"
        timeout={300}
        unmountOnExit
        onExited={onExited}
      >
        <div className="rf-modal">
          <div>
            <Icon className="icon-close_filled" onClick={handleClose} />
          </div>
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

const MainModal = forwardRef(BaseModal);

MainModal.defaultProps = {
  maskClosable: true,
  visible: false,
};

export default MainModal;

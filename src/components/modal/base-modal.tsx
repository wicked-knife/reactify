import React, { useEffect, useState, forwardRef, ForwardRefRenderFunction, useImperativeHandle } from "react";
import { CSSTransition } from "react-transition-group";
import "./modal.scss";
interface BaseModalProps {
  maskClosable?: boolean;
  visible: boolean;
  onClose?: () => void;
  onExited: () => void
}

const BaseModal: ForwardRefRenderFunction<any, BaseModalProps> = ({
  maskClosable,
  onClose,
  onExited,
  visible,
}, ref) => {
  const [v, setV] = useState(false)
  const handleMaskClick = () => {
    if (maskClosable) {
      typeof onClose === "function" && onClose();
      setV(false)
    }
  };
  
  useEffect(() => {
    setV(visible)
  }, [visible])

  useImperativeHandle(ref, () => ({
    closeModal: () => setV(false)
  }), [])
  
  return (
    <div className="rf-modal-root" >
      <CSSTransition in={v} classNames="modal-fade" timeout={300} unmountOnExit onExited={onExited}>
        <div className="rf-modal-mask" onClick={handleMaskClick}></div>
      </CSSTransition>
      <CSSTransition in={v} classNames="modal" timeout={300} unmountOnExit onExited={onExited}>
        <div className="rf-modal">this is modal</div>
      </CSSTransition>
    </div>
  );
};

const MainModal = forwardRef(BaseModal)

MainModal.defaultProps = {
  maskClosable: true,
  visible: false
};

export default MainModal;

import React from "react";
import { CSSTransition } from "react-transition-group";
import "./modal.scss";
interface BaseModalProps {
  maskClosable?: boolean;
  visible?: boolean;
  onClose?: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({
  maskClosable,
  onClose,
  visible,
}) => {
  const handleMaskClick = () => {
    if (maskClosable) {
      typeof onClose === "function" && onClose();
    }
  };

  return (
    <div className="rf-modal-root">
      <CSSTransition in={visible} classNames="modal" timeout={300} onEnter={() => console.log('enter')} mountOnEnter>
        <div className="rf-modal-mask" onClick={handleMaskClick}></div>
      </CSSTransition>
      <div className="rf-modal">this is modal</div>
    </div>
  );
};

BaseModal.defaultProps = {
  maskClosable: true,
  visible: false
};

export default BaseModal;

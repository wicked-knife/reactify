import React from 'react'

interface BaseModalProps {
  maskClosable?: boolean,
  onClose?: () => void
}

const BaseModal: React.FC<BaseModalProps> = ({
  maskClosable,
  onClose
}) => {

  const handleMaskClick = () => {
    if(maskClosable) {
      typeof onClose === 'function' && onClose()
    }
  }

  return (
    <div className="rf-modal-root">
      <div className="rf-modal-mask" onClick={handleMaskClick}></div>
      <div className="rf-modal">this is modal</div>
    </div>
  );
}

BaseModal.defaultProps = {
  maskClosable: true
}

export default BaseModal

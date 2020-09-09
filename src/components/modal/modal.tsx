import React, {FC} from 'react'

export interface ModalProps {
  visible: boolean
}

const Modal: FC<ModalProps> = ({visible}) => {
  return <div>
    this is modal
  </div>
}

export default Modal

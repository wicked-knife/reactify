import React, {FC} from 'react'

const ModalFooter:FC = ({children, ...props}) => {
  return <div {...props}>
    {children}
  </div>
}

ModalFooter.displayName = 'ModalFooter'

export default ModalFooter

import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  ReactNode,
} from 'react'
import { CSSTransition } from 'react-transition-group'
import Icon from '../icon'
import useClassnames from 'classnames'
import './modal.scss'
import Button from '../button'
export interface BaseModalProps {
  maskClosable?: boolean;
  visible: boolean;
  onClose?: () => void;
  onExited: () => void;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  footer?: string | ReactNode;
}

export interface RefInterface {
  closeModal: () => void;
}

const BaseModal: ForwardRefRenderFunction<RefInterface, BaseModalProps> = (
  {
    maskClosable,
    onClose,
    onExited,
    visible,
    children,
    className,
    style,
    title,
    footer,
    ...props
  },
  ref
) => {
  const [v, setV] = useState(false)

  const handleClose = () => {
    typeof onClose === 'function' && onClose()
    setV(false)
  }

  const handleMaskClick = () => {
    if (maskClosable) {
      handleClose()
    }
  }

  useEffect(() => {
    setV(visible)
  }, [visible])

  useImperativeHandle<RefInterface, RefInterface>(ref, () => ({
    closeModal: () => handleClose(),
  }))
  const computedClassnames = useClassnames('rf-modal', className)

  return (
    <div className="rf-modal-root" {...props}>
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
        <div className={computedClassnames} style={style}>

          <div className={`rf-modal-title ${title ? '' : 'no-title'}`}>
            {title}
            <div className="icon-wrapper" onClick={handleClose}>
              <Icon className="icon-close_filled" />
            </div>
          </div>

          <div className="rf-modal-body">{children}</div>

          {footer && <div className="rf-modal-footer">{footer}</div>}
          
        </div>
      </CSSTransition>
    </div>
  )
}

const MainModal = forwardRef(BaseModal)

MainModal.defaultProps = {
  maskClosable: false,
  visible: false,
}

export default MainModal

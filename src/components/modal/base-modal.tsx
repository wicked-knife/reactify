import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  ReactNode,
  FunctionComponentElement, RefObject
} from 'react'
import { CSSTransition } from 'react-transition-group'
import Icon from '../icon'
import useClassnames from 'classnames'
import './modal.scss'
export interface BaseModalProps {
  maskClosable?: boolean;
  visible: boolean;
  onClose?: () => void;
  onExited: () => void;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  width?: string | number;
  zIndex?: number;
  closable?: boolean;
}

export interface RefInterface {
  closeModal: () => void;
}

export interface ModalRefObject extends Omit<RefObject<RefInterface>, 'current'> {
  readonly current: RefInterface
}

const wrapModalContent = (children: ReactNode) => {
  return (
    <div className='rf-modal-body'>
      {React.Children.map(children, (child) => {
        const childElement = child as FunctionComponentElement<HTMLElement>
        if(typeof childElement === 'string') {
          return child
        }
        if(childElement && childElement.type && childElement.type.displayName !== 'ModalFooter') {
          return child
        }
        return null
      })}
    </div>
  )
}

const wrapModalFooter = (children: ReactNode) => {
  let footerVisible = false
  const childElements = React.Children.map(children, (child) => {
    const childElement = child as FunctionComponentElement<HTMLElement>
    if (childElement && childElement.type && childElement.type.displayName === 'ModalFooter') {
      footerVisible = true
      return child
    }
    return null
  })
  return footerVisible ? (
    <div className="rf-modal-footer">{childElements}</div>
  ) : null
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
    width,
    zIndex,
    closable,
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
        <div className={computedClassnames} style={{ ...style, width, minWidth: width, zIndex }}>
          {(title || closable) && (
            <div className={`rf-modal-title ${title ? '' : 'no-title'}`}>
              {title}
              {closable && (
                <div className="icon-wrapper" onClick={handleClose}>
                  <Icon className="icon-close_filled" />
                </div>
              )}
            </div>
          )}

          {wrapModalContent(children)}

          {wrapModalFooter(children)}
        </div>
      </CSSTransition>
    </div>
  )
}

const MainModal = forwardRef(BaseModal)

MainModal.defaultProps = {
  maskClosable: true,
  visible: false,
  closable: true,
}

export default MainModal

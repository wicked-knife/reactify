import React, {
  useEffect,
  ForwardRefRenderFunction,
  forwardRef,
  ReactNode,
  ForwardRefExoticComponent, 
  useCallback, RefAttributes,
} from 'react'
import ReactDOM from 'react-dom'
import BaseModal, {RefInterface, BaseModalProps} from './base-modal'
import Footer from './footer'
export interface ModalProps extends Omit<BaseModalProps, 'onExited'>{
  onExited?: () => void
}

export interface MainModalInterface extends ForwardRefRenderFunction<RefInterface, ModalProps> {
  container?: HTMLElement | null
}

const unmountComponent = (dom: HTMLElement) => {
  ReactDOM.unmountComponentAtNode(dom)
  dom.remove()
}

const MainModal: MainModalInterface = ({ visible, children, onExited, ...props }, ref) => {
  const unmountHandler = useCallback(() => {
    unmountComponent(MainModal.container!)
    MainModal.container = null
    typeof onExited === 'function' && onExited()
    /* eslint-disable-next-line */
  }, [])

  const renderComponent = () => {
    ReactDOM.render(<BaseModal
      visible={visible}
      onExited={unmountHandler}
      ref={ref}
      {...props}>{children}</BaseModal>, MainModal.container!)
  }

  useEffect(() => {
    if (visible) {
      MainModal.container = document.createElement('div')
      document.body.appendChild(MainModal.container)
      renderComponent()
    }
    /* eslint-disable-next-line */
  }, [visible])

  useEffect(() => {
    if(MainModal.container) {
      renderComponent()
    }
  })

  return null
}

export type ModalShowOption = {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
  onClose?: () => void
  maskClosable: boolean
} | string;

export interface ModalInterface extends ForwardRefExoticComponent<ModalProps & RefAttributes<RefInterface>> {
  show: (opt: ModalShowOption) => Promise<boolean>
  Footer: typeof Footer
}

const Modal = forwardRef<RefInterface, ModalProps>(MainModal) as ModalInterface

Modal.show = (config) => {
  return new Promise((resolve, reject) => {
    let wrapper: HTMLElement | null = document.createElement('div')
    document.body.appendChild(wrapper)
    const unmountHandler = () => {
      unmountComponent(wrapper!)
      wrapper = null
    }
    ReactDOM.render(
      <BaseModal visible={true} onExited={unmountHandler} />,
      wrapper
    )
  })
}
Modal.Footer = Footer

export default Modal

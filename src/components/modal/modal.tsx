import React, {
  useEffect,
  ForwardRefRenderFunction,
  forwardRef,
  ReactNode,
  ForwardRefExoticComponent, 
  useCallback, RefAttributes
} from 'react'
import ReactDOM from 'react-dom'
import Button from '../button'
import BaseModal, {RefInterface, BaseModalProps, ModalRefObject} from './base-modal'
import Footer from './footer'
export interface ModalProps extends Omit<BaseModalProps, 'onExited'>{
  onExited?: () => void
}

export interface MainModalInterface extends ForwardRefRenderFunction<RefInterface, ModalProps> {
  container?: HTMLElement | null
}
const noop = () => {}

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

interface ModalFunctionCallOptions {
  content?: ReactNode
  className?: string
  onClose?: () => void
  onExited?: () => void
  maskClosable?: boolean
  title?: string
  width?: number | string
  zIndex?: number
  closable?: boolean
  footer?: ReactNode
}

interface ModalConfirmCallOptions extends ModalFunctionCallOptions {
  onConfirm?: (ref: ModalRefObject) => void
  onCancel?: (ref: ModalRefObject) => void
}

const modalFunctionCallDefaults: ModalFunctionCallOptions = {
  maskClosable: true,
  onClose: noop,
  onExited: noop,
  closable: true
}

export interface ModalInterface extends ForwardRefExoticComponent<ModalProps & RefAttributes<RefInterface>> {
  show: (opt: ModalFunctionCallOptions | string) => Promise<ModalRefObject>
  info: (opt: ModalFunctionCallOptions | string) => Promise<ModalRefObject>
  confirm: (opt: ModalConfirmCallOptions | string) => Promise<ModalRefObject>
  Footer: typeof Footer
}

const Modal = forwardRef<RefInterface, ModalProps>(MainModal) as ModalInterface

const mergeConfig = (config: ModalFunctionCallOptions | string, defaults: ModalFunctionCallOptions | ModalConfirmCallOptions) : ModalFunctionCallOptions => {
  if(typeof config === 'string') {
    return {...defaults, content: config}
  }
  return {...defaults, ...config}
}

Modal.show = Modal.info = (config) => {
  const mergedConfig = mergeConfig(config, modalFunctionCallDefaults)
  const ref = React.createRef<RefInterface>()
  return new Promise((resolve) => {
    let wrapper: HTMLElement | null = document.createElement('div')
    document.body.appendChild(wrapper)
    const unmountHandler = () => {
      unmountComponent(wrapper!)
      wrapper = null
      mergedConfig.onExited!()
    }
    const {footer, content, ...omittedConfig} = mergedConfig
    ReactDOM.render(
    <BaseModal visible={true} {...omittedConfig} onExited={unmountHandler} ref={ref}>
      {content}
      {footer && <Footer>{footer}</Footer>}
      </BaseModal>,
      wrapper,
      () => resolve(ref as ModalRefObject)
    )
  })
}

Modal.confirm = (config) => {
  const mergedConfig = mergeConfig(config, {
    ...modalFunctionCallDefaults, 
    onConfirm: (r) => {r.current!.closeModal()}, 
    onCancel: (r) => {r.current!.closeModal()}
  }) as ModalConfirmCallOptions
  const ref = React.createRef<RefInterface>()
  return new Promise((resolve) => {
    let wrapper: HTMLElement | null = document.createElement('div')
    document.body.appendChild(wrapper)
    const unmountHandler = () => {
      unmountComponent(wrapper!)
      wrapper = null
      mergedConfig.onExited!()
    }
    const {onCancel, onConfirm, ...omittedConfig} = mergedConfig
    ReactDOM.render(
    <BaseModal visible={true} {...omittedConfig} onExited={unmountHandler} ref={ref}>
      {mergedConfig.content}
      <Footer>
        <Button className="ml-2" onClick={() => onCancel!(ref as ModalRefObject)} style={{marginRight: 8}}>取消</Button>
        <Button type="primary" onClick={() => onConfirm!(ref as ModalRefObject)}>确定</Button>
      </Footer>
      </BaseModal>,
      wrapper,
      () => resolve(ref as ModalRefObject)
    )
  })
}

Modal.Footer = Footer

export default Modal

import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import useClassNames from 'classnames'
import Icon from '../icon/icon'
import { CSSTransition } from 'react-transition-group'
import './message.scss'

const noop = () => { }

export type MessageType = 'success' | 'warning' | 'error' | 'info'

export type MessageOptions = {
  message?: string,
  duration?: number,
  onClose?: () => void,
}

const defaults: MessageOptions = {
  message: '',
  duration: 3000,
  onClose: noop,
}

interface MessageFunc {
  (opt: MessageOptions | string): void
}

interface MessageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  type?: MessageType
  onClose?: () => void
  onExited?: () => void
}

interface MessageInterface extends React.FC<MessageProps> {
  info: MessageFunc,
  error: MessageFunc,
  success: MessageFunc,
  warning: MessageFunc,
  warn: MessageFunc,
  alert: MessageFunc
}

const Message: MessageInterface = ({
  type,
  className,
  children,
  onClose,
  onExited
}) => {
  const [visibility, setVisibility] = useState(false)

  const computedClassNames = useClassNames(
    'rf-message',
    `rf-message-${type}`,
    className
  )
  const nodeRef = useRef(null)

  useEffect(() => {
    setVisibility(true)
  }, [])

  const closeMessage = () => {
    setVisibility(false)
    onClose!()
  }

  return (
    <CSSTransition in={visibility} timeout={300} classNames='message' unmountOnExit nodeRef={nodeRef} onExited={onExited}>
      <div className={computedClassNames} ref={nodeRef}>
        <Icon className="icon-info mr-2" size={20} />
        <div className="message-content">
          {children}
        </div>
        <Icon className="icon-close message-close" size={20} onClick={closeMessage} />
      </div>
    </CSSTransition>
  )
}

const renderComponent = (options: MessageOptions , messageType: MessageType) => {
  const container = document.createElement('div')
  const removeContainer = () => {
    ReactDOM.unmountComponentAtNode(container)
    container.remove()
  }

  ReactDOM.render(<Message type={messageType} onExited={removeContainer}>{options.message}</Message>, container)
  document.body.append(container)
}

const mergeOptions = (propOptions: MessageOptions | string) : MessageOptions => {
  let options: MessageOptions = {}
  if (typeof propOptions === 'string') {
    options = { ...defaults, message: propOptions }
  } else {
    options = { ...defaults, ...propOptions }
  }
  return options
}

Message.defaultProps = {
  type: 'info',
  onClose: noop,
  onExited: noop
}

Message.alert = Message.info = (opt) => {
  const mergedOptions = mergeOptions(opt)
  renderComponent(mergedOptions, 'info')
}

Message.error = (opt) => {
  const mergedOptions = mergeOptions(opt)
  renderComponent(mergedOptions, 'error')
}

Message.success = (opt) => {
  const mergedOptions = mergeOptions(opt)
  renderComponent(mergedOptions, 'success')
}

Message.warn = Message.warning = (opt) => {
  const mergedOptions = mergeOptions(opt)
  renderComponent(mergedOptions, 'warning')
}

export default Message

import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import useClassNames from 'classnames'
import Icon from '../icon/icon'
import { CSSTransition } from 'react-transition-group'
import './message.scss'

export type MessageType = 'success' | 'warning' | 'error' | 'info'

export type MessageOptions = {
  message?: string,
  duration?: number,
  onClose?: () => void,
}

const defaults: MessageOptions = {
  message: '',
  duration: 3000,
  onClose: () => {}
}

interface MessageFunc {
  (opt: MessageOptions | string) : void
}

interface MessageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  type?: MessageType
}

interface MessageInterface extends React.FC<MessageProps>{
  info: MessageFunc,
  // error: MessageFunc,
  // success: MessageFunc,
  // warning: MessageFunc,
  // warn: MessageFunc,
  // alert: MessageFunc
}

const Message: MessageInterface = ({
  type,
  className,
  children
}) => {
  const [visibility, setVisibility] = useState(false)
  const computedClassNames = useClassNames(
    'rf-message',
    `rf-message-${type}`,
    className
  )
  const nodeRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      setVisibility(true)
    }, 1000);
  }, [])

  return (
    <CSSTransition in={visibility} timeout={300} classNames='message' unmountOnExit nodeRef={nodeRef}>
      <div className={computedClassNames} ref={nodeRef}>
        <Icon className="icon-info mr-2" size={20} />  {children}
      </div>
    </CSSTransition>
  )
}

Message.info = (opt) => {
  let options: MessageOptions = {}
  if(typeof opt === 'string') {
    options = {...defaults, message: opt}
  } else {
    options = {...defaults, ...opt}
  }

  const element = ReactDOM.render(<Message type='info'>{options.message}</Message>, document.createDocumentFragment())
  console.log(element);
}

Message.defaultProps = {
  type: 'info'
}


export default Message

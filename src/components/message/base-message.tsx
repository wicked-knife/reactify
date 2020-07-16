import React, {useState, useEffect, ForwardRefRenderFunction, forwardRef} from 'react'
import useClassNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Icon from '../icon'

const noop = () => {}

export const Duration = 5000

export type MessageType = 'success' | 'warning' | 'error' | 'info'

export interface MessageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    duration?: number
    type?: MessageType
    style?: React.CSSProperties
    onClose?: () => void
    onExited?: () => void
}

const BaseMessage: ForwardRefRenderFunction<any, MessageProps> = ({
    duration,
    type,
    className,
    children,
    style,
    onClose,
    onExited,
}, nodeRef) => {
    const [visibility, setVisibility] = useState(false)

    const computedClassNames = useClassNames(
      'rf-message',
      `rf-message-${type}`,
      className
    )
  
    const closeMessage = () => {
      setVisibility(false)
      onClose!()
    }
  
    /**
     * trigger enter animation
     */
    useEffect(() => {
      setVisibility(true)
    }, [])
  
    /**
     * auto close
     */
    useEffect(() => {
      const timer = setTimeout(() => {
        if (visibility) {
          setVisibility(false)
          onClose!()
        }
      }, duration)
      return () => clearTimeout(timer)
      /* eslint-disable-next-line */
    }, [visibility])
  
    return (
      <CSSTransition
        in={visibility}
        timeout={300}
        classNames='message'
        unmountOnExit
        nodeRef={nodeRef}
        onExited={onExited}>
        <div className={computedClassNames} ref={nodeRef} style={{...style}}>
          <Icon className='icon-info mr-2' size={20} />
          <div className='message-content'>{children}</div>
          <Icon
            className='icon-close message-close'
            size={20}
            onClick={closeMessage}
          />
        </div>
      </CSSTransition>
    )
}

const forwardRefMessage = forwardRef(BaseMessage)

forwardRefMessage.defaultProps = {
    duration: Duration,
    type: 'info',
    onClose: noop,
    onExited: noop,
  }

export default forwardRefMessage

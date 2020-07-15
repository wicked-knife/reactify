import React from 'react'
import useClassNames from 'classnames'
import Icon from '../icon/icon'
import './message.scss'

export type MessageType = 'success' | 'warning' | 'error' | 'info'

interface MessageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  type?: MessageType
}

const Message: React.FC<MessageProps> = ({
  type,
  className
}) => {
  const computedClassNames = useClassNames(
    'rf-message',
    `rf-message-${type}`,
    className
  )

  return <div className={computedClassNames}>
    <Icon className="icon-info mr-2" size={20} />  message
  </div>
}

Message.defaultProps = {
  type: 'info'
}

export default Message

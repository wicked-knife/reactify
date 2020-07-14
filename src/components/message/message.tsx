import React from 'react'
import useClassNames from 'classnames'
import './message.scss'

type MessageType = 'success' | 'warning' | 'error' | 'info'

interface MessageProps {
  type?: MessageType
}

const Message: React.FC<MessageProps> = ({
  type
}) => {
  const computedClassNames = useClassNames({
    'rf-message': true,
    [`rf-message-${type}`]: type
  })

  return <div className={computedClassNames}>
    message <i className="iconfont icon-info_filled"></i>
  </div>
}

Message.defaultProps = {
  type: 'info'
}

export default Message

import React, { } from 'react'
import Message, {MessageType} from './components/message/message'
import Button from './components/button/button'
import './styles/index.scss'

const App: React.FC = () => {
  const messageType: Array<MessageType> = ['info', 'warning', 'error', 'success']

  const handleClick = () => {
    Message.info('xxx')
  }
  return <div>
    {messageType.map(type => 
      <Message key={type} type={type} className="mb-2">hello world</Message>
    )}

    <Button onClick={handleClick}>click me</Button>
  </div>
}

export default App

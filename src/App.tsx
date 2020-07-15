import React, { } from 'react'
import Message, {MessageType} from './components/message'
import Button from './components/button'
import './styles/index.scss'

const App: React.FC = () => {
  const messageType: Array<MessageType> = ['info', 'warning', 'error', 'success']

  return <div>
    {messageType.map(type => 
      <Message key={type} type={type} className="mb-2">hello world</Message>
    )}

    {messageType.map(type => 
      <Button key={type} onClick={() => Message[type]('hello world')}>show {type}</Button>
    )}
  </div>
}

export default App

import React from 'react'
import Message, {MessageType} from './components/message'
import Button from './components/button'
import './styles/index.scss'

const App: React.FC = () => {
  const messageType: Array<MessageType> = ['info', 'warning', 'error', 'success']

  const showMessage = (type: MessageType) => {
    Message[type]({message: 'hello world'.repeat( Math.round(Math.random() * 100) ), duration: 10000 * Math.random()})
  }

  return <div>
    {messageType.map(type => 
      <Button key={type} onClick={() => showMessage(type)}>show {type}</Button>
    )}
  </div>
}

export default App

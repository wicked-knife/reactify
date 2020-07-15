import React, { } from 'react'
import Message, {MessageType} from './components/message/message'
import './styles/index.scss'

const App: React.FC = () => {
  const messageType: Array<MessageType> = ['info', 'warning', 'error', 'success']
  return <div>
    {messageType.map(type => 
      <Message key={type} type={type} className="mb-2"/>
    )}
  </div>
}

export default App

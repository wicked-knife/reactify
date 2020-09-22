import React, { useEffect } from 'react'
import Message from './components/message'
import './styles/index.scss'

const App: React.FC = () => {
  const show = () => Message.info('hello world')
  return <div>
    <button onClick={show}>click me</button>
  </div>
}

export default App

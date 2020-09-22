import React, { useEffect } from 'react'
import Message from './components/message'
import './styles/index.scss'

const App: React.FC = () => {
  useEffect(() => {
    Message.info({
      message: 'hello world',
      duration: 10000
    })
  }, [])
  return <div>
  </div>
}

export default App

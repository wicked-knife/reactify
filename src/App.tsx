import React, { useRef } from 'react'
import Message from './components/message/message'
import Button from './components/button/button'
import './styles/index.scss'

const App: React.FC = () => {
  const ref = useRef<any>(null)

  const handleClick = () => {
    console.log(ref)
    ref.current.focus()
  }
  return <div>
    <Message />
    <Button ref={ref} onClick={handleClick}>button</Button>
  </div>
}

export default App

import React, { useState } from 'react'
import Modal from './components/modal'
import Button from './components/button'
import './styles/index.scss'

const App: React.FC = () => {
  const [visible, setVisible] = useState(true)

  return <div>
    <Button onClick={() => setVisible(prev => !prev)}>toggle</Button>
    <Modal visible={visible} onClose={() => setVisible(false)}/>
  </div>
}

export default App

import React, { useState } from 'react'
import Modal from './components/modal'
import Button from './components/button'
import './styles/index.scss'

const App: React.FC = () => {
  const [b, a] = useState(0)
  const [v, setV] = useState(false)
  return <div>
    <Button onClick={() => setV(true)}>show</Button>
    <Modal visible={v} onClose={() => setV(false)} >
      <Button onClick={() => a(prev => prev + 1)}>render{b}</Button>
    </Modal>
  </div>
}

export default App

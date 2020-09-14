import React, { useRef, useState } from 'react'
import Modal from './components/modal'
import Button from './components/button'
import './styles/index.scss'

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const ref = useRef(null)

  const close = () => {
    setVisible(false)
  }
  const show = () => {
    setVisible(true)
  }

  return <div>
    <Button onClick={show}>show</Button>

    <Modal visible={true}><div className="test-node">hello world</div></Modal>
  </div>
}

export default App

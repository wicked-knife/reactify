import React, { useRef, useState } from 'react'
import Modal, {RefInterface} from './components/modal'
import Button from './components/button'
import './styles/index.scss'

const App: React.FC = () => {
  const [v, setV] = useState(false)
  const re = useRef<RefInterface>(null)

  const testRef = () => {
    re.current!.closeModal()
  }

  return <div>
    <Button onClick={() => setV(true)}>show</Button>
    <Modal visible={v} onClose={() => setV(false)} ref={re}>
      <Button onClick={testRef}>render</Button>
      <div style={{}}></div>
      <Modal.Footer>
        xxx
      </Modal.Footer>
    </Modal>
  </div>
}

export default App

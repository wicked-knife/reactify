import React from 'react'
import Modal from './components/modal'
import Button from './components/button'
import './styles/index.scss'

const App: React.FC = () => {
  const show = () => {
    Modal.show('xxx')
  }

  return <div>
    <Button onClick={show}>show</Button>
  </div>
}

export default App

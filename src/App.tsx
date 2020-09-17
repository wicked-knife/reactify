import React, { } from 'react'
import Modal, {} from './components/modal'
import Button from './components/button'
import './styles/index.scss'

const App: React.FC = () => {
  const showModal = () => {
    Modal.confirm('hello world')
  }
  return <div>
    <Button onClick={showModal}>show</Button>
  </div>
}

export default App

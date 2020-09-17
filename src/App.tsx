import React, { } from 'react'
import Modal, {} from './components/modal'
import Button from './components/button'
import './styles/index.scss'

const App: React.FC = () => {
  const showModal = () => {
    Modal.show(
      {content: <div>hello world</div>, 
        title: 'this is title',
        zIndex: 2000
      }).then((ref) => {
        setTimeout(() => {
          ref.current.closeModal()
        }, 1000)
      })
  }
  return <div>
    <Button onClick={showModal}>show</Button>
  </div>
}

export default App

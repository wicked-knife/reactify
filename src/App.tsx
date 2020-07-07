import React, { useCallback } from 'react'
import Button, {ButtonType} from './components/button/button'
import './styles/index.scss'

const App: React.FC = () => {
  const clickHandler = useCallback((event: React.MouseEvent) => {
    event.persist()
    console.log(event)
  }, [])

  return (
    <div className='App'>
      {(['default', 'primary', 'danger', 'link', 'text', 'success'] as Array<ButtonType>).map(
        buttonType => (
          <Button type={buttonType} key={buttonType} onClick={clickHandler}>
            {buttonType}
          </Button>
        )
      )}
    </div>
  )
}

export default App

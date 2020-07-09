import React, { useCallback, } from 'react'
import Button, {ButtonType} from './components/button/button'
import './styles/index.scss'

const App: React.FC = () => {
  const clickHandler = useCallback((event: React.MouseEvent) => {
    event.persist()
    console.log(event)
  }, [])

  const buttons: Array<ButtonType> = ['default', 'primary', 'danger', 'link', 'text', 'success', 'warning']

  return (
    <div className='App'>
      {buttons.map(
        buttonType => (
          <Button type={buttonType} key={buttonType} onClick={clickHandler} round disabled>
            {buttonType}
          </Button>
        )
      )}

      <div style={{marginTop: '100px'}}>
      {buttons.map(
        buttonType => (
          <Button type={buttonType} key={buttonType} onClick={clickHandler} plain disabled>
            {buttonType}
          </Button>
        )
      )}
      </div>

      <div style={{marginTop: '100px'}}>
      {buttons.map(
        buttonType => (
          <Button type={buttonType} key={buttonType} onClick={clickHandler} disabled>
            {buttonType}
          </Button>
        )
      )}
      </div>
    </div>
  )
}

export default App

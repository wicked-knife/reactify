import React, { useCallback, } from 'react'
import Button, {ButtonType} from './components/button/button'
import './styles/index.scss'

const App: React.FC = () => {
  const clickHandler = useCallback((event: React.MouseEvent) => {
    event.persist()
    console.log(event)
  }, [])

  const buttons: Array<ButtonType> = ['default', 'primary', 'danger', 'text', 'success', 'warning']

  return (
    <div className='App'>
      {buttons.map(
        buttonType => (
          <Button buttonType={buttonType} key={buttonType} onClick={clickHandler} round size="small" >
            按钮
          </Button>
        )
      )}

      <div style={{marginTop: '100px'}}>
      {buttons.map(
        buttonType => (
          <Button buttonType={buttonType} key={buttonType} onClick={clickHandler} round size="medium" plain >
            {buttonType}
          </Button>
        )
      )}
      </div>

      <div style={{marginTop: '100px'}}>
      {buttons.map(
        buttonType => (
          <Button buttonType={buttonType} key={buttonType} onClick={clickHandler} round size="large">
            {buttonType}
          </Button>
        )
      )}
      </div>
    </div>
  )
}

export default App

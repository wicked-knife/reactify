import React, { useCallback, } from 'react'
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
          <Button type={buttonType} key={buttonType} onClick={clickHandler} round>
            {buttonType}
          </Button>
        )
      )}

      <div style={{marginTop: '100px'}}>
      {(['default', 'primary', 'danger', 'link', 'text', 'success'] as Array<ButtonType>).map(
        buttonType => (
          <Button type={buttonType} key={buttonType} onClick={clickHandler} plain>
            {buttonType}
          </Button>
        )
      )}
      </div>

      <div style={{marginTop: '100px'}}>
      {(['default', 'primary', 'danger', 'link', 'text', 'success'] as Array<ButtonType>).map(
        buttonType => (
          <Button type={buttonType} key={buttonType} onClick={clickHandler} plain round>
            {buttonType}
          </Button>
        )
      )}
      </div>
    </div>
  )
}

export default App

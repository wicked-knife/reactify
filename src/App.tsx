import React, { useCallback } from 'react'
import Button from './components/button/button'

const App : React.FC = () => {
  const clickHandler = useCallback((event : React.MouseEvent) => {
    event.persist()
    console.log(event)
  }, [])

  return (
    <div className="App">
      <Button onClick={clickHandler}>hello world</Button>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDom from 'react-dom';
import {ArrowUp, Message} from '../build';
import '../build/css/index.css';
const App = () => {
  return (
    <div>
      <ArrowUp size={55} color="red" onClick={() => Message.info({message: 'hello', duration: 99999999})} />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDom from 'react-dom';
import {ArrowUp} from '../build';
import '../build/css/index.css';
const App = () => {
  return <div><ArrowUp size={55} color="red" /></div>;
};

ReactDom.render(<App/>, document.getElementById('root'));

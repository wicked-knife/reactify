import React from 'react';
import ReactDom from 'react-dom';
import Hello from '../build';
import '../build/css/index.css';
const App = () => {
  return <div><Hello /></div>;
};

ReactDom.render(<App/>, document.getElementById('root'));

import React from 'react';
import ReactDom from 'react-dom';
import './index.scss';
import hello from '../build';
const App = () => {
  hello('world');
  return <div>hello world</div>;
};

ReactDom.render(<App/>, document.getElementById('root'));

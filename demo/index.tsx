import React from 'react';
import ReactDom from 'react-dom';
import {Icon} from '../build';
import '../build/css/index.css';
const App = () => {
  return <div><Icon /></div>;
};

ReactDom.render(<App/>, document.getElementById('root'));

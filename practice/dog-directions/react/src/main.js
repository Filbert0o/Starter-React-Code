import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import data from './constants/data.js';
import InstructionsContainer from './containers/InstructionsContainer';

ReactDOM.render(
  <InstructionsContainer data={data}/>,
  document.getElementById('app')
);

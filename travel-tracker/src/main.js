import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import data from './constants/data';

ReactDOM.render(
  <App data={data}/>,
  document.getElementById('app')
);

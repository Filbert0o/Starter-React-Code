import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js'
import data from '../src/constants/data';

$(function() {
  ReactDOM.render(
    <App data={data}/>,
    document.getElementById('app')
  );
});

import './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup.js'

let artists = ["Maroon 5", "ColdPlay", "Charlie Puth"];
// const Artists = "Maroon";

ReactDOM.render(
  <Popup 
    message = {artists[0]}
  />,
  document.getElementById('root')
);

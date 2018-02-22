import './main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header'



// let text = "I am a React element! Hear me roar!"
//
// let headerElement = (
//   <h1 id="special-header"
//     className="header"
//     onClick = { (event) => { alert('Roar!')} }>
//     {text}
//   </h1>
// );

ReactDom.render(
  <Header />,
  document.getElementById('app')
);

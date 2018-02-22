import './main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import MessageComponent from './components/MessageComponent'

ReactDOM.render(
  <MessageComponent message="Welcome to my React Application!" />,
  document.getElementById('app')
)

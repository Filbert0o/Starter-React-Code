import React from 'react';
import Picture from './Picture';
import Numbers from './Numbers'

const Wrapper = props => {
  return (
    <div className='box wrapper'>
      <h1>{props.header}</h1>
      <p>{props.message}</p>

      <Numbers
        date = {props.date}
        random = {props.random}
      />
      <Picture
        url = {props.url}
        list={props.list}
      />
    </div>
  )
}

export default Wrapper;

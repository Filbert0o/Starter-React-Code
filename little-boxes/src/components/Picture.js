import React from 'react';
import List from './List'

const Picture = props => {
  return (
    <div className='box picture'>
      <h1>Look at This Picture</h1>
      <img alt='White Tiger' src={props.url}/>

      <List
        list={props.list}
      />
    </div>
  )
}

export default Picture;

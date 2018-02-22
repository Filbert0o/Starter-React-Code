import React from 'react';

const List = props => {

  let lists = props.list.map((item) => (
    <li key={item}>{item}</li>
  ))

  return (
    <div className='box list'>
      <h1>Here Is a List</h1>
      <ul>
        {lists}
      </ul>
    </div>
  )
}

export default List;

import React from 'react';

const Pie = props => {
  debugger
  let handleClick = () => props.onPieClick(props.id)
  return (
    <li onClick={handleClick} className={props.classString}>
      {props.name}
    </li>
  )
}

export default Pie;

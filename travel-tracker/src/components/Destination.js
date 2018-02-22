import React from 'react';

const Destination = (props) => {

  return(
    <li className={props.selected} onClick={props.handleClick}>
      {props.name}
    </li>
  )
}

export default Destination;

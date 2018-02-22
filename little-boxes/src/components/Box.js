import React from 'react';

const Box = props => {
  let boxClass = `box ${props.boxClass}`

  let paragraph;

  if (props.message) {
    paragraph = <p>{props.message}</p>
  }

  let urlLink;
  if (props.url) {
    urlLink = props.url
  }

  return (
    <div className={boxClass}>
      <h1>{props.header}</h1>
      {paragraph}
    </div>
  )
}

export default Box;

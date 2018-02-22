import React from 'react';


const Faq = (props) => {
  let setClick = () => {
    props.handleClick(props.id)
  }

  return(
    <li>
      <div>
        <span><button onClick={setClick}><i className={props.symbol} aria-hidden="true"/></button></span>
        {props.question}
      </div>

      <div>
        {props.answer}
      </div>

    </li>
  )
};

export default Faq;

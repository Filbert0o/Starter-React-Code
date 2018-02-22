import React from 'react';
import Faq from './Faq';

const FaqList = (props) => {
  return(
    <ul className="callout no-bullet">
      <Faq
        id={props.id}
        handleClick={props.handleClick}
        question={props.question}
        symbol={props.symbol}
        answer={props.answer}
      />
    </ul>
  )
};

export default FaqList;

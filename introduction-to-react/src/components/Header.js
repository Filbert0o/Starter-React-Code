import React from 'react';

const Header = props => {
  let text = 'I am a React element! Hear me roar!';

  return(
    <h1 id="special-header" className="header" onClick={ (event) => { alert('Roar!')} }>
      {text}
    </h1>
  );
};

export default Header;

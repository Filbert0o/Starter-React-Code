import React from 'react';

const KarmaButton = (props) => {


  return (
    <div className="row">
      <div className="small-12 small-centered columns text-center">
        <button className="button large expand" onClick={props.karmaAlertProp}>Add Karma++</button>
      </div>
    </div>
  );
}

export default KarmaButton;

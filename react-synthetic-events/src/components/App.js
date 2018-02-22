import React from 'react';
import NameForm from './NameForm';
import KarmaButton from './KarmaButton';

const App = (props) => {

  let karmaAlert = (event) => {
    alert("You have leveled up! (Karma: 1)");
  };

  // let formChanger = (event) => {
  //   console.log(event.target.value);
  // };

  let formChanger = (event) => {
    event.preventDefault();
    console.log("Form Submitted!");
  };

  return (
    <div className="main-div">
      <NameForm formChangerProp={formChanger}/>
      <KarmaButton karmaAlertProp={karmaAlert}/>
    </div>
  );
}

export default App;

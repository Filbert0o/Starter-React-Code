import React from 'react';
import PieList from '../containers/PieList';

const App = props => {
  return (
    <div>
      <h1>Pie Decider!</h1>
      <h3>What Is Your Favorite Pie?</h3>
      <PieList
        pies={props.data}
      />
    </div>
  );
};

export default App;

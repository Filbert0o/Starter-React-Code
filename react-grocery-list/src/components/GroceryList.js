import React from 'react';
import Grocery from './Grocery'

const GroceryList = props => {

  let groceryList = props.groceries.map((grocery) => (
    <li key={grocery.id}>
      <Grocery name={grocery.name} />
      <button type="button" onClick={props.handleButtonClick}>DELETE</button>
    </li>
  ))

  return(
    <ul>
      {groceryList}
    </ul>
  );
};

export default GroceryList;

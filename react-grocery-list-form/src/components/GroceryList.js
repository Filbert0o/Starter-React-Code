import React from 'react'
import Grocery from './Grocery'

const GroceryList = (props) => {
  let groceries = props.groceries.map((grocery) => {
    let id = grocery.id
    let name = grocery.name

    let handleButtonClick = () => props.handleButtonClick(id)

    return (
      <Grocery
        key={id}
        name={name}
        handleButtonClick={handleButtonClick}
      />
    )
  })

  return (
    <ul>
      {groceries}
    </ul>
  )
}

export default GroceryList

import React, { Component } from 'react';
import data from '../constants/data'
import styles from '../stylesheets/index.css'
import Destination from '../components/Destination'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      checked: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {

    if(this.state.checked.includes(id)) {
      let nameList = this.state.checked.filter(check => {
        return id !== check
      })
      this.setState({
        checked: nameList
      })
    } else {
      let nameList = this.state.checked.concat(id);
      this.setState({
        checked: nameList
      })
    }
  }

  render() {

    console.log(this.state)
    let destinations = this.props.data.places.map(destination => {
      let selected = null;
      if (this.state.checked.includes(destination.id)) {
        selected = "selected"
      } else {
        selected = ""
      }

      let handleClick = () => this.handleClick(destination.id)

      return(
        <Destination
          key={destination.id}
          id={destination.id}
          name={destination.name}
          selected={selected}
          handleClick={handleClick}
        />
      )
    })



    return (
      <div id="wishlist-div">
        <div className="row">
          <div className="small-12 small-centered columns text-center">
            <h3>Wanderlust Wishlist</h3>

            <ul className="no-bullet">{destinations}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

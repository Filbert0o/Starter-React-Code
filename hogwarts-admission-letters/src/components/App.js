import React from 'react';
import AcceptanceLetterText from './AcceptanceLetterText';
import RejectionLetterText from './RejectionLetterText';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Hint: Use this to keep track of whether the user has checked/unchecked the box
      check: true
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  };

  handleCheckboxChange(event) {
    // Write code to update the letter state here!
    // Hint: Where and how are you going to use this function?
    if (this.state.check === true) {
      this.setState({
        check: false
      })
    } else {
      this.setState({
        check: true
      })
    }


  }

  render() {

    let theLetter;
    if (this.state.check) {
      theLetter = <AcceptanceLetterText />
    }
    else {
      theLetter = <RejectionLetterText />
    }

    return (
      <div>
        <div className="letter-body">
          <div className="small-12 small-centered text-center columns">
            <input type="checkbox" onChange={this.handleCheckboxChange} />
            <label>
              <h5>Rejected?</h5>
            </label>
          </div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Hogwarts_coat_of_arms_colored_with_shading.svg/2000px-Hogwarts_coat_of_arms_colored_with_shading.svg.png" id="hogwarts-logo"/>
          <h1>HOGWARTS SCHOOL OF WITCHCRAFT AND WIZARDRY</h1>
          <br />
          <h3 id="headmaster-name">Headmaster: Albus Dumbledore</h3>
          <p id="merlin-order">
            (Order of Merlin, First Class, Grand Sorc., Chf. Warlock, Supreme Mugwump, International Confed. of Wizards)
          </p>
          <br />
          <p>Dear Addressee,</p>
          <div>
            {theLetter}
          </div>
          <br />
          <p>Yours sincerely,</p>
          <h3>Minerva McGonagall</h3>
          <h3>Deputy Headmistress</h3>
        </div>
      </div>
    );
  };
};

export default App;

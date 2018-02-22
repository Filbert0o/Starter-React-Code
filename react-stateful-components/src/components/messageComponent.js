import React, { Component } from 'react';

// const MessageComponent = (props) => {
//   let message = props.message
//   let clickCount = 0
//   let sender = "Abraham Lincoln"
//
//
//
//   return (
//     <div>
//       <h1>Component Message: {message}</h1>
//       <h1>Component Click Count: {clickCount}</h1>
//       <h1>Component Sender: {sender}</h1>
//     </div>
//   )
// };

class MessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      clickCount: 0,
      sender: "Abraham Lincoln"
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let newClickCount = this.state.clickCount + 1;
    this.setState({ clickCount: newClickCount });
  }

  render() {
    let message = this.state.message
    let clickCount = this.state.clickCount
    let sender = this.state.sender

    return(
      <div onClick={this.handleClick}>
        <h1>Component Message: {message}</h1>
        <h1>Component Click Count: {clickCount}</h1>
        <h1>Component Sender: {sender}</h1>
      </div>
    );
  }
};

export default MessageComponent;

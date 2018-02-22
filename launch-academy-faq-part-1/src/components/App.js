import React from 'react';
import FaqList from './FaqList';
import Faq from  './Faq';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: null
    }
    this.handleClick = this.handleClick.bind(this)
  }


  handleClick(id) {
      if (this.state.id !== id ) {
        this.setState({
          id: id
        })
      }
      else {
        this.setState({
          id: null
        })
      }
  }



  render() {

    let datas = this.props.data;
    let symbol = "fa fa-plus";
    let clicked = false;
    let questions;
    let answer;

    questions = datas.map(data => {
      if (this.state.id === data.id) {
        symbol = "fa fa-minus"
        answer = data.answer
      } else {
        symbol = "fa fa-plus"
        answer = null
      }

      return(
        <FaqList
          key={data.id}
          id={data.id}
          question={data.question}
          handleClick={this.handleClick}
          symbol={symbol}
          answer={answer}
        />
      )
    })

    return(
      <div>
        <h1 className="text-center">We're here to help</h1>
        {questions}
      </div>
    )

  }
}

export default App;

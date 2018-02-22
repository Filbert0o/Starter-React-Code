import React from 'react';
import Pie from '../components/Pie';

// const PieList = props => {
//
//     let pies = props.pies.map(pie => {
//       debugger
//       return(
//         <Pie
//           key={pie.id}
//           id={pie.id}
//           name={pie.name}
//         />
//       )
//     })
//     return (
//       <div>
//         <ul>{pies}</ul>
//       </div>
//     );
// }

class PieList extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      selectedId: null
    }

    this.handlePieClick = this.handlePieClick.bind(this)
  }

  handlePieClick(id){
    this.setState({
      selectedId: id
    })
    debugger
  }

  render(){

    let classString;
    debugger
    let pieList = this.props.pies.map((pie) => {
      if(pie.id === this.state.selectedId) {
        classString = "selected"
      } else {
        classString = ""
      }

      //let onPieClick = () => this.handlePieClick(pie.id)

      return (
        <Pie
          key={pie.id}
          id={pie.id}
          name={pie.name}
          onPieClick={this.handlePieClick}
          classString={classString}
        />
      );
    });

    return (
      <div>
        <ul>{pieList}</ul>
      </div>
    )
  }
}

export default PieList;

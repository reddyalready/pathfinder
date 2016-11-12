
/*
A square in the maze. Type values:
0 = Open
1 = Wall
*/

import React, {Component} from 'react';

class Square extends Component {

  constructor() {
    super();
    this.state = {
      type: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({type: 1})}>

      </button>
    )
  }
};

export default Square;

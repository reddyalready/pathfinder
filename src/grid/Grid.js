/*
 A grid (or maze) of squares
*/

import React, {Component} from 'react';

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      sizeX: 20,
      sizeY: 20
    };
  }

  render() {
    return (
      <p>Grid goes here</p>
    )
  }
};

export default Grid;

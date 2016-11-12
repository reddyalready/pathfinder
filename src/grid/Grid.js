/*
 A grid (or maze) of squares
*/

import React, {Component} from 'react';
import Square from '../square/Square.js';

class Grid extends Component {

  constructor(props) {
    super(props);

    this.state = {
      squares: []
    }

    for(var i = 0; i < props.sizeX; i++) {
      this.state.squares.push(new Array(parseInt(props.sizeY, 10)).fill(0));
    }

  }

  render() {
    var renderableSquareRows = this.state.squares.map(function(sqRow) {
      var renderableSquareRow = sqRow.map(function(sq) {
        return <Square value={sq} />
      });
      renderableSquareRow.push(<br />);
      return renderableSquareRow;
    });

    return (
      <div>
        {renderableSquareRows}
      </div>
    )
  }
};

export default Grid;

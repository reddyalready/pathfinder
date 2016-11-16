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

    this.onGoalSelected = this.onGoalSelected.bind(this);
  }

  onGoalSelected(x, y) {
    var newSquares = this.state.squares;
    newSquares[x][y] = 1;
    this.setState({squares: newSquares});
  }

  render() {
    var component = this;
    var countY = 0;
    var renderableSquareRows = this.state.squares.map(function(sqRow) {
      var countX = 0;
      var renderableSquareRow = sqRow.map(function(sq) {
        var squareHtml = <Square value={sq} x={countX} y={countY} onGoalSelected={ component.onGoalSelected } />
        countX++;
        return squareHtml;
      });
      countY++;
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

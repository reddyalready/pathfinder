/*
 A grid (or maze) of squares
*/

import React, {Component} from 'react';
import Square from '../square/Square.js';

class Grid extends Component {

  constructor(props) {
    super(props);

    this.validateProps(props);

    this.state = {
      squares: [],
      goal: {x: props.sizeX / 2, y: props.sizeY / 2}
    };

    for(var i = 0; i < props.sizeX; i++) {
      this.state.squares.push(new Array(parseInt(props.sizeY, 10)).fill("open"));
    }

    this.onGoalSelected = this.onGoalSelected.bind(this);
  }

  validateProps(props) {
    if(!props.hasOwnProperty('sizeX') || !props.hasOwnProperty('sizeY')) {
      console.log("Grid was no supplied sizeX or sizeY");
    }
  }

  onGoalSelected(x, y) {
    var newSquares = this.state.squares;
    newSquares[this.state.goal.x][this.state.goal.y] = 'open';
    newSquares[x][y] = 'goal';
    this.setState({squares: newSquares});
  }

  render() {
    //TODO: Use some sort of stream?
    var component = this;
    var countY = 0;
    var renderableSquareRows = this.state.squares.map(function(sqRow) {
      var countX = 0;
      var renderableSquareRow = sqRow.map(function(sq) {
        var squareHtml = <Square type={sq} x={countX} y={countY} onGoalSelected={ component.onGoalSelected } />
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
}

export default Grid;

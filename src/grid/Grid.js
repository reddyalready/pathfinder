/*
 A grid (or maze) of squares
*/

import React, {Component, PropTypes} from 'react';
import Square from '../square/Square.js';
import Immutable from 'immutable';

class Grid extends Component {

  constructor(props) {
    super(props);

    this.validateProps(props);

    var initSquares = [];

    for(var i = 0; i < props.sizeX; i++) {
        initSquares.push(new Array(parseInt(props.sizeY, 10)).fill('open'));
    }

    this.state = {
        squares: Immutable.fromJS(initSquares),
        goal: {x: props.sizeX / 2, y: props.sizeY / 2}
    };

    this.onSquareClicked = this.onSquareClicked.bind(this);
    this.onGoalSelected = this.onGoalSelected.bind(this);
  }

  validateProps(props) {
    if(!props.hasOwnProperty('sizeX') || !props.hasOwnProperty('sizeY')) {
      console.log("Grid was not supplied sizes");
    }
  }

  onSquareClicked(x, y, currentType) {
    //Left click toggles between open and wall
    if(currentType === 'open') {
      this.setState(({squares}) => ({
        squares: squares.setIn([x, y], 'wall')
      }));
    } else {
      this.setState(({squares}) => ({
        squares: squares.setIn([x, y], 'open')
      }));
    }

  }

  onGoalSelected(x, y) {
    this.setState(({squares}) => ({
      //Set current goal to open and new goal to goal
      squares: squares.setIn([this.state.goal.x, this.state.goal.y], 'open').setIn([x, y] , 'goal'),
      goal: {
        x,
        y,
      }
    }));
  }

  render() {
    const grid = this;
    const renderableSquareRows = this.state.squares.map((sqRow, outerIndex) => {
      const renderableSquareRow = sqRow.map((sq, innerIndex) =>
          <Square type={sq} x={outerIndex} y={innerIndex} onMouseDown={ grid.onSquareClicked } onGoalSelected={ grid.onGoalSelected }/>
      );
      return renderableSquareRow.push(<br />);
    });

    return (
      <div>
        {renderableSquareRows}
      </div>
    )
  }
}

Grid.propTypes = {
  sizeX: PropTypes.number.isRequired,
  sizeY: PropTypes.number.isRequired
};

export default Grid;


/*
A square in the maze that can either be open or another brick in the wall
*/

import React, {Component} from 'react';
import './square.css';

class Square extends Component {

  constructor(props) {
    super(props);

    this.validateProps(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
  }

  validateProps(props) {
    if (!props.hasOwnProperty("x") || !props.hasOwnProperty("y")) {
      console.log('Square co-ordinates missing');
    }
    if (!props.hasOwnProperty("type")) {
      console.log('Type property not supplied for square '+props.x+','+props.y);
    }
  }

  onMouseDown(event) {
    this.props.onMouseDown(this.props.x, this.props.y, this.props.type);
  }

  onContextMenu(event) {
    event.preventDefault();
    //Right click toggles goal - tell the grid where the goal is
    this.props.onGoalSelected(this.props.x, this.props.y);
  }

  render() {
    return (
      <span className={this.props.type} onMouseDown={this.onMouseDown} onContextMenu={this.onContextMenu}>

      </span>
    )
  }
}

export default Square;

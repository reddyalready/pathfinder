
/*
A square in the maze that can either be open or another brick in the wall
*/

import React, {Component} from 'react';
import './square.css';

class Square extends Component {

  constructor(props) {
    super(props);

    this.validateProps(props);

    this.state = {
      type: props.type,
      onGoalSelected : props.onGoalSelected,
      x: props.x,
      y: props.y
    };

    this.onClick = this.onClick.bind(this);
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

  onClick(event) {
    //Left click toggles between open and wall
    if(this.state.type === 'open') {
      this.setState({type: 'wall'});
    } else {
      this.setState({type: 'open'});
    }
  }

  onContextMenu(event) {
    event.preventDefault();
    //Right click toggles goal - tell the grid where the goal is
    this.props.onGoalSelected(this.state.x, this.state.y);
  }

  render() {
    var typeClass;

    switch(this.state.type) {
      case('goal'):
        typeClass = 'goal';
        break;
      case('wall'):
        typeClass = 'wall';
        break;
      default:
        typeClass = 'open';
    }

    return (
      <span className={typeClass} onClick={this.onClick} onContextMenu={this.onContextMenu}>

      </span>
    )
  }
};

export default Square;

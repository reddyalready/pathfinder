
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
      type: props.value ? 'goal' : 'open',
      onGoalSelected : props.onGoalSelected
    };

    this.onClick = this.onClick.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
  }

  validateProps(props) {
    if (typeof props.x === 'undefined' || typeof props.y === 'undefined') {
      console.log('Square co-ordinates missing');
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
    this.props.onGoalSelected(this.props.x, this.props.y);
    this.setState({type: 'goal'})
  }

  render() {
    var typeClass;

    switch(this.state.type) {
      case('goal'):
        typeClass = 'square square-goal';
        break;
      case('wall'):
        typeClass = 'square square-wall';
        break;
      default:
        typeClass = 'square square-open';
    }

    return (
      <span className={typeClass} onClick={this.onClick} onContextMenu={this.onContextMenu}>

      </span>
    )
  }
};

export default Square;

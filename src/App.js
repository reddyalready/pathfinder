import React, { Component } from 'react';
import logo from './logo.svg';
import Grid from './grid/Grid.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <p>Pathfinder</p>
        <Grid />
      </div>
    );
  }
}

export default App;

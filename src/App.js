import React, { Component } from 'react';
import logo from './logo.svg';
import Grid from './grid/Grid.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <p>Pathfinder</p>
        <Grid sizeX={ 20 } sizeY={ 20 }/>
      </div>
    );
  }
}

export default App;

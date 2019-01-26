import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Top from './Top.jsx'

class Side extends React.Component {
  render() {
    return (
      <div>SIDE</div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>MAIN</div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div id="container">
        <div className="topbar">
          <Top />
        </div>
        <div className="flex-container">
          <div className="sidebar">
            <Side />
          </div>
          <div className="content">
            <Main />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

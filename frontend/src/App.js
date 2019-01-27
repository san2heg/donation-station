import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Top from './Top.js';
import Main from './Main.js';
import LandingPage from './LandingPage.js';

class Side extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 'home'};
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.setState({
      currentPage: page
    });
  }

  render() {
    const currentPage = this.state.currentPage;

    if (currentPage == 'home') {
      return <LandingPage />;
    }

    return (
      <div id="container">
        <div className="topbar">
          <Top onPageChange={this.handlePageChange} page={currentPage}/>
        </div>
        <div className="flex-container">
          <div className="sidebar">
            <Side page={currentPage}/>
          </div>
          <div className="content">
            <Main page={currentPage}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

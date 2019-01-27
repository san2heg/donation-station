import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Top from './Top.js';
import Main from './Main.js';
import LandingPage from './LandingPage.js';
import { CSSTransition } from 'react-transition-group';

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
    this.state = {currentPage: 'data', showLanding: false};
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleLandingEnter = this.handleLandingEnter.bind(this);
    this.handleLandingExit = this.handleLandingExit.bind(this);
  }

  componentDidMount() {
    this.handleLandingEnter();
  }

  handlePageChange(page) {
    this.setState({
      currentPage: page
    });
  }

  handleLandingEnter() {
    console.log('enter');
    this.setState({
      showLanding: true
    });
  }

  handleLandingExit(page) {
    console.log('exit');
    this.setState({
      currentPage: page,
      showLanding: false
    });
  }

  render() {
    const currentPage = this.state.currentPage;
    const showLanding = this.state.showLanding;
    console.log('showLanding = ' + showLanding);

    return (
      <div id="container">
        <CSSTransition
          in={showLanding}
          timeout={1000}
          classNames="land"
          unmountOnExit>
          <LandingPage onExitLanding={this.handleLandingExit} />
        </CSSTransition>
        <div className="topbar">
          <Top onLandingClick={this.handleLandingEnter} onPageChange={this.handlePageChange} page={currentPage}/>
        </div>
        <div className="flex-container">
          <div className="content">
            <Main page={currentPage}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

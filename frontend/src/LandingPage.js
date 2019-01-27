import React, { Component } from 'react';
import './LandingPage.css';
import { CSSTransition } from 'react-transition-group';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing-container">
        <div className="landing-item main-title header">
          DONATION STATION
        </div>
        <div className="landing-item tagline">Who's likely to donate? We'll find out for you.</div>
        <div className="landing-item landing-buttons">
          <a className="landing-btn" onClick={() => {this.props.onExitLanding('data')}}>
            START
          </a>
          <a className="landing-btn" onClick={() => {this.props.onExitLanding('how to use')}}>
            HOW IT WORKS
          </a>
        </div>
      </div>
    );
  }
}

export default LandingPage;

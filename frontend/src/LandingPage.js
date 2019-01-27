import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-container">
        <div className="landing-item main-title header">
          DONATION STATION
        </div>
        <div className="landing-item tagline">Who's likely to donate? We'll find out for you.</div>
        <div className="landing-item landing-buttons">
          <a className="landing-btn">
            START
          </a>
          <a className="landing-btn">
            HOW IT WORKS
          </a>
        </div>
      </div>
    );
  }
}

export default LandingPage;

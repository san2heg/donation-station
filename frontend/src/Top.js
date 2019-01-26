import React, { Component } from 'react';
import './Top.css';

class Top extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(page, e) {
    this.props.onPageChange(page);
  }

  render() {
    return (
      <div className="topbar-container">
        <div className="title">
          Donation Station
        </div>
        <div className="navbar">
          <a className="navitem" onClick={this.handleClick.bind(this, 'home')}>
            HOME
          </a>
          <a className="navitem" onClick={this.handleClick.bind(this, 'insights')}>
            INSIGHTS
          </a>
          <a className="navitem" onClick={this.handleClick.bind(this, 'how to use')}>
            HOW TO USE
          </a>
          <a className="navitem" onClick={this.handleClick.bind(this, 'about')}>
            ABOUT
          </a>
        </div>
      </div>
    );
  }
}

export default Top;

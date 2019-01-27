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
    const page = this.props.page;
    const pageTitles = ['home', 'insights', 'how to use', 'about'];

    const pageElements = pageTitles.map((title) => (
      <a key={title} className={"navitem " + (page == title ? 'active' : '')} onClick={this.handleClick.bind(this, title)}>
        {title.toUpperCase()}
      </a>
    ));

    return (
      <div className="topbar-container">
        <div className="title">
          Donation Station
        </div>
        <div className="navbar">
          {pageElements}
        </div>
      </div>
    );
  }
}

export default Top;

import React, { Component } from 'react';
import './Main.css';

class Main extends React.Component {
  render() {
    const page = this.props.page;

    if (page == 'home') {
      return (
        <div>HOME</div>
      );
    } else if (page == 'about') {
      return (
        <div>ABOUT</div>
      );
    } else if (page == 'how to use') {
      return (
        <div>HOW TO USE</div>
      );
    } else if (page == 'insights') {
      return (
        <div>INSIGHTS</div>
      );
    }
    return (
      <div>DEFAULT</div>
    );
  }
}

export default Main;

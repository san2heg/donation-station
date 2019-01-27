import React, { Component } from 'react';
import './Main.css';

class Main extends React.Component {
  render() {
    const page = this.props.page;

    if (page == 'data') {
      return (
        <div></div>
      );
    } else if (page == 'about') {
      return (
        <div></div>
      );
    } else if (page == 'how to use') {
      return (
        <div></div>
      );
    } else if (page == 'insights') {
      return (
        <div></div>
      );
    }
    return (
      <div>DEFAULT</div>
    );
  }
}

export default Main;

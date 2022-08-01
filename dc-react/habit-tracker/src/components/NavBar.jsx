import React, { Component } from "react";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <i className="navbar-logo fas fa-leaf"></i>
        <span>Habit Tracker</span>
        <span className="navbar-count">{this.props.totalCount}</span>
      </div>
    );
  }
}

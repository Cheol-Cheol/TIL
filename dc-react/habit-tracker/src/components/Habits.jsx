import React, { Component } from "react";
import Habit from "./Habit";

export default class Habits extends Component {
  render() {
    return (
      <div className="habits">
        <ul>
          {this.props.habits.map((habit) => {
            return (
              <Habit
                key={habit.id}
                habit={habit}
                onIncrement={this.props.onIncrement}
                onDecrement={this.props.onDecrement}
                onDelete={this.props.onDelete}
              />
            );
          })}
          <button className="habits-reset">Reset All</button>
        </ul>
      </div>
    );
  }
}

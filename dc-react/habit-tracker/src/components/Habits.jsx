import React, { Component } from "react";
import Habit from "./Habit";

export default class Habits extends Component {
  state = {
    habits: [
      { id: 1, name: "Reading", count: 0 },
      { id: 2, name: "Running", count: 0 },
      { id: 3, name: "Coding", count: 0 },
    ],
  };

  handleIncrement = (habit) => {
    console.log(`handleIncrement ${habit.name}`);
    const habits = [...this.state.habits];
    const index = habits.indexOf(habit);
    habits[index].count++;
    this.setState({ habits });
  };

  handleDecrement = (habit) => {
    console.log(`handleDecrement ${habit.name}`);
    const habits = [...this.state.habits];
    const index = habits.indexOf(habit);
    const count = habits[index].count - 1;
    habits[index].count = count < 0 ? 0 : count;
    this.setState({ habits });
  };

  handleDelete = (habit) => {
    console.log(`handleDelete ${habit.name}`);
    // const habits = [...this.state.habits];
    // const index = habits.indexOf(habit);
    // habits.splice(index);
    // this.setState({ habits });
    const habits = this.state.habits.filter((item) => item.id !== habit.id);
    // setState({habits: habits})
    // 상단의 state의 데이터 형식에 따라 만들어준다.(객체)
    this.setState({ habits });
  };

  render() {
    return (
      <ul>
        {this.state.habits.map((habit) => {
          return (
            <Habit
              habit={habit}
              key={habit.id}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
            />
          );
        })}
      </ul>
    );
  }
}

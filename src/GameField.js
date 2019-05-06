import React, { Component } from "react";
import Timer from "./Timer";
import "./gameField.css";

export default class GameField extends Component {
  state = {
    prevIndex: -1,
    foundIndexes: []
  };
  canShowColor = index =>
    this.state.foundIndexes.find(item => item === index) != null ||
    this.state.prevIndex === index;

  handleClick = index => {
    if (index === this.state.prevIndex) {
      return;
    } else if (this.state.prevIndex === -1) {
      this.setState({
        prevIndex: index
      });
    } else if (
      this.props.gameData[index] === this.props.gameData[this.state.prevIndex]
    ) {
      this.setState({
        foundIndexes: [...this.state.foundIndexes, index, this.state.prevIndex],
        prevIndex: -1
      });
    } else {
      this.setState({
        prevIndex: -1
      });
    }
  };

  isAllFound = () =>
    this.state.foundIndexes.length === this.props.gameData.length;

  resetFoundIndexes = () => this.setState({ foundIndexes: [], prevIndex: -1 });

  render() {
    return (
      <div className="wrapper">
        {this.isAllFound() && "All items found"}
        <div className="grid-container">
          {this.props.gameData.map((color, index) => {
            return (
              <div
                key={index}
                className={`square ${color} ${
                  this.canShowColor(index) ? "" : " hide"
                }`}
                onClick={() => this.handleClick(index)}
              />
            );
          })}
        </div>
        <Timer
          isAllFound={this.isAllFound}
          resetFoundIndexes={this.resetFoundIndexes}
        />
      </div>
    );
  }
}

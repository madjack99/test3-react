import React, { Component } from "react";
import "./gameField.css";

export default class GameField extends Component {
  state = {
    squareList: [],
    ids: [],
    clickedColors: []
  };

  colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "skyblue",
    "blue",
    "violet",
    "black"
  ];

  shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  doubleArray = arr => {
    let newArr = [];
    arr.forEach(item => newArr.push(item, item));
    return newArr;
  };

  handleClick = e => {
    // e.target.classList.remove("hide");

    const id = parseInt(e.target.id);
    const color = e.target.classList[1];
    let clickedSquare = this.state.squareList.find(
      square => square.props.id === id
    );
    const className = `square ${clickedSquare.props.className.split(" ")[1]}`;
    clickedSquare = (
      <div
        {...clickedSquare.props}
        className={className}
        key={clickedSquare.props.id}
      />
    );
    const squareList = this.state.squareList;
    squareList.splice(clickedSquare.props.id, 1, clickedSquare);
    this.setState(state => ({
      squareList,
      ids: [...this.state.ids, id],
      clickedColors: [...this.state.clickedColors, color]
    }));
  };

  createSquareList = () => {
    let squareList = [];
    const doubledColors = this.doubleArray(this.colors);
    const mixedColors = this.shuffleArray(doubledColors);
    // Create a list of 16 divs with mutual class 'square' and
    // unique color class taken from a mixed list of colors.
    // Initial class 'hide' is added to hide all colored squares.
    for (let i = 0; i < 16; i++) {
      squareList.push(
        <div
          id={i}
          className={`square ${mixedColors[i]} hide`}
          key={i}
          onClick={this.handleClick}
        />
      );
    }
    this.setState(state => ({ squareList }));
  };

  componentDidMount() {
    this.createSquareList();
  }

  render() {
    const squareList = this.state.squareList;
    if (this.state.ids.length === 2) {
      if (this.state.clickedColors[0] !== this.state.clickedColors[1]) {
        console.log("not equal");
      }
    }

    return (
      <div className="wrapper">
        <div className="grid-container">{squareList}</div>
      </div>
    );
  }
}

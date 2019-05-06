import React from "react";
import GameField from "./GameField";
import "./app.css";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "skyblue",
  "blue",
  "violet",
  "black"
];

const doubleColors = colors => {
  return colors.reduce((acc, item) => {
    acc.push(item, item);
    return acc;
  }, []);
};

const shuffleColors = colors => {
  let n = colors.length;
  while (n > 0) {
    let m = Math.floor(Math.random() * n--);
    [colors[n], colors[m]] = [colors[m], colors[n]];
  }
  return colors;
};

const gameData = shuffleColors(doubleColors(colors));

function App() {
  return (
    <div className="App">
      <GameField gameData={gameData} />
    </div>
  );
}

export default App;

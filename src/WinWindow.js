import React from "react";
import "./winWindow.css";

function WinWindow({ resetGameDataAndTimer, intervalString }) {
  return (
    <div className="win-window">
      <p>Вы выйграли!</p>
      <p>Затраченное время: {intervalString}</p>
      <button className="ok-btn" onClick={resetGameDataAndTimer}>
        OK
      </button>
    </div>
  );
}

export default WinWindow;

import React, { Component } from "react";
import { DateTime } from "luxon";
import Interval from "luxon/src/interval.js";
import WinWindow from "./WinWindow";
import "./timer.css";

export default class Timer extends Component {
  state = {
    startTime: null,
    curTime: null
  };

  updateCurTime = () => {
    this.setState({
      curTime: DateTime.local()
    });
  };

  handleClick = () => {
    this.setState({
      startTime: DateTime.local(),
      curTime: DateTime.local()
    });
    this.timerInterval = setInterval(this.updateCurTime, 10);
    if (!this.props.isAllFound()) {
      this.props.resetFoundIndexes();
    }
  };

  resetGameDataAndTimer = () => {
    this.setState({ startTime: null, curTime: null });
    this.props.resetFoundIndexes();
  };

  render() {
    if (this.props.isAllFound()) {
      clearInterval(this.timerInterval);
    }

    let interval;
    if (this.state.startTime) {
      interval = Interval.fromDateTimes(
        this.state.startTime,
        this.state.curTime
      )
        .toDuration(["minutes", "seconds", "milliseconds"])
        .toObject();
    }
    let intervalString = interval
      ? `${interval.minutes}:${interval.seconds}.${interval.milliseconds}`
      : "";
    return (
      <div className="timer-wrapper">
        <button className="start-btn" onClick={this.handleClick}>
          Старт
        </button>
        <div className="timer">{this.state.startTime && intervalString}</div>
        {this.props.isAllFound() ? (
          <WinWindow
            intervalString={intervalString}
            resetGameDataAndTimer={this.resetGameDataAndTimer}
          />
        ) : null}
      </div>
    );
  }
}

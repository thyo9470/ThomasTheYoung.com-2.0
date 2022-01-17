import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderBar from './HeaderBar.js';
import Home from './Home/Home.js'

let timestamp = null;
let lastMouseX = null;
let lastMouseY = null;
let backgroundPosX = [ 0, 0, 0, 0, 0, 0];
let backgroundPosY = [ 80, 80, 80, 80, 80, 80];
let minY = 70;
let maxY = 100;

const divStyle = {
  height: '100%'
};

export default class App extends Component {

  constructor() {
    super();
    this.moveBackground = this.moveBackground.bind(this);
    this.getMouseSpeed = this.getMouseSpeed.bind(this);
    this.getXChange = this.getXChange.bind(this);
    this.state = {enterPoint: null, exitPoint: null};
  }

  getMouseSpeed(event) {
    if (timestamp === null) {
      timestamp = Date.now();
      lastMouseX = event.screenX;
      lastMouseY = event.screenY;
      return 0;
    }

    var now = Date.now();
    var dt =  now - timestamp;
    var dx = event.screenX - lastMouseX;
    var dy = event.screenY - lastMouseY;
    var speedX = Math.round(dx / dt * 100);
    var speedY = Math.round(dy / dt * 100);

    timestamp = now;
    lastMouseX = event.screenX;
    lastMouseY = event.screenY;

    return [speedX, speedY];
  }

  getXChange(speedX, index) {
    return (speedX)/(index+1);
  }

  getYChange(curY, speedY, index) {
    const yCeil = Math.min(maxY, curY + speedY/(index+1))
    const yFloor = Math.max(minY, yCeil)
    console.log(curY, yCeil, yFloor)
    return yFloor;
  }

  moveBackground(event) {
    var root = document.getElementById("root");

    const speedVals = this.getMouseSpeed(event);
    const speedX = speedVals[0]/50;
    const speedY = speedVals[1]/300;

    if (!isFinite(speedX) || Number.isNaN(speedX) ||
        !isFinite(speedY) || Number.isNaN(speedY)) {
      return;
    }

    backgroundPosX = backgroundPosX.map((x, i) => x + this.getXChange(speedX, i));
    root.style.backgroundPositionX = backgroundPosX.map(x => `${x}%`);

    backgroundPosY = backgroundPosY.map((y, i) => this.getYChange(y, speedY, i));
    root.style.backgroundPositionY = backgroundPosY.map(y => `${y}%`);
  }

  render() {
    return (
      <div style={divStyle} onMouseMove={this.moveBackground}>
        <HeaderBar></HeaderBar>
        <Home></Home>
      </div>
    );
  }

}

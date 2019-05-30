import React from 'react';
import './App.css';

class Racer extends React.Component {
  
  constructor(props) {
    super(props);
    props.stride && props.stride(this.GetStride.bind(this));
    this.stride = 0;
  }
  
  render() {
    return (
      <span>{this.GetSymbol()}</span>
    );
  }

  GetSymbol(){
    return 'X';
  }

  GetStride(){
    return 0;
  }
}

class Turtle extends Racer {
  
  constructor(props) {
    super(props);
    this.stride = 1;
  }

  GetSymbol(){
    return (
      <div id="turtle"></div>
    );
  }

  GetStride(){
    return this.stride;
  }
}

class Rabbit extends Racer {
  
  constructor(props) {
    super(props);
    this.stride = 3;
  }

  GetSymbol(){
    return (
      <div id="rabbit"></div>
    );
  }

  GetStride() { //TODO: Add sleep 
    return this.stride;
  }
}

class Race extends React.Component {
  constructor(props){
    super(props)
    this.racerWidth = 45;
    this.length = 500;
    this.turtleStride = -1;
    this.rabbitStride = -1;
    this.timer = null;
    this.state = {
      turtlePosition: 0,
      rabbitPosition: 0,
      winner: null,
      time: null,
      timeStart: null
    }
  }
  
  render () {
    return (
      <div id="race">
        <div id="field" style={{ width: this.length, padding: '25px', paddingRight: this.racerWidth+25+'px' }}>
          <div className="race-track" style={{ width: this.length }}>
            <div style={{ paddingLeft: this.state.rabbitPosition + 'px' }}>
              <Rabbit stride={(getStride) => this.getRabbitStride = getStride} />
            </div>
          </div>
          <div className="race-track" style={{ width: this.length }}>
            <div style={{ width: this.racerWidth, paddingLeft: this.state.turtlePosition + 'px' }}>
              <Turtle stride={(getStride) => this.getTurtleStride = getStride} />
            </div>
          </div>
        </div>
        <div>
          <button id="start-button" onClick={() => this.StartRace()} disabled={this.timer}>Start</button>
          <span id="race-timer">{this.state.time}</span>
          <span id="race-status">{this.state.status}</span>
        </div>
      </div>
    )
  }

  tick() {
    let now = Date.now();

    let updateState = {
      turtlePosition: this.state.turtlePosition + this.getTurtleStride(),
      rabbitPosition: this.state.rabbitPosition + this.getRabbitStride(),
    }

    if (!this.state.timeStart){
      updateState.timeStart = now;
    } else {
      let elapsedTime = new Date(now - this.state.timeStart);
      updateState.time = '0:' + elapsedTime.getMinutes() + ':' + elapsedTime.getSeconds();
    }

    this.CheckWinner();
    if (this.state.winner){
      clearInterval(this.timer);
    }
    this.setState(updateState);
  }

  StartRace(e) {
    if (this.timer){
      return;
    }
    this.tick();
    this.timer = setInterval(() => this.tick(), 100);
  }

  CheckWinner() {
    let winner;
    if (this.state.turtlePosition + this.racerWidth >= this.length){
      winner = 'Turtle';
    } else if (this.state.rabbitPosition + this.racerWidth >= this.length){
      winner = 'Rabbit';
    } else {
      return;
    }
    
    this.setState({
      winner: winner,
      status: ['The winner is the ',winner,'!'].join('')
    });
  }

  CheckRaceOver() {
    return this.state.turtlePosition >= this.length || this.state.rabbitPosition >= this.length;
  }

}

export default Race;

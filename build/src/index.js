import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const logic = require('./logic.js')


//<button className="square"  style={{ backgroundColor: this.state.boxColor }} onClick={() => this.setState({boxColor: "blue"})}></button>
           // {this.state.value}
  class Header extends React.Component {
    render() {
      return (
        <div>
        <h1 style={{color: "blue"}}>Connect Four!</h1>
        </div>
      );
    }
  }

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={{backgroundColor: props.value}}>
    </button>
  )
}
  

  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(42).fill(null),
        redIsNext: true,
      };
    }
    resetBoard(){
      this.setState({
        squares: Array(42).fill(null),
        redIsNext: true,
      })
    }
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (logic.winCheck(this.state.squares, this.state.redIsNext ? "blue" : "red") || squares[i]) {
        return;
      }
      squares[i] = this.state.redIsNext ? "red" : "blue";
      this.setState({
        squares: squares,
        redIsNext: !this.state.redIsNext,
      })
    }

    renderSquare(i) {
      return (<Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
              />
      );
    }
    renderReset(i) {
      if (i) 
      return (<Square
                value={0}
                onClick={() => this.resetBoard()}  
              />      
        );
      }
    render() {
      let gameover = false;
      let currentTurn = this.state.redIsNext ? "blue" : "red";
      const winner = logic.winCheck(this.state.squares, currentTurn);
      let status;
      let resetPrompt;
      if (winner != null) {
        resetPrompt = "Click to Reset";
        gameover = true;
        status = "Winner: " + winner;
      } else {
        resetPrompt = "";
        status = 'Next player: ' + (this.state.redIsNext ? "Red" : "Blue");
      }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
          </div>
          <div className="board-row">
            {this.renderSquare(14)}
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
          </div>
          <div className="board-row">
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
            {this.renderSquare(25)}
            {this.renderSquare(26)}
            {this.renderSquare(27)}
          </div>
          <div className="board-row">
            {this.renderSquare(28)}
            {this.renderSquare(29)}
            {this.renderSquare(30)}
            {this.renderSquare(31)}
            {this.renderSquare(32)}
            {this.renderSquare(33)}
            {this.renderSquare(34)}
          </div>
          <div className="board-row">
            {this.renderSquare(35)}
            {this.renderSquare(36)}
            {this.renderSquare(37)}
            {this.renderSquare(38)}
            {this.renderSquare(39)}
            {this.renderSquare(40)}
            {this.renderSquare(41)}
          </div>
          <div className="reset">{resetPrompt}</div>
          <div className="resetSquare">
            {this.renderReset(gameover)}
          </div>
        </div>
      );
    }
  }

  class Instructions extends React.Component {
    render() {
      return (
        <div>
        <h2 style={{color: "red"}}>Instructions</h2>
        <p>Click on any unplayed square to take your turn</p>
        </div>
      );
    }
  }

  class Credits extends React.Component {
    render() {
      return (
        <div>
          <h3>Made by David Sanders for CSCI 310: JavaScript</h3>
        </div>
      )
    }
  }
  
  
  class Game extends React.Component {
    render() {
      return (

        <div className="header">
          <Header />
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>
              <Instructions />
            </div>
          </div>
        </div>
        <Credits/>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
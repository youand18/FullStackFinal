import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import SignUp from './SignUp.jsx';
import './index.css';

const fs = require('fs');
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
    getRandomInt(max) {
      if (logic.winCheck(this.state.squares, this.state.redIsNext ? "blue" : "red")) {
        return;
      }
      let squares = this.state.squares.slice();
      let i = Math.floor(Math.random() * max);
      if (squares[i] === null) {
        return i;        
      } else {
        console.log("Random Int Reroll");
        return this.getRandomInt(42);
      }
    }
    blueTakeRandomTurn() {
      let i = this.getRandomInt(42);
      console.log(i);
      let squares = this.state.squares.slice();
      if (logic.winCheck(this.state.squares, this.state.redIsNext ? "blue" : "red")) {
        return;
      }
      squares[i] = "blue";
      console.log(this.state.squares)
      this.setState({
        squares: squares,
        redIsNext: true,
      })
    }
    redTakeRandomTurn() {
      let i = this.getRandomInt(42);
      console.log(i);
      let squares = this.state.squares.slice();
      if (logic.winCheck(this.state.squares, this.state.redIsNext ? "blue" : "red")) {
        return;
      }
      squares[i] = "red";
      console.log(this.state.squares)
      this.setState({
        squares: squares,
        redIsNext: false,
      })
    }

    blueTakeDefensiveTurn() {
      let i;
      let played = false;
      let squares = this.state.squares.slice();
      if (logic.winCheck(this.state.squares, this.state.redIsNext ? "blue" : "red")) {
        return;
      }
      for (i = 0; i < 42; i++){
        if (squares[i] === null){
          squares[i] = "blue";
          if (logic.winCheck(squares, "blue")){
            console.log("blue detected win");
            played = true;
            break;
          }
          squares = this.state.squares.slice();
        }
      }
      let connected = 0;
      let connectedRequirement = 3;
      for (connectedRequirement; connectedRequirement > 0; connectedRequirement--){
        for (i = 0; i < 42; i++){
          if (squares[i] === "red") {
            connected++;
          } else {
            connected = 0;
          }
          if ((connected >= connectedRequirement) && ((squares[i+1] != "blue") || (squares[i-connected] != "blue"))) break;
        }
        if (connected >= connectedRequirement && !played)
        { 
          console.log(connected);
          if (squares[i+1] === null) 
          {
            console.log("Front Horizontal Defense");
            squares[i+1] = "blue";
            played = true;
          } else if (squares[i-connected] === null)
          {
            console.log("Back Horizontal Defense");
            squares[i-connected] = "blue";
            played = true;
          } else 
          {
            i = this.getRandomInt(42);
            console.log("Random Pick Inside of Horizontal Connected");
            squares[i] = "blue";
            played = true;
          }
        } else {
          let done = false;
          connected = 0;
          for (var j = 0; j < 7; j++)
          {
              for (i = j; i < 42; i += 7)
              {
                  if (squares[i] === "red")
                  {
                      connected += 1;
                      console.log("Vertical Connected: " + connected);
                      if ((connected >= connectedRequirement) && ((squares[i+7] != "blue") || (squares[i-(connected*7)] != "blue"))) {
                        console.log("vertical break");
                        done = true;
                        break;
                      }
                  } 
                  else
                  {
                    connected = 0;
                  }
              }
              if (done) break;
              connected = 0;
          }
          if (connected >= connectedRequirement  && !played) 
          {
            console.log(connected);
            if (i <= 34 && squares[i+7] === null)
            {
              console.log("Bottom Vertical Defense");
              squares[i+7] = "blue";
              played = true;
            }
            else if (squares[i-(connected*7)] === null)
            {
              console.log("Top Vertical Defense");
              squares[i-(connected*7)] = "blue";
              played = true;
            } else 
            {
              i = this.getRandomInt(42);
              console.log("Random Pick Inside of Vertical Connected");
              squares[i] = "blue";
              played = true;
            }
          } else {
            let direction;
            let done = false;
            connected = 0;
            console.log("Diagonal here");
            for (i = 0; i < 42; i++)
            {
              if (squares[i] === "red") 
              {
                connected = 1;
                if ((i % 7) <= 3 && !done)
                {
                  var j = i;
                  while (connected > 0){
                    if(squares[j+8] === "red"){
                      connected++;
                      j += 8;
                      if (connected >= connectedRequirement) {
                        console.log("Diagonal Break");
                        direction = "left";
                        done = true;
                        i = j;
                        break;
                      }
                    } else connected = 0;
                  }
                }
                if (done) break;
                connected = 1;
                if ((i % 7) >= 3 && !done){
                  var x = i;
                  while (connected > 0)
                  {
                    if(squares[x+6] === "red"){
                      connected++;
                      x += 6;
                      if (connected >= connectedRequirement) {
                        console.log("Diagonal Break 2");
                        direction = "right";
                        done = true;
                        i = x;
                        break;
                      }
                    }else connected = 0;
                  }
                }
                if (done) break;
              }
            }
            if (connected >= connectedRequirement && !played) {
              console.log("Diagonal Check 2");
              if (direction === "left") {
                if (i < 34 && (i%7 < 6) && (squares[i+8] === null)){
                  console.log("Botton Left Diagonal Defense");
                  squares[i+8] = "blue"; 
                  console.log(i);
                  played = true;                   
                } else if (squares[i-(connected*8)] === null) {  
                  console.log("Top Left Diagonal Defense");
                  squares[i-(connected*8)] = "blue";
                  console.log(i);
                  played = true;
                }

              } else if (direction === "right") {
                if (i < 35 && (i%7 > 0) && (squares[i+6] === null)) {
                  console.log("Top Right Diagonal Defense");
                  squares[i+6] = "blue";
                  console.log(i);
                  played = true;
                } else if (squares[i-(connected*6)] === null) {  
                  console.log("Top Right Diagonal Defense");
                  squares[i-(connected*6)] = "blue";
                  console.log(i);
                  played = true;
                }
              }
            }
            if (connectedRequirement < 2  && !played) {
              i = this.getRandomInt(42);
              console.log("Random Pick Outside of Connected");
              squares[i] = "blue";
              played = true;
            }
          }
        }
        console.log(this.state.squares)
        this.setState({
          squares: squares,
          redIsNext: true,
        })
        if (played) break;
      }
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
                value={"green"}
                onClick={() => this.resetBoard()}  
              />      
        );
    }

    fullBoard() {
      for (let i = 0; i < 42; i++)
      {
        if (this.state.squares[i] === null){
          return false;
        };
      }
      return true;
    }

    render() {
      
      let gameover = false;
      let full = this.fullBoard();
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
      if (full){
        status = "Tie Game...";
      }
      if (currentTurn == "red"){
        //this.blueTakeRandomTurn();
        this.blueTakeDefensiveTurn(); 
      }
      //if (currentTurn == "blue") this.redTakeRandomTurn();
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
        <h2 style={{color: "red"}}>Rules</h2>
        <p>- Red plays first, picking a square to change to their color </p>
        <p>- They click on any unplayed square to claim it on their turn</p>
        <p>- Once red plays, blue goes in the same manner</p>
        <p>- Play continues until one side gets four in a row</p>
        <p>- In the case of the board filling up, neither player wins</p> 
        </div>
      );
    }
  }

  class Credits extends React.Component {
    render() {
      return (
        <div>
          <h3>Made by David Sanders for CSCI 310: JavaScript</h3>
          <p>v 0.2.1</p>
        </div>
      )
    }
  }
  
  
  class Game extends React.Component {
    render() {
      return (
      <div className="page">
        <div className="header">
          <Header />
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <SignUp/>
          </div>
        </div>
        <Credits/>
        </div>
      </div>
      );
    }
  }
  

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root') || document.createElement('div')
  );
  
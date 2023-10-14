import React, { useState } from "react";

import ReactDOM from "react-dom";

import "./index.css";

function Board() {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);

  const handlerClickEvent = (i) => {
    const newSquares = [...squares];

    const winnerDeclared = Boolean(CalculateWinner(squares));
    const squareFilled = Boolean(newSquares[i]);

    if (winnerDeclared || squareFilled) {
      return;
    }

    newSquares[i] = isNext ? "X" : "O";
    setSquares(newSquares);
    setIsNext(!isNext);
  };

  const [isNext, setIsNext] = useState(true);
  const winner = CalculateWinner(squares);
  const status = winner
    ? `Winner :${winner}`
    : `Next Player: ${isNext ? "X" : "O"}`;

  const renderSquare = (i) => {
    return (
      <Square value={squares[i]} onClickEvent={() => handlerClickEvent(i)} />
    );
  };

  return (
    <div className="board">
      {status}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Square(props) {
  return (
    <div>
      <button className="square" onClick={props.onClickEvent}>
        {props.value}
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      Game
      <Board />
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));

function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 6, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

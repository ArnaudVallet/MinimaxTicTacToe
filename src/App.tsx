import React, { useState } from "react";
import "./App.scss";

import Board from "./Board";
import FeedbackBar from "./FeedbackBar";
import { Result } from "./Types";
import { calculateWinner, CopyBoard, minimax } from "./functions";

const App: React.FC = () => {

  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]

  const [values, setValues] = useState(emptyBoard);
  const [totalTurns, setTotalTurns] = useState(0);
  const [player, setPlayer] = useState(1);

  // useEffect(() => {
  //   console.log('composant App monté'); return () => {
  //     console.log('démonté');
  //   }
  // });

  const autoPlay = (board: number[][]) => {
    let bestScore = Infinity;
    let bestMove;
    let depth = Infinity;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === 0) {
          board[row][col] = -1;
          let move: any = minimax(board, true, 0)
          board[row][col] = 0;
          if (move.score <= bestScore) {
            if(move.score === bestScore && move.finalDepth < depth){
              bestScore = move.score;
              bestMove = { row, col };
              depth = move.finalDepth;
            } else {
              bestScore = move.score;
              bestMove = { row, col };
              depth = move.finalDepth;
            } 
          }
        }
      }
    }

    return bestMove as {row: number, col: number};
  };


  const playCell = (row: number, col: number) => {

    // Je copie values pour avoir une version exploitable
    const copy1 = CopyBoard(values);
    // X joue
    copy1[row][col] = player;

    //console.log(copy1);
    const res2: Result = calculateWinner(copy1);
    if (res2.winPlayer || res2.draw) { setValues(copy1); return; }

    // Je cherche le move à faire
    let move;
    if (!res2.winPlayer && !res2.draw) {
      move = autoPlay(copy1);
    }

    // Je met à jour mon DOM
    if (move) {
      copy1[move.row][move.col] = -1;
      setValues(copy1);
      setTotalTurns(totalTurns + 2);
      setPlayer(1);
    }

    return;
  };

  const resetGame = () => {
    setPlayer(1);
    setValues(emptyBoard);
    setTotalTurns(0);
  };

  const result: Result = calculateWinner(values);

  return (
    <div className="App">
      <div className="App-center">
        <h1 className="App-title">Tic Tac Toe</h1>
        <FeedbackBar {...{ player, result, resetGame }} />
        <Board {...{ values, result, playCell }} />
      </div>
    </div>
  );
};

export default App;

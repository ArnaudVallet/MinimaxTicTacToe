import React from "react";
import Cell from "./Cell";
import { Result } from "./Types";

type BoardProps = {
  values: number[][];
  result: Result;
  playCell: (row: number, cell: number) => void;
};

const Board = ({ values, result, playCell }: BoardProps) => {
  return (
    <div className="Board">
      {values.map((rowValues, row) => (
        <div key={row} className="Board-row">
          {rowValues.map((rowValue, col) => (
              <Cell
                key={col}
                value={rowValue}
                winCell={result.winCells ? result.winCells[row][col] : false}
                victory={!!result.winCells}
                playCell={() => playCell(row, col)}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;

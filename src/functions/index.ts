import { Result } from "./../Types";

export function calculateWinner(board: number[][]): Result {

    let winCells = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ];
    let isItaTie = true;
    const winConditions = [
        // Winning lines [ [row], [col] ]
        [[0, 0, 0], [0, 1, 2]],
        [[1, 1, 1], [0, 1, 2]],
        [[2, 2, 2], [0, 1, 2]],
        // Winning columns [ [row], [col] ]
        [[0, 1, 2], [0, 0, 0]],
        [[0, 1, 2], [1, 1, 1]],
        [[0, 1, 2], [2, 2, 2]],
        // Winning diags [ [row], [col] ]
        [[0, 1, 2], [0, 1, 2]],
        [[0, 1, 2], [2, 1, 0]],
    ];

    for (let i = 0; i < winConditions.length; i++) {

        const [row, col] = winConditions[i];
        const [a, b, c] = row;
        const [x, y, z] = col;

        if (board[a][x] === board[b][y] && board[a][x] === board[c][z] && board[a][x] !== 0) {
            winCells[a][x] = true;
            winCells[b][y] = true;
            winCells[c][z] = true;
            return {
                winPlayer: board[a][x],
                winCells
            }
            //console.log("\x1b[32m%s\x1b[0m", board[a][x] === 1 ? `Player X won` : `Player O won`);
        }
        if (isItaTie === true && (board[a][x] === 0 || board[b][y] === 0 || board[c][z] === 0)) {
            isItaTie = false;
        }
    }
    return { draw: isItaTie };
    //console.log('\x1b[36m%s\x1b[0m', isItaTie ? "TIE ! Nobody won this time !" : 'The game is still going on...');
}

export function CopyBoard(actualBoard: number[][]): number[][] {
    const copy = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            switch (actualBoard[row][col]) {
                case 1: copy[row][col] = 1
                    break;
                case -1: copy[row][col] = -1
                    break;
                default: copy[row][col] = 0
                    break;
            };
        };
    };
    return copy;
};

export const minimax = (board: number[][], isMaximizing: boolean, depth: number) => {
    const res: Result = calculateWinner(board);
    //if (res.winPlayer) { return { score: res.winPlayer, depth } as {score: number, depth: number} };
    if (res.winPlayer){
        return res.winPlayer === 1 ? { score: 1, depth } : { score: -1, depth }
    }
    if (res.draw) { return { score: 0, depth } };    

    let bestScore = isMaximizing ? -Infinity : Infinity;
    let finalDepth;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === 0) {
                board[row][col] = isMaximizing ? 1 : -1;
                //const score = minimax(board, !isMaximizing, depth + 1);
                const move: any = minimax(board, !isMaximizing, depth + 1);
                board[row][col] = 0;
                bestScore = isMaximizing ? Math.max(move.score, bestScore) : Math.min(move.score, bestScore);
                finalDepth = move.depth;
            }
        }
    }
    return { score: bestScore, finalDepth };
}

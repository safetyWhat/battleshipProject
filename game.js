class Gameboard {
    constructor(size) {
        this.boardSize = size;
        this.board = this.initializeBoard();
    }

    GameCell = class {
        constructor (row, col) {
            this.coord = row + '/' + col;
            this.ship = false;
            this.shot = false;
        }
    
        receiveAttack() {
            this.shot = true;
        }
    
        placeShip(name) {
            this.ship = name;
        }
    }

    initializeBoard() {
        const board = [];
        for (let i = 0; i < this.boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < this.boardSize; j++) {
                board[i][j] = new this.GameCell(i, j);
            }
        }
        return board;
    }
}

class Ship {
    constructor (length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits = this.hits + 1;
        if (this.hits === this.length) {
            this.isSunk();
        }
    }

    isSunk() {
        this.sunk = true;
    }
}

const randomNum = (n) => {
    const num = Math.floor(Math.random() * n)
    return num
};


const checkCells = (rows, cols, board) => {
    console.log(rows, cols)
    for (let i = 0; i < rows.length; i++) {
        console.log(board[rows[i]][cols[i]].ship)
        if (board[rows[i]][cols[i]].ship !== false) {
            return false;
        }
    }
    return true;
}

const selectCells = (rows, cols, board, name) => {
    for (let i = 0; i < rows.length; i++) {
        board[rows[i]][cols[i]].placeShip(name);
    }
}

const setShip = (boardSize, board, shipName, length) => {
    let row = randomNum(boardSize);
    let col = randomNum(boardSize);
    console.log(row, col)
    const direction = randomNum(2);
    const rowNum = [];
    const colNum = [];

    if (direction == 0) { //set ship horizontal
        if (col + (length) > boardSize) {
            col = col - ((col + length) - boardSize)
        }
        for (let i = 0; i < length; i++) {
            rowNum.push(row);
            colNum.push(col);
            col = col + 1;
        }
    } else { //set ship vertical
        if (row + (length) > boardSize) {
            row = row - ((row + length) - boardSize)
        }
        for (let i = 0; i < length; i++) {
            rowNum.push(row);
            colNum.push(col);
            row = row + 1;
        }
    }
    if (checkCells(rowNum, colNum, board)) {
        selectCells(rowNum, colNum, board, shipName);
    } else {
        setShip(boardSize, board, shipName, length);
    }
};

const game = new Gameboard(3);
const patrol = new Ship(2)
const patrol2 = new Ship(2)
console.log(patrol, patrol2);
setShip(3, game.board, 'patrol', patrol.length)
setShip(3, game.board, 'patrol2', patrol2.length)
let count = 0;
for (let i = 0; i < game.board.length; i++) {
    for (let j = 0; j < game.board[i].length; j++) {
        if (game.board[i][j].ship !== false) {
            count++;
        }
    }
};
console.log(count);
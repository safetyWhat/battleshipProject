export class Ship {
    constructor (name, length) {
        this.name = name
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    setShip(boardSize, board) {
        let row = randomNum(boardSize);
        let col = randomNum(boardSize);
        const direction = randomNum(2);
        //these will hold the coordinates to test on the board
        const rowNum = [];
        const colNum = [];
    
        if (direction == 0) { //set ship horizontal
            if (col + (this.length) > boardSize) {
                col = col - ((col + this.length) - boardSize)
            }
            for (let i = 0; i < this.length; i++) {
                rowNum.push(row);
                colNum.push(col);
                col = col + 1;
            }
        } else { //set ship vertical
            if (row + (this.length) > boardSize) {
                row = row - ((row + this.length) - boardSize)
            }
            for (let i = 0; i < this.length; i++) {
                rowNum.push(row);
                colNum.push(col);
                row = row + 1;
            }
        }
        console.log(rowNum, colNum)
        if (checkCells(rowNum, colNum, board)) {
            selectCells(rowNum, colNum, board, this.name);
        } else {
            this.setShip(boardSize, board);
        }
    };

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

export const checkCells = (rows, cols, board) => {
    for (let i = 0; i < rows.length; i++) {
        if (board[rows[i]][cols[i]].ship !== false) {
            return false;
        }
    }
    return true;
}

export const selectCells = (rows, cols, board, name) => {
    for (let i = 0; i < rows.length; i++) {
        board[rows[i]][cols[i]].placeShip(name);
    }
}
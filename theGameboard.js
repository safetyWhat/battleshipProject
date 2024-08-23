export class Gameboard {
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
    
        placeShip() {
            this.ship = true;
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
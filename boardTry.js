class BattleshipGame {
    constructor(boardSize = 10) {
        this.boardSize = boardSize;
        this.gameBoard = this.initializeBoard();
    }

    initializeBoard() {
        const board = [];
        for (let i = 0; i < this.boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < this.boardSize; j++) {
                board[i][j] = '~';  // '~' represents water
            }
        }
        return board;
    }

    placeShip(row, col, length, horizontal = true) {
        if (horizontal) {
            for (let i = 0; i < length; i++) {
                this.gameBoard[row][col + i] = 'S';  // 'S' represents a ship
            }
        } else {
            for (let i = 0; i < length; i++) {
                this.gameBoard[row + i][col] = 'S';  // 'S' represents a ship
            }
        }
    }

    renderBoard() {
        const gameBoardElement = document.createElement('table');
        gameBoardElement.setAttribute('id', 'gameBoard');
        gameBoardElement.style.borderCollapse = 'collapse';
        gameBoardElement.style.margin = '20px auto';

        for (let i = 0; i < this.boardSize; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < this.boardSize; j++) {
                const cell = document.createElement('td');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.style.width = '30px';
                cell.style.height = '30px';
                cell.style.border = '1px solid black';
                cell.style.textAlign = 'center';
                cell.style.verticalAlign = 'middle';
                cell.style.cursor = 'pointer';
                row.appendChild(cell);
            }
            gameBoardElement.appendChild(row);
        }

        document.body.appendChild(gameBoardElement);

        // Handle user clicks
        gameBoardElement.addEventListener('click', (e) => this.handleClick(e));
    }

    handleClick(event) {
        const target = event.target;
        if (target.tagName === 'TD') {
            const row = target.dataset.row;
            const col = target.dataset.col;

            if (this.gameBoard[row][col] === 'S') {
                target.classList.add('hit');
                target.style.backgroundColor = 'red';
                this.gameBoard[row][col] = 'X';  // 'X' indicates a hit
            } else if (this.gameBoard[row][col] === '~') {
                target.classList.add('miss');
                target.style.backgroundColor = 'blue';
                this.gameBoard[row][col] = 'O';  // 'O' indicates a miss
            }
        }
    }
}

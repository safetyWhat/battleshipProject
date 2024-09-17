const player1grid = document.getElementById('player1_grid');
const player2grid = document.getElementById('player2_grid');
const shipList = [
    {name: 'carrier', length: 5},
    {name: 'battleship', length: 4},
    {name: 'destroyer', length: 3},
    {name: 'submarine', length: 3},
    {name: 'patrol boat', length: 2}
]

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
        //console.log(rowNum, colNum)
        if (checkCells(rowNum, colNum, board)) {
            selectCells(rowNum, colNum, board, this);
        } else {
            this.setShip(boardSize, board);
        }
    };

    hit() {
        this.hits += 1;
        if (this.hits === this.length) {
            this.isSunk();
        }
    }

    isSunk() {
        this.sunk = true;
    }
}

class Player {
    constructor (type, size) {
        this.type = type;
        this.game = new Gameboard(size);
        this.ships = this.createShips(size)
    }

    createShips(boardSize) {
        const ships = [];
        for (let i = 0; i < shipList.length; i++) {
            ships[i] = new Ship(shipList[i].name, shipList[i].length);
            //ships.push(ship);
            ships[i].setShip(boardSize, this.game.board);
        }
        return ships;
    }
}

const randomNum = (n) => {
    const num = Math.floor(Math.random() * n)
    return num
};

const checkCells = (rows, cols, board) => {
    for (let i = 0; i < rows.length; i++) {
        if (board[rows[i]][cols[i]].ship !== false) {
            return false;
        }
    }
    return true;
}

const selectCells = (rows, cols, board, name) => {
    console.log(rows, cols)
    for (let i = 0; i < rows.length; i++) {
        board[rows[i]][cols[i]].placeShip(name);
    }
}

const shotTest  = (cellValue) => {
    let cellClass = 'none';
    if (cellValue.shot == true && cellValue.ship != false) { //shot fired on a ship
        cellClass = 'hit';
        return cellClass;
    } else if (cellValue.shot == true && cellValue.ship == false) { //shot fired but no ship
        cellClass = 'miss';
        return cellClass;
    } else { //no shot fired
        return cellClass;
    }
};

const displayBoard = (gridCont, game) => {
    for (let i = 0; i < game.board.length; i++) {
        const row = document.createElement('div');
        row.setAttribute('class', 'gridRow')
        gridCont.appendChild(row);

        for (let j = 0; j < game.board[i].length; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'gridCell');
            cell.classList.add(`${shotTest(game.board[i][j])}`);
            cell.setAttribute('id', `${game.board[i][j].coord}`);
            row.appendChild(cell);
        }
    }
};

const shotFired = (board, row, col) => {
    const shotCell = board[row][col];
    if (shotCell.ship == false && shotCell.shot == false) {
        shotCell.receiveAttack()
        console.log('miss');
    } else if (shotCell.ship != false && shotCell.shot == false) {
        shotCell.receiveAttack();
        const ship = shotCell.ship; //should provide ship name
        ship.hit();
        console.log('hit', ship);
    }
}

player1grid.addEventListener('click', function(e) {
    if (e.target.classList.contains('gridCell')) {
        console.log('click')
        const coord = e.target.id;
        row = coord.charAt(0);
        col = coord.charAt(coord.length-1);
        shotFired(playerOne.game.board, row, col);
        player1grid.innerHTML = '';
        displayBoard(player1grid, playerOne.game);
    }
})

player2grid.addEventListener('click', function(e) {
    if (e.target.classList.contains('gridCell')) {
        console.log('click')
        const coord = e.target.id;
        row = coord.charAt(0);
        col = coord.charAt(coord.length-1);
        shotFired(playerTwo.game.board, row, col);
        player2grid.innerHTML = '';
        displayBoard(player2grid, playerTwo.game);
    }
})

/*const game = new Gameboard(10);
const patrol = new Ship('patrol', 2);
console.log(patrol, patrol.hits, patrol.sunk)
const destroyer = new Ship('destroyer', 3);
console.log(destroyer)
patrol.setShip(game.boardSize, game.board);
destroyer.setShip(game.boardSize, game.board);
shotFired(game.board, randomNum(game.boardSize), randomNum(game.boardSize));
shotFired(game.board, randomNum(game.boardSize), randomNum(game.boardSize));
shotFired(game.board, randomNum(game.boardSize), randomNum(game.boardSize));
shotFired(game.board, randomNum(game.boardSize), randomNum(game.boardSize));
console.log(patrol, destroyer)*/
const playerOne = new Player('real', 7);
console.log(playerOne);
const playerTwo = new Player('real', 7);
console.log(playerTwo);
displayBoard(player1grid, playerOne.game);
displayBoard(player2grid, playerTwo.game);
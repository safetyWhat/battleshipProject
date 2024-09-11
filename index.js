import { Gameboard } from "./theGameboard";

const player1grid = document.getElementById('player1_grid');

const shotTest  = (cellValue) => {
    let cellClass = '';
    if (cellValue.shot == true && cellValue.ship == true) { //shot fired on a ship
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
        gridCont.appendChild(row);

        for (let j = 0; j < game.board[i].length; j++) {
            const cell = document.createElement('div');
            cell.classList.add(`${shotTest(game.board[i][j])}`);
            cell.setAttribute('id', `${game.board[i][j].coord}`);
            row.appendChild(cell);
        }
    }
};

const game = new Gameboard(5);
displayBoard(player1grid, game);
//issues with modules. need to compile with webpack or something. ugh

import { Gameboard } from "./theGameboard";
import { Ship, checkCells, selectCells, setShip } from "./ships";

describe('battleship test', () => {
    it('board construction', () => {
        expect(new Gameboard(2).board).toEqual(
            [[{'coord': '0/0', "shot": false, "ship": false}, {'coord': '0/1', "shot": false, "ship": false}], [{'coord': '1/0', "shot": false, "ship": false}, {'coord': '1/1', "shot": false, "ship": false}]]
        )
    })
    it('single cell value', () => {
        expect(new Gameboard(3).board[2][2]).toEqual({'coord': '2/2', 'shot': false, 'ship': false})
    })
    it('shot fired and ship placed', () => {
        const game = new Gameboard(3);
        game.board[2][1].receiveAttack();
        game.board[2][1].placeShip('patrol');
        expect(game.board[2][1]).toEqual({'coord': '2/1', 'shot': true, 'ship': 'patrol'});
        const rows = [0, 1];
        const cols = [1, 1];
        expect(checkCells(rows, cols, game.board)).toEqual(true);
        selectCells(rows, cols, game.board, 'patrol');
        expect(game.board[0][1]).toEqual({'coord': '0/1', 'shot': false, 'ship': 'patrol'});
        expect(game.board[1][1]).toEqual({'coord': '1/1', 'shot': false, 'ship': 'patrol'});
    })
    it('ship construction', () => {
        const carrier = new Ship(5);
        expect(carrier).toEqual({'length': 5, 'hits': 0, 'sunk': false});
        expect(carrier.length).toEqual(5);
        carrier.hit();
        expect(carrier.hits).toEqual(1);
    })
    it('set ship random', () => {
        const game = new Gameboard(3);
        const patrol = new Ship(2);
        const destroyer = new Ship(3);
        setShip(3, game.board, 'patrol', patrol.length);
        setShip(3, game.board, 'destroyer', destroyer.length);
        let count = 0;
        for (let i = 0; i < game.board.length; i++) {
            for (let j = 0; j < game.board[i].length; j++) {
                if (game.board[i][j].ship !== false) {
                    count++
                }
            }
        }
        expect(count).toEqual(5);
    })
})
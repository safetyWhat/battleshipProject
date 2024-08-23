import { Gameboard } from "./theGameboard";

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
        game.board[1][1].placeShip();
        expect(game.board[2][1]).toEqual({'coord': '2/1', 'shot': true, 'ship': false});
        expect(game.board[1][1]).toEqual({'coord': '1/1', 'shot': false, 'ship': true});
    })
})
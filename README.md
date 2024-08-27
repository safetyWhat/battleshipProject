# battleshipProject
TOP: Battleship Project

Create an app that allows a player to play against the computer or another player.

Grid selection of 10x10 or 8x8.

Ships: Carrier (5), Battleship (4), Destroyer (3), Submarine (3), Patrol Boat (2).
Ships have length, number of hits, and sunk.

Gameboard is an object of references (a1, b1, c1, a2, b2, c2, etc.) That each coordinate with have references: (ship(t/f); hit(t/f))

Gameboard pseudo code
1. build a 10x10 board.
2. place carrier
    1. randomly select a cell and direction
    2. test if all 5 cells in the direction are without ships
    3. if all cells are without ships place carrier ship in all cells
3. place battleship
    1. randomly select a cell and direction
    2. test if all 4 cells in the direction are without ships
    3. if all cells are without ships place battleship in all cells
4. continue you this process until all ships are placed.

pseudo try again:
Set 2 player(s)
    receive/assign name(s)
    construct boards
        build row
            construct cells
    place ships

ship placement:
    create ship. const carrier = new Ship(5);
    place ship.
        for (let i = 0; i < carrier.length; i++) {

        }
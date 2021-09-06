import {Tile} from "./Tile";


export class GameMap {
    //hesitating whether making it private with some getters, but maybe its faster allowing directly
    // and setting private what it is really intern of this class.
    readonly rows: number;
    readonly columns: number;
    readonly bombs: number;
    private readonly gameMap: Tile[][];
    userMarkedBombsCounter: number;
    uncoveredTiles: number;
    private booom: boolean;


    constructor(rows:number, columns:number, bombs:number) {
        this.rows = rows
        this.columns = columns;
        this.bombs = Math.min(bombs, rows * columns);
        this.userMarkedBombsCounter = 0;
        this.uncoveredTiles = 0;
        this.booom = false;

        // maybe do something funny here
        // if (bombs > rows * columns) {
        //     throw new Error("haha very funny, now wait for an eternity")
        // }

        let bombMapWithoutBombs = GameMap.generateBombMapFuckWay(rows, columns)
        let bombMapWithBombs = GameMap.addBombsToBombMap(bombMapWithoutBombs, rows, columns, bombs)
        this.gameMap =  this.generateMap(bombMapWithBombs)
        this.addAdjacentTiles(this.gameMap)
    }


    getGameMap():Tile[][]
    {
        return this.gameMap.slice()
    }

    getIsGameOver():boolean
    {
        return this.booom
    }

    getIsGameWon(): boolean
    {
        return this.uncoveredTiles >= (this.rows * this.columns) - this.bombs;
    }

    private static generateBombMapFuckWay(rows:number, columns:number):boolean[][] {
        let bombMap = [];
        for (let rowsIndex = 0; rowsIndex < rows; rowsIndex++) {
            let arrayRow = [];
            for (let columnsIndex = 0; columnsIndex < columns; columnsIndex++) {
                arrayRow.push(false)
            }

            bombMap[rowsIndex] = arrayRow;
        }
        return bombMap;
    }

    private static addBombsToBombMap(bombMap: boolean[][], rows:number, columns:number, bombs:number ): boolean[][] {
        let bombRow = GameMap.getRandomInt(rows)
        let bombColumn = GameMap.getRandomInt(columns)
        for (let bombsInMap = 0; bombsInMap < bombs; bombsInMap++) {
            // keep searching until a position doesn't have one.
            while(bombMap[bombRow][bombColumn]) {
                bombRow = GameMap.getRandomInt(rows);
                bombColumn = GameMap.getRandomInt(columns)
            }
            bombMap[bombRow][bombColumn] = true;
        }
        return bombMap
    }

    private generateMap(bombMap:boolean[][]):Tile[][] {
        return bombMap.map((row:boolean[], rowIndex) => {
            return row.map((hasBomb:boolean, columnIndex) => {
                return new Tile(hasBomb, rowIndex, columnIndex)
            });
        });
    }

    private addAdjacentTiles(aGameMap: Tile[][]):void {
        aGameMap.map((row:Tile[], rowStep) => {
            return row.map((tile:Tile, columnStep) => {
                let adjacentTiles = this.getAdjacentTiles(tile, aGameMap);
                // not sure map is the best way, it forces to return something but Iam just modifiyns something
                adjacentTiles.map(adjacentTile => {
                     tile.addAdjacentTile(adjacentTile)
                    return true;
                })
                return true;
            });
        });
    }

    // this one can be public
    getAdjacentTiles(aTile:Tile, aGameMap:Tile[][]):Tile[] {
        let adjacentTiles = [];
        // get previous row tiles
        if (aTile.row - 1 >= 0) {
            if (aTile.column - 1 >= 0) {
                adjacentTiles.push(aGameMap[aTile.row-1][aTile.column-1]);
            }
            adjacentTiles.push(aGameMap[aTile.row-1][aTile.column]);
            if (aTile.column + 1 < aGameMap[aTile.row-1].length) {
                adjacentTiles.push(aGameMap[aTile.row-1][aTile.column+1]);
            }
        }
        // get current row
        if (aTile.column - 1 >= 0) {
            adjacentTiles.push(aGameMap[aTile.row][aTile.column-1]);
        }
        if (aTile.column + 1 < aGameMap[aTile.row].length) {
            adjacentTiles.push(aGameMap[aTile.row][aTile.column+1]);
        }
        // get next row tiles
        if (aTile.row + 1 < aGameMap.length) {
            if (aTile.column - 1 >= 0) {
                adjacentTiles.push(aGameMap[aTile.row+1][aTile.column-1]);
            }
            adjacentTiles.push(aGameMap[aTile.row+1][aTile.column]);
            if (aTile.column + 1 < aGameMap[aTile.row+1].length) {
                adjacentTiles.push(aGameMap[aTile.row+1][aTile.column+1]);
            }
        }
        return adjacentTiles;
    }

    private static getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
    }

    revealAllMap():Tile[][] {
        for (let row = 0; row < this.gameMap.length; row++) {
            for (let column = 0; column < this.gameMap[row].length; column++) {
                this.gameMap[row][column].uncovered = true
            }
        }
        return this.gameMap.slice()
    }

    uncoverTile(row:number, column:number): Tile[][] {
        let tileToUncover = this.gameMap[row][column]
        this.uncoveredTiles += tileToUncover.uncoverTile()
        if (tileToUncover.hasBomb) {
            this.booom = true;
        }
        return this.gameMap.slice()
    }

    markTileWithBomb(row:number, column:number):Tile[][] {
        if (this.gameMap[row][column].markedWithBomb) {
            this.userMarkedBombsCounter--
        } else {
            this.userMarkedBombsCounter++
        }
        this.gameMap[row][column].markedWithBomb = ! this.gameMap[row][column].markedWithBomb;
        return this.gameMap.slice()
    }

    getUserBombsCounter():number
    {
        return this.bombs - this.userMarkedBombsCounter;
    }

    uncoverSurroundingTiles(row:number, column:number): Tile[][] {
        let adjacentTilesMarkedWithBombs = 0

        for (let adjacentTileCounter = 0; adjacentTileCounter < this.gameMap[row][column].adjacentTiles.length; adjacentTileCounter++) {
            if(this.gameMap[row][column].adjacentTiles[adjacentTileCounter].markedWithBomb) {
                adjacentTilesMarkedWithBombs++
            }
        }

        if (this.gameMap[row][column].adjacentBombsCounter !== adjacentTilesMarkedWithBombs) {
            // teh exact same, doing absolutely nothing in this case.
            return this.gameMap;
        }

        // maybe check first for bombs before uncovering them. So I can copy more or lesss the behaviour on
        // the game I play, that it only shows were the surroinding bombs are if you loose.

        for (let adjacentTileCounter = 0; adjacentTileCounter < this.gameMap[row][column].adjacentTiles.length; adjacentTileCounter++) {
            let surroundingTile = this.gameMap[row][column].adjacentTiles[adjacentTileCounter]
            if (surroundingTile.hasBomb && !surroundingTile.markedWithBomb) {
                this.booom = true;
            }
            this.uncoveredTiles += surroundingTile.uncoverTile()
        }
        return this.gameMap.slice()
    }


}

import {Tile} from "./Tile";


export class GameMap {
    //hesitating whether making it private with some getters, but maybe its faster allowing directly
    // and setting private what it is really intern of this class.
    readonly rows: number;
    readonly columns: number;
    readonly bombs: number;
    private readonly bombMap: boolean[][];
    private readonly gameMap: Tile[][];
    userMarkedBombsCounter: number;
    private booom: boolean;


    constructor(rows:number, columns:number, bombs:number) {
        this.rows = rows
        this.columns = columns;
        this.bombs = Math.min(bombs, rows * columns);
        this.userMarkedBombsCounter = 0;
        this.booom = false;

        // maybe do something funny here
        // if (bombs > rows * columns) {
        //     throw new Error("haha very funny, now wait for an eternity")
        // }

        this.bombMap = this.generateBombMapFuckWay()
        this.addBombsToBombMap()
        this.gameMap = this.generateMap()
        this.addAdjacentTiles()
    }

    getGameMap():Tile[][]
    {
        return this.gameMap.slice()
    }

    getIsGameOver():boolean
    {
        return this.booom
    }

    private generateBombMapFuckWay():boolean[][] {
        let rows;
        let bombMap = [];
        for (rows = 0; rows < this.rows; rows++) {
            // can't pass an array inside fill, but a single value we can.
            bombMap[rows] = new Array<boolean>(this.columns).fill(false)
        }
        return bombMap;
    }

    private addBombsToBombMap(): void {
        let bombRow = GameMap.getRandomInt(this.rows)
        let bombColumn = GameMap.getRandomInt(this.columns)
        for (let bombsInMap = 0; bombsInMap < this.bombs; bombsInMap++) {
            // keep searching until a position doesn't have one.
            while(this.bombMap[bombRow][bombColumn]) {
                bombRow = GameMap.getRandomInt(this.rows);
                bombColumn = GameMap.getRandomInt(this.columns)
            }
            this.bombMap[bombRow][bombColumn] = true;
        }
    }

    private generateMap():Tile[][] {
        return this.bombMap.map((row:boolean[], rowIndex) => {
            return row.map((hasBomb:boolean, columnIndex) => {
                return new Tile(hasBomb, rowIndex, columnIndex)
            });
        });
    }

    private addAdjacentTiles():void {
        this.gameMap.map((row:Tile[]) => {
            return row.map((tile:Tile) => {
                let adjacentTiles = this.getAdjacentTiles(tile);
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
    getAdjacentTiles(aTile:Tile):Tile[] {
        let adjacentTiles = [];
        // get previous row tiles
        if (aTile.row - 1 >= 0) {
            if (aTile.column - 1 >= 0) {
                adjacentTiles.push(this.gameMap[aTile.row-1][aTile.column-1]);
            }
            adjacentTiles.push(this.gameMap[aTile.row-1][aTile.column]);
            if (aTile.column + 1 < this.gameMap[aTile.row-1].length) {
                adjacentTiles.push(this.gameMap[aTile.row-1][aTile.column+1]);
            }
        }
        // get current row
        if (aTile.column - 1 >= 0) {
            adjacentTiles.push(this.gameMap[aTile.row][aTile.column-1]);
        }
        if (aTile.column + 1 < this.gameMap[aTile.row].length) {
            adjacentTiles.push(this.gameMap[aTile.row][aTile.column+1]);
        }
        // get next row tiles
        if (aTile.row + 1 < this.gameMap.length) {
            if (aTile.column - 1 >= 0) {
                adjacentTiles.push(this.gameMap[aTile.row+1][aTile.column-1]);
            }
            adjacentTiles.push(this.gameMap[aTile.row+1][aTile.column]);
            if (aTile.column + 1 < this.gameMap[aTile.row+1].length) {
                adjacentTiles.push(this.gameMap[aTile.row+1][aTile.column+1]);
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
        tileToUncover.uncoverTile()
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
            surroundingTile.uncoverTile()
        }
        return this.gameMap.slice()
    }


}

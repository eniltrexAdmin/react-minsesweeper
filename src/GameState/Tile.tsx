export class Tile {
    readonly hasBomb: boolean;
    readonly row: number;
    readonly column: number;
    uncovered: boolean;
    markedWithBomb: boolean;
    adjacentTiles: Tile[];
    adjacentBombsCounter: number;

    constructor(hasBomb:boolean, row:number, column:number) {
        this.hasBomb = hasBomb
        this.row = row
        this.column = column
        this.uncovered = false;
        this.markedWithBomb = false;
        this.adjacentBombsCounter = 0;
        this.adjacentTiles = []
    }

    addAdjacentTile(Tile:Tile) {
        this.adjacentTiles.push(Tile);
        if (Tile.hasBomb) {
            this.adjacentBombsCounter++
        }
    }

    uncoverTile() {
        if (! this.markedWithBomb) {
            this.uncovered = true;
            // chain Reaction.
            if (this.adjacentBombsCounter === 0) {
                // chain reaction
                for (let i = 0; i < this.adjacentTiles.length; i++) {
                    if (!this.adjacentTiles[i].uncovered) {
                        this.adjacentTiles[i].uncoverTile()
                    }
                }
            }
        }
    }
}


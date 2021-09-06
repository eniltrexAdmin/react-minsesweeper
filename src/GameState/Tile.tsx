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

    addAdjacentTile(adjacentTile:Tile): void {
        this.adjacentTiles.push(adjacentTile);
        if (adjacentTile.hasBomb) {
            this.adjacentBombsCounter++
        }
    }

    uncoverTile(): number {
        if (! this.markedWithBomb) {
            if ( ! this.uncovered) {
                let uncoveredTiles = 1;
                this.uncovered = true;
                // chain Reaction.
                if (this.adjacentBombsCounter === 0) {
                    // chain reaction
                    for (let i = 0; i < this.adjacentTiles.length; i++) {
                        if (!this.adjacentTiles[i].uncovered) {
                            uncoveredTiles += this.adjacentTiles[i].uncoverTile()
                        }
                    }
                }
                return uncoveredTiles;
            }
        }
        return 0;
    }
}


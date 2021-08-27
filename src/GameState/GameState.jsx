import React from 'react';
import Board from "./Board";

export default class GameState extends React.Component {

    constructor(props) {
        super(props);
        let bombMap = generateBombMap(this.props.columns, this.props.rows, this.props.bombs);
        let gameMap = createGameMap(bombMap);
        // this.uncoverTile = this.uncoverTile.bind(this);
        this.state = {
            gameMap: gameMap
        }
    }

    handleClick(x, y) {
        let newGameMap = this.state.gameMap.slice()
        if (newGameMap[x][y].hasBomb) {
            alert('die');
        }
        uncoverTile(newGameMap, newGameMap[x][y]);
        // newGameMap[x][y].uncovered = true;
        this.setState({
            gameMap: newGameMap
        });
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        gameMap = {this.state.gameMap}
                        onClick = {(x, y) => this.handleClick(x, y)}
                    />
                </div>
            </div>
        );
    }
}

function generateBombMap(columns, rows, bombs) {
    let bombMap = [];
    for (let numRows = 0; numRows < rows; numRows++) {
        let gameRow = [];
        for (let numColumns = 0; numColumns < columns; numColumns++) {
            gameRow.push({hasBomb: Math.random() > 0.8})
        }
        bombMap.push(gameRow)
    }
    return bombMap
}

function createGameMap(bombMap) {
    let completeGameMap =[];
    for (let rows = 0; rows < bombMap.length; rows ++) {
        let CompleteGameRow = [];
        for (let columns = 0; columns < bombMap[rows].length; columns++) {
            CompleteGameRow.push({
                hasBomb: bombMap[rows][columns].hasBomb,
                uncovered: false
            });
        }
        completeGameMap.push(CompleteGameRow)
    }
    addAdjacentTiles(completeGameMap)
    addAdjacentBombsTile(completeGameMap)
    return completeGameMap;
}

function addAdjacentTiles(completeGameMap) {
    for (let row = 0; row < completeGameMap.length; row++) {
        for (let column = 0; column < completeGameMap[row].length; column++) {
            completeGameMap[row][column].adjacentTiles = getAdjacentTiles(completeGameMap, row, column)
        }
    }
}

function addAdjacentBombsTile(completeGameMap) {
    for (let row = 0; row < completeGameMap.length; row++) {
        for (let column = 0; column < completeGameMap[row].length; column++) {
            let adjacentBombs = 0;
            for (let adjacentTile = 0; adjacentTile <  completeGameMap[row][column].adjacentTiles.length; adjacentTile++) {
                if(completeGameMap[row][column].adjacentTiles[adjacentTile].hasBomb) {
                    adjacentBombs++;
                }
            }
            completeGameMap[row][column].adjacentBombsCounter = adjacentBombs
        }
    }
}

function getAdjacentTiles(completeGameMap, row, column) {
    let adjacentTiles = [];
    // get previous row tiles
    if (row - 1 >= 0) {
        if (column - 1 >= 0) {
            adjacentTiles.push(completeGameMap[row-1][column-1]);
        }
        adjacentTiles.push(completeGameMap[row-1][column]);
        if (column + 1 < completeGameMap[row-1].length) {
            adjacentTiles.push(completeGameMap[row-1][column+1]);
        }
    }
    // get current row
    if (column - 1 >= 0) {
        adjacentTiles.push(completeGameMap[row][column-1]);
    }
    if (column + 1 < completeGameMap[row].length) {
        adjacentTiles.push(completeGameMap[row][column+1]);
    }
    // get next row tiles
    if (row + 1 < completeGameMap.length) {
        if (column - 1 >= 0) {
            adjacentTiles.push(completeGameMap[row+1][column-1]);
        }
        adjacentTiles.push(completeGameMap[row+1][column]);
        if (column + 1 < completeGameMap[row+1].length) {
            adjacentTiles.push(completeGameMap[row+1][column+1]);
        }
    }
    return adjacentTiles;
}


function uncoverTile(gameMap, tile) {
    tile.uncovered = true;
    // chain Reaction.
    if (tile.adjacentBombsCounter === 0) {
        // chain reaction
        for( let i = 0; i < tile.adjacentTiles.length; i++) {
            if (! tile.adjacentTiles[i].uncovered) {
                uncoverTile(gameMap, tile.adjacentTiles[i]);
            }
        }
    }
}
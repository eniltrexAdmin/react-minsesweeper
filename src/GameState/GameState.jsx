import React from 'react';
import Board from "./Board";
import StatusBar from "./StatusBar";

export default class GameState extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        // this.startGame(this.props.rows, this.props.columns, this.props.bombs)
        let gameMap = generateNewMap(this.props.rows, this.props.columns, this.props.bombs);
        this.state = {
            gameOver: false,
            gameMap: gameMap,
            bombsCounter: this.props.bombs
        }
    }

    startGame(rows, columns, bombs) {
        this.setState({
            gameMap: generateNewMap(rows, columns, bombs),
            bombsCounter: this.state.bombsCounter
        });
    }

    newGame() {
        this.props.gameOver();
    }

    gameOver() {
        let newGameMap = this.state.gameMap.slice();
        alert("BOOM!");
        uncoverMap(newGameMap);
        this.setState({
            gameOver: true,
            gameMap: newGameMap,
            bombsCounter: this.state.bombsCounter
        });
    }

    handleClick(x, y) {
        let newGameMap = this.state.gameMap.slice()
        if (newGameMap[x][y].hasBomb) {
           this.gameOver()
        }
        uncoverTile(newGameMap, newGameMap[x][y]);
        // newGameMap[x][y].uncovered = true;
        this.setState({
            gameMap: newGameMap,
            bombsCounter: this.state.bombsCounter
        });
    }

    handleContextMenu(e, x,y) {
        e.preventDefault()
        let newGameMap = this.state.gameMap.slice();
        let bombsCounter =  this.state.bombsCounter;
        if (newGameMap[x][y].markedWithBomb) {
            bombsCounter++;
        } else {
            bombsCounter--;
        }
        newGameMap[x][y].markedWithBomb = ! newGameMap[x][y].markedWithBomb;
        this.setState({
            gameMap: newGameMap,
            bombsCounter: bombsCounter
        });
    }

    handleMouseDown(e, x, y) {
        e.preventDefault();
        //first check if the adjacentTiles marked with bombs sum up exactly to the bombCounter in the currentTile
        let adjacentTilesMarkedWithBombs = 0

        for (let adjacentTileCounter = 0; adjacentTileCounter < this.state.gameMap[x][y].adjacentTiles.length; adjacentTileCounter++) {
            if(this.state.gameMap[x][y].adjacentTiles[adjacentTileCounter].markedWithBomb) {
                adjacentTilesMarkedWithBombs++
            }
        }

        if (this.state.gameMap[x][y].adjacentBombsCounter === adjacentTilesMarkedWithBombs) {
            let newGameMap = this.state.gameMap.slice();
            for(let adjacentTileCounter = 0; adjacentTileCounter < newGameMap[x][y].adjacentTiles.length; adjacentTileCounter++) {
                let tile = newGameMap[x][y].adjacentTiles[adjacentTileCounter]
                if(tile.hasBomb) {
                    this.gameOver();
                }
                if (!tile.markedWithBomb) {
                    uncoverTile(newGameMap, tile)
                }
            }
            this.setState({
                gameMap: newGameMap,
                bombsCounter: this.state.bombsCounter
            });
        }
    }

    render() {

        return (
            <div className="game" >
                <StatusBar bombsCounter = {this.state.bombsCounter} />
                <div className="game-board">
                    <Board
                        gameMap = {this.state.gameMap}
                        onClick = {(x, y) => this.handleClick(x, y)}
                        onContextMenu = {(e, x, y) => this.handleContextMenu(e, x, y)}
                        onMouseDown = {(e, x, y) => this.handleMouseDown(e, x, y)}
                    />
                </div>
            </div>
        );
    }
}

function generateNewMap(rows, column, bombs) {
    let bombMap = generateBombMap(rows, column, bombs)
    // console.log(bombMap);
    return createGameMap(bombMap);
}

function generateBombMap(rows, columns, bombs) {
    let bombMap = [];
    for (let row = 0; row < rows; row++) {
        let bombMapRow = [];
        for (let column = 0; column < columns; column++) {
            bombMapRow.push(false)
        }
        bombMap.push(bombMapRow)
    }
    if(bombs > rows*columns) {

        throw new Error("haha very funny, now wait for an eternity")
    }
    let bombRow = getRandomInt(rows);
    let bombColumn = getRandomInt(columns)
    for (let bombsInMap = 0; bombsInMap < bombs; bombsInMap++) {
        // keep searching until a position doesn't have one.
        while(bombMap[bombRow][bombColumn]) {
            bombRow = getRandomInt(rows);
            bombColumn = getRandomInt(columns)
        }
        bombMap[bombRow][bombColumn] = true;
    }
    return bombMap
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createGameMap(bombMap) {
    let completeGameMap =[];
    for (let row = 0; row < bombMap.length; row ++) {
        let CompleteGameRow = [];
        for (let column = 0; column < bombMap[row].length; column++) {
            CompleteGameRow.push({
                hasBomb: bombMap[row][column],
                uncovered: false,
                markedWithBomb: false
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
    if (! tile.markedWithBomb) {
        tile.uncovered = true;
        // chain Reaction.
        if (tile.adjacentBombsCounter === 0) {
            // chain reaction
            for (let i = 0; i < tile.adjacentTiles.length; i++) {
                if (!tile.adjacentTiles[i].uncovered) {
                    uncoverTile(gameMap, tile.adjacentTiles[i]);
                }
            }
        }
    }
}

function uncoverMap(gameMap) {
    for (let row = 0; row < gameMap.length; row++) {
        for (let column = 0; column < gameMap[row].length; column++) {
            gameMap[row][column].uncovered = true
        }
    }
}
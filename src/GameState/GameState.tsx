import React from 'react';
import Board from "./Board";
import StatusBar from "./StatusBar";
import {GameMap} from "./GameMap";
import {Tile} from "./Tile";

interface GameStateProps {
    rows:number;
    columns:number;
    bombs:number;
    gameOverFunction: Function
}

interface GameStateState {
    gameMapObject: GameMap
    currentGameMap: Tile[][]
    bombsCounter: number
    gameOver: boolean
}

export default class GameState extends React.Component<GameStateProps, GameStateState> {

    constructor(props: GameStateProps) {
        super(props);
        const gameMapObject = new GameMap(this.props.rows, this.props.columns, this.props.bombs);
        this.state = {
            gameOver: false,
            gameMapObject: gameMapObject,
            currentGameMap: gameMapObject.getGameMap(),
            bombsCounter: this.props.bombs
        }
        this.startGame(this.props.rows, this.props.columns, this.props.bombs)
    }

    startGame(rows:number , columns:number, bombs:number) {
        const gameMapObject = new GameMap(rows, columns, bombs);
        this.setState({
            gameOver: false,
            gameMapObject: gameMapObject,
            currentGameMap: gameMapObject.getGameMap(),
            bombsCounter: bombs
        });
    }

    newGame() {
        this.props.gameOverFunction();
    }

    gameOver() {
        alert("BOOM!");
        this.setState({
            gameOver: true,
            currentGameMap: this.state.gameMapObject.revealAllMap(),
        });
    }

    handleClick(x:number, y:number) {
        if (this.state.currentGameMap[x][y].hasBomb) {
           this.gameOver()
        }
        this.setState({
            currentGameMap: this.state.gameMapObject.uncoverTile(x, y),
            bombsCounter: this.state.bombsCounter
        });
        if (this.state.gameMapObject.getIsGameOver()) {
            this.gameOver();
        }
    }

    handleContextMenu(e:React.MouseEvent, x:number,y:number) {
        e.preventDefault()
        this.setState({
            currentGameMap: this.state.gameMapObject.markTileWithBomb(x, y),
            bombsCounter: this.state.gameMapObject.getUserBombsCounter()
        });
    }

    handleMouseDown(e:React.MouseEvent, x:number,y:number) {
        e.preventDefault();
        this.setState({
            currentGameMap: this.state.gameMapObject.uncoverSurroundingTiles(x, y),
        });
        if (this.state.gameMapObject.getIsGameOver()) {
            this.gameOver();
        }
    }

    render() {
        return (
            <div className="game" >
                <StatusBar bombsCounter = {this.state.bombsCounter} />
                <div className="game-board">
                    <Board
                        gameMap = {this.state.currentGameMap}
                        onClick = {(x, y) => this.handleClick(x, y)}
                        onContextMenu = {(e, x, y) => this.handleContextMenu(e, x, y)}
                        onMouseDown = {(e, x, y) => this.handleMouseDown(e, x, y)}
                    />
                </div>
            </div>
        );
    }
}



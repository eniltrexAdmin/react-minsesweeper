import React from 'react';
import Board from "./Board";
import StatusBar from "./StatusBar";
import {GameMap} from "./GameMap";
import {Tile} from "./Tile";
import styled from "styled-components";


const SmileyDiv = styled.div`
        background: #eee;
        border: 1px solid #999;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        padding: 0;
        text-align: center;
        width: 34px`
;

interface GameStateProps {
    displayNewGamePopUp: Function

    rows:number
    columns: number
    bombs: number
}

interface GameStateState {
    currentGameMap: Tile[][]
    bombsCounter: number
    gameOver: boolean
    gameWon: boolean
    gameMapObject: GameMap
}

export default class GameState extends React.Component<GameStateProps, GameStateState> {


    constructor(props: GameStateProps) {
        super(props);
        const gameMapObject = new GameMap(props.rows, props.columns,props.bombs);

        this.state = {
            gameWon: false,
            gameOver: false,
            gameMapObject: gameMapObject,
            currentGameMap: gameMapObject.getGameMap(),
            bombsCounter: gameMapObject.bombs
        }
    }

    startGame() {
        this.setState(function(state, props) {
            let gameMapObject = new GameMap(props.rows, props.columns,props.bombs);
            return {
                gameWon: false,
                gameOver: false,
                gameMapObject: gameMapObject,
                currentGameMap: gameMapObject.getGameMap(),
                bombsCounter: gameMapObject.bombs
            }
         }
        );
    }

    gameWon() {
        alert("you win!😃");
        this.setState({
            gameWon: true,
            // currentGameMap: this.state.gameMapObject.revealAllMap(),
        });
    }

    gameOver() {
        alert("BOOM!");
        this.setState({
            gameOver: true,
            currentGameMap: this.state.gameMapObject.revealAllMap(),
        });
    }

    handleClick(x:number, y:number) {
        this.setState({
            currentGameMap: this.state.gameMapObject.uncoverTile(x, y),
            bombsCounter: this.state.bombsCounter
        });
        this.userActionChecks();
    }

    private userActionChecks() {
        if (this.state.gameMapObject.getIsGameOver()) {
            this.gameOver();
        }
        if (this.state.gameMapObject.getIsGameWon()) {
            this.gameWon();
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
       this.userActionChecks();
    }

    render() {
        let smiley = this.state.gameWon ? <SmileyDiv>😃</SmileyDiv> : null
        return (
            <div className="game" >
                <StatusBar
                    bombsCounter = {this.state.bombsCounter}
                    // gameOver = {this.props.gameOverFunction}
                    gameOver = {()=>this.props.displayNewGamePopUp()}
                />
                {smiley}
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



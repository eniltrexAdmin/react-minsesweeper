import React from 'react';
import ReactDOM from 'react-dom';
import NewGamePopUp from "./NewGamePopUp/NewGamePopUp";
import GameState from "./GameState/GameState";
import {GameMap} from "./GameState/GameMap";


const NEW_GAME_STATE = "newGameState";
const PLAY_STATE = "playState";

interface appProps {

}

interface appState {
    currentState: string
    selectedRows:number
    selectedColumns: number
    selectedBombs: number
}

class Game extends React.Component<appProps,appState> {
    constructor(props:appProps) {
        super(props);
        this.state = {
            currentState: NEW_GAME_STATE,
            selectedRows: 12,
            selectedColumns:12,
            selectedBombs: 20,
        }
    }



    changeSelectedRows(value:number) {
        this.setState({
            selectedRows: value,
        })
    }

    changeSelectedColumns(value:number) {
        this.setState({
            selectedColumns: value,
        })
    }

    changeSelectedBombs(value:number) {
        this.setState({
            selectedBombs: value
        })
    }

    startGame() {
        this.setState((state, props) => ({
            currentState: PLAY_STATE,
            selectedRows: state.selectedRows,
            selectedColumns: state.selectedColumns,
            selectedBombs: state.selectedBombs
            })
        );
        if (null!== this.gameRef.current) {
            this.gameRef.current.startGame();
        }
    }

    private gameRef = React.createRef<GameState>()

    displayNewGamePopUp() {
        this.setState({
            currentState: NEW_GAME_STATE,
        })
    }


    render() {
        return (
            <div>
                {this.state.currentState === NEW_GAME_STATE ?
                <NewGamePopUp
                    startGame = {() => this.startGame()}
                    selectedRows = {this.state.selectedRows}
                    selectedColumns = {this.state.selectedColumns}
                    selectedBombs = {this.state.selectedBombs}

                    changeSelectedRows = {this.changeSelectedRows.bind(this)}
                    changeSelectedColumns = {this.changeSelectedColumns.bind(this)}
                    changeSelectedBombs = {this.changeSelectedBombs.bind(this)}
                />
                : null}

                <GameState
                    rows ={this.state.selectedRows}
                    columns = {this.state.selectedColumns}
                    bombs = {this.state.selectedBombs}
                        ref={this.gameRef}
                       displayNewGamePopUp={this.displayNewGamePopUp.bind(this)}
                />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
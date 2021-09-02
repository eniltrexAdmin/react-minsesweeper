import React from 'react';
import ReactDOM from 'react-dom';
import NewGamePopUp from "./NewGamePopUp/NewGamePopUp";
import GameState from "./GameState/GameState";
import Title from "./NewGamePopUp/Title";


const NEW_GAME_STATE = "newGameState";
const PLAY_STATE = "playState";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentState: NEW_GAME_STATE,
            selectedRows: 20,
            selectedColumns: 20,
            selectedBombs: 20
        }
        this.gameElement = React.createRef();
    }

    changeSelectedRows(value) {
        console.log(value);
        this.setState({
            currentState: NEW_GAME_STATE,
            selectedRows: value,
            selectedColumns: this.state.selectedColumns,
            selectedBombs: this.state.selectedBombs
        })
        console.log(this.state)
    }

    changeSelectedColumns(value) {
        this.setState({
            currentState: NEW_GAME_STATE,
            selectedRows: this.state.selectedRows,
            selectedColumns: value,
            selectedBombs: this.state.selectedBombs
        })
    }

    changeSelectedBombs(value) {
        this.setState({
            currentState: NEW_GAME_STATE,
            selectedRows: this.state.selectedRows,
            selectedColumns: this.state.selectedColumns,
            selectedBombs: value
        })
    }

    startGame() {
        this.setState({
            currentState: PLAY_STATE,
            selectedRows: this.state.selectedRows,
            selectedColumns: this.state.selectedColumns,
            selectedBombs: this.state.selectedBombs
        })
        this.gameElement.current.startGame(
            this.state.selectedRows,
            this.state.selectedColumns,
            this.state.selectedBombs
        )
    }

    gameOver() {
        this.setState({
            currentState: NEW_GAME_STATE,
            // selectedRows: this.state.selectedRows,
            // selectedColumns: this.state.selectedColumns,
            // selectedBombs: this.state.selectedBombs
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

                <GameState rows={this.state.selectedRows}
                           columns={this.state.selectedColumns}
                           bombs={this.state.selectedBombs}
                           gameOver={this.gameOver.bind(this)}
                           ref={this.gameElement}
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
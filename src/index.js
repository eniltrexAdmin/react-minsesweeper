import React from 'react';
import ReactDOM from 'react-dom';
import TitleState from "./TitleState/TitleState";
import GameState from "./GameState/GameState";



class Game extends React.Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
        this.state = {
            currentState: new TitleState(props, this.startGame),
            currentGameColumns: 20,
            currentGameRows: 20,
            currentGameBombs: 1
        }
    }

    startGame() {
        this.setState({
            currentState: new GameState(
                this.props,
                this.state.currentGameColumns,
                this.state.currentGameRows,
                this.state.currentGameBombs
            )
            // currentState: <GameState columns={this.state.columns} rows={this.state.rows} />

        })
    }

    render() {
        return (
            this.state.currentState.render()
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
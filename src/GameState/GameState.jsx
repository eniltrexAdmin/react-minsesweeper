import React from 'react';
import styled from "styled-components";
import Board from "./Board";


const SliderDiv = styled.div`
        width:200px;
        margin: 0 auto;
       `;

export default class GameState extends React.Component {

    constructor(props, columns, rows, bombs) {
        super(props);
        // wished those were props, I believe should be the proper way. Anyway not much of anything proper
        // on my first project...
        // well here will go the bombs and so on.
        this.state = {
            rows: rows,
            columns: columns,
            bombs: bombs
        }
    }
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        columns = {this.state.columns}
                        rows = {this.state.rows}

                          // quares={current.squares}
                          // onClick={(i) => this.handleClick(i)}
                    />
                </div>
            </div>
        );
    }
}
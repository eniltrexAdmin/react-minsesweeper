import React from 'react';
import Square from './Square.jsx'
import styled from 'styled-components'

const SquareRow = styled.div`
    float: left
`;

const BoardDiv = styled.div`
    margin: 0 auto;
    display: block;
    width: ${props => props.width}px;
`;


export default class Board extends React.Component {

    render() {
        const board = this.props.gameMap.map((row, stepX) => {
            const boardRow = row.map((tile, stepY) => {
                return (
                    <Square
                        key = {stepX + stepY}
                        hasBomb = {tile.hasBomb}
                        markedWithBomb = {tile.markedWithBomb}
                        adjacentBombsCounter = {tile.adjacentBombsCounter}
                        onClick={() => this.props.onClick(stepX, stepY)}
                        onContextMenu={(e) => this.props.onContextMenu(e, stepX, stepY)}
                        onMouseDown={(e) => this.props.onMouseDown(e, stepX, stepY)}
                        uncovered = {tile.uncovered}
                    />
                )
            });
            return (
                <SquareRow key={stepX}>{boardRow}</SquareRow>
            )
        });

        // if I had variable square rows in the future, I should get the row with the max squares.
        return (<BoardDiv width={this.props.gameMap.[0].length * 34}>{board}</BoardDiv>);
    }
}
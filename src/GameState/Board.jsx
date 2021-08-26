import React from 'react';
import Square from './Square.jsx'
import styled from 'styled-components'

const SquareRow = styled.div`
    float: left
`;

const BoardDiv = styled.div`
    display: block;
    width: ${props => props.columns * 34}px;
`;


export default class Board extends React.Component {

    renderSquare(i) {
        return <Square
            value={"a"}

        />;
    }

    render() {
        let rows = []
        for(let x=0; x < this.props.rows; x++) {
            let tiles = []
            for(let y=0; y < this.props.columns; y++) {
                tiles.push(<Square/>);
            }
            let row = <SquareRow>{tiles}</SquareRow>
            rows.push(row)
        }
        return (<BoardDiv columns={this.props.columns}>{rows}</BoardDiv>);
    }
}
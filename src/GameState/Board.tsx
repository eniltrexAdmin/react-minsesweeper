import React from 'react';
import Square from "./Square";
import {Tile} from "./Tile";
import styled from "styled-components";

const SquareRow = styled.div`
    float: left
`;


const BoardDiv = styled.div<{width:number}>`
    margin: 0 auto;
    display: block;
    width: ${props => props.width}px;
`;

interface BoardProps {
    gameMap: Tile[][];
    onClick: (stepX:number, stepY:number)=>void;
    onContextMenu: (e:React.MouseEvent, stepX:number, stepY:number)=>void;
    onMouseDown: (e:React.MouseEvent, stepX:number, stepY:number)=>void;
}

export default function Board(props:BoardProps) {
    const board = props.gameMap.map((row:Tile[], rowIndex: number) => {
        const boardRow = row.map((tile:Tile, columnIndex:number) => {
            return (
                <Square
                    key = {rowIndex + columnIndex}
                    tile = {tile}
                    onClick={() => props.onClick(rowIndex, columnIndex)}
                    onContextMenu={(e:React.MouseEvent) => props.onContextMenu(e, rowIndex, columnIndex)}
                    onMouseDown={(e:React.MouseEvent) => props.onMouseDown(e, rowIndex, columnIndex)}
                />
            )
        });
        return (
            <SquareRow key={rowIndex}>{boardRow}</SquareRow>
        )
    });

    // if I had variable square rows in the future, I should get the row with the max squares.
    return <BoardDiv width={props.gameMap[0].length * 34} >{board}</BoardDiv>;
}
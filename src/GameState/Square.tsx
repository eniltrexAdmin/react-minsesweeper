import React from 'react';
import styled from 'styled-components'
import {Tile} from "./Tile";

// interface UncoveredSquareDivProps {
//     // onMouseDown?: (e: React.MouseEvent, x:number, y:number) => React.MouseEvent,
//     onMouseDown?: Function
// }

const SquareDiv = styled.button`
        background: #fff;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        margin-right: -1px;
        margin-top: -1px;
        padding: 0;
        text-align: center;
        width: 34px`
;

const CoveredSquareDiv = styled.button`
        background: #eee;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        margin-right: -1px;
        margin-top: -1px;
        padding: 0;
        text-align: center;
        width: 34px`
;

interface SquareProps {
    tile: Tile;
    // onClick: (stepX:number, stepY:number)=>void;
    // onContextMenu: (e:React.MouseEvent, stepX:number, stepY:number)=>any;
    // onMouseDown: (e:React.MouseEvent, stepX:number, stepY:number)=>any;
    // onContextMenu: Function;
    // onMouseDown: Function;
    onClick: React.MouseEventHandler<HTMLElement>;
    onContextMenu: React.MouseEventHandler<HTMLElement>;
    onMouseDown: React.MouseEventHandler<HTMLElement>;
}

// export default class Square extends React.Component<SquareProps> {

export default function Square(props:SquareProps) {


    if (props.tile.uncovered) {
        if (props.tile.hasBomb) {
            return <SquareDiv><span>💣</span></SquareDiv>;
        } else {
            if (props.tile.adjacentBombsCounter > 0) {
                return <SquareDiv onMouseDown={props.onMouseDown}><span>{props.tile.adjacentBombsCounter}</span></SquareDiv>
            }
            return <SquareDiv></SquareDiv>;
        }
    }
    if (props.tile.markedWithBomb) {
        return <CoveredSquareDiv onContextMenu={props.onContextMenu}><span>⛳</span></CoveredSquareDiv>;
    }
    return <CoveredSquareDiv
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
    />
}
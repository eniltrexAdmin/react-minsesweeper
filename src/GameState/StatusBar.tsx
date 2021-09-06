import React, {MouseEventHandler} from 'react';
import styled from 'styled-components'


const StatusDiv = styled.div`
    margin: 0 auto;
    display: block;
    text-align: center;
    padding: 10px
`;



export default function StatusBar(props:{ bombsCounter:number; gameOver:MouseEventHandler }) {

    return(
        <StatusDiv>
            <span>💣:</span>
            <span>{props.bombsCounter}</span>
            <button onClick={props.gameOver}>🥴</button>
        </StatusDiv>
    );

}
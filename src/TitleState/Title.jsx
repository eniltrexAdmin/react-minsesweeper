import React from 'react';
import styled from 'styled-components'

const TitleSpan = styled.span`
        background: #000;
        font-size: 65px;
        color: #fff;
        box-shadow: 5px 10px #888888;
        line-height: 2
       `;

const TitleDiv = styled.div`
        margin: 0 auto;
        text-align:center;
        height: 200px;
       `;

export default class Title extends React.Component {
    render() {
        return (
            <TitleDiv><TitleSpan>MineSweeper</TitleSpan></TitleDiv>
        );
    }
}
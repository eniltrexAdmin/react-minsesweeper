import React from 'react';
import styled from 'styled-components'


const StatusDiv = styled.div`
    margin: 0 auto;
    display: block;
    text-align: center;
    padding: 10px
`;


export default class StatusBar extends React.Component {
    render() {
        return(
            <StatusDiv>
                <span>💣:</span>
                <span>{this.props.bombsCounter}</span>
            </StatusDiv>
        );
    }
}
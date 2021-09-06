import React from 'react';
import styled from "styled-components";
import Input from "./Input";

// @keyframes anvil {  0% {    transform: scale(1) translateY(0px);    opacity: 0;    box-shadow: 0 0 0 rgba(241, 241, 241, 0);  }  1% {    transform: scale(0.96) translateY(10px);    opacity: 0;    box-shadow: 0 0 0 rgba(241, 241, 241, 0);  }  100% {    transform: scale(1) translateY(0px);    opacity: 1;    box-shadow: 0 0 500px rgba(241, 241, 241, 0);  }}.popup-content {  -webkit-animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;}

const StyledPopUp = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0,0,0, 0.5);
`
const StyledPopUpInner = styled.div`
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    margin: auto;
    background: white;
`

const StyledTitle = styled.h3`
    text-align: center;
    display: block;
    padding-bottom:10px;
`

const SliderDiv = styled.div`
        width:200px;
        margin: 0 auto;
       `;

const NewGameButton = styled.button`
    padding: 10px;
    display: block;
    margin: 20px auto;
`;

export default class NewGamePopUp extends React.Component {


    render() {
        return (

            <StyledPopUp>
                <StyledPopUpInner>
                    <StyledTitle>New Game</StyledTitle>
                    <SliderDiv>
                        <Input
                            label="Rows number" min={1} max={30}
                            selectedValue={this.props.selectedRows}
                            onChange = {this.props.changeSelectedRows}

                        />
                        <Input
                            label="Columns number" min={1} max={30}
                            selectedValue={this.props.selectedColumns}
                            onChange = {this.props.changeSelectedColumns}
                        />
                        <Input
                            label="Bombs number" min={1} max={30}
                            selectedValue={this.props.selectedBombs}
                            onChange = {this.props.changeSelectedBombs}
                        />
                    </SliderDiv>
                    <NewGameButton onClick={() => this.props.startGame()}>
                        New Game
                    </NewGameButton>
                </StyledPopUpInner>
            </StyledPopUp>
        );
    }
}
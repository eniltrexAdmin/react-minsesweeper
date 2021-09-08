import React from 'react';
import styled from "styled-components";
import Slider from "./Slider";

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
    border-line: 1px solid #eaeaea;
    border-radius: 15px;
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

interface newGamePopUpProps {
    selectedRows: number
    selectedColumns: number
    selectedBombs: number
    changeSelectedRows: ((value: number | readonly number[], index: number) => void);
    changeSelectedColumns: ((value: number | readonly number[], index: number) => void);
    changeSelectedBombs: ((value: number | readonly number[], index: number) => void);
    startGame: Function
}

export default function NewGamePopUp(props: newGamePopUpProps) {
    return (

        <StyledPopUp>
            <StyledPopUpInner>
                <StyledTitle>New Game</StyledTitle>
                <SliderDiv>
                    <Slider
                        label={'Rows'}
                        selectedValue={props.selectedRows}
                        minValue={5}
                        maxValue={100}
                        onChange={props.changeSelectedRows}
                        />
                    <Slider
                        label={'Columns'}
                        selectedValue={props.selectedColumns}
                        minValue={5}
                        maxValue={100}
                        onChange={props.changeSelectedColumns}
                    />
                    <Slider
                        label={'Bombs'}
                        selectedValue={props.selectedBombs}
                        minValue={5}
                        maxValue={100}
                        onChange={props.changeSelectedBombs}
                    />
                </SliderDiv>
                <NewGameButton onClick={() => props.startGame()}>
                    New Game
                </NewGameButton>
            </StyledPopUpInner>
        </StyledPopUp>
    );

}
import React from 'react';
import Title from "./Title";
import styled from "styled-components";
import Slider from "./Slider";

const SliderDiv = styled.div`
        width:200px;
        margin: 0 auto;
       `;

const NewGameButton = styled.button`
    padding: 10px;
    margin:0 auto
`;

export default class TitleState extends React.Component {

    constructor(props, startGameFunction) {
        super(props);
        this.state = {
            startGameFunction: startGameFunction,
        }
    }

    render() {
        return (
            <div>
                <Title/>
                <SliderDiv>
                    <Slider label="Columns number"/>
                    <Slider label="Rows number" />
                    <Slider label="Bombs number" />
                </SliderDiv>
                <NewGameButton
                    text={"NEW GAME"}
                    onClick={() => this.state.startGameFunction()}
                />
            </div>


    ) ;
    }
}
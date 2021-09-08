import React from 'react';
import styled from 'styled-components';
import ReactSlider from "react-slider";

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
`;

const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
`;

interface ThumbProps {

}

interface ThumbState {
    valueNow: number
}

const Thumb = (props:ThumbProps, state:ThumbState) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div<{index:number}>`
    top: 0;
    bottom: 0;
    background: ${props => props.index ===  1 ? '#ddd' : '#0f0'};
    border-radius: 999px;
`;

interface TrackProps {

}

interface TrackState {
    index:number
}

interface sliderProps {
    label: string
    selectedValue: number
    minValue: number
    maxValue: number
    onChange: ((value: number | readonly number[], index: number) => void);

}

const Track = (props:TrackProps, state: TrackState) => <StyledTrack {...props} index={state.index} />;

export default function Slider(props:sliderProps) {
    return (
        <div>
            <span>{props.label}</span>
            <StyledSlider
                defaultValue={props.selectedValue}
                renderTrack={Track}
                renderThumb={Thumb}
                min={props.minValue}
                max={props.maxValue}
                // onChange = {(value, thumbIndex) => this.props.onChange(value, thumbIndex)}
                onChange = {props.onChange}
            />
        </div>
    );

}


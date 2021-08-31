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
const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => props.index ===  1 ? '#ddd' : '#0f0'};
    border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

export default class Slider extends React.Component {

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        return (
            <div>
                <span>{this.props.label}</span>
                <StyledSlider
                    defaultValue={this.props.min}
                    renderTrack={Track}
                    renderThumb={Thumb}
                    min={this.props.min}
                    max={this.props.max}
                    // onChange = {(value, thumbIndex) => this.props.onChange(value, thumbIndex)}
                    onChange = {this.props.onChange}
                />
            </div>
        );
    }
}


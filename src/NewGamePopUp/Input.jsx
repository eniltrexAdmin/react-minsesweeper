import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    width: 100%;
    height: 25px;
`;


export default class Input extends React.Component {


    render() {
        return (
            <div>
                <span>{this.props.label}</span>
                <StyledInput
                    value={this.props.selectedValue}
                    min={this.props.min}
                    max={this.props.max}
                    // onChange = {(value, thumbIndex) => this.props.onChange(value, thumbIndex)}
                    onChange = {(event)=>this.props.onChange(event.target.value)}
                />
            </div>
        );
    }
}


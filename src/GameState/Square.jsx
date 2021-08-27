import React from 'react';
import styled from 'styled-components'

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

export default class Square extends React.Component {

    render() {
        if (this.props.uncovered) {
            if (this.props.hasBomb) {
                return <SquareDiv><span>B</span></SquareDiv>;
            } else {
                let span;
                if (this.props.adjacentBombsCounter > 0) {
                    span=<span>{this.props.adjacentBombsCounter}</span>
                }
                return <SquareDiv>{span}</SquareDiv>;
            }
        }
        return <CoveredSquareDiv  onClick={this.props.onClick} />
    }
}
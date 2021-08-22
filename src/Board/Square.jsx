import React from 'react';

class Square extends React.Component {
    const Square = styled.input`
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

    render() {
        return <Square
            value={this.props.squares[i]}
            onClick={()=> this.props.onClick(i)}
        />;
    }
}
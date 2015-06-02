import React from 'react';

export default class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let items = [0, 1, 2, 3], percentage = this.props.percentage || 0;
        let ret = items.map((i) => {
            return -90 + Math.floor(Math.min(Math.max(0, (percentage - (i * 25)) * 3.6), 90))
        }).map((rotate) => {
            return {transform: 'rotate('+rotate+'deg)'};
        });

        return <div className="progress">
            <div className="spin spin4-1"><div className="inner" style={ret[0]}></div></div>
            <div className="spin spin4-2"><div className="inner" style={ret[1]}></div></div>
            <div className="spin spin4-3"><div className="inner" style={ret[2]}></div></div>
            <div className="spin spin4-4"><div className="inner" style={ret[3]}></div></div>
            <div className="progress-text">{Math.floor(percentage)}</div>
        </div>;
    }
}

Progress.propTypes = {
    percentage: React.PropTypes.number
};
Progress.defaultProps = {
    percentage: 0
};
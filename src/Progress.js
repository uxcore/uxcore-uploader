const React = require('react');
const ReactDOM = require('react-dom');
const util = require('./util');

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percentage: 0
        };
    }

    componentDidMount() {

        let t = null;
        let me = this;
        let percentage = me.state.percentage;
        me._isMounted = true;
        me.t = setInterval(() => {
            percentage = percentage + 5;
            if (me._isMounted) {
                me.setState({
                    percentage: percentage
                });
            }

            if (percentage === 95) {
                clearInterval(me.t);
            }
        }, me.props.interval);
    }

    componentWillUnmount() {
        let me = this;
        me._isMounted = false;
        clearInterval(me.t)
    }

    render() {
    console.log(this.state.percentage);
        return (
            <div style={{
                width: '100%',
                transform: `scale(${this.state.percentage / 100}, 1)`,
                transformOrigin: 'left top',
                transition: 'transform 0.1s linear',
            }} className="progress-box"></div>
        )
    }
}

Progress.propTypes = {
    percentage: React.PropTypes.number,
    interval: React.PropTypes.number
};
Progress.defaultProps = {
    percentage: 0,
    interval: 100
};

module.exports = Progress;

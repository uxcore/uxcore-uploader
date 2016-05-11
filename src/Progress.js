const React = require('react');
const ReactDOM = require('react-dom');
const util = require('./util');
const UxcoreProgress = require('uxcore-progress');
const {Line} = UxcoreProgress;

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
        }, 100);
    }

    componentWillUnmount() {
        let me = this;
        me._isMounted = false;
        clearInterval(me.t)
    }

    render() {
        return (
            <Line percent={this.state.percentage} strokeWidth={8} />
        )
    }
}

Progress.isSupport = util.TRANSFORM_PROPERTY !== false;

Progress.propTypes = {
    percentage: React.PropTypes.number
};
Progress.defaultProps = {
    percentage: 0
};

module.exports = Progress;

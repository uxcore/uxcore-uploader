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

        t = setInterval(function() {

            percentage = percentage + 5;

            me.setState({
                percentage: percentage
            });

            if(percentage === 100) {

                clearInterval(t);
            }
        },100);

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

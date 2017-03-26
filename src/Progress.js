const React = require('react');
const ReactDOM = require('react-dom');
const util = require('./util');
const UxcoreProgress = require('uxcore-progress');
const { Line } = UxcoreProgress;

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
            if (me.props.isVisual && me.props.status === 'error') {
                clearInterval(me.t);
            } else {
                if (me._isMounted) {
                    me.setState({
                        percentage: percentage
                    });
                }
                if (percentage === 95) {
                    clearInterval(me.t);
                }
            }

        }, me.props.interval);
    }

    componentWillUnmount() {
        let me = this;
        me._isMounted = false;
        clearInterval(me.t)
    }

    render() {
        if (this.props.isVisual) {
            if (this.props.status === 'error') {
                return (
                    <div className="visual-progress-box">
                        <span>上传失败...</span>
                        <Line percent={this.state.percentage} status="exception" strokeWidth={4} showInfo={false} />
                        <div className="delete-progress" onClick={this.props.onCancel.bind(this)}>取消</div>
                    </div>
                )
            } else {
                return (
                    <div className="visual-progress-box">
                        <span>上传中...</span>
                        <Line percent={this.state.percentage} strokeWidth={4} showInfo={false} />
                        <div className="delete-progress" onClick={this.props.onCancel.bind(this)}>取消</div>
                    </div>
                )
            }
        } else {
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

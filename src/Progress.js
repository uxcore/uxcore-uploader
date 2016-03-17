const React = require('react'); 
const ReactDOM = require('react-dom');
const util = require('./util');

class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const percentage = this.props.percentage || 0;
        if (util.TRANSFORM_PROPERTY && this.props.mode !== 'bar') {
            let items = [0, 1];
            let ret = items.map((i) => {
                return Math.floor(Math.min(Math.max(0, (percentage - (i * 50)) * 3.6), 180))
            }).map((rotate) => {
                return {[util.TRANSFORM_PROPERTY]: 'rotate(' + rotate + 'deg)'};
            });

            return <div className="kuma-upload-progresspin">
                <div className="spin spin2-1">
                    <div className="inner" style={ret[0]} />
                </div>
                <div className="spin spin2-2">
                    <div className="inner" style={ret[1]} />
                </div>
            </div>;
        } else {
            return <div className="kuma-upload-progressbar"  style={{width: percentage + '%'}}></div>
        }
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

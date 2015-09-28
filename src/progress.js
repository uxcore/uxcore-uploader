const TRANSFORM_PROPERTY = (() => {
    const style = document.createElement("div").style;
    const properties = ["transform", "WebkitTransform", "MozTransform", "msTransform"];
    for (let i = 0, l = properties.length; i < l; i++) {
        if (properties[i] in style) {
            return properties[i];
        }
    }
    return false;
})();

class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const percentage = this.props.percentage || 0;
        if (TRANSFORM_PROPERTY && this.props.mode !== 'bar') {
            let items = [0, 1];
            let ret = items.map((i) => {
                return Math.floor(Math.min(Math.max(0, (percentage - (i * 50)) * 3.6), 180))
            }).map((rotate) => {
                return {[TRANSFORM_PROPERTY]: 'rotate(' + rotate + 'deg)'};
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

Progress.isSupport = TRANSFORM_PROPERTY !== false;

Progress.propTypes = {
    percentage: React.PropTypes.number
};
Progress.defaultProps = {
    percentage: 0
};

module.exports = Progress;

const React = require('react'); 
const ReactDOM = require('react-dom');
const Icon = require('uxcore-icon');

class Picker extends React.Component {
    componentDidMount() {
        this.area = this.props.core.getPickerCollector().addArea(ReactDOM.findDOMNode(this));
    }
    componentWillUnmount() {
        this.area && this.area.destroy();
    }

    render() {
      const { isVisual } = this.props;
      if(isVisual){
        return <div className="kuma-upload-picker-visual">
          {this.props.children}
          <Icon name="zengjia" />
        </div>;
      }else{
        return <div className="kuma-upload-picker">{this.props.children}</div>;
      }
    }
}

module.exports = Picker;
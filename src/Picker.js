import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'uxcore-icon';

export default class Picker extends React.Component {
  componentDidMount() {
    this.area = null;
    if (!this.props.disabled) {
      this.area = this.props.core.getPickerCollector().addArea(ReactDOM.findDOMNode(this));
    }
  }
  componentWillUnmount() {
    this.area && this.area.destroy();
  }

  render() {
    const { isVisual } = this.props;
    if (isVisual) {
      return (<div className="kuma-upload-picker-visual">
        {this.props.children}
        <Icon name="zengjia1" />
      </div>);
    }
    return <div className="kuma-upload-picker">{this.props.children}</div>;
  }
}


import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'uxcore-icon';

export default class Picker extends React.Component {
  componentDidMount() {
    this.area = this.props.core.getPickerCollector().addArea(ReactDOM.findDOMNode(this));
  }
  componentWillUnmount() {
    this.area && this.area.destroy();
  }

  render() {
    const { isVisual, prefixCls } = this.props;
    if (isVisual) {
      return (<div className={`${prefixCls}-picker-visual`}
        style={{ overflow: 'hidden' }}
      >
        {this.props.children}
        <Icon name="zengjia1" />
      </div>);
    }
    return <div className={`${prefixCls}-picker`}>{this.props.children}</div>;
  }
}


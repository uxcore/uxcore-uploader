import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'uxcore-icon';
import classNames from 'classnames';

export default class Picker extends React.Component {
  componentDidMount() {
    this.area = this.props.core.getPickerCollector().addArea(ReactDOM.findDOMNode(this));
  }
  componentWillUnmount() {
    this.area && this.area.destroy();
  }

  render() {
    const { isVisual, prefixCls, disabled } = this.props;

    const clazzName = classNames({
      [`${prefixCls}-picker-visual`]: true,
    });
    if (isVisual) {
      return (<div className={clazzName}
        style={{ verticalAlign:'top' }}
      >
        {this.props.children}
        <Icon name="zengjia1" />
      </div>);
    }
    return <div className={`${prefixCls}-picker`}>{this.props.children}</div>;
  }
}


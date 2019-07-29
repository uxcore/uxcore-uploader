import React from 'react';
import ReactDOM from 'react-dom';
import i18n from './locale';

export default class Picker extends React.Component {
  componentDidMount() {
    this.paste = this.props.core.getPasteCollector().addArea(ReactDOM.findDOMNode(this));
  }
  componentWillUnmount() {
    this.paste && this.paste.destroy();
  }

  render() {
    const { prefixCls, locale } = this.props;
    return (
      <div className={`${prefixCls}-paste-section`}
        style={{ verticalAlign:'top' }}
      >
        <input type="input" className={`${prefixCls}-paste-picker`} />
        <div className={`${prefixCls}-paste-text`}>{i18n[locale].paste_upload}</div>
      </div>
    );
  }
}


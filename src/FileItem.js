import Preview from './Preview';
import Progress from './Progress';
import util from './util';
import { Events } from 'uploadcore';
import React from 'react';
import i18n from './locale';
import Icon from 'uxcore-icon';

export default class FileItem extends React.Component {
  static defaultProps = {
    mode: 'mini',
  };
  constructor(props) {
    super(props);

    const file = props.file;
    this.file = file;

    this.state = {
      percentage: file.progress ? file.progress.percentage : 0,
      status: file.getStatusName(),
    };

    if (file.isImage()) {
      file.getAsDataUrl(1000).done(url => this.setState({ url }));
    }
  }

  componentDidMount() {
    const file = this.file;
    const me = this;
    me._isMounted = true;
    const statuschange = () => {
      if (me._isMounted) {
        const state = {
          status: file.getStatusName(),
        };
        if (state.status === 'error') {
          state.percentage = 0;
        }
        me.setState(state);
      }
    };
    const progress = (progress) => {
      if (me._isMounted) {
        me.setState({
          percentage: progress.percentage,
        });
      }
    };
    file.on(Events.FILE_STATUS_CHANGE, statuschange);
    file.on(Events.FILE_UPLOAD_PROGRESS, progress);
    this.stopListen = () => {
      file.off(Events.FILE_STATUS_CHANGE, statuschange);
      file.off(Events.FILE_UPLOAD_PROGRESS, progress);
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.stopListen && this.stopListen();
  }

  onPending() {
    this.file.pending();
  }

  onCancel() {
    this.file.cancel();
  }

  render() {
    const me = this;
    const { localePack, interval, prefixCls } = me.props;

    if (this.props.mode === 'icon') {
      return (<div className={`${prefixCls}-fileitem status-${this.state.status}`}>
        <a className={`${prefixCls}-action action-remove`} onClick={this.onCancel.bind(this)} title={localePack.remove}>
          <Icon name="shanchu" />
        </a>
        <div className="filepreview">
          <Preview file={this.props.file} prefixCls={prefixCls} />
          {this.state.status === 'error' ? <a className={`${prefixCls}-action action-retry`} onClick={this.onPending.bind(this)} title={localePack.retry}>
            <i className="kuma-icon kuma-icon-refresh" />
          </a> : null}
          {this.state.status === 'queued' ? <a className={`${prefixCls}-action action-upload`} onClick={this.onPending.bind(this)} title={localePack.upload}>
            <i className="kuma-icon kuma-icon-triangle-right" />
          </a> : null}
          {this.state.status === 'progress' || this.state.status === 'pending' ? <Progress file={this.file} interval={interval} percentage={this.state.percentage} /> : null}
        </div>
        {this.state.status === 'error' ? <a className={`${prefixCls}-status status-error`} title={localePack.upload_failed}><i className="kuma-icon kuma-icon-caution" /></a> : null}
        {this.state.status === 'success' ? <a className={`${prefixCls}-status status-success`}><i className="kuma-icon kuma-icon-choose" /></a> : null}
        <div className="filename" title={this.file.name}>{util.natcut(this.file.name, 10)}</div>
      </div>);
    } else if (this.props.mode === 'nw') {
      let downloadUrl,
        previewUrl,
        editUrl;
      if (this.state.status === 'success') {
        const json = this.file.response.getJson();
        const url = util.getUrl(json);
        downloadUrl = url.downloadUrl;
        previewUrl = url.previewUrl;
        editUrl = url.editUrl;
      }
      if (this.props.isOnlyImg) {
        if (!this.props.isVisual) {
          return (<div className={`${prefixCls}-fileitem-img status-${this.state.status}`}>
            <div className="field-image-info">
              <a className="field-image-preview" href={previewUrl} target="_blank">
                    <img src={this.state.url} />
                  </a>
            </div>
            {this.state.status !== 'error' && this.state.status !== 'success' ? <Progress file={this.file} interval={interval} /> : null}
            <div className="field-image-name" title={this.file.name}>{this.file.name}</div>
            <div className="field-status">
              <a className={`${prefixCls}-action close-action`} onClick={this.onCancel.bind(this)}>
                    <Icon name="shanchu" />
                  </a>
            </div>
          </div>);
        }
        return (<div className={`${prefixCls}-fileitem-visual status-${this.state.status}`}>
          <div className="field-image-info" />
          {/* <div className="error-text">{i18n[locale]['upload_failed']}</div>*/}
          {this.state.status !== 'success' ? <Progress interval={interval} isVisual status={this.state.status} onCancel={this.onCancel.bind(this)} onPending={this.onPending.bind(this)} file={this.file} /> : null}
        </div>);
      }
      return (<div className={`${prefixCls}-fileitem status-${this.state.status}`}>
        <label className="field-icon">
          {(this.state.status === 'error' || this.state.status === 'success') ? <i className={`${prefixCls}-fileicon`} data-ext={this.file.ext} data-type={this.file.type} /> : null}
        </label>
        {this.state.status !== 'error' && this.state.status !== 'success' ? <Progress interval={interval} file={this.file} /> : null}
        <div className="field-line" />
        <div className="field-info-wrap">
          <label className="field-info">
            <span className="filename" title={this.file.name}>{this.file.name}</span>
          </label>
          <label className="field-status">
            {this.state.status === 'error' ? <a className={`${prefixCls}-status status-error`}>{localePack.upload_failed}</a> : null}
            {this.state.status === 'success' && previewUrl ? <a className={`${prefixCls}-action`} target="_blank" href={previewUrl}>{localePack.preview}</a> : null}
            {this.state.status === 'success' && editUrl && this.props.onlineEdit ? <a className={`${prefixCls}-action`} target="_blank" href={editUrl}>{localePack.edit}</a> : null}
            {this.state.status === 'success' && downloadUrl ? <a className={`${prefixCls}-action`} target="_blank" href={downloadUrl} download>{localePack.download}</a> : null}
            {(this.state.status === 'success' || this.state.status === 'error') ? <a className={`${prefixCls}-action close-action`} onClick={this.onCancel.bind(this)}><Icon name="shanchu" /></a> : <a className="${prefixCls}-action terminal-action" onClick={this.onCancel.bind(this)}><Icon name="guanbi" /></a>}
          </label>
        </div>
      </div>);
    }
    const size = util.humanSizeFormat(this.file.size);
    return (<div className={`${prefixCls}-fileitem status-${this.state.status}`}>
      <label className="field-info">
        <i className={`${prefixCls}-fileicon`} data-ext={this.file.ext} data-type={this.file.type} />
        <span className="filename" title={this.file.name}>{util.natcut(this.file.name, 12)}</span>
        <span className="filesize">{`/${size}`}</span>
      </label>
      <label className="field-status">
        {this.state.status === 'error' ? <a className={`${prefixCls}-status status-error`} title={localePack.upload_failed}><i className="kuma-icon kuma-icon-caution" /></a> : null}
        {this.state.status === 'success' ? <a className={`${prefixCls}-status status-success`}><i className="kuma-icon kuma-icon-choose" /></a> : null}

        {this.state.status === 'error' ? <a className={`${prefixCls}-action action-retry`} onClick={this.onPending.bind(this)} title={localePack.retry}>
          <i className="kuma-icon kuma-icon-refresh" />
        </a> : null}

        {this.state.status === 'queued' ? <a className={`${prefixCls}-action action-upload`} onClick={this.onPending.bind(this)} title={localePack.upload}>
          <i className="kuma-icon kuma-icon-triangle-right" />
        </a> : null}

        <a className={`${prefixCls}-action action-remove`} onClick={this.onCancel.bind(this)} title={localePack.remove}>
          <Icon name="shanchu" />
        </a>
      </label>
      <Progress file={this.file} interval={interval} percentage={this.state.percentage} mode="bar" />
    </div>);
  }
}


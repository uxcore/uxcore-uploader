import React from 'react';
import util from './util';
import i18n from './locale';
import Icon from 'uxcore-icon';

export default class DefaultFileItem extends React.Component {

  onCancel(file) {
    const me = this;
    me.props.onCancel(file);
  }

  onShowFile(file, url, e) {
    e.preventDefault();
    this.props.onShowFile(file, url);
  }

  onDownloadFile(file, url, e) {
    e.preventDefault();
    this.props.onDownloadFile(file, url);
  }

  onEditFile(file, url, e) {
    e.preventDefault();
    this.props.onEditFile(file, url);
  }

  render() {
    const me = this;
    const { prefixCls, locale, file, mode, isOnlyImg, isVisual, readOnly, disabled, onlineEdit } = me.props;
    let response = util.simpleDeepCopy(file.response);
    if (file.type === 'upload') {
      response = response.content ? (response.content.data ? response.content.data : response.content) : response.data;
    }
    const downloadUrl = response.downloadUrl === undefined ? (response.file || response.url) : response.downloadUrl;
    const previewUrl = response.previewUrl === undefined ? downloadUrl : response.previewUrl;
    const editUrl = response.editUrl;
    let readOnlyStyle;
    if (isOnlyImg) {
      const type = isVisual ? `${prefixCls}-fileitem-visual` : `${prefixCls}-fileitem-img`;
      readOnlyStyle = readOnly ? `${type} read-style` : type;
    } else {
      readOnlyStyle = readOnly ? `${prefixCls}-fileitem read-style` : `${prefixCls}-fileitem`;
    }
    if (mode === 'icon') {
      return (<div className={`${prefixCls}-fileitem`}>
        <a className={`${prefixCls}-action remove-action`} onClick={this.onCancel.bind(this)} title={i18n[locale].remove}>
          <Icon name="shanchu" />
        </a>
        <div className="filepreview">
          <div className="previewer">
            <img src={previewUrl} />
          </div>
        </div>
        <div className="filename" title={response.name}>{util.natcut(response.name, 10)}</div>
      </div>);
    } else if (mode === 'nw') {
      if (isOnlyImg) {
        if (!isVisual) {
          return (<div className={readOnlyStyle}>
            <div className="field-image-info">
              <a className="field-image-preview" onClick={me.onShowFile.bind(this, file, previewUrl)} href="javascript:void(0)">
                <img src={previewUrl} />
              </a>
            </div>
            <div className="field-image-name" title={file.name}>{file.name}</div>
            <div className="field-status">
              {previewUrl ? <a className={`${prefixCls}-action preview-action`} onClick={me.onShowFile.bind(this, file, previewUrl)} target="_blank" href={previewUrl}><Icon name="fangda" /></a> : null}
              {downloadUrl ? <a className={`${prefixCls}-action download-action`} onClick={me.onDownloadFile.bind(this, file, downloadUrl)} target="_blank" download href={downloadUrl}><Icon name="xiazai" /></a> : null}
              {response.canRemove !== false && !readOnly ? <a className={`${prefixCls}-action remove-action`} onClick={this.onCancel.bind(this, file)}>
                <Icon name="shanchu" />
              </a> : undefined}
            </div>
          </div>);
        }
        return (<div className={readOnlyStyle}>
          <div className="field-image-info">
            <a className="field-image-preview" onClick={me.onShowFile.bind(this, file, previewUrl)} href="javascript:void(0)">
              <img src={previewUrl} />
            </a>
          </div>
          <div className="field-status">
            {previewUrl ? <a className={`${prefixCls}-action preview-action`} onClick={me.onShowFile.bind(this, file, previewUrl)} target="_blank" href={previewUrl}><Icon name="fangda" /></a> : null}
            {response.canRemove !== false && !readOnly ? <a className="remove-action" onClick={this.onCancel.bind(this, file)}>
              <Icon name="biaodanlei-tongyongqingchu" />
            </a> : undefined}
          </div>
        </div>);
      }
      return (<div className={readOnlyStyle}>
        <label className="field-icon">
          <i className={`${prefixCls}-fileicon`} data-ext={file.ext} data-type={file.fileType} />
        </label>
        <div className="field-line" />
        <div className="field-info-wrap">
          <label className="field-info">
            <span className="filename" title={file.name}>{file.name}</span>
          </label>
          <div className="field-status">
            {previewUrl ? <a className={`${prefixCls}-action preview-action`} onClick={me.onShowFile.bind(this, file, previewUrl)} target="_blank" href={previewUrl}><Icon name="fangda" /></a> : null}
            {editUrl && onlineEdit && !readOnly && !disabled ? <a className={`${prefixCls}-action edit-action`} onClick={me.onEditFile.bind(this, file, editUrl)} target="_blank" href={editUrl}><Icon name="caozuo-bianji" /></a> : null}
            {downloadUrl ? <a className={`${prefixCls}-action download-action`} onClick={me.onDownloadFile.bind(this, file, downloadUrl)} target="_blank" download href={downloadUrl}><Icon name="xiazai" /></a> : null}
            {response.canRemove !== false && !readOnly ? <a className={`${prefixCls}-action remove-action`} onClick={this.onCancel.bind(this, file)}><Icon name="shanchu" /></a> : null}
          </div>
        </div>
      </div>);
    }
    return (<div className={`${prefixCls}-fileitem`}>
      <label className="field-info">
        <i className={`${prefixCls}-fileicon`} data-ext={file.ext} data-type={file.fileType} />
        <span className="filename" title={file.name}>{util.natcut(response.name, 12)}</span>
      </label>
      <label className="field-status">
        <a className={`${prefixCls}-status status-success`}><i className="kuma-icon kuma-icon-choose" /></a>
        {!readOnly ? <a className={`${prefixCls}-action remove-action`} onClick={this.onCancel.bind(this, file)} title={i18n[locale].remove}>
          <Icon name="shanchu" />
        </a> : null}
      </label>
    </div>);
  }
}

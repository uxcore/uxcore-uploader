const React = require('react');
const ReactDOM = require('react-dom');
const util = require('./util');
const i18n = require('./locale');

class DefaultFileItem extends React.Component {
    constructor(props) {
        super(props);
    }

    onCancel(file) {
        let me = this;
        me.props.onCancel(file);
    }

    render() {
        let me = this;
        let {locale, file, mode, isOnlyImg} = me.props;
        let response = util.simpleDeepCopy(file.response);
        if (file.type == 'upload') {
            response = response.content ? (response.content.data ? response.content.data : response.content) : response.data;
        }
        let downloadUrl = response.downloadUrl || response.file || response.url;
        let previewUrl = response.previewUrl || downloadUrl;
        if (mode === 'icon') {
            return <div className={"kuma-upload-fileitem"}>
                <a className="kuma-upload-action action-remove" onClick={this.onCancel.bind(this)} title={i18n[locale]['remove']}>
                    <i className="kuma-icon kuma-icon-close" />
                </a>
                <div className="filepreview">
                    <div className="previewer">
                        <img src={previewUrl} />
                    </div>
                </div>
                <div className="filename" title={response.name}>{util.natcut(response.name, 10)}</div>
            </div>
        } else if (mode === 'nw') {
            if (isOnlyImg) {
                return <div className={"kuma-upload-fileitem-img"}>
                            <div className="field-image-info">
                                <a className="field-image-preview" href={previewUrl} target="_blank">
                                    <img src={previewUrl} />
                                </a>
                            </div>
                            <div className="field-status">
                                { response.canRemove !== false ? <a className="kuma-upload-action" onClick={this.onCancel.bind(this, file)}>
                                    <i className="kuma-icon kuma-icon-close"></i>
                                </a> : undefined}
                            </div>
                        </div>;
            } else {
                return <div className={"kuma-upload-fileitem"}>
                    <label className="field-icon">
                        <i className="kuma-upload-fileicon" data-ext={file.ext} data-type={file.fileType} />
                    </label>
                    <div className="field-info-wrap">
                        <label className="field-info">
                            <span className="filename">{file.name}</span>
                        </label>
                        <label className="field-status">
                            <a className="kuma-upload-action close-action" onClick={this.onCancel.bind(this, file)}><i className="kuma-icon kuma-icon-close"></i></a>
                            {previewUrl ? <a className="kuma-upload-action preview-action" target="_blank" href={previewUrl}>{i18n[locale]['preview']}</a> : null}
                            {downloadUrl ? <a className="kuma-upload-action download-action" target="_blank" download href={downloadUrl}>{i18n[locale]['download']}</a> : null}
                        </label>
                    </div>
                </div>;
            }
        } else {
            return <div className={"kuma-upload-fileitem"}>
                <label className="field-info">
                    <i className="kuma-upload-fileicon" data-ext={file.ext} data-type={file.fileType}/>
                    <span className="filename" title={file.name}>{util.natcut(response.name, 12)}</span>
                </label>
                <label className="field-status">
                    <a className="kuma-upload-status status-success"><i className="kuma-icon kuma-icon-choose" /></a>
                    <a className="kuma-upload-action action-remove" onClick={this.onCancel.bind(this, file)} title={i18n[locale]['remove']}>
                        <i className="kuma-icon kuma-icon-close" />
                    </a>
                </label>
            </div>;
        }
    }
}

module.exports = DefaultFileItem;
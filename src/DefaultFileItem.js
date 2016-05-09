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
        let downloadUrl = file.downloadUrl || file.file || file.url;
        let previewUrl = file.previewUrl || downloadUrl;
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
                <div className="filename" title={file.name}>{util.natcut(file.name, 10)}</div>
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
                                { file.canRemove !== false ? <a className="kuma-upload-action" onClick={this.onCancel.bind(this, file)}>
                                    <i className="kuma-icon kuma-icon-close"></i>
                                </a> : undefined}
                            </div>
                        </div>;
            } else {
                return <div className={"kuma-upload-fileitem"}>
                    <div className="field-info-wrap">
                        <label className="field-info">
                            <span className="filename">{file.name}</span>
                        </label>
                        <label className="field-status">
                            <a className="kuma-upload-action close-action" onClick={this.onCancel.bind(this, file)}><i className="kuma-icon kuma-icon-close"></i></a>
                            {previewUrl ? <a className="kuma-upload-action" target="_blank" href={previewUrl}>{i18n[locale]['preview']}</a> : null}
                            {downloadUrl ? <a className="kuma-upload-action" target="_blank" href={downloadUrl}>{i18n[locale]['download']}</a> : null}
                        </label>
                    </div>
                </div>;
            }
        } else {
            return <div className={"kuma-upload-fileitem"}>
                <label className="field-info">
                    <i className="kuma-upload-fileicon" data-ext={file.ext} data-type={file.type}/>
                    <span className="filename" title={file.name}>{util.natcut(file.name, 12)}</span>
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
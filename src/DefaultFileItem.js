const React = require('react');
const ReactDOM = require('react-dom');
const util = require('./util');
const i18n = require('./locale');
const Icon = require('uxcore-icon');

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
        let {locale, file, mode, isOnlyImg, isVisual, readStyle, readOnly} = me.props;
        let response = util.simpleDeepCopy(file.response);
        if (file.type == 'upload') {
            response = response.content ? (response.content.data ? response.content.data : response.content) : response.data;
        }
        let downloadUrl = response.downloadUrl || response.file || response.url;
        let previewUrl = response.previewUrl || downloadUrl;
        let readOnlyStyle;
        if(isOnlyImg){
            let type = isVisual ? "kuma-upload-fileitem-visual" : "kuma-upload-fileitem-img";
            readOnlyStyle = readOnly ? type + " read-style" : type;
        }else{
            readOnlyStyle = readOnly ? "kuma-upload-fileitem read-style" : "kuma-upload-fileitem";
        }
        if (mode === 'icon') {
            return <div className={"kuma-upload-fileitem"}>
                <a className="kuma-upload-action remove-action" onClick={this.onCancel.bind(this)} title={i18n[locale]['remove']}>
                    <Icon name="shanchu" />
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
                if (!isVisual) {
                    return <div className={readOnlyStyle}>
                            <div className="field-image-info">
                                <a className="field-image-preview" href={previewUrl} target="_blank">
                                    <img src={previewUrl} />
                                </a>
                            </div>
                            <div className="field-image-name" title={file.name}>{file.name}</div>
                            <div className="field-status">
                              {previewUrl ? <a className="kuma-upload-action preview-action" target="_blank" href={previewUrl}><Icon name="fangda" /></a> : null}
                              {downloadUrl && !readOnly ? <a className="kuma-upload-action download-action" target="_blank" download href={downloadUrl}><Icon name="xiazai" /></a> : null}
                                { response.canRemove !== false && !readOnly ? <a className="kuma-upload-action remove-action" onClick={this.onCancel.bind(this, file)}>
                                    <Icon name="shanchu" />
                                </a> : undefined}
                            </div>
                        </div>;
                } else {
                    return <div className={readOnlyStyle}>
                            <div className="field-image-info">
                                <a className="field-image-preview" href={previewUrl} target="_blank">
                                    <img src={previewUrl} />
                                </a>
                            </div>
                            <div className="field-status">
                                {previewUrl ? <a className="kuma-upload-action preview-action" target="_blank" href={previewUrl}><Icon name="fangda" /></a> : null}
                                { response.canRemove !== false && !readOnly ? <a className="remove-action" onClick={this.onCancel.bind(this, file)}>
                                    <Icon name="biaodanlei-tongyongqingchu" />
                                </a> : undefined}
                            </div>
                        </div>;
                }
            } else {
                return <div className={readOnlyStyle}>
                    <label className="field-icon">
                        <i className="kuma-upload-fileicon" data-ext={file.ext} data-type={file.fileType} />
                    </label>
                    <div className="field-line"></div>
                    <div className="field-info-wrap">
                        <label className="field-info">
                            <span className="filename" title={file.name}>{file.name}</span>
                        </label>
                        <div className="field-status">
                          {previewUrl ? <a className="kuma-upload-action preview-action" target="_blank" href={previewUrl}><Icon name="fangda" /></a> : null}
                          {downloadUrl && !readOnly ? <a className="kuma-upload-action download-action" target="_blank" download href={downloadUrl}><Icon name="xiazai" /></a> : null}
                            {response.canRemove !== false && !readOnly ? <a className="kuma-upload-action remove-action" onClick={this.onCancel.bind(this, file)}><Icon name="shanchu" /></a> : null}
                        </div>
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
                    { !readOnly ? <a className="kuma-upload-action remove-action" onClick={this.onCancel.bind(this, file)} title={i18n[locale]['remove']}>
                        <Icon name="shanchu" />
                    </a> :null}
                </label>
            </div>;
        }
    }
}

module.exports = DefaultFileItem;

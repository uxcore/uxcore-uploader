const Preview = require('./Preview');
const Progress = require('./Progress');
const util = require('./util');
const {Events} = require('uploadcore');
const React = require('react');
const ReactDOM = require('react-dom');
const i18n = require('./locale');

class FileItem extends React.Component {

    constructor(props) {
        super(props);

        const file = props.file;
        this.file = file;

        this.state = {
            percentage: file.progress ? file.progress.percentage : 0,
            status: file.getStatusName()
        };
    }

    componentDidMount() {
        const file = this.file;
        const statuschange = () => {
            const state = {
                status: file.getStatusName()
            };
            if (state.status === 'error') {
                state.percentage = 0;
            }
            this.setState(state);
        };
        const progress = (progress) => {
            this.setState({
                percentage: progress.percentage
            });
        };
        file.on(Events.FILE_STATUS_CHANGE, statuschange);
        file.on(Events.FILE_UPLOAD_PROGRESS, progress);
        this.stopListen = () => {
            file.off(Events.FILE_STATUS_CHANGE, statuschange);
            file.off(Events.FILE_UPLOAD_PROGRESS, progress);
        };
    }

    componentWillUnmount() {
        this.stopListen && this.stopListen();
    }

    onPending() {
        this.file.pending();
    }

    onCancel() {
        this.file.cancel();
    }

    render() {
        let me = this;
        let {locale} = me.props;
        if (this.props.mode === 'icon') {
            return <div className={"kuma-upload-fileitem status-" + this.state.status}>
                <a className="kuma-upload-action action-remove" onClick={this.onCancel.bind(this)} title={i18n[locale]['remove']}>
                    <i className="kuma-icon kuma-icon-close" />
                </a>
                <div className="filepreview">
                    <Preview file={this.props.file} />
                    {this.state.status === 'error' ? <a className="kuma-upload-action action-retry" onClick={this.onPending.bind(this)} title={i18n[locale]['retry']}>
                        <i className="kuma-icon kuma-icon-refresh" />
                    </a> : null}
                    {this.state.status === 'queued' ? <a className="kuma-upload-action action-upload" onClick={this.onPending.bind(this)} title={i18n[locale]['upload']}>
                        <i className="kuma-icon kuma-icon-triangle-right" />
                    </a> : null}
                    {this.state.status === 'progress' || this.state.status === 'pending' ? <Progress percentage={this.state.percentage} /> : null}
                </div>
                {this.state.status === 'error' ? <a className="kuma-upload-status status-error" title={i18n[locale]['upload_failed']}><i className="kuma-icon kuma-icon-caution" /></a> : null}
                {this.state.status === 'success' ? <a className="kuma-upload-status status-success"><i className="kuma-icon kuma-icon-choose" /></a> : null}
                <div className="filename" title={this.file.name}>{util.natcut(this.file.name, 10)}</div>
            </div>
        } else if (this.props.mode === 'nw') {
            let downloadUrl, previewUrl;
            if (this.state.status === 'success') {

                const json = this.file.response.getJson();
                try {
                    let data = json.content ? (json.content.data ? json.content.data : json.content) : json.data;
                    downloadUrl = data.downloadUrl || data.file || data.url;
                    previewUrl = data.previewUrl || downloadUrl;
                } catch (e) {
                    console.error('data or content not found in response, maybe you should set response by yourself')
                }
            }
            if (this.props.isOnlyImg) {
                return <div className={"kuma-upload-fileitem-img status-" + this.state.status}>
                            <div className="field-image-info">
                                <a className="field-image-preview" href={previewUrl} target="_blank">
                                    <img src={previewUrl} />
                                </a>
                            </div>
                            <div className="field-status">
                                <a className="kuma-upload-action" onClick={this.onCancel.bind(this)}>
                                    <i className="kuma-icon kuma-icon-close"></i>
                                </a>
                            </div>
                        </div>;
            } else {
                return <div className={"kuma-upload-fileitem status-" + this.state.status}>
                    <label className="field-icon">
                        {this.state.status === 'error' ? <i className="kuma-icon kuma-icon-caution" /> : null}
                        {this.state.status !== 'error' ? <i className="kuma-upload-fileicon" data-ext={this.file.ext} data-type={this.file.type}/> : null}
                    </label>
                    <div className="field-info-wrap">
                        <label className="field-info">
                            <span className="filename">{this.file.name}</span>
                        </label>
                        <label className="field-status">
                            {this.state.status === 'error' ? <a className="kuma-upload-status status-error">{i18n[locale]['upload_failed']}</a> : null}
                            {this.state.status !== 'error' && this.state.status !== 'success' ? <Progress /> : null}
                            {(this.state.status === 'success' || this.state.status === 'error') ? <a className="kuma-upload-action close-action" onClick={this.onCancel.bind(this)}><i className="kuma-icon kuma-icon-close"></i></a> : null}
                            {this.state.status === 'success' && previewUrl ? <a className="kuma-upload-action" target="_blank" href={previewUrl}>{i18n[locale]['preview']}</a> : null}
                            {this.state.status === 'success' && downloadUrl ? <a className="kuma-upload-action" target="_blank" href={downloadUrl}>{i18n[locale]['download']}</a> : null}
                        </label>
                    </div>
                </div>;
            }
        } else {
            const size = util.humanSizeFormat(this.file.size);
            return <div className={"kuma-upload-fileitem status-" + this.state.status}>
                <label className="field-info">
                    <i className="kuma-upload-fileicon" data-ext={this.file.ext} data-type={this.file.type}/>
                    <span className="filename" title={this.file.name}>{util.natcut(this.file.name, 12)}</span>
                    <span className="filesize">{'/' + size}</span>
                </label>
                <label className="field-status">
                    {this.state.status === 'error' ? <a className="kuma-upload-status status-error" title={i18n[locale]['upload_failed']}><i className="kuma-icon kuma-icon-caution" /></a> : null}
                    {this.state.status === 'success' ? <a className="kuma-upload-status status-success"><i className="kuma-icon kuma-icon-choose" /></a> : null}

                    {this.state.status === 'error' ? <a className="kuma-upload-action action-retry" onClick={this.onPending.bind(this)} title={i18n[locale]['retry']}>
                        <i className="kuma-icon kuma-icon-refresh" />
                    </a> : null}

                    {this.state.status === 'queued' ? <a className="kuma-upload-action action-upload" onClick={this.onPending.bind(this)} title={i18n[locale]['upload']}>
                        <i className="kuma-icon kuma-icon-triangle-right" />
                    </a> : null}

                    <a className="kuma-upload-action action-remove" onClick={this.onCancel.bind(this)} title={i18n[locale]['remove']}>
                        <i className="kuma-icon kuma-icon-close" />
                    </a>
                </label>
                <Progress percentage={this.state.percentage} mode="bar"/>
            </div>;
        }
    }
}

FileItem.defaultProps = {
    mode: 'mini'
};

module.exports = FileItem;
const Preview = require('./Preview');
const {Events} = require('uploadcore');
const React = require('react'); 
const ReactDOM = require('react-dom');

class FileItem extends React.Component {

    constructor(props) {
        super(props);

        const file = this.props.file;
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
        if (this.props.mode === 'icon') {
            return <div className={"kuma-upload-fileitem status-" + this.state.status}>
                <a className="kuma-upload-action action-remove" onClick={this.onCancel.bind(this)} title="移除">
                    <i className="kuma-icon kuma-icon-close" />
                </a>
                <div className="filepreview">
                    <Preview file={this.props.file} />
                    {this.state.status === 'error' ? <a className="kuma-upload-action action-retry" onClick={this.onPending.bind(this)} title="重传">
                        <i className="kuma-icon kuma-icon-refresh" />
                    </a> : null}
                    {this.state.status === 'queued' ? <a className="kuma-upload-action action-upload" onClick={this.onPending.bind(this)} title="上传">
                        <i className="kuma-icon kuma-icon-triangle-right" />
                    </a> : null}
                    {this.state.status === 'progress' || this.state.status === 'pending' ? <Progress percentage={this.state.percentage} /> : null}
                </div>
                {this.state.status === 'error' ? <a className="kuma-upload-status status-error" title="上传失败"><i className="kuma-icon kuma-icon-caution" /></a> : null}
                {this.state.status === 'success' ? <a className="kuma-upload-status status-success"><i className="kuma-icon kuma-icon-choose" /></a> : null}
                <div className="filename" title={this.file.name}>{util.natcut(this.file.name, 10)}</div>
            </div>
        } else if (this.props.mode === 'nw') {
            let downloadUrl, previewUrl;
            if (this.state.status === 'success') {
                const json = this.file.response.getJson();
                try {
                    downloadUrl = json.data.downloadUrl || json.data.file || json.data.url;
                    previewUrl = json.data.previewUrl || downloadUrl;
                } catch (e) {}
            }
            return <div className={"kuma-upload-fileitem status-" + this.state.status}>
                <label className="field-info">
                    {this.state.status === 'error' ? <i className="kuma-icon kuma-icon-caution" /> : null}
                    {this.state.status !== 'error' && this.state.status !== 'success' ? <i className="kuma-loading" /> : null}
                    {this.state.status === 'success' ? <i className="kuma-upload-fileicon" data-ext={this.file.ext} data-type={this.file.type}/> : null}
                    <span className="filename">{this.file.name}</span>
                </label>
                <label className="field-status">
                    {this.state.status === 'error' ? <a className="kuma-upload-status status-error">上传失败</a> : null}
                    {this.state.status !== 'error' && this.state.status !== 'success' ? <a className="kuma-upload-status status-progress">上传中...</a> : null}
                    {this.state.status === 'success' && previewUrl ? <a className="kuma-upload-action" target="_blank" href={previewUrl}>预览</a> : null}
                    {this.state.status === 'success' && downloadUrl ? <a className="kuma-upload-action" target="_blank" href={downloadUrl}>下载</a> : null}
                    <a className="kuma-upload-action" onClick={this.onCancel.bind(this)}>删除</a>
                </label>
            </div>;
        } else {
            const size = util.humanSizeFormat(this.file.size);
            return <div className={"kuma-upload-fileitem status-" + this.state.status}>
                <label className="field-info">
                    <i className="kuma-upload-fileicon" data-ext={this.file.ext} data-type={this.file.type}/>
                    <span className="filename" title={this.file.name}>{util.natcut(this.file.name, 12)}</span>
                    <span className="filesize">{'/' + size}</span>
                </label>
                <label className="field-status">
                    {this.state.status === 'error' ? <a className="kuma-upload-status status-error" title="上传失败"><i className="kuma-icon kuma-icon-caution" /></a> : null}
                    {this.state.status === 'success' ? <a className="kuma-upload-status status-success"><i className="kuma-icon kuma-icon-choose" /></a> : null}

                    {this.state.status === 'error' ? <a className="kuma-upload-action action-retry" onClick={this.onPending.bind(this)} title="重传">
                        <i className="kuma-icon kuma-icon-refresh" />
                    </a> : null}

                    {this.state.status === 'queued' ? <a className="kuma-upload-action action-upload" onClick={this.onPending.bind(this)} title="上传">
                        <i className="kuma-icon kuma-icon-triangle-right" />
                    </a> : null}

                    <a className="kuma-upload-action action-remove" onClick={this.onCancel.bind(this)} title="移除">
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
import React from 'react';
import $ from 'jquery';
import {Events, Status} from 'uploadcore';
import Progress from './progress.jsx';

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        const file = this.props.file;
        if (file.isImage()) {
            file.getAsDataUrl(1000).done((url) => this.setState({url}));
        }
    }

    render() {
        let image, cls = "exticon size-60 ext-" + this.props.file.ext;
        if (this.state.url) {
            cls += ' image';
            image = <img src={this.state.url} />;
        }
        return <div className={cls}>{image}</div>;
    }
}

export default class IconItem extends React.Component {

    constructor(props) {
        super(props);

        const file = this.props.file;

        let status = file.getStatus();
        if (status === Status.ERROR) {
            status = 'error';
        } else if (status === Status.SUCCESS) {
            status = 'complete';
        } else {
            status = 'pending';
        }

        this.state = {
            percentage: file.progress ? file.progress.percentage : 0,
            status: status
        };
    }

    componentDidMount() {
        const file = this.props.file;
        const statuschange = (status) => {
            if (status === Status.ERROR) {
                status = 'error';
            } else if (status === Status.SUCCESS) {
                status = 'complete';
            } else {
                status = 'pending';
            }
            const state = {
                status: status
            };
            if (status === 'error') {
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

    onResendClick() {
        this.props.file.pending();
    }

    onCancelClick(e) {
        if (!this.props.confirmCancel) {
            this.props.file.cancel();
            return;
        }
        this.props.confirmCancel().done(() => this.props.file.cancel());
    }

    render() {
        var preview;
        if (this.state.status === 'complete') {
            preview = <div className="preview">
                <Preview file={this.props.file} />
                <i className="icon icon-close overcancel"  onClick={this.onCancelClick.bind(this)} title="取消"></i>
            </div>;
        } else if (this.state.status === 'error') {
            preview = <div className="preview">
                <Preview file={this.props.file} />
                <i className="icon icon-close overcancel"  onClick={this.onCancelClick.bind(this)} title="取消"></i>
                <div className="errorpanel">
                    <span className="queue-error"><i className="icon icon-warn"></i>上传失败</span>
                    <a className="queue-resend" onClick={this.onResendClick.bind(this)}><i className="icon icon-refresh"></i>重传</a>
                </div>
            </div>;
        } else {
            preview = <div className="preview">
                <Preview file={this.props.file} />
                <Progress percentage={this.state.percentage} />
                <i className="icon icon-close overcancel"  onClick={this.onCancelClick.bind(this)} title="取消"></i>
            </div>;
        }
        return (
            <div className={"iconitem " + this.state.status}>
                {preview}
                <div className="queue-name" title={this.props.file.name}>{this.props.file.name}</div>
            </div>
        );
    }
}
IconItem.defaultProps = {
    file: null,
    confirmCancel: null
};
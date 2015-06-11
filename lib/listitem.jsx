import React from 'react';
import {Events, FileStatus as Status} from 'uploader';

function humanSizeFormat(size) {
    size = parseFloat(size);
    const prefixesSI = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let base = 1000,
        index = size ? Math.floor(Math.log(size) / Math.log(base)) : 0;
    index = Math.min(index, prefixesSI.length - 1);
    let powedPrecision = Math.pow(10, index < 2 ? 0 : (index > 2 ? 2 : 1));
    size = size / Math.pow(base, index);
    size = Math.round(size * powedPrecision) / powedPrecision;
    return size + ' ' + prefixesSI[index] + 'B';
}

export default class ListItem extends React.Component {

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
        var size = humanSizeFormat(this.props.file.size);
        var percent = this.state.percentage + '%';
        var progressStyle = {width: percent};
        var info;
        if (this.state.status === 'complete') {
            info = <label className="col col-info">
                <i className="icon icon-success queue-complete" />
                <a className="queue-cancel" onClick={this.onCancelClick.bind(this)} title="取消"><i className="icon icon-cancel"></i></a>
            </label>;
        } else if (this.state.status === 'error') {
            info = <label className="col col-info">
                <span className="queue-error"><i className="icon icon-warn"></i>上传失败</span>
                <a className="queue-resend" onClick={this.onResendClick.bind(this)} title="重传"><i className="icon icon-refresh"></i></a>
                <a className="queue-cancel" onClick={this.onCancelClick.bind(this)} title="取消"><i className="icon icon-cancel"></i></a>
            </label>
        } else {
            info = (<label className="col col-info">
                <span className="queue-progress-text">{percent}</span>
                <a className="queue-cancel" onClick={this.onCancelClick.bind(this)} title="取消"><i className="icon icon-cancel"></i></a>
            </label>);
        }
        return (
            <div className={"listitem " + this.state.status}>
                <label className="col col-name">
                    <i className={"exticon size-40 ext-" + this.props.file.ext}/>
                    <span className="queue-name" title={this.props.file.name}>{this.props.file.name}</span>
                </label>
                <label className="col col-size queue-size">{size}</label>
                {info}
                <div className="queue-progress-bar" style={progressStyle}/>
            </div>
        );
    }
}
ListItem.defaultProps = {
    file: null,
    confirmCancel: null
};
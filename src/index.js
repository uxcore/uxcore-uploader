import React, {Component} from 'react';
import {UploadCore, Events, Status} from 'uxcore-uploadcore';
import Progress from './progress';

const CORE_INSTANCE = {};
function getCoreInstance(props) {
    let core = props.core;
    if (core instanceof UploadCore) {
        return core;
    }

    const id = core;
    if (id && typeof id === 'string' && CORE_INSTANCE.hasOwnProperty(id)) {
        return CORE_INSTANCE[id];
    }

    let options = props.options || {};
    ['name', 'url', 'params', 'action', 'data', 'headers', 'withCredentials', 'timeout',
        'chunkEnable', 'chunkSize', 'chunkRetries', 'chunkProcessThreads', 'processThreads',
        'queueCapcity', 'autoPending', 'multiple', 'accept', 'sizeLimit', 'preventDuplicate'
    ].forEach((key) => {
        if (props.hasOwnProperty(key)) {
            options[key] = props[key];
        }
    });

    core = new UploadCore(options);

    for (let key in props) {
        if (props.hasOwnProperty(key)) {
            let m = /^on(\w+)$/i.exec(key);
            if (!m) continue;
            if (Events.hasOwnProperty(m[1]) && (typeof props[key] === 'function')) {
                core.on(m[1], props[key]);
            }
        }
    }

    if (id) {
        CORE_INSTANCE[id] = core;
    }

    return core;
}

class FileList extends Component {
    constructor(props) {
        super(props);

        this.core = this.props.core;

        this.state = {
            items: this.core.getStat().getFiles()
        };
    }

    componentDidMount() {
        const statchange = (stat) => {
            this.setState({
                items: stat.getFiles()
            });
        };
        this.core.on(Events.QUEUE_STAT_CHANGE, statchange);
        this.stopListen = () => {
            this.core.off(Events.QUEUE_STAT_CHANGE, statchange);
        };
    }

    componentWillUnmount() {
        this.stopListen && this.stopListen();
    }

    render() {
        return <div className={"kuma-upload-filelist " + (this.props.mode === 'mini' ? 'minimode' : 'iconmode')}>
            <div className="inner">
                {this.state.items.map((file) => {
                    return <FileItem key={file.id} file={file} mode={this.props.mode} />;
                })}
                {!this.core.isFull() && this.props.mode === 'icon' ? <Picker core={this.core}><i className="kuma-upload-icon icon-add" /></Picker> : null}
            </div>
        </div>
    }
}

FileList.defaultProps = {
    mode: 'mini'
};

class Picker extends Component {
    componentDidMount() {
        this.area = this.props.core.getPickerCollector().addArea(React.findDOMNode(this));
    }
    componentWillUnmount() {
        this.area && this.area.destroy();
    }

    render() {
        return <div className="kuma-upload-picker">{this.props.children}</div>;
    }
}

export default class Uploader extends Component {
    constructor(props) {
        super(props);

        this.core = getCoreInstance(this.props);

        this.state = {
            total: this.core.getTotal()
        };

        const statchange = (stat) => {
            const total = stat.getTotal();
            if (total !== this.state.total) {
                this.setState({total:total});
            }
        };
        this.core.on(Events.QUEUE_STAT_CHANGE, statchange);
        this.stopListen = () => {
            this.core.off(Events.QUEUE_STAT_CHANGE, statchange);
        };
    }
    componentWillUnmount() {
        this.stopListen && this.stopListen();
    }
    render() {
        let children = this.props.children;
        if (!children || children.length < 1) {
            children = <button className="kuma-upload-button"><i className="kuma-upload-icon icon-upload"/>UPLOAD</button>;
        }
        return <div className={"kuma-uploader " + (this.props.className || '')}>
            {this.core.isFull() ? null : <Picker core={this.core}>{children}</Picker>}
            {this.state.total > 0 ? (<FileList core={this.core} mode="mini" />) : null}
        </div>;
    }
}

export class Droparea extends Component {
    constructor(props) {
        super(props);

        this.core = getCoreInstance(this.props);

        this.state = {
            blink: 0,
            highlight: 0,
            total: this.core.getTotal()
        };

        const statchange = (stat) => {
            const total = stat.getTotal();
            if (total !== this.state.total) {
                this.setState({total:total});
            }
        };
        this.core.on(Events.QUEUE_STAT_CHANGE, statchange);
        this.stopListen = () => {
            this.core.off(Events.QUEUE_STAT_CHANGE, statchange);
        };
    }

    componentDidMount() {
        const areaNode = React.findDOMNode(this);

        const dndArea = this.core.getDndCollector().addArea(areaNode);
        dndArea.on('start', () => {
            this.setState({blink:1})
        }).on('response', (e) => {
            if (areaNode.contains(e.target)) {
                this.setState({highlight:1});
            } else {
                this.setState({highlight:0});
            }
        }).on('end', () => {
            this.setState({blink:0,highlight:0});
        });
        this.dndArea = dndArea;
    }
    componentWillUnmount() {
        this.dndArea && this.dndArea.destroy();
        this.stopListen && this.stopListen();
    }
    render() {
        let className = "kuma-uploader kuma-upload-droparea";
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        if (this.state.blink) {
            className += ' blink';
        }
        if (this.state.highlight) {
            className += ' enter';
        }
        let children = this.props.children;
        if (!children || children.length < 1) {
            children = <i className="kuma-upload-icon icon-add" />;
        }
        return <div className={className}>
            {this.state.total > 0
                ? <FileList core={this.core} mode="icon" />
                : <Picker core={this.core}>{children}</Picker>}
            <div className="kuma-upload-responser" />
        </div>;
    }
}

class FileItem extends Component {

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
                    <i className="kuma-upload-icon icon-remove" />
                </a>
                <div className="filepreview">
                    <Preview file={this.props.file} />
                    {this.state.status === 'error' ? <a className="kuma-upload-action action-retry" onClick={this.onPending.bind(this)} title="重传">
                        <i className="kuma-upload-icon icon-retry" />
                    </a> : null}
                    {this.state.status === 'queued' ? <a className="kuma-upload-action action-upload" onClick={this.onPending.bind(this)} title="上传">
                        <i className="kuma-upload-icon icon-start" />
                    </a> : null}
                    {this.state.status === 'progress' || this.state.status === 'pending' ? <Progress percentage={this.state.percentage} /> : null}
                </div>
                {this.state.status === 'error' ? <a className="kuma-upload-status status-error" title="上传失败"><i className="kuma-upload-icon icon-error" /></a> : null}
                {this.state.status === 'success' ? <a className="kuma-upload-status status-success"><i className="kuma-upload-icon icon-success" /></a> : null}
                <div className="filename" title={this.file.name}>{natcut(this.file.name, 10)}</div>
            </div>
        } else {
            const size = humanSizeFormat(this.file.size);
            return <div className={"kuma-upload-fileitem status-" + this.state.status}>
                <label className="field-info">
                    <i className="kuma-upload-fileicon" data-ext={this.file.ext} data-type={this.file.type}/>
                    <span className="filename" title={this.file.name}>{natcut(this.file.name, 12)}</span>
                    <span className="filesize">{'/' + size}</span>
                </label>
                <label className="field-status">
                    {this.state.status === 'error' ? <a className="kuma-upload-status status-error" title="上传失败"><i className="kuma-upload-icon icon-error" /></a> : null}
                    {this.state.status === 'success' ? <a className="kuma-upload-status status-success"><i className="kuma-upload-icon icon-success" /></a> : null}

                    {this.state.status === 'error' ? <a className="kuma-upload-action action-retry" onClick={this.onPending.bind(this)} title="重传">
                        <i className="kuma-upload-icon icon-retry" />
                    </a> : null}

                    {this.state.status === 'queued' ? <a className="kuma-upload-action action-upload" onClick={this.onPending.bind(this)} title="上传">
                        <i className="kuma-upload-icon icon-start" />
                    </a> : null}

                    <a className="kuma-upload-action action-remove" onClick={this.onCancel.bind(this)} title="移除">
                        <i className="kuma-upload-icon icon-remove" />
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

class Preview extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        const file = this.props.file;
        if (file.isImage()) {
            file.getAsDataUrl(1000).done((url) => this.setState({url}));
        }
    }

    render() {
         return <div className="previewer">{this.state.url
            ? <img src={this.state.url} />
            : <i className="kuma-upload-fileicon" data-ext={this.props.file.ext} data-type={this.props.file.type}/>}</div>;
    }
}

function natcut(title, len) {
    let max = len * 2, length = title.length, l = 0, i = 0, part, s;
    for (i=0; i < length && l <= max; i++) {
        l += title.charCodeAt(i) > 255 ? 2 : 1;
    }
    if (l <= max) {
        return title;
    }
    i = 0;
    l = 0;
    len -= 2;
    while (l < len) {
        s = title.charCodeAt(i) > 255 ? 2 : 1;
        if (l + s > len) {
            break;
        } else {
            i++;
            l += s;
        }
    }
    part = title.substr(0, i);
    l += 3;

    i = length;
    while (l < max) {
        s = title.charCodeAt(i-1) > 255 ? 2 : 1;
        if (l + s > max) {
            break;
        } else {
            i--;
            l += s;
        }
    }
    return part + '...' + title.substring(Math.min(i, length-1), length);
}
function humanSizeFormat(size) {
    size = parseFloat(size);
    const prefixesSI = ['', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y'];
    let base = 1000,
        index = size ? Math.floor(Math.log(size) / Math.log(base)) : 0;
    index = Math.min(index, prefixesSI.length - 1);
    let powedPrecision = Math.pow(10, index < 2 ? 0 : (index > 2 ? 2 : 1));
    size = size / Math.pow(base, index);
    size = Math.round(size * powedPrecision) / powedPrecision;
    if (size > 500) {
        size = Math.round(size / 100) / 10;
        index++;
    }
    return size + prefixesSI[index];
}

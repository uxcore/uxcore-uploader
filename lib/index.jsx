import React, {Component} from 'react';
import $ from 'jquery';
import UploadCore, {Events, Status} from 'uploadcore';

const CORE_INSTANCE = {};
function getCoreInstance(id, options) {
    if (CORE_INSTANCE.hasOwnProperty(id)) {
        return CORE_INSTANCE[id];
    }
    const core = new UploadCore({
        request: {
            name: 'file',
            url: 'http://test.yanbingbing.com/upload.php'
        },
        autoPending: false
    });

    CORE_INSTANCE[id] = core;

    return core;
}

class List extends Component {
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
        return <div className="ucxore-upload-list">
            <div className="filelist">{this.state.items.map((file) => {
                return <ListItem key={file.id} file={file} />;
            })}</div>
        </div>
    }
}

class Picker extends Component {
    componentDidMount() {
        this.area = this.props.core.getPickerCollector().addArea(React.findDOMNode(this));
    }
    componentWillUnmount() {
        this.area && this.area.destroy();
    }

    render() {
        let children = this.props.children;
        if (!children || children.length < 1) {
            children = <i className="icon uxcore-upload-icon" />;
        }
        return <div className="uxcore-upload-picker">{children}</div>;
    }
}

export default class Uploader extends Component {
    constructor(props) {
        super(props);

        this.core = this.props.core;
        if (!(this.core instanceof UploadCore)) {
            this.core = getCoreInstance(this.core || 'default');
        }
        this.state = {
            total: 0
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
        return <div className={"uxcore-uploader " + (this.props.className || '')}>
            <Picker core={this.core}>{this.props.children}</Picker>
            <List core={this.core} mode="mini" />
        </div>;
    }
}

class Droparea extends Component {
    constructor(props) {
        super(props);

        this.core = this.props.core;
        if (!(this.core instanceof UploadCore)) {
            this.core = getCoreInstance(this.core || 'default');
        }
        this.state = {
            blink: 0,
            highlight: 0,
            total: 0
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
        let className = "uxcore-uploader uxcore-upload-droparea";
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        if (this.state.blink) {
            className += ' blink';
        }
        if (this.state.highlight) {
            className += ' highlight';
        }
        return <div className={className}>
            {this.state.total > 0
                ? <List core={this.core} mode={this.props.listMode} />
                : <Picker core={this.core}>{this.props.children}</Picker>}
            <div className="uxcore-upload-responser" />
        </div>;
    }
}

function humanSizeFormat(size) {
    size = parseFloat(size);
    const prefixesSI = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let base = 1000,
        index = size ? Math.floor(Math.log(size) / Math.log(base)) : 0;
    index = Math.min(index, prefixesSI.length - 1);
    let powedPrecision = Math.pow(10, index < 2 ? 0 : (index > 2 ? 2 : 1));
    size = size / Math.pow(base, index);
    size = Math.round(size * powedPrecision) / powedPrecision;
    return size + prefixesSI[index];
}

class ListItem extends Component {

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
        const size = humanSizeFormat(this.file.size);
        const percent = this.state.percentage + '%';
        const progressStyle = {width: percent};
        let actions;
        if (this.state.status === 'success') {
            actions = <label className="field field-actions">
                <a className="icon action action-remove status-success" onClick={this.onCancel.bind(this)} title="移除" />
            </label>;
        } else if (this.state.status === 'error') {
            actions = <label className="field field-actions">
                <a className="icon action action-retry" onClick={this.onPending.bind(this)} title="重传" />
                <a className="icon action action-remove status-error" onClick={this.onCancel.bind(this)} title="上传失败" />
            </label>;
        } else if (this.state.status === 'pending') {
            actions = <label className="field field-actions">
                <a className="icon action action-remove" onClick={this.onCancel.bind(this)} title="取消" />
            </label>;
        } else {
            actions = <label className="field field-actions">
                <a className="icon action action-upload" onClick={this.onPending.bind(this)} title="上传" />
                <a className="icon action action-remove" onClick={this.onCancel.bind(this)} title="取消" />
            </label>;
        }
        return (
            <div className={"fileitem " + this.state.status}>
                <label className="field field-name">
                    <i className={"exticon size-40 ext-" + this.file.ext}/>
                    <span className="name" title={this.file.name}>{this.file.name}</span>
                </label>
                <label className="field field-size">{size}</label>
                {actions}
                <div className="progressbar" style={progressStyle}/>
            </div>
        );
    }
}
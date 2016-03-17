const React = require('react'); 
const ReactDOM = require('react-dom');
const {UploadCore, Events, Status} = require('uploadcore');
const Progress = require('./progress');
const util = require("./util");
const FileList = require("./FileList");
const Picker = require("./Picker");

UploadCore.setSWF('https://alinw.alicdn.com/alinw/uxuploader/2.0.1/flashpicker.swf');

const CORE_INSTANCE = {};
function getCoreInstance(props, autoPending) {
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
    if (autoPending != null) {
        options.autoPending = autoPending;
    }

    core = new UploadCore(options);

    for (let key in props) {
        if (props.hasOwnProperty(key)) {
            let m = /^on(\w+)$/i.exec(key);
            if (!m) continue;
            if (typeof props[key] === 'function') {
                core.on(m[1], props[key]);
            }
        }
    }

    if (id) {
        CORE_INSTANCE[id] = core;
    }

    return core;
}





class Uploader extends React.Component {
    constructor(props) {
        super(props);

        this.core = getCoreInstance(this.props, true);

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

    reset() {
        this.core.getFiles().forEach((file) => {
            file.cancel();
        });
    }

    render() {
        let children = this.props.children;
        if (!children || children.length < 1) {
            children = <button className="kuma-upload-button"><i className="kuma-icon kuma-icon-uploading"/>添加文件</button>;
        }
        return <div className={"kuma-uploader " + (this.props.className || '')}>
            <Picker core={this.core}>{children}</Picker>
            {this.props.tips}
            {this.state.total > 0 ? (<FileList core={this.core} mode="nw" />) : null}
        </div>;
    }
}

class Dropzoom extends React.Component {
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

    reset() {
        this.core.getFiles().forEach((file) => {
            file.cancel();
        });
    }

    componentDidMount() {
        const areaNode = ReactDOM.findDOMNode(this);

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
        let className = "kuma-uploader kuma-upload-dropzoom";
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
            children = <i className="kuma-icon kuma-icon-add" />;
        }
        return <div className={className}>
            {this.state.total > 0
                ? <FileList core={this.core} mode="icon" />
                : <Picker core={this.core}>{children}</Picker>}
            <div className="kuma-upload-responser" />
        </div>;
    }
}

Uploader.Dropzoom = Dropzoom;

Uploader.Events = Events;
Uploader.Status = Status;
Uploader.setSWF = function (swf) {
    UploadCore.setSWF(swf);
};



module.exports = Uploader;

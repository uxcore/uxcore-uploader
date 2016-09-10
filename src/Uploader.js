const React = require('react');
const ReactDOM = require('react-dom');
const {UploadCore, Events, Status} = require('uploadcore');
const util = require("./util");
const FileList = require("./FileList");
const Picker = require("./Picker");
const Dropzoom = require('./Dropzoom');
const i18n = require("./locale");
const RESETOPTIONS = [
    'name', 'url', 'params', 'action', 'data', 'headers', 
    'withCredentials', 'timeout', 'chunkEnable', 'chunkSize', 
    'chunkRetries', 'chunkProcessThreads', 'autoPending', 
    'auto', 'sizeLimit', 'fileSizeLimit'
];


class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.core = util.getCoreInstance(props, true);
        this.fileList = this.getDefaultList();
        this.state = {
            total: this.core.getTotal(),
            fileList: this.processDefaultList(this.fileList)
        };
    }

    componentWillMount() {
        let me = this;
        let {onfileuploadsuccess, onfilecancel, onCancel, preventDuplicate} = me.props;
        me.statchange = (stat) => {
            const total = stat.getTotal();
            if (total !== me.state.total) {
                me.setState({total:total});
            }
        };
        me.fileuploadsuccess = (file, response) => {
            let newList = util.simpleDeepCopy(me.state.fileList);
            newList.push(me.processFile(file));
            me.handleChange(newList);
            file.cancel(true);
            me.core.getStat().remove(file);
            // onfileuploadsuccess && onfileuploadsuccess(file, response);
        };

        me.filecancel = (file) => {
            let newList = util.simpleDeepCopy(me.state.fileList);
            newList.push({
                type: 'delete',
                response: file.response ? file.response.getJson() : null,
            });
            me.handleChange(newList);
            onfilecancel && onfilecancel(file);
            onCancel && onCancel(me.processFile(file));
        };
        me.core.on(Events.QUEUE_STAT_CHANGE, me.statchange);
        me.core.on(Events.FILE_UPLOAD_SUCCESS, me.fileuploadsuccess);
        me.core.on(Events.FILE_CANCEL, me.filecancel);
        me.core.addConstraint(() => {
            if (me.props.queueCapcity === undefined || me.props.queueCapcity === null) {
                return false;
            }
            else {
                return me.state.fileList.filter((file) => {
                    return file.type !== 'delete'
                }).length + me.core.getTotal() >= me.props.queueCapcity;
            }
        });
        me.core.addFilter((file) => {
            if (preventDuplicate) {
                if (this.state.fileList.some((item) => item.type === 'upload' && item.name === file.name && item.size === file.size)) {
                    return `DuplicateError: ${file.name} is duplicated`
                }
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        let me = this;
        let newState = {};
        let options = {};
        if (!util.simpleDeepEqual(nextProps.fileList, me.fileList)) {
            me.fileList = me.getDefaultList(nextProps);
            me.setState({
                fileList: me.processDefaultList(me.fileList)
            });
        }
        RESETOPTIONS.forEach((item) => {
            if (nextProps.hasOwnProperty(item) && me.props[item] !== nextProps[item]) {
                options[item] = nextProps[item];
            }
        });
        me.core.setOptions && me.core.setOptions(options);
    }

    componentWillUnmount() {
        this.stopListen();
    }

    getCore() {
        return this.core;
    }

    stopListen() {
        this.core.off(Events.QUEUE_STAT_CHANGE, this.statchange);
        this.core.off(Events.FILE_UPLOAD_SUCCESS, this.fileuploadsuccess);
        this.core.off(Events.FILE_CANCEL, this.filecancel);
    }

    reset() {
        this.core.getFiles().forEach((file) => {
            file.cancel(true);
        });
    }

    /**
     * deepcopy props.filelist for comparision in `componentWillReceiveProps`
     */
    getDefaultList(props) {
        let me = this;
        props = props || me.props;
        return util.simpleDeepCopy(props.fileList);
    }

    addUniqueIdForList(fileList) {
        let newList = util.simpleDeepCopy(fileList);
        newList = newList.map((file, index) => {
            file.__uploaderId = 'uploader' + index;
            return file;
        });
        return newList;
    }

    processFile(file) {
        return {
            ext: file.ext,
            name: file.name,
            size: file.size,
            fileType: file.type,
            type: 'upload',
            response: file.response ? file.response.getJson() : null,
        }
    }

    processDefaultList(fileList) {
        let me = this;
        return me.addUniqueIdForList(fileList).map((file) => {
            return me.processDefaultListFile(file);
        });
    }

    /**
     * process file in this.props.fileList
     */
    processDefaultListFile(file) {
        !file.type && (file.type = 'list');
        return file;
    }

    handleRemoveFile(file) {
        let me = this;
        let newList = util.simpleDeepCopy(me.state.fileList);
        newList = newList.map((item) => {
            if (item.__uploaderId === file.__uploaderId) {
                item.subType = item.type;
                item.type = 'delete';
            } 
            return item;
        });
        me.handleChange(newList);
        me.props.onCancel && me.props.onCancel(file);
    }

    handleChange(fileList) {
        let me = this;
        me.props.onChange(fileList);
    }

    render() {
        let me = this;
        let {children, locale} = this.props;
        if (!children || children.length < 1) {
            children = <button className="kuma-upload-button"><i className="kuma-icon kuma-icon-uploading"/>{i18n[locale]['upload_files']}</button>;
        }
        return <div className={"kuma-uploader " + (this.props.className || '')}>
            <Picker core={this.core}>{children}</Picker>
            {this.props.tips}
            {(this.state.total > 0 || this.state.fileList.length > 0) ? (<FileList locale={this.props.locale} core={this.core} isOnlyImg={this.props.isOnlyImg} mode="nw" fileList={me.state.fileList} removeFileFromList={me.handleRemoveFile.bind(me)} interval={this.props.progressInterval}/>) : null}
        </div>;
    }
}

Uploader.Dropzoom = Dropzoom;

Uploader.Events = Events;
Uploader.Status = Status;
Uploader.setSWF = function (swf) {
    UploadCore.setSWF(swf);
};

Uploader.displayName = "Uploader";

Uploader.defaultProps = {
    locale: 'zh-cn',
    fileList: [],
    onChange: () => {},
    onError: () => {}
}

Uploader.propTypes = {
    locale: React.PropTypes.string,
    fileList: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func
}



module.exports = Uploader;

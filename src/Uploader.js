const React = require('react');
const ReactDOM = require('react-dom');
const {UploadCore, Events, Status} = require('uploadcore');
const util = require("./util");
const FileList = require("./FileList");
const Picker = require("./Picker");
const Dropzoom = require('./Dropzoom');
const i18n = require("./locale");


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
        let {onfileuploadsuccess, onfilecancel, onCancel} = me.props;
        me.statchange = (stat) => {
            const total = stat.getTotal();
            if (total !== me.state.total) {
                me.setState({total:total});
            }
        };
        me.fileuploadsuccess = (file, response) => {
            me.handleChange();
            onfileuploadsuccess && onfileuploadsuccess(file, response);
        };

        me.filecancel = (file) => {
            let newList = util.simpleDeepCopy(me.state.fileList);
            newList.push({
                type: 'delete',
                response: JSON.parse(file.response.rawResponse.rawResponse)
            });
            me.setState({
                fileList: newList
            }, () => {
                me.handleChange();
            });
            onfilecancel && onfilecancel(file);
            onCancel && onCancel(me.processFile(file));
        };
        me.core.on(Events.QUEUE_STAT_CHANGE, me.statchange);
        me.core.on(Events.FILE_UPLOAD_SUCCESS, me.fileuploadsuccess);
        me.core.on(Events.FILE_CANCEL, me.filecancel);
    }

    componentWillReceiveProps(nextProps) {
        let me = this;
        if (!util.simpleDeepEqual(nextProps.fileList, me.fileList)) {
            me.fileList = me.getDefaultList(nextProps);
            me.setState({
                fileList: me.processDefaultList(me.fileList)
            });
        }
    }

    componentWillUnmount() {
        this.stopListen();
    }

    stopListen() {
        this.core.off(Events.QUEUE_STAT_CHANGE, this.statchange);
        this.core.off(Events.FILE_UPLOAD_SUCCESS, this.fileuploadsuccess);
        this.core.off(Events.FILE_CANCEL, me.filecancel);
    }

    reset() {
        this.core.getFiles().forEach((file) => {
            file.cancel(silence);
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
            file.__uploaderId = file.name + index;
            return file;
        });
        return newList;
    }

    processFile(file) {
        return {
            ext: file.ext,
            name: file.name,
            type: 'upload',
            response: JSON.parse(file.response.rawResponse.rawResponse)
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
        return {
            type: 'list',
            response: file
        }
    }

    handleRemoveFile(file) {
        let me = this;
        let newList = util.simpleDeepCopy(me.state.fileList);
        newList = newList.map((item) => {
            if (item.response.__uploaderId === file.__uploaderId) {
                item.subType = item.type;
                item.type = 'delete';
            } 
            return item
        });
        me.props.onCancel && me.props.onCancel(me.processDefaultListFile(file));
        me.setState({
            fileList: newList
        }, () => {
            me.handleChange();
        });
    }

    handleChange() {
        let me = this;
        let uploadFiles = me.core.getFiles().filter((file) => {
            return file.status == Status.SUCCESS;
        }).map((file) => {
            return me.processFile(file);
        });
        let defaultFiles = me.state.fileList;
        me.props.onChange(defaultFiles.concat(uploadFiles));
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
            {(this.state.total > 0 || this.props.fileList.length > 0) ? (<FileList locale={this.props.locale} core={this.core} isOnlyImg={this.props.isOnlyImg} mode="nw" fileList={me.state.fileList} removeFileFromList={me.handleRemoveFile.bind(me)} />) : null}
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

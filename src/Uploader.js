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
            fileList: this.addUniqueIdForList(this.fileList)
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
            me.handleChange();
            onfilecancel && onfilecancel(file);
            onCancel && onCancel(me.processFile(file));
        };
        me.core.on(Events.QUEUE_STAT_CHANGE, me.statchange);
        me.core.on(Events.FILE_UPLOAD_SUCCESS, me.fileuploadsuccess);
        me.core.on(Events.FILE_CANCEL, me.filecancel);
    }

    componentWillReceiveProps(nextProps) {
        let me = this;
        if (util.simpleDeepEqual(nextProps.fileList, me.fileList)) {
            me.fileList = me.getDefaultList(nextProps);
            me.setState({
                fileList: me.addUniqueIdForList(me.fileList)
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
            file.cancel();
        });
    }

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
        newList = newList.filter((item) => {
            return item.__uploaderId !== file.__uploaderId;
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
        let uploadFiles = me.core.getFiles().map((file) => {
            return me.processFile(file);
        });
        let defaultFiles = me.state.fileList.map((file) => {
            return me.processDefaultListFile(file);
        });
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

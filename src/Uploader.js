import React from 'react';
import PropTypes from 'prop-types';
import { UploadCore, Events, Status } from 'uploadcore/dist/uploadcore';
import Button from 'uxcore-button';
import { polyfill } from 'react-lifecycles-compat';
import util from './util';
import FileList from './FileList';
import Picker from './Picker';
import Dropzoom from './Dropzoom';
import i18n from './locale';

const RESETOPTIONS = [
  'name', 'url', 'params', 'action', 'data', 'headers',
  'withCredentials', 'timeout', 'chunkEnable', 'chunkSize',
  'chunkRetries', 'chunkProcessThreads', 'autoPending',
  'auto', 'sizeLimit', 'fileSizeLimit', 'queueCapcity',
];


class Uploader extends React.Component {

  static Dropzoom = Dropzoom;

  static Events = Events;
  static Status = Status;
  static setSWF = function (swf) {
    UploadCore.setSWF(swf);
  };

  static displayName = 'Uploader';

  static defaultProps = {
    locale: 'zh-cn',
    autoPending: true,
    fileList: [],
    onChange: () => { },
    onError: () => { },
    isVisual: false,
    isOnlyImg: false,
    showErrFile: true,
  };

  static propTypes = {
    locale: PropTypes.string,
    fileList: PropTypes.array,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    tips: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ]),
    className: PropTypes.string,
    readOnly: PropTypes.bool,
    isVisual: PropTypes.bool,
    isOnlyImg: PropTypes.bool,
    showErrFile: PropTypes.bool,
    children: PropTypes.any,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!util.simpleDeepEqual(nextProps.fileList, prevState.preFileList)) {
      return {
        fileList: Uploader.processDefaultList(util.simpleDeepCopy(nextProps.fileList)),
        preFileList: nextProps.fileList,
      };
    }
    return prevState;
  }

  /**
  * process file in this.props.fileList
  */
  static processDefaultListFile(file) {
    const newFile = file;
    if (!file.type) newFile.type = 'list';
    return newFile;
  }

  static processFile(file) {
    return {
      ext: file.ext,
      name: file.name,
      size: file.size,
      fileType: file.type,
      type: 'upload',
      response: file.response ? file.response.getJson() : null,
    };
  }

  /**
  * deepcopy props.filelist for comparision in `componentWillReceiveProps`
  */
  static addUniqueIdForList(fileList) {
    let newList = util.simpleDeepCopy(fileList);
    newList = newList.map((file, index) => {
      const newFile = file;
      newFile.__uploaderId = `uploader${index}`;
      return newFile;
    });
    return newList;
  }

  static processDefaultList(fileList) {
    return Uploader.addUniqueIdForList(fileList).map(file => Uploader.processDefaultListFile(file));
  }

  constructor(props) {
    super(props);
    this.core = util.getCoreInstance(props);
    this.state = {
      total: this.core.getTotal(),
      fileList: Uploader.processDefaultList(util.simpleDeepCopy(props.fileList)),
      preFileList: props.fileList,
    };
    this.init();
  }

  componentDidUpdate(nextProps) {
    const options = {};
    RESETOPTIONS.forEach((item) => {
      if (nextProps.hasOwnProperty(item) && this.props[item] !== nextProps[item]) {
        options[item] = nextProps[item];
      }
    });
    if (this.core.setOptions) this.core.setOptions(options);
  }

  componentWillUnmount() {
    this.stopListen();
  }

  getCore() {
    return this.core;
  }

  getUploadingFiles() {
    return this.core.getFiles().filter(file =>
      ([Status.CANCELLED, Status.SUCCESS, Status.QUEUED].indexOf(file.status) === -1),
    );
  }

  getNotDeletedDefaultFiles() {
    return (this.state.fileList || []).filter(file => !file.type || file.type !== 'delete');
  }

  stopListen() {
    this.core.off(Events.QUEUE_STAT_CHANGE, this.statchange);
    this.core.off(Events.FILE_UPLOAD_SUCCESS, this.fileuploadsuccess);
    this.core.off(Events.FILE_CANCEL, this.filecancel);
  }

  reset() {
    this.core.getFiles().forEach((file) => {
      file.cancel(true);
      this.core.getStat().remove(file);
    });
    this.forceUpdate();
  }

  handleRemoveFile(file) {
    const me = this;
    let newList = util.simpleDeepCopy(me.state.fileList);
    newList = newList.map((item) => {
      const newItem = item;
      if (item.__uploaderId === file.__uploaderId) {
        newItem.subType = item.type;
        newItem.type = 'delete';
      }
      return newItem;
    });
    me.handleChange(newList);
    if (me.props.onCancel) me.props.onCancel(file);
  }

  handleChange(fileList) {
    const me = this;
    me.props.onChange(fileList);
  }

  init() {
    const me = this;
    me.statchange = (stat) => {
      const total = stat.getTotal();
      if (total !== me.state.total) {
        me.setState({ total });
      }
    };
    me.fileuploadstart = (file) => {
      if (file.status === Status.PROGRESS) {
        me.forceUpdate();
      }
    };
    me.fileuploadsuccess = (file) => {
      let newList = util.simpleDeepCopy(me.state.fileList);
      newList.push(Uploader.processFile(file));
      if (me.props.actionOnQueueLimit === 'cover') {
        // the last ones will exist
        let count = 0;
        const coveredList = [];
        for (let i = newList.length - 1; i >= 0; i--) {
          if (count === me.props.queueCapcity) {
            break;
          }
          const item = newList[i];
          if (item.type !== 'delete') {
            count += 1;
          }
          coveredList.push(item);
        }
        newList = coveredList.reverse();
      }
      me.handleChange(newList);
      file.cancel(true);
      me.core.getStat().remove(file);
    };

    me.filecancel = (file) => {
      const onCancel = me.props.onCancel;
      const onfilecancel = me.props.onfilecancel;
      const newList = util.simpleDeepCopy(me.state.fileList);
      newList.push({
        type: 'delete',
        response: file.response ? file.response.getJson() : null,
      });
      me.handleChange(newList);
      if (onfilecancel) onfilecancel(file);
      if (onCancel) onCancel(Uploader.processFile(file));
    };
    me.core.on(Events.QUEUE_STAT_CHANGE, me.statchange);
    me.core.on(Events.FILE_UPLOAD_START, me.fileuploadstart);
    me.core.on(Events.FILE_UPLOAD_SUCCESS, me.fileuploadsuccess);
    me.core.on(Events.FILE_CANCEL, me.filecancel);
    me.core.addConstraint(() => {
      const queueCapcity = me.props.queueCapcity;
      const actionOnQueueLimit = me.props.actionOnQueueLimit;
      if (queueCapcity === undefined || queueCapcity === null
        || queueCapcity <= 0 || actionOnQueueLimit === 'cover') {
        return false;
      }
      return me.state.fileList.filter(file => file.type !== 'delete').length
        + me.core.getTotal() >= queueCapcity;
    });
    me.core.addFilter(file => {
      if (me.props.preventDuplicate) {
        if (this.state.fileList.some(item => item.type === 'upload'
          && item.name === file.name && item.size === file.size)) {
          return `DuplicateError: ${file.name} is duplicated`;
        }
      }
    });
  }

  renderTips() {
    const { tips } = this.props;
    if (tips) {
      return <div key="tips" className="kuma-upload-tip">{tips}</div>;
    }
    return null;
  }

  render() {
    const me = this;
    const { locale, isVisual } = this.props;
    let children = this.props.children;
    const readOnly = this.props.readOnly;
    const uploadingFiles = me.getUploadingFiles();
    const notDeletedDefaultFiles = me.getNotDeletedDefaultFiles();
    if (!children || children.length < 1) {
      if (isVisual) {
        children = (
          <button className="kuma-upload-button">
            {i18n[`${locale}-img`].upload_files}
          </button>
        );
      } else {
        children = <Button type="secondary" size="small">{i18n[locale].upload_files}</Button>;
      }
    }
    const tips = readOnly ? null : this.renderTips();
    const picker = readOnly ? null : (
      <Picker
        key="picker"
        core={this.core}
        isVisual={this.props.isVisual}
      >{children}</Picker>);
    const files = (uploadingFiles.length > 0 || notDeletedDefaultFiles.length > 0)
      ? (
      <FileList
        key="files"
        locale={this.props.locale}
        core={this.core}
        isVisual={this.props.isVisual}
        isOnlyImg={this.props.isOnlyImg}
        readOnly={this.props.readOnly}
        showErrFile={this.props.showErrFile}
        mode="nw"
        fileList={me.state.fileList}
        removeFileFromList={me.handleRemoveFile.bind(me)}
        interval={this.props.progressInterval}
      />)
      : null;
    const contents = isVisual ? [tips, files, picker] : [picker, tips, files];

    return (
      <div className={`kuma-uploader ${this.props.className || ''}`}>
        {contents}
      </div>
    );
  }
}

polyfill(Uploader);

export default Uploader;

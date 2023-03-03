import FileItem from './FileItem';
import DefaultFileItem from './DefaultFileItem';
import util from './util';
import { Events, Status } from 'uploadcore';
import React from 'react';
import PropTypes from 'prop-types';
import Album from 'uxcore-album';

const { Photo } = Album;

export default class FileList extends React.Component {
  static defaultProps = {
    mode: 'mini',
    showErrFile: true,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    localePack: PropTypes.object,
    mode: PropTypes.string,
    isVisual: PropTypes.bool,
    isOnlyImg: PropTypes.bool,
    showErrFile: PropTypes.bool,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    onlineEdit: PropTypes.bool,
    fileList: PropTypes.array,
    core: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.core = props.core;

    this.state = {
      items: this.core.getStat().getFiles(),
    };
  }

  componentDidMount() {
    const flag = this.props.showErrFile;
    const statchange = (stat) => {
      let files = stat.getFiles();
      if (!flag) {
        files = files.filter(file => file.getStatus() != 64);
      }
      this.setState({
        items: files,
      });
    };
    this.core.on(Events.QUEUE_STAT_CHANGE, statchange);
    this.stopListen = () => {
      this.core.off(Events.QUEUE_STAT_CHANGE, statchange);
    };
  }

  componentWillUnmount() {
    if (this.stopListen) {
      this.stopListen();
    }
  }

  onShowFile(file, url, current) {
    const { isOnlyImg, fileList, onShowFile } = this.props;

    if (onShowFile) { // 自定义预览行为
      onShowFile(file, url, current);
      return;
    }

    if (isOnlyImg && url) {

      const _fileList = fileList.map((item, index) => {
        if (item.response) {
          const { previewUrl } = util.getUrl(item.response);
          return (<Photo
            src={previewUrl}
            key={index}
          />);
        }
        return null;
      });

      const shows = _fileList.filter(item => !!item);

      Album.show({
        photos: shows,
        current,
        showButton: true,
      });
    } else {
      window.open(url);
    }
  }

  onDownloadFile(file, url, current){
    const { onDownloadFile } = this.props;
    if(onDownloadFile){
      onDownloadFile(file, url, current)
      return;
    }
    window.open(url)
  }

  onEditFile(file, url, current) {
    const { onEditFile } = this.props;
    if (onEditFile) {
      onEditFile(file, url, current);
      return;
    }
    window.open(url);
  }

  renderDefaultFileItems() {
    const arr = [];
    const fileList = this.props.fileList || [];
    fileList.forEach((file, index) => {
      if (file.type !== 'delete') {
        arr.push(
          <DefaultFileItem
            file={file}
            prefixCls={this.props.prefixCls}
            locale={this.props.locale}
            localePack={this.props.localePack}
            key={index}
            mode={this.props.mode}
            isOnlyImg={this.props.isOnlyImg}
            readOnly={this.props.readOnly}
            disabled={this.props.disabled}
            isVisual={this.props.isVisual}
            onlineEdit={this.props.onlineEdit}
            onShowFile={(currentFile, url) => { this.onShowFile(currentFile, url, index); }}
            onDownloadFile={(currentFile, url) => { this.onDownloadFile(currentFile, url, index); }}
            onEditFile={(currentFile, url) => { this.onEditFile(currentFile, url, index); }}
            onCancel={this.props.removeFileFromList.bind(this)}
          />);
      }
    });
    return arr;
  }

  renderFileItems() {
    const arr = [];
    this.state.items.forEach((file) => {
      if ([Status.CANCELLED, Status.SUCCESS, Status.QUEUED].indexOf(file.status) === -1) {
        arr.push(
          <FileItem
            prefixCls={this.props.prefixCls}
            locale={this.props.locale}
            localePack={this.props.localePack}
            key={file.id}
            file={file}
            mode={this.props.mode}
            onlineEdit={this.props.onlineEdit}
            isOnlyImg={this.props.isOnlyImg}
            isVisual={this.props.isVisual}
            interval={this.props.interval}
          />);
      }
    });
    return arr;
  }

  render() {

    const { prefixCls, mode, isVisual } = this.props;

    return (
      <div className={`${prefixCls}-filelist ${mode === 'nw' ? 'nwmode' : (mode === 'mini' ? 'minimode' : 'iconmode')}${isVisual ? ' filelist-visual' : ''}`}>
        <div className="inner fn-clear">
          {this.renderDefaultFileItems()}
          {this.renderFileItems()}
          {this.props.children}
        </div>
      </div>
    );
  }
}


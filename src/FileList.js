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
    locale: PropTypes.string,
    mode: PropTypes.string,
    isVisual: PropTypes.bool,
    isOnlyImg: PropTypes.bool,
    showErrFile: PropTypes.bool,
    readOnly: PropTypes.bool,
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
    if (this.props.isOnlyImg && url) {
      const fileList = this.props.fileList.map((item, index) => {
        if (item.response) {
          const { previewUrl } = util.getUrl(item.response);
          return (<Photo
            src={previewUrl}
            key={index}
          />);
        }
        return null;
      });

      const shows = fileList.filter(item => !!item);

      Album.show({
        photos: shows,
        current,
      });
    } else {
      window.open(url);
    }
  }

  renderDefaultFileItems() {
    const arr = [];
    const fileList = this.props.fileList || [];
    fileList.forEach((file, index) => {
      if (file.type !== 'delete') {
        arr.push(
          <DefaultFileItem
            file={file}
            locale={this.props.locale}
            key={index}
            mode={this.props.mode}
            isOnlyImg={this.props.isOnlyImg}
            readOnly={this.props.readOnly}
            isVisual={this.props.isVisual}
            onShowFile={(currentFile, url) => { this.onShowFile(currentFile, url, index); }}
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
            locale={this.props.locale}
            key={file.id}
            file={file}
            mode={this.props.mode}
            isOnlyImg={this.props.isOnlyImg}
            isVisual={this.props.isVisual}
            interval={this.props.interval}
          />);
      }
    });
    return arr;
  }

  render() {
    return (
      <div className={`kuma-upload-filelist ${this.props.mode === 'nw' ? 'nwmode' : (this.props.mode === 'mini' ? 'minimode' : 'iconmode')}${this.props.isVisual ? ' filelist-visual' : ''}`}>
        <div className="inner fn-clear">
          {this.renderDefaultFileItems()}
          {this.renderFileItems()}
          {this.props.children}
        </div>
      </div>
    );
  }
}


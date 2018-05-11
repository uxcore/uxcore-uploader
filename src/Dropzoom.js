import React from 'react';
import ReactDOM from 'react-dom';
import { Events } from 'uploadcore';
import util from './util';
import FileList from './FileList';
import Picker from './Picker';

export default class Dropzoom extends React.Component {
  static displayName = 'Dropzoom';

  constructor(props) {
    super(props);

    this.core = util.getCoreInstance(props);

    this.state = {
      blink: 0,
      highlight: 0,
      total: this.core.getTotal(),
    };

    const statchange = (stat) => {
      const total = stat.getTotal();
      if (total !== this.state.total) {
        this.setState({ total });
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
      this.setState({ blink: 1 });
    }).on('response', (e) => {
      if (areaNode.contains(e.target)) {
        this.setState({ highlight: 1 });
      } else {
        this.setState({ highlight: 0 });
      }
    }).on('end', () => {
      this.setState({ blink: 0, highlight: 0 });
    });
    this.dndArea = dndArea;
  }
  componentWillUnmount() {
    this.dndArea && this.dndArea.destroy();
    this.stopListen && this.stopListen();
  }
  render() {
    let className = 'kuma-uploader kuma-upload-dropzoom';
    if (this.props.className) {
      className += ` ${this.props.className}`;
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
    return (<div className={className}>
      {this.state.total > 0
                ? <FileList locale={this.props.locale} disabled={this.props.disabled} core={this.core} mode="nw" fileList={this.props.fileList} />
                : <Picker core={this.core} disabled={this.props.disabled}>{children}</Picker>}
      <div className="kuma-upload-responser" />
    </div>);
  }
}

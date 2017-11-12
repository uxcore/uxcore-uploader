import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'uxcore-progress';
import Icon from 'uxcore-icon';
import { Events } from 'uploadcore';


export default class Progress extends React.Component {
  static propTypes = {
    percentage: PropTypes.number,
    interval: PropTypes.number,
  };
  static defaultProps = {
    percentage: 0,
    interval: 100,
  };
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
    };
  }

  onPending() {
    this.props.file.pending();
  }

  componentDidMount() {
    const t = null;
    const me = this;
    const percentage = me.state.percentage;
    me._isMounted = true;
    this.props.file.on(Events.FILE_UPLOAD_PROGRESS, (progress) => {
      if (me._isMounted) {
        me.setState({
          percentage: progress.percentage,
        });
      }
    });
        // me.t = setInterval(() => {
        //     console.log(me.props.file.progress);
        //     percentage = percentage + 5;
        //     if (me.props.isVisual && me.props.status === 'error') {
        //         clearInterval(me.t);
        //     } else {
        //         if (me._isMounted) {
        //             me.setState({
        //                 percentage: percentage
        //             });
        //         }
        //         if (percentage === 95) {
        //             clearInterval(me.t);
        //         }
        //     }
        //
        // }, me.props.interval);
  }

  componentWillUnmount() {
    const me = this;
    me._isMounted = false;
    clearInterval(me.t);
  }

  render() {
    if (this.props.isVisual) {
      if (this.props.status === 'error') {
        return (
          <div className="visual-progress-box">
            <Icon onClick={this.props.onPending.bind(this)} className="re-upload-icon" name="shuaxin" />
            <span onClick={this.props.onPending.bind(this)} className="re-upload">重新上传</span>
            <div className="delete-progress" onClick={this.props.onCancel.bind(this)}><Icon name="biaodanlei-tongyongqingchu" /></div>
          </div>
        );
      }
      return (
        <div className="visual-progress-box">
          <Line percent={this.state.percentage} strokeWidth={4} showInfo={false} />
          <div className="delete-progress" onClick={this.props.onCancel.bind(this)}><Icon name="biaodanlei-tongyongqingchu" /></div>
        </div>
      );
    }
    return (
      <div
        style={{
          width: '100%',
          transform: `scale(${this.state.percentage / 100}, 1)`,
          transformOrigin: 'left top',
          transition: 'transform 0.1s linear',
        }} className="progress-box"
      />
    );
  }
}


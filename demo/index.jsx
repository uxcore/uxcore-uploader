import ReactDOM from 'react-dom';
import React from 'react';
import Button from 'uxcore-button';
import Uploader from '../src/';
// attachment file tips
const tips = <span>请选择大小不超过5M的文本文件，支持doc,docx,xls,xlsx,zip格式</span>;
const imgTips = <span>单张不超过3M，支持jpeg,jpg,png格式</span>;
const imgTips2 = <span>单文件不超过5M</span>;
// http://dip.alibaba-inc.com/api/v2/services/schema/mock/22006
const fileList = [
  {
    "name":"TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg",
    "fileType":"image/jpeg",
    "type":"upload",
    "response":{
      "success":true,
      "data":{
        "url":"http://gdp.alicdn.com/tps/i2/T1k2HJXexjXXauUnsh-180-180.png",
        canRemove: true, // 是否可以删除，可选
        downloadUrl: "http://gdp.alicdn.com/tps/i2/T1k2HJXexjXXauUnsh-180-180.png", // 下载 URL，可选
      }
    }
  },{
    "ext":"jpg",
    "name":"TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg",
    "size":16387,
    "fileType":"image/jpeg",
    "type":"upload",
    "response":{
      "success":true,
      "data":{
        "url":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg",
        canRemove: true, // 是否可以删除，可选
        downloadUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg", // 下载 URL，可选
      }
    }
  }
];

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }
  beforeUpload(...args){
      console.log('beforeUpload',args);
      throw new Error('this error is made for test');
  }
  render() {
    const me = this;
    window.uploader = me;
    return (<Uploader
      sizeLimit="3072kb"
      accept="*.jpeg, *.jpg *.png"
      ref="uploader"
      multiple={false}
      isOnlyImg={false}
      isVisual={false}
      // showErrFile={false}
      onfileuploadpreparing={this.beforeUpload}
      progressInterval={100}
      queueCapcity={2}
      actionOnQueueLimit="cover"
      onqueueerror={function (err) { console.log(err); console.log(me.refs.uploader.getCore().getTotal()); }}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      tips={imgTips}
      name="file"
      url="http://eternalsky.me:8122/file/upload"
      locale="zh-cn-img"
    />);
  }
}
ReactDOM.render((
  <Demo1 />
), document.getElementById('sample1'));

class Demo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList:[],
    };
  }

  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }
  render() {
    const me = this;
    return (<Uploader
      ref="uploader"
      sizeLimit="3072kb"
      accept="*.jpeg, *.jpg *.png"
      multiple={false}
      isOnlyImg
      isVisual={false}
      progressInterval={100}
      queueCapcity={2}
      actionOnQueueLimit="cover"
      onqueueerror={function (err) { console.log(err); console.log(me.refs.uploader.getCore().getTotal()); }}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      tips={imgTips}
      name="file"
      url="http://eternalsky.me:8122/file/upload"
      locale="zh-cn-img"
    />);
  }
}

ReactDOM.render((
  <Demo2 />
), document.getElementById('sample2'));

class Demo3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: fileList,
    };
  }

  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }
  render() {
    const me = this;
    return (<Uploader
      ref="uploader"
      sizeLimit="3072kb"
      accept="*.jpeg, *.jpg *.png"
      readOnly
      multiple={false}
      isOnlyImg
      isVisual={false}
      progressInterval={100}
      queueCapcity={2}
      actionOnQueueLimit="cover"
      onqueueerror={function (err) { console.log(err); console.log(me.refs.uploader.getCore().getTotal()); }}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      tips={imgTips}
      name="file"
      url="http://eternalsky.me:8122/file/upload"
      locale="zh-cn-img"
    />);
  }
}

ReactDOM.render((
  <Demo3 />
), document.getElementById('sample3'));

class Demo4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }
  render() {
    const me = this;

    return (<Uploader
      ref="uploader"
      multiple={false}
      isOnlyImg
      isVisual
      progressInterval={100}
      queueCapcity={2}
      actionOnQueueLimit="cover"
      onqueueerror={function (err) { console.log(err); console.log(me.refs.uploader.getCore().getTotal()); }}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      tips={tips}
      name="file"
      url="http://eternalsky.me:8122/file/upload"
      locale="zh-cn"
    />);
  }
}

ReactDOM.render((
  <Demo4 />
), document.getElementById('sample4'));

class Demo5 extends React.Component {
  constructor(props) {
    super(props);
    this.fileList = [];
    this.state = {
      fileList: this.fileList,
    };
  }
  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }

  render() {
    return (<Uploader autoPending
      multiple={false}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      isOnlyImg={false}
      name="file"
      isVisual={false}
      url="http://eternalsky.me:8122/file/upload"
    />);
  }
}

ReactDOM.render((
  <Demo5 />
), document.getElementById('sample5'));

class Demo6 extends React.Component {
  constructor(props) {
    super(props);
    this.fileList = [];
    this.state = {
      fileList: this.fileList,
    };
  }
  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }

  render() {
    return (<Uploader autoPending
      multiple={false}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      isOnlyImg={false}
      name="file"
      isVisual={false}
      url="http://eternalsky.me:8122/file/upload"
      disabled
    />);
  }
}

ReactDOM.render((
  <Demo6 />
), document.getElementById('sample6'));


class Demo7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }

  render() {
    return (<Uploader autoPending={false}
      multiple
      isOnlyImg={false}
      name="file"
      isVisual={false}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      url="http://eternalsky.me:8122/file/upload"
    />);
  }
}

ReactDOM.render((
  <Demo7 />
), document.getElementById('sample7'));


class Demo8 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Uploader.Dropzoom autoPending={false}
      multiple
      isOnlyImg={false}
      queueCapcity={20}
      isVisual={false}
      name="file"
      url="http://eternalsky.me:8122/file/upload"
    />);
  }
}

ReactDOM.render((
  <Demo8 />
), document.getElementById('sample8'));

class Demo9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }
  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }
  render() {
    return (<div className="custom-button-group">
      <Uploader autoPending={false}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      name="file"
      isVisual={false}
      url="http://eternalsky.me:8122/file/upload"
    >
      <button>自定义上传按钮</button>
    </Uploader>
    <Uploader autoPending={false}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      name="file"
      isVisual={false}
      url="http://eternalsky.me:8122/file/upload"
    >
      <Button type="primary">自定义primary</Button>
    </Uploader>
    <Uploader autoPending={false}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      name="file"
      isVisual={false}
      url="http://eternalsky.me:8122/file/upload"
    >
      <Button type="secondary">自定义secondary</Button>
    </Uploader>
    <Uploader autoPending={false}
      fileList={this.state.fileList}
      onChange={this.handleChange.bind(this)}
      name="file"
      isVisual={false}
      url="http://eternalsky.me:8122/file/upload"
    >
      <Button type="outline">自定义outline</Button>
    </Uploader>
    </div>);
  }
}

ReactDOM.render((
  <Demo9 />
), document.getElementById('sample9'));

class Demo10 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<Uploader.Dropzoom autoPending={false}
      className="mydroparea"
      multiple
      queueCapcity={20}
      name="file"
      url="http://eternalsky.me:8122/file/upload"
    >
      <i className="kuma-icon kuma-icon-uploading" />
      <p>点击或将文件拖拽到此区域上传</p>
    </Uploader.Dropzoom>);
  }
}

ReactDOM.render((
  <Demo10 />
), document.getElementById('sample10'));

// hljs.initHighlightingOnLoad();

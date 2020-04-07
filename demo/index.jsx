import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'uxcore-button';
import Uploader from '../src';
import '../style';
import 'kuma-base/core.less';

// attachment file tips
const tips = <span>请选择大小不超过5M的文本文件，支持doc,docx,xls,xlsx,zip格式，最多3张</span>;
const imgTips = <span>单张不超过3M，支持jpeg,jpg,png格式</span>;
const imgTips2 = <span>请选择大小不超过5M的文件，支持doc,docx,xls,xlsx,pdf,ppt,pptx等</span>;
// http://dip.alibaba-inc.com/api/v2/services/schema/mock/22006
const fileList = [
  {
    name: 'TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
    fileType: 'image/jpeg',
    type: 'upload',
    response: {
      success: true,
      data: {
        url: 'http://gdp.alicdn.com/tps/i2/T1k2HJXexjXXauUnsh-180-180.png',
        canRemove: true, // 是否可以删除，可选
        downloadUrl: 'http://gdp.alicdn.com/tps/i2/T1k2HJXexjXXauUnsh-180-180.png', // 下载 URL，可选
      },
    },
  }, {
    ext: 'jpg',
    name: 'TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
    size: 16387,
    fileType: 'image/jpeg',
    type: 'upload',
    response: {
      success: true,
      data: {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg',
        canRemove: true, // 是否可以删除，可选
        downloadUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg', // 下载 URL，可选
      },
    },
  },
];
const fileList2 = [
  {
    name: 'TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
    fileType: 'image/jpeg',
    type: 'upload',
    response: {
      success: true,
      data: {
        url: 'http://gdp.alicdn.com/tps/i2/T1k2HJXexjXXauUnsh-180-180.png',
        canRemove: true, // 是否可以删除，可选
        downloadUrl: 'http://gdp.alicdn.com/tps/i2/T1k2HJXexjXXauUnsh-180-180.png', // 下载 URL，可选
      },
    },
  }, {
    ext: 'jpg',
    name: 'TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
    size: 16387,
    fileType: 'image/jpeg',
    type: 'upload',
    response: {
      success: true,
      data: {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg',
        canRemove: true, // 是否可以删除，可选
        downloadUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg', // 下载 URL，可选
      },
    },
  }, {
    ext: 'jpg',
    name: 'TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
    size: 16387,
    fileType: 'image/jpeg',
    type: 'upload',
    response: {
      success: true,
      data: {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg',
        canRemove: true, // 是否可以删除，可选
        downloadUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg', // 下载 URL，可选
      },
    },
  }, {
    ext: 'jpg',
    name: 'TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
    size: 16387,
    fileType: 'image/jpeg',
    type: 'upload',
    response: {
      success: true,
      data: {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg',
        canRemove: true, // 是否可以删除，可选
        downloadUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg', // 下载 URL，可选
      },
    },
  }, {
    ext: 'jpg',
    name: 'TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
    size: 16387,
    fileType: 'image/jpeg',
    type: 'upload',
    response: {
      success: true,
      data: {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg',
        canRemove: true, // 是否可以删除，可选
        downloadUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg', // 下载 URL，可选
      },
    },
  },
];
const fileList3 = [
  {
    __uploaderId: 'uploader0',
    ext: 'txt',
    fileType: 'text/plain',
    id: '',
    name: 'pwa.txt',
    previewUrl: 'https://yida.alibaba-inc.com/inst/preview?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=pwa.txt&fileSize=4388&downloadUrl=0db1900c-64a4-44d7-8fbc-f6ffcdd06f2b.txt',
    response: {
      content: {
        appType: '',
        creator: '162333',
        downloadUrl: 'https://yida.alibaba-inc.com/fileHandle?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=0db1900c-64a4-44d7-8fbc-f6ffcdd06f2b.txt&instId=&type=download',
        encrypt: 'n',
        extName: 'txt',
        formUuid: 'FORM-5Q566O71J24EN9MZXEZ1BYCZ4CMS1TJW1WR7K0',
        gmtCreate: 1586238523617,
        gmtModified: 1586238523617,
        gmtUpload: 1586238523617,
        id: null,
        instanceNumber: null,
        isDeleted: 'n',
        memo: '',
        modifier: '162333',
        name: 'pwa.txt',
        needWaterMark: false,
        open: 'n',
        path: '0db1900c-64a4-44d7-8fbc-f6ffcdd06f2b.txt',
        previewUrl: 'https://yida.alibaba-inc.com/inst/preview?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=pwa.txt&fileSize=4388&downloadUrl=0db1900c-64a4-44d7-8fbc-f6ffcdd06f2b.txt',
        editUrl: 'https://yida.alibaba-inc.com/inst/preview?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=pwa.txt&fileSize=4388&downloadUrl=0db1900c-64a4-44d7-8fbc-f6ffcdd06f2b.txt',
        procInstId: '',
        shardKey: '',
        size: 4388,
        source: '',
        status: '',
        systemType: '',
        type: 'OSS',
        url: 'https://yida.alibaba-inc.com/fileHandle?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=0db1900c-64a4-44d7-8fbc-f6ffcdd06f2b.txt&instId=&type=download',
      },
      errorCode: '',
      errorLevel: '',
      errorMsg: '',
      success: true,
      throwable: '',
    },
    size: 4388,
    type: 'upload',
    url: 'https://yida.alibaba-inc.com/fileHandle?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=0db1900c-64a4-44d7-8fbc-f6ffcdd06f2b.txt&instId=&type=download',
  },
  {
    __uploaderId: 'uploader2',
    ext: 'xlsx',
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    id: '',
    name: 'T恤尺寸.xlsx',
    previewUrl: 'https://yida.alibaba-inc.com/inst/preview?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=T%E6%81%A4%E5%B0%BA%E5%AF%B8.xlsx&fileSize=10862&downloadUrl=b9ec9cf8-56b8-49c1-82b0-93f8f21aea7e.xlsx',
    response: {
      content: {
        appType: '',
        creator: '162333',
        downloadUrl: 'https://yida.alibaba-inc.com/fileHandle?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=b9ec9cf8-56b8-49c1-82b0-93f8f21aea7e.xlsx&instId=&type=download',
        encrypt: 'n',
        extName: 'xlsx',
        formUuid: 'FORM-5Q566O71J24EN9MZXEZ1BYCZ4CMS1TJW1WR7K0',
        gmtCreate: 1586238610241,
        gmtModified: 1586238610241,
        gmtUpload: 1586238610241,
        id: null,
        instanceNumber: null,
        isDeleted: 'n',
        memo: '',
        modifier: '162333',
        name: 'T恤尺寸.xlsx',
        needWaterMark: false,
        open: 'n',
        path: 'b9ec9cf8-56b8-49c1-82b0-93f8f21aea7e.xlsx',
        previewUrl: 'https://yida.alibaba-inc.com/inst/preview?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=T%E6%81%A4%E5%B0%BA%E5%AF%B8.xlsx&fileSize=10862&downloadUrl=b9ec9cf8-56b8-49c1-82b0-93f8f21aea7e.xlsx',
        editUrl: 'https://yida.alibaba-inc.com/inst/preview?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=T%E6%81%A4%E5%B0%BA%E5%AF%B8.xlsx&fileSize=10862&downloadUrl=b9ec9cf8-56b8-49c1-82b0-93f8f21aea7e.xlsx',
        procInstId: '',
        shardKey: '',
        size: 10862,
        source: '',
        status: '',
        systemType: '',
        type: 'OSS',
        url: 'https://yida.alibaba-inc.com/fileHandle?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=b9ec9cf8-56b8-49c1-82b0-93f8f21aea7e.xlsx&instId=&type=download',
      },
      errorCode: '',
      errorLevel: '',
      errorMsg: '',
      success: true,
      throwable: '',
    },
    size: 10862,
    type: 'upload',
    url: 'https://yida.alibaba-inc.com/fileHandle?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=b9ec9cf8-56b8-49c1-82b0-93f8f21aea7e.xlsx&instId=&type=download',
  },
  {
    __uploaderId: 'uploader6',
    ext: 'ppt',
    fileType: 'application/vnd.ms-powerpoint',
    id: '',
    name: '1c28404f9a6648d7c1c708a1284ac850ac020472.ppt',
    previewUrl: 'https://yida.alibaba-inc.com/inst/preview?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=1c28404f9a6648d7c1c708a1284ac850ac020472.ppt&fileSize=146432&downloadUrl=1408e60a-e2ce-4620-b288-d0570429b9cc.ppt',
    response: {
      content: {
        appType: '',
        creator: '162333',
        downloadUrl: 'https://yida.alibaba-inc.com/fileHandle?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=1408e60a-e2ce-4620-b288-d0570429b9cc.ppt&instId=&type=download',
        encrypt: 'n',
        extName: 'ppt',
        formUuid: 'FORM-5Q566O71J24EN9MZXEZ1BYCZ4CMS1TJW1WR7K0',
        gmtCreate: 1586238612187,
        gmtModified: 1586238612187,
        gmtUpload: 1586238612187,
        id: null,
        instanceNumber: null,
        isDeleted: 'n',
        memo: '',
        modifier: '162333',
        name: '1c28404f9a6648d7c1c708a1284ac850ac020472.ppt',
        needWaterMark: false,
        open: 'n',
        path: '1408e60a-e2ce-4620-b288-d0570429b9cc.ppt',
        previewUrl: 'https://yida.alibaba-inc.com/inst/preview?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=1c28404f9a6648d7c1c708a1284ac850ac020472.ppt&fileSize=146432&downloadUrl=1408e60a-e2ce-4620-b288-d0570429b9cc.ppt',
        editUrl: 'https://yida.alibaba-inc.com/inst/preview?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=1c28404f9a6648d7c1c708a1284ac850ac020472.ppt&fileSize=146432&downloadUrl=1408e60a-e2ce-4620-b288-d0570429b9cc.ppt',
        procInstId: '',
        shardKey: '',
        size: 146432,
        source: '',
        status: '',
        systemType: '',
        type: 'OSS',
        url: 'https://yida.alibaba-inc.com/fileHandle?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=1408e60a-e2ce-4620-b288-d0570429b9cc.ppt&instId=&type=download',
      },
      errorCode: '',
      errorLevel: '',
      errorMsg: '',
      success: true,
      throwable: '',
    },
    size: 146432,
    type: 'upload',
    url: 'https://yida.alibaba-inc.com/fileHandle?appType=APP_IW48H4Z2XO8T8HRC5I0X&fileName=1408e60a-e2ce-4620-b288-d0570429b9cc.ppt&instId=&type=download',
  },
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

  beforeUpload(...args) {
    console.log('beforeUpload', args);
    throw new Error('this error is made for test');
  }

  render() {
    const me = this;
    window.uploader = me;
    return (
      <Uploader
        sizeLimit="3072kb"
        accept="*.jpeg, *.jpg *.png"
        ref="uploader"
        multiple={false}
        isOnlyImg={false}
        disabled
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
        locale="zh-cn"
      />
    );
  }
}
ReactDOM.render((
  <Demo1 />
), document.getElementById('sample1'));

class Demo2 extends React.Component {
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

  onShowFile(file, url, current) {
    console.log(`onShowFile current image${current}:${url}`);
  }

  onDownloadFile(file, url, current) {
    console.log(`onDownloadFile current image${current}:${url}`);
  }

  render() {
    const me = this;
    return (
      <Uploader
        ref="uploader"
        sizeLimit="3072kb"
        accept="*.jpeg, *.jpg *.png"
        multiple={false}
        isOnlyImg
        onShowFile={this.onShowFile.bind(this)}
        onDownloadFile={this.onDownloadFile.bind(this)}
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
        locale="zh-cn"
      />
    );
  }
}

ReactDOM.render((
  <Demo2 />
), document.getElementById('sample2'));

class Demo3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList,
    };
  }

  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }

  render() {
    const me = this;
    return (
      <Uploader
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
        locale="zh-cn"
      />
    );
  }
}

ReactDOM.render((
  <Demo3 />
), document.getElementById('sample3'));


class Demo31 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList,
    };
  }

  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }

  render() {
    const me = this;
    return (
      <Uploader
        ref="uploader"
        sizeLimit="3072kb"
        accept="*.jpeg, *.jpg *.png"
        readOnly
        multiple={false}
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
        locale="zh-cn"
      />
    );
  }
}

ReactDOM.render((
  <Demo31 />
), document.getElementById('sample3-1'));

class Demo4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: fileList2,
    };
  }

  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }

  render() {
    const me = this;

    return (
      <Uploader
        ref="uploader"
        multiple
        isOnlyImg
        isVisual
        disabled
        hideUploadIcon
        progressInterval={100}
        queueCapcity={0}
        actionOnQueueLimit="cover"
        onqueueerror={function (err) { console.log(err); console.log(me.refs.uploader.getCore().getTotal()); }}
        fileList={this.state.fileList}
        onChange={this.handleChange.bind(this)}
        tips={tips}
        name="file"
        url="http://eternalsky.me:8122/file/upload"
        locale="en-us"
      />
    );
  }
}

ReactDOM.render((
  <Demo4 />
), document.getElementById('sample4'));


class Demo41 extends React.Component {
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

    return (
      <Uploader
        ref="uploader"
        multiple
        isOnlyImg
        isVisual
        hideUploadIcon
        progressInterval={100}
        queueCapcity={3}
        actionOnQueueLimit="cover"
        onqueueerror={function (err) { console.log(err); console.log(me.refs.uploader.getCore().getTotal()); }}
        fileList={this.state.fileList}
        onChange={this.handleChange.bind(this)}
        tips={tips}
        name="file"
        url="http://eternalsky.me:8122/file/upload"
        locale="zh-cn"
      />
    );
  }
}

ReactDOM.render((
  <Demo41 />
), document.getElementById('sample4-1'));


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
    return (
      <Uploader
        autoPending
        multiple={false}
        fileList={this.state.fileList}
        onChange={this.handleChange.bind(this)}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        locale="en-us"
        url="http://eternalsky.me:8122/file/upload"
      />
    );
  }
}

ReactDOM.render((
  <Demo5 />
), document.getElementById('sample5'));


class Demo6 extends React.Component {
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
    return (
      <Uploader
        multiple
        isOnlyImg={false}
        name="file"
        isVisual={false}
        fileList={this.state.fileList}
        onChange={this.handleChange.bind(this)}
        url="http://eternalsky.me:8122/file/upload"
      />
    );
  }
}

ReactDOM.render((
  <Demo6 />
), document.getElementById('sample6'));

// for prefixCls
class Demo7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: fileList2,
    };
  }

  handleChange(fileList) {
    this.setState({
      fileList,
    });
  }

  render() {
    const me = this;
    return (
      <Uploader
        ref="uploader"
        sizeLimit="3072kb"
        accept="*.jpeg, *.jpg *.png"
        prefixCls="kuma-upload"
        multiple={false}
        isOnlyImg
        isVisual
        progressInterval={100}
        queueCapcity={2}
        actionOnQueueLimit="cover"
        onqueueerror={function (err) { console.log(err); console.log(me.refs.uploader.getCore().getTotal()); }}
        fileList={this.state.fileList}
        onChange={this.handleChange.bind(this)}
        tips={imgTips}
        name="file"
        url="http://eternalsky.me:8122/file/upload"
        locale="pl-pl"
      />
    );
  }
}

// 已废弃
// class Demo7 extends React.Component {

//   render() {
//     return (<Uploader.Dropzoom autoPending
//       multiple
//       isOnlyImg={false}
//       queueCapcity={20}
//       isVisual={false}
//       name="file"
//       url="http://eternalsky.me:8122/file/upload"
//     />);
//   }
// }

ReactDOM.render((
  <Demo7 />
), document.getElementById('sample7'));

class Demo8 extends React.Component {
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
    return (
      <div className="custom-button-group">
        <Uploader
          autoPending
          fileList={this.state.fileList}
          onChange={this.handleChange.bind(this)}
          name="file"
          isVisual={false}
          url="http://eternalsky.me:8122/file/upload"
        >
          <button>自定义上传按钮</button>
        </Uploader>
        <Uploader
          autoPending
          fileList={this.state.fileList}
          onChange={this.handleChange.bind(this)}
          name="file"
          isVisual={false}
          url="http://eternalsky.me:8122/file/upload"
        >
          <Button type="primary">自定义primary</Button>
        </Uploader>
        <Uploader
          autoPending={false}
          fileList={this.state.fileList}
          onChange={this.handleChange.bind(this)}
          name="file"
          isVisual={false}
          url="http://eternalsky.me:8122/file/upload"
        >
          <Button type="secondary">自定义secondary</Button>
        </Uploader>
        <Uploader
          autoPending={false}
          fileList={this.state.fileList}
          onChange={this.handleChange.bind(this)}
          name="file"
          isVisual={false}
          url="http://eternalsky.me:8122/file/upload"
        >
          <Button type="outline">自定义outline</Button>
        </Uploader>
      </div>
    );
  }
}

ReactDOM.render((
  <Demo8 />
), document.getElementById('sample8'));

// 已废弃
class Demo9 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Uploader.Dropzoom
        className="mydroparea"
        multiple
        queueCapcity={20}
        name="file"
        url="http://eternalsky.me:8122/file/upload"
      >
        <i className="kuma-icon kuma-icon-uploading" />
        <p>已废弃</p>
      </Uploader.Dropzoom>
    );
  }
}

ReactDOM.render((
  <Demo9 />
), document.getElementById('sample9'));

// hljs.initHighlightingOnLoad();

class Demo10 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList3,
    };
  }

  handleChange(fileList3) {
    this.setState({
      fileList3,
    });
  }

  render() {
    const me = this;
    return (
      <Uploader
        ref="uploader"
        sizeLimit="5120kb"
        accept="*.pdf, *.doc, *.docx, *.xlsx, *.ppt, *.pptx"
        readOnly={false}
        multiple
        onlineEdit
        isVisual={false}
        progressInterval={100}
        queueCapcity={2}
        actionOnQueueLimit="cover"
        onqueueerror={function (err) { console.log(err); console.log(me.refs.uploader.getCore().getTotal()); }}
        fileList={this.state.fileList3}
        onChange={this.handleChange.bind(this)}
        tips={imgTips2}
        name="file"
        url="http://eternalsky.me:8122/file/upload"
        locale="zh-cn"
      />
    );
  }
}

ReactDOM.render((
  <Demo10 />
), document.getElementById('sample10'));

const hljs = require('highlight.js');
const Uploader = require('../src/');

const tips = <span>请选择大小不超过5M的文本文件，支持doc,docx,xls,xlsx,zip格式</span>;

// http://dip.alibaba-inc.com/api/v2/services/schema/mock/22006

class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        }
    }

    handleChange(fileList) {
        this.setState({
            fileList: fileList
        })
    }
    render() {
        const me = this;
        window.uploader = me;
        return <Uploader
                    ref="uploader"
                    multiple={false}
                    isOnlyImg
                    isVisual
                    progressInterval={100}
                    queueCapcity={2}
                    actionOnQueueLimit="cover"
                    onqueueerror={function(err) {console.log(err); console.log(me.refs.uploader.getCore().getTotal())}}
                    fileList={this.state.fileList}
                    onChange={this.handleChange.bind(this)}
                    tips={tips}
                    name='file'
                    url='http://eternalsky.me:8122/fle/upload'
                    locale="en" />
    }
}

ReactDOM.render((
    <Demo1 />
), document.getElementById('sample1'));

class Demo2 extends React.Component {
    constructor(props) {
        super(props)
        this.fileList = [
            {
                response: {
                    url: 'http://gtms02.alicdn.com/tps/i2/TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg', 
                    name: '测试用',
                    canRemove: false
                }
            },
            {
                response: {
                    url: 'http://gtms02.alicdn.com/tps/i2/TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg', 
                    name: '测试用'
                }
            }
        ]
        this.state = {
            fileList: this.fileList,
        }
    }
    handleChange(fileList) {
        this.setState({
            fileList: fileList
        })
    }

    render() {
        return <Uploader autoPending={true} 
                    multiple={false} 
                    fileList={this.state.fileList}
                    onChange={this.handleChange.bind(this)}
                    isOnlyImg={false} 
                    name='file'
                    isVisual={false}
                    url='http://eternalsky.me:8122/file/upload' />
    }
}

ReactDOM.render((
    <Demo2 />
), document.getElementById('sample2'));


class Demo3 extends React.Component {
    constructor(props) {
        super(props);
        this.fileList = [
            {
                response: {
                    url: 'http://gtms02.alicdn.com/tps/i2/TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg', 
                    name: '测试用',
                    canRemove: false
                }
            },
            {
                response: {
                    url: 'http://gtms02.alicdn.com/tps/i2/TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg', 
                    name: '测试用'
                }
            }
        ]
        this.state = {
            fileList: this.fileList
        }
    }

    componentDidMount() {
        window.core = this.refs.uploader3.getCore();
    }
    handleChange(fileList) {
        let me = this;
        console.log(fileList);
        me.setState({
            fileList: fileList
        });
    }

    reset() {
        let me = this;
        me.setState({
            fileList: me.fileList
        })
    }

    render() {
        const me = this;
        return <div>
            <Uploader fileList={this.state.fileList} 
                    autoPending={false} 
                    multiple={true} 
                    isVisual={false}
                    ref="uploader3"
                    preventDuplicate
                    // sizeLimit='10k'
                    queueCapcity={3}
                    onqueueerror={function(err) {console.log(err); console.log(me.refs.uploader3.getCore().getTotal())}}
                    isOnlyImg={true} 
                    accept="images" 
                    name='file' 
                    url='http://eternalsky.me:8122/file/upload'
                    onCancel={ function(file) { console.log(file) }} 
                    onChange={this.handleChange.bind(this)} />
            <button onClick={this.reset.bind(this)}>重置fileList</button>
        </div>
    }
}

ReactDOM.render((
    <Demo3 />
), document.getElementById('sample3'));



class visualDemo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        }
    }

    handleChange(fileList) {
        this.setState({
            fileList: fileList
        })
    }
    render() {
        const me = this;
        window.uploader = me;
        return <Uploader
                    ref="uploader"
                    multiple={false}
                    isOnlyImg
                    isVisual={false}
                    progressInterval={100}
                    queueCapcity={2}
                    actionOnQueueLimit="cover"
                    onqueueerror={function(err) {console.log(err); console.log(me.refs.uploader.getCore().getTotal())}}
                    fileList={this.state.fileList}
                    onChange={this.handleChange.bind(this)}
                    tips={tips}
                    name='file'
                    url='http://eternalsky.me:8122/file/upload'
                    locale="en" />
    }
}

ReactDOM.render((
    <visualDemo1 />
), document.getElementById('sample7'));




class Demo4 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: []
        }
    }

    handleChange(fileList) {
        this.setState({
            fileList: fileList
        })
    }

    render() {
        return <Uploader autoPending={false} 
                    multiple={true} 
                    isOnlyImg={false} 
                    name='file'
                    isVisual={false}
                    fileList={this.state.fileList}
                    onChange={this.handleChange.bind(this)}  
                    url='http://eternalsky.me:8122/file/upload' />
    }
}

ReactDOM.render((
    <Demo4 />
), document.getElementById('sample4'));


class Demo5 extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return <Uploader.Dropzoom autoPending={false} 
                    multiple={true} 
                    isOnlyImg={false} 
                    queueCapcity={20} 
                    isVisual={false}
                    name='file' 
                    url='http://eternalsky.me:8122/file/upload' />
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
        }
    }
    handleChange(fileList) {
        this.setState({
            fileList: fileList,
        })
    }
    render() {
        return <Uploader autoPending={false}
                    fileList={this.state.fileList}
                    onChange={this.handleChange.bind(this)} 
                    name='file' 
                    isVisual={false}
                    url='http://eternalsky.me:8122/file/upload'>
                    <button>自定义上传按钮</button>
                </Uploader>
    }
}

ReactDOM.render((
    <Demo6 />
), document.getElementById('sample6'));

/*class Demo7 extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Uploader.Dropzoom autoPending={false} 
                    className="mydroparea" 
                    multiple={true} 
                    queueCapcity={20} 
                    name='file' 
                    url='http://eternalsky.me:8122/file/upload'>
                        <i className="kuma-icon kuma-icon-uploading" />
                        <p>点击或将文件拖拽到此区域上传</p>
                </Uploader.Dropzoom>
    }
} 

ReactDOM.render((
    <Demo7 />
), document.getElementById('sample7'));

hljs.initHighlightingOnLoad();*/

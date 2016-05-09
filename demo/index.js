const hljs = require('highlight.js');
const Uploader = require('../src/');

const tips = <span>5M</span>;

// http://dip.alibaba-inc.com/api/v2/services/schema/mock/22006

ReactDOM.render((
    <Uploader autoPending={false} 
        multiple={false} 
        isOnlyImg={false} 
        tips={tips} 
        name='file' 
        url='http://eternalsky.me:8122/file/upload' 
        locale="en" />
), document.getElementById('sample1'));

ReactDOM.render((
    <Uploader autoPending={true} 
        multiple={false} 
        isOnlyImg={false} 
        name='file' 
        url='http://eternalsky.me:8122/file/upload' />
), document.getElementById('sample2'));

ReactDOM.render((
    <Uploader fileList={[
            {
                url: 'http://gtms02.alicdn.com/tps/i2/TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg', 
                name: '测试用',
                canRemove: false
            },
            {
                url: 'http://gtms02.alicdn.com/tps/i2/TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg', 
                name: '测试用'
            }
        ]} 
        autoPending={false} 
        multiple={true} 
        isOnlyImg={true} 
        accept="images" 
        name='file' 
        url='http://eternalsky.me:8122/file/upload'
        onCancel={ function(file) { console.log(file) }} 
        onChange={ function(stat) { console.log(stat) }} />
), document.getElementById('sample3'));

ReactDOM.render((
    <Uploader autoPending={false} 
        multiple={true} 
        isOnlyImg={false} 
        name='file' 
        url='http://eternalsky.me:8122/file/upload' />
), document.getElementById('sample4'));

ReactDOM.render((
    <Uploader.Dropzoom autoPending={false} 
        multiple={true} 
        isOnlyImg={false} 
        queueCapcity={20} 
        name='file' 
        url='http://eternalsky.me:8122/file/upload' />
), document.getElementById('sample5'));

ReactDOM.render((
    <Uploader autoPending={false} 
        name='file' 
        url='http://eternalsky.me:8122/file/upload'>
        <button>自定义上传按钮</button>
    </Uploader>
), document.getElementById('sample6'));

ReactDOM.render((
    <Uploader.Dropzoom autoPending={false} 
        className="mydroparea" 
        multiple={true} 
        queueCapcity={20} 
        name='file' 
        url='http://eternalsky.me:8122/file/upload'>
            <i className="kuma-icon kuma-icon-uploading" />
            <p>点击或将文件拖拽到此区域上传</p>
    </Uploader.Dropzoom>
), document.getElementById('sample7'));

hljs.initHighlightingOnLoad();

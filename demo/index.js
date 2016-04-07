const hljs = require('highlight.js');
const Uploader = require('../src/');

const tips = <span>5M</span>;

// http://dip.alibaba-inc.com/api/v2/services/schema/mock/22006

ReactDOM.render((
    <Uploader autoPending={false} multiple={false} tips={tips} name='file' url='http://eternalsky.me:8122/file/upload?sleep=5' locale="en" />
), document.getElementById('sample1'));

ReactDOM.render((
    <Uploader autoPending={true} multiple={false}  name='file' url='http://eternalsky.me:8122/file/upload?sleep=550' />
), document.getElementById('sample2'));

ReactDOM.render((
    <Uploader autoPending={false} multiple={false} accept="images" name='file' url='http://eternalsky.me:8122/file/upload' />
), document.getElementById('sample3'));

ReactDOM.render((
    <Uploader autoPending={false} multiple={true} name='file' url='http://eternalsky.me:8122/file/upload?sleep=550' />
), document.getElementById('sample4'));

ReactDOM.render((
    <Uploader.Dropzoom autoPending={false} multiple={true} queueCapcity={20} name='file' url='http://eternalsky.me:8122/file/upload?sleep=550' />
), document.getElementById('sample5'));

ReactDOM.render((
    <Uploader autoPending={false} name='file' url='http://eternalsky.me:8122/file/upload?sleep=550'>
        <button>自定义上传按钮</button>
    </Uploader>
), document.getElementById('sample6'));

ReactDOM.render((
    <Uploader.Dropzoom autoPending={false} className="mydroparea" multiple={true} queueCapcity={20} name='file' url='http://eternalsky.me:8122/file/upload?sleep=550'>
        <i className="kuma-icon kuma-icon-uploading" />
        <p>点击或将文件拖拽到此区域上传</p>
    </Uploader.Dropzoom>
), document.getElementById('sample7'));

hljs.initHighlightingOnLoad();

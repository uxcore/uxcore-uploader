const hljs = require('highlight.js');
const Uploader = require('../src/index');

const tips = <span>5M</span>;

ReactDOM.render((
    <Uploader autoPending={false} multiple={false} tips={tips} name='file' url='http://test.yanbingbing.com/upload.php' />
), document.getElementById('sample1'));

ReactDOM.render((
    <Uploader autoPending={true} multiple={false}  name='file' url='http://test.yanbingbing.com/upload.php' />
), document.getElementById('sample2'));

ReactDOM.render((
    <Uploader autoPending={false} multiple={false} accept="images" name='file' url='http://test.yanbingbing.com/upload.php' />
), document.getElementById('sample3'));

ReactDOM.render((
    <Uploader autoPending={false} multiple={true} name='file' url='http://test.yanbingbing.com/upload.php' />
), document.getElementById('sample4'));

ReactDOM.render((
    <Uploader.Dropzoom autoPending={false} multiple={true} queueCapcity={20} name='file' url='http://test.yanbingbing.com/upload.php' />
), document.getElementById('sample5'));

ReactDOM.render((
    <Uploader autoPending={false} name='file' url='http://test.yanbingbing.com/upload.php'>
        <button>自定义上传按钮</button>
    </Uploader>
), document.getElementById('sample6'));

ReactDOM.render((
    <Uploader.Dropzoom autoPending={false} className="mydroparea" multiple={true} queueCapcity={20} name='file' url='http://test.yanbingbing.com/upload.php'>
        <i className="kuma-icon kuma-icon-uploading" />
        <p>点击或将文件拖拽到此区域上传</p>
    </Uploader.Dropzoom>
), document.getElementById('sample7'));

hljs.initHighlightingOnLoad();

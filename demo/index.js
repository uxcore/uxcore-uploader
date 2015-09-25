import hljs from 'highlight.js';
import React from 'react';
import Uploader, {Droparea} from '../src/index';

React.render((
    <Uploader autoPending={false} multiple={false} name='file' url='http://test.yanbingbing.com/upload.php' />
), document.getElementById('sample1'));

React.render((
    <Uploader autoPending={true} multiple={false}  name='file' url='http://test.yanbingbing.com/upload.php' />
), document.getElementById('sample2'));

React.render((
    <Uploader autoPending={false} multiple={false} accept="images" name='file' url='http://test.yanbingbing.com/upload.php' />
), document.getElementById('sample3'));

React.render((
    <Uploader autoPending={false} multiple={true} name='file' url='http://test.yanbingbing.com/upload.php' />
), document.getElementById('sample4'));

React.render((
    <Droparea autoPending={false} multiple={true} queueCapcity={20} name='file' url='http://test.yanbingbing.com/upload.php' />
), document.getElementById('sample5'));

React.render((
    <Uploader autoPending={false} name='file' url='http://test.yanbingbing.com/upload.php'>
        <button>自定义上传按钮</button>
    </Uploader>
), document.getElementById('sample6'));

React.render((
    <Droparea autoPending={false} className="mydroparea" multiple={true} queueCapcity={20} name='file' url='http://test.yanbingbing.com/upload.php'>
        <i className="kuma-upload-icon icon-upload" />
        <p>点击或将文件拖拽到此区域上传</p>
    </Droparea>
), document.getElementById('sample7'));

hljs.initHighlightingOnLoad();

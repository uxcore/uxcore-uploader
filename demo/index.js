import React from 'react';
import $ from 'jquery';
import Uploader, {Droparea} from '../src/index';
import '../src/index.less';

React.render((
    <div>
        <h2>单文件上传</h2>
        <Uploader name='file' url='http://test.yanbingbing.com/upload.php' autoPending={false} multiple={false} accept="images" />
        <h2>自动上传</h2>
        <Uploader name='file' url='http://test.yanbingbing.com/upload.php' autoPending={true} multiple={false} />
        <h2>多文件上传</h2>
        <Uploader name='file' url='http://test.yanbingbing.com/upload.php' autoPending={false} multiple={true} />
        <h2>拖拽上传</h2>
        <Droparea name="file" url='http://test.yanbingbing.com/upload.php' autoPending={false} multiple={true} />
    </div>
), document.getElementById('content'));

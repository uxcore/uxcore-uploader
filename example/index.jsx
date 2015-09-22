import React from 'react';
import $ from 'jquery';
import QueueBox from '../lib/index.jsx';
import '../style/index.less';


React.render((
    <QueueBox name='file' url='http://test.yanbingbing.com/upload.php' autoPending={false} multiple={true} />
), document.getElementById('content'));
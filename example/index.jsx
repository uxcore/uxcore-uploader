import React from 'react';
import $ from 'jquery';
import QueueBox from '../lib/index.jsx';
import '../style/index.less';


function onPrepare(request) {

}


function onChunkComplete(response) {
    let res = $.parseJSON(response.getRawResponse());
    response.setResponse(res);
}

function onComplete(response) {

}

function onStatChange(stat) {
    console.info(stat.getFiles(32).map((file) => {
        return file.response.getResponse().url;
    }));
}

React.render((
    <QueueBox jsxchunkEnable={true} jsxmode="icon" onPrepare={onPrepare} onChunkComplete={onChunkComplete} onComplete={onComplete} onStatChange={onStatChange} />
), document.getElementById('content'));
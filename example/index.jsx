import React from 'react';
import $ from 'jquery';
import QueueBox from '../lib/index.jsx';
import '../style/index.less';

let token;
function getToken() {
    const i = $.Deferred();
    if (token && token.expireTime > (+new Date)) {
        i.resolve(token.token);
    } else {
        $.getJSON('http://home.neiwai.com/file/getToken.jsonp?callback=?', function (json) {
            token = json.content;
            i.resolve(token.token);
        });
    }
    return i;
}

function onPrepare(request) {
    // 秒传
    let file = request.getFile();
    file.md5().done((md5) => {
        getToken().then((token) => {
            return $.getJSON('http://up.django.t.taobao.com/rest/1.1/file/head', {token, md5});
        }).done((ret) => {
            if (ret.code === 0 && ret.data) {
                file.complete(ret);
            }
        });
    });

    // 分块上传准备 transaction start
    if (request.isChunkEnable()) {
        request.setUrl('http://up.django.t.taobao.com/rest/1.0/file/chunk');
        // transaction start
        const i = $.Deferred(), chunkSize = request.getChunkSize();

        getToken().then((token) => {
            return $.getJSON('http://up.django.t.taobao.com/rest/1.0/file/transaction', {
                token: token,
                size: file.size,
                ext: file.ext,
                number: Math.ceil(file.size / chunkSize)
            });
        }).done((ret) => {
            request.setParam('fileId', ret.data.id);
            i.resolve(request);
        });

        return i;
    }
}

function onChunkPrepare(request) {
    const i = $.Deferred();

    if (request.isMultiChunk()) {
        request.setParam('sequence', request.getIndex() + 1);
    }
    getToken().done((token) => {
        request.setParam('token', token);
        i.resolve(request);
    });

    return i;
}

function onChunkComplete(response) {
    let res = $.parseJSON(response.getRawResponse());
    if (res.data) {
        response.setResponse(res);
    } else {
        return new Error('failed');
    }
}

function onComplete(response) {
    const i = $.Deferred();

    if (response.isFromMultiChunkResponse()) {
        getToken().then((token) => {
            let query = $.param({token, fileId: response.getFileRequest().getParam('fileId', true)});
            return $.post('http://up.django.t.taobao.com/rest/1.0/file/transaction?'+query);
        }).done((ret) => {
            response.setResponse($.parseJSON(ret));
            i.resolve(response);
        });
    } else {
        i.resolve(response);
    }

    return i.then((response) => {
        const j = $.Deferred();
        const res = response.getResponse();
        if (res.code === 0) {
            j.resolve(res);
        } else {
            j.reject(new Error(res.code));
        }
        return j;
    });
}

function onStatChange(stat) {
    console.info(stat.getFiles(32).map((file) => {
        return file.response.getResponse().data.id;
    }));
}

React.render((
    <QueueBox jsxchunkEnable={true} jsxmode="list" onPrepare={onPrepare} onChunkPrepare={onChunkPrepare} onChunkComplete={onChunkComplete} onComplete={onComplete} onStatChange={onStatChange} />
), document.getElementById('content'));
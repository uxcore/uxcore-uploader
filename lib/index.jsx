import React from 'react';
import $ from 'jquery';
import {Context, FileAspects as Aspects, Events, FileStatus as Status} from 'uploader';
import QueueList from './queuelist.jsx';

const UPLOADER_INSTANCE = {};
function getUploaderInstance(id, options, aspects) {
    if (id in UPLOADER_INSTANCE) {
        return UPLOADER_INSTANCE[id];
    }
    const context = new Context(options);

    context.aspect(Aspects.PREPARE).add(aspects.onPrepare);

    context.aspect(Aspects.CHUNK_PREPARE).add(aspects.onChunkPrepare);

    context.aspect(Aspects.CHUNK_COMPLETE).add(aspects.onChunkComplete);

    context.aspect(Aspects.COMPLETE).add(aspects.onComplete);

    context.getQueue().on(Events.QUEUE_STAT_CHANGE, (stat) => {
        aspects.onStatChange && aspects.onStatChange(stat);
    });

    UPLOADER_INSTANCE[id] = context;

    return context;
}

export default class QueueBox extends React.Component {
    constructor(props) {
        super(props);

        let request = {};
        ['name', 'url', 'chunkSize', 'chunkRetries', 'chunkEnable', 'chunkProcessThreads'].forEach((key) => {
            let jsxkey = 'jsx'+key;
            if (jsxkey in this.props) {
                request[key] = this.props[jsxkey];
            }
        });

        let options = {};
        ['processThreads', 'autoPending', 'queueCapcity', 'multiple', 'accept', 'sizeLimit', 'preventDuplicate'].forEach((key) => {
            let jsxkey = 'jsx' + key;
            if (jsxkey in this.props) {
                options[key] = this.props[jsxkey];
            }
        });
        options.request = request;


        let aspects = {};
        ['onPrepare', 'onChunkPrepare', 'onChunkComplete', 'onComplete', 'onStatChange'].forEach((aspect) => {
            if (aspect in this.props) {
                aspects[aspect] = this.props[aspect];
            }
        });

        this.state = {
            context: getUploaderInstance(this.props.jsxinstanceId, options, aspects)
        };
    }

    componentDidMount() {
        const collector = this.state.context.getDndCollector(),
            $box = $(React.findDOMNode(this));

        this.dndArea =  collector.addArea($box[0]);
        this.dndArea.on('start', (e, allowed) => {
            allowed && $box.addClass('blink');
        }).on('response', (e, allowed) => {
            if (allowed && $box[0].contains(e.target)) {
                $box.addClass('highlight');
            } else {
                $box.removeClass('highlight');
            }
        }).on('end', () => {
            $box.removeClass('blink highlight');
        });
    }

    componentWillUnmount() {
        this.dndArea && this.dndArea.destroy();
    }

    render() {
        return <div className="queuebox">
            <div className="overlay" />
            <div className="queuebox-body">
                <QueueList context={this.state.context} />
            </div>
        </div>;
    }
}

QueueBox.defaultProps = {
    jsxinstanceId: 'default',
    jsxfieldname: 'file',
    jsxurl: 'http://up.django.t.taobao.com/rest/1.0/file',
    jsxchunkSize: 5 * 1024 * 1024,
    jsxchunkRetries: 2,
    jsxchunkEnable: false,
    jsxchunkProcessThreads: 2,
    jsxprocessThreads: 2,
    jsxautoPending: true,
    jsxqueueCapcity: 0,
    jsxmultiple: true,
    jsxaccept: null,
    jsxsizeLimit: 0,
    jsxpreventDuplicate: false,
    onPrepare: null,
    onChunkPrepare: null,
    onChunkComplete: null,
    onComplete: null,
    onStatChange: null
};

import React from 'react';
import {Events, FileStatus as Status} from 'uploader';
import ListItem from './listitem.jsx';

export default class QueueList extends React.Component {

    constructor(props) {
        super(props);

        this.queue = this.props.context.getQueue();

        this.state = {
            items: this.queue.getStat().getFiles()
        };
    }

    componentDidMount() {
        const statchange = () => {
            this.setState({
                items: this.queue.getStat().getFiles()
            });
        };
        this.queue.on(Events.QUEUE_STAT_CHANGE, statchange);
        this.stopListen = () => {
            this.queue.off(Events.QUEUE_STAT_CHANGE, statchange);
        };
    }

    componentWillUnmount() {
        this.stopListen && this.stopListen();
    }

    render() {
        let tip = '';
        if (('DataTransfer' in window) && ('FileList' in window)) {
            tip = '把文件拖到这里...';
        }
        if (this.state.items.length < 1) {
            return <div className="dragtip">{tip}</div>;
        }
        return (
            <div className="queuelist">{this.state.items.map((file) => {
                return <ListItem key={file.id} file={file} />;
            })}</div>
        );
    }
}

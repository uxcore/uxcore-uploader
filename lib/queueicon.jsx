import React from 'react';
import {Events, FileStatus as Status} from 'uploader';
import IconItem from './iconitem.jsx';
import Picker from './picker.jsx';

export default class QueueIcon extends React.Component {

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
        return (
            <div className="queueicon">
                {this.state.items.map((file) => {
                    return <IconItem key={file.id} file={file} />;
                })}
                <Picker context={this.props.context} />
            </div>
        );
    }
}

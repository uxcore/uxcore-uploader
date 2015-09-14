import React from 'react';
import {Events, Status} from 'uploadcore';
import IconItem from './iconitem.jsx';
import Picker from './picker.jsx';

export default class QueueIcon extends React.Component {

    constructor(props) {
        super(props);

        this.core = this.props.core;

        this.state = {
            items: this.core.getStat().getFiles()
        };
    }

    componentDidMount() {
        const statchange = () => {
            this.setState({
                items: this.core.getStat().getFiles()
            });
        };
        this.core.on(Events.QUEUE_STAT_CHANGE, statchange);
        this.stopListen = () => {
            this.core.off(Events.QUEUE_STAT_CHANGE, statchange);
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
                <Picker core={this.core} />
            </div>
        );
    }
}

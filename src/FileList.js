const FileItem = require('./FileItem');
const Picker = require('./Picker');
const {Events} = require('uploadcore');
const React = require('react');
const ReactDOM = require('react-dom');

class FileList extends React.Component {
    constructor(props) {
        super(props);

        this.core = this.props.core;

        this.state = {
            items: this.core.getStat().getFiles()
        };
    }

    componentDidMount() {
        const statchange = (stat) => {
            this.setState({
                items: stat.getFiles()
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
        return <div className={"kuma-upload-filelist " + (this.props.mode === 'nw' ? 'nwmode' : (this.props.mode === 'mini' ? 'minimode' : 'iconmode'))}>
            <div className="inner">
                {this.state.items.map((file) => {
                    return <FileItem locale={this.props.locale} key={file.id} file={file} mode={this.props.mode} />;
                })}
                {!this.core.isFull() && this.props.mode === 'icon' ? <Picker core={this.core}><i className="kuma-icon kuma-icon-add" /></Picker> : null}
            </div>
        </div>
    }
}

FileList.defaultProps = {
    mode: 'mini'
};

module.exports = FileList;
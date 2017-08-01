const FileItem = require('./FileItem');
const DefaultFileItem = require('./DefaultFileItem');
const Picker = require('./Picker');
const {Events, Status} = require('uploadcore');
const React = require('react');
const ReactDOM = require('react-dom');

class FileList extends React.Component {
    constructor(props) {
        super(props);

        this.core = props.core;

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

    renderDefaultFileItems() {
        let arr = [];
        this.props.fileList.forEach((file, index) => {
            if (file.type !== 'delete') {
                arr.push(<DefaultFileItem file={file} locale={this.props.locale} key={index} mode={this.props.mode} isOnlyImg={this.props.isOnlyImg} isVisual={this.props.isVisual} onCancel={this.props.removeFileFromList.bind(this)} />);
            }
        });
        return arr;
    }

    renderFileItems() {
        let arr = [];
        this.state.items.forEach((file) => {
            if ([Status.CANCELLED, Status.SUCCESS, Status.QUEUED].indexOf(file.status) === -1) {
                arr.push(<FileItem locale={this.props.locale} key={file.id} file={file} mode={this.props.mode} isOnlyImg={this.props.isOnlyImg} isVisual={this.props.isVisual} interval={this.props.interval} />);
            }
        });
        return arr;
    }

    render() {

        return <div className={"kuma-upload-filelist " + (this.props.mode === 'nw' ? 'nwmode' : (this.props.mode === 'mini' ? 'minimode' : 'iconmode')) + (this.props.isVisual ? ' filelist-visual' : '')}>
            <div className="inner">
                {this.renderDefaultFileItems()}
                {this.renderFileItems()}
                {!this.core.isFull() && this.props.mode === 'icon' ? <Picker core={this.core}><i className="kuma-icon kuma-icon-add" /></Picker> : null}
            </div>
        </div>
    }
}

FileList.defaultProps = {
    mode: 'mini'
};

module.exports = FileList;

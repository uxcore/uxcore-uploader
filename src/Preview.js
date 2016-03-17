const React = require('react'); 
const ReactDOM = require('react-dom');

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        const file = this.props.file;
        if (file.isImage()) {
            file.getAsDataUrl(1000).done((url) => this.setState({url}));
        }
    }

    render() {
         return <div className="previewer">{this.state.url
            ? <img src={this.state.url} />
            : <i className="kuma-upload-fileicon" data-ext={this.props.file.ext} data-type={this.props.file.type}/>}</div>;
    }
}
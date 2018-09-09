import React from 'react';

export default class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    const file = props.file;
    if (file.isImage()) {
      file.getAsDataUrl(1000).done(url => this.setState({ url }));
    }
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className="previewer">{this.state.url
        ? <img src={this.state.url} />
        : <i className={`${prefixCls}-fileicon`} data-ext={this.props.file.ext} data-type={this.props.file.type} />}
      </div>
    );
  }
}

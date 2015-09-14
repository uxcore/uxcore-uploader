import React from 'react';

export default class Picker extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.area = this.props.core.getPickerCollector().addArea(React.findDOMNode(this));
    }

    componentWillUnmount() {
        this.area && this.area.destroy();
    }

    render() {
        return <div className="picker"><i className="icon icon-add"></i></div>;
    }
}
import React, { Component} from 'react';

class ConstructPreview extends Component{

    constructor(props) {
        super(props);
        this.state = {
            ConstructHTML: 'test',
            Script: ''
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (props.ConstructHTML) {
            return { ConstructHTML: props.ConstructHTML, Script: props.ConstructScript };
        }
        return null;
    }
    componentDidMount() {
        if (this.props.ConstructHTML) {
            this.setState({ ConstructHTML: this.props.ConstructHTML, Script: this.props.ConstructScript })
        }
    }
    componentDidUpdate() {
        if (this.state.Script != '') {
            eval(this.state.Script);
        }
    }

    render() {
        console.log("render");

        return (<div dangerouslySetInnerHTML={{ __html: this.state.ConstructHTML }}>
        </div>);
    }
}

export default ConstructPreview;
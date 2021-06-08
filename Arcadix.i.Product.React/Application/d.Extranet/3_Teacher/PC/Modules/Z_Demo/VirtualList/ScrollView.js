import React from 'react';
import './ScrollView.css';

class ScrollView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            storeData: this.props.data,
            data: [],
            indexSize: this.props.listSize,
            initialCount: 0,
            finalCount: this.props.listSize,
            displayLoader: false,
            addingData: false
        },

            this.addDataToState = this.addDataToState.bind(this);
        this.handleOnScroll = this.handleOnScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleOnScroll);
        this.addDataToState(this.state.data.length, this.state.indexSize);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    addDataToState(startCount, endCount) {
        var oldData = this.state.data;
        var dummyData = this.state.storeData.slice(startCount, endCount);
        var data = [];
        for (var i = 0; i < dummyData.length; i++) {
            var stateData = (<div key={startCount + i} className="data-info" style={{ "padding": "6px", "backgroundColor": "lightgrey", "marginBottom": "3px" }}><span> <h3>Subject Id :  {dummyData[i].iSubjectId}</h3>  <h3>Subject Name :  {dummyData[i].t_TestDrive_Subject_Data[0].vSubjectName}</h3> </span></div>);
            data.push(stateData);
        }
        var newData = oldData.concat(data);
        this.setState({ data: newData });
        this.setState({ displayLoader: false });
    }


    handleOnScroll(e) {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            var initialCount = this.state.finalCount;
            var finalCount = this.state.finalCount + this.state.indexSize;

            this.setState({ displayLoader: true });

            setTimeout(
                function () {
                    this.addDataToState(this.state.data.length, finalCount);
                }
                    .bind(this),
                400
            );

            this.setState({ initialCount: this.state.finalCount });
            this.setState({ finalCount: this.state.finalCount + this.state.indexSize });
        }
    }

    render() {
        console.log("storeData...", this.state.storeData);
        let newStyle = {};
        //const listHeight = (this.props.rowHeight * this.props.listSize) + "px";
        //let newStyle = {
        //    "height": listHeight
        //};
        return (

            <div className="outerContainer" style={newStyle}>
                <div id="myDiv" className="innerContainer " style={newStyle} onScroll={this.handleOnScroll}> {this.state.data}</div>
                {this.state.displayLoader && <div className="loader" style={{ "margin": "0 auto" }} ><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /></div>}
            </div>
        );
    }
}

export default ScrollView;

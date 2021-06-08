import React from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { style: '0' };
    }

    render() {
        return (
            <div className="demo">
                <h2>DEMO module</h2>
                <div className={"sampleStyle " + this.state.style} >
                    <p>s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>

                <span>
                    <button onClick={() => {
                        //var head = document.getElementByTagname("head")[0];
                        var head = document.getElementsByTagName('head')[0];
                        var link = document.getElementById("dynamicCSSplaceholder");
                        if (link == null) {
                            link = document.createElement('link');
                            //link.id="dynamicCSSplaceholder"
                            link.setAttribute('id', 'dynamicCSSplaceholder')
                        }
                        else {
                            link.parentNode.removeChild(link);
                            link = document.createElement('link');
                            //link.id="dynamicCSSplaceholder"
                            link.setAttribute('id', 'dynamicCSSplaceholder')
                        }
                        link.setAttribute('rel', 'stylesheet');
                        link.setAttribute('type', 'text/css');
                        link.setAttribute('href', this.props.JConfiguration.BaseUrl + 'DemoStyles/StyleSheet1.css')
                        link.setAttribute('media', 'all')
                        head.appendChild(link);
                        //this.setState({style:'1'})
                    }}>Style1</button>
                    <button onClick={() => {
                        //var head = document.getElementByTagname("head")[0];
                        var head = document.getElementsByTagName('head')[0];
                        var link = document.getElementById("dynamicCSSplaceholder");
                        if (link == null) {
                            link = document.createElement('link');
                            //link.id="dynamicCSSplaceholder"
                            link.setAttribute('id', 'dynamicCSSplaceholder')
                        }
                        else {
                            link.parentNode.removeChild(link);
                            link = document.createElement('link');
                            //link.id="dynamicCSSplaceholder"
                            link.setAttribute('id', 'dynamicCSSplaceholder')
                        }
                        link.setAttribute('rel', 'stylesheet');
                        link.setAttribute('type', 'text/css');
                        link.setAttribute('href', this.props.JConfiguration.BaseUrl + 'DemoStyles/StyleSheet2.css')
                        link.setAttribute('media', 'all')
                        head.appendChild(link);
                        //this.setState({style:'1'})
                    }}>Style2</button>
                </span>
                {this.state.style}
            </div>
        );
    }
}

export default withRouter(Demo);
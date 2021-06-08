import React from 'react';
import { Link, Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ComponentLoader from '@root/Framework/Blocks/ComponentLoader/ComponentLoader';
import Animation from '@root/Framework/Controls/Animation/Animation';

function mapStateToProps(state) {
    return {
        blnIsLoggedIn: state.ApplicationState.IsLoggedIn,
        objClientUserDetails: state.ApplicationState.ClientUserDetails
    };
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.CheckIfLoggedIn = this.CheckIfLoggedIn.bind(this);
    }

    componentDidMount() {
        this.CheckIfLoggedIn(this.props);
    }

    componentWillReceiveProps(objNewProps) {
        //this.CheckIfLoggedIn(objNewProps);
    }

    CheckIfLoggedIn(props) {
        //console.log("UserLoggedIn", window.UserLoggedIn)
        if (UserLoggedIn)
            ApplicationState.SetProperty('IsLoggedIn', true);
        else
            ApplicationState.SetProperty('IsLoggedIn', false);
    }

    render() {
        const Login = this.props.ComponentController.getComponent('login');
        var context = {
            "router": {
                "history": this.props.history,
                "route": {
                    "location": this.props.location,
                    "match": this.props.match
                }
            }
        }
        return (
            <React.Fragment>
                <Animation JConfiguration={this.props.JConfiguration} Resource={{ "ImagePath": props.JConfiguration.ExtranetSkinPath + '/Images/Common/Icons/clock.gif' }}/>
                {this.props.blnIsLoggedIn
                    ? <ComponentLoader
                        ClientUserDetails={this.props.objClientUserDetails}
                        ComponentName={this.props.ApplicationName}
                        ComponentController={this.props.ComponentController}
                        JConfiguration={this.props.JConfiguration}
                        routerContext={context}
                        DivName={"div" + this.props.ApplicationName}
                        ApplicationFolderName={this.props.ApplicationFolderName}
                    />
                    : <Login ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration} />}
            </React.Fragment>
        );
    }
}
Main.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css",
    ];
    return arrStyles;
};
export default withRouter(connect(mapStateToProps)(Main));
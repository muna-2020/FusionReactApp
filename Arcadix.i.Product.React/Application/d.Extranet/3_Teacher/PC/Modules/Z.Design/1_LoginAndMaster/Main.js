import  React from 'react';
import { Link, Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Common/Normalize.css';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Common/Common.css';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Common/Font.css';
import ApplicationState from '@root/Framework/DataService/ApplicationState/ApplicationState';
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';
//import Login from './Login/Login'
var UserLoggedIn;

function mapStateToProps(state) {
    return {
        blnIsLoggedIn: state.ApplicationState.IsLoggedIn
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
        //if (props.blnIsLoggedIn === undefined) {
        //    fetch('/Intranet/login/LoggedIn', {
        //        method: 'GET',
        //        credentials: 'same-origin'
        //    }).then(objResponse => objResponse.json())
        //        .then((objResponseJson => {
        //            if (objResponseJson.IsLoggedIn) {
        //                ApplicationState.SetProperty('IsLoggedIn', true);
        //            }
        //            else {
        //                ApplicationState.SetProperty('IsLoggedIn', false);
        //            }
        //        }))
        //}
        console.log("UserLoggedIn",UserLoggedIn)
        if (UserLoggedIn)
            ApplicationState.SetProperty('IsLoggedIn', true);
        else
            ApplicationState.SetProperty('IsLoggedIn', false);
    }
    
    render() {
        const Login = this.props.ComponentController.getComponent('login');        
        return (
            <div>
                {this.props.blnIsLoggedIn ? <ComponentLoader ComponentName={this.props.ApplicationName} ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration} DivName={"div"+this.props.ApplicationName} /> : <Login ComponentController={this.props.ComponentController} JConfiguration={this.props.JConfiguration}  />}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
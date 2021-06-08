import React from 'react';
import { withRouter } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/1_LoginAndMaster/Login.css';
class Login extends React.Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { strUserName: '', strPassword: '' };
    }

    OnLoginClick() {
        //ApplicationState.SetProperty('IsLoggedIn', true)
        //to be used when extranet membership provider is ready
        if (this.state.strUserName != "" && this.state.strPassword != "") {
         var bodyparams = {Params:{ 
                            URL:"API/Framework/Services/Login/ValidateUser",
                            Params:{UserName: this.state.strUserName, Password: this.state.strPassword, Host: window.location.host + '/' + window.location.pathname.split('/')[1] }
                            }
                    };
            this.setState({ blnShowAnimation: true });
            fetch(this.props.JConfiguration.BaseUrl + "API/Framework/Services/Login/ValidateUser", {
                method: "POST",
                body: JSON.stringify(bodyparams),
                headers: { "Content-Type": "application/json" },
                credentials: 'same-origin'
            }).then(response => response.json())
                .then(json => {
                    if (json.LoginSuccess == true) {                       
                        ApplicationState.SetProperty('IsLoggedIn', true)
                    } else {
                        alert("Invalid username or password");
                    }
                    //this.setState({ blnShowAnimation: false })

            });
        }

        //fake login api
        /*if (this.state.strUserName != "" && this.state.strPassword != "") {
            this.setState({ blnShowAnimation: true });
            fetch(this.props.JConfiguration.BaseUrl + "API/FakeLogin", { //code in Login.ts
                method: "POST",
                body: JSON.stringify({ UserName: this.state.strUserName, Password: this.state.strPassword, Host: window.location.host + window.location.pathname }),
                headers: { "Content-Type": "application/json" },
                credentials: 'same-origin'
            }).then(response => response.json())
                .then(json => {
                    if (json.LoginSuccess == true) {                       
                        ApplicationState.SetProperty('IsLoggedIn', true)
                    } else {
                        alert("Invalid username or password");
                    }

            });
        }*/
    }

     handleChange(event) {
        if (event.target.id == "txtUsername")
            this.setState({ strUserName: event.target.value });
        else if (event.target.id == "txtPassword")
            this.setState({ strPassword: event.target.value });
    }

    render() {
        return (
            <div className="lgnWrp">
                <div className="wrap">
                    <div className="lgnHdr">
                        <img className="Img" src={require("@root/App_Themes/Default/Extranet/Skin2018/Images/Common/logo.svg")} />
                    </div>
                    <div className="lgnFm">
                        <div className="lform" >
                            <input className="txtIpt" type="text" id="txtUsername" placeholder="Benutzername" onChange={this.handleChange} />
                            <input className="txtIpt" type="password" id="txtPassword" placeholder="Passwort" onChange={this.handleChange} />
                            <button className="mybtn" onClick={() => this.OnLoginClick()}>Anmelden</button>
                            <p className="loginTxt">Passwort vergessen</p>
                            <p className="loginTxt fontBold">Noch nicht registriert? Hier gehts zur Anmeldung.</p>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default withRouter(Login);
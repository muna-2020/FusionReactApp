import React from 'react';
import { withRouter } from 'react-router-dom';
import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/1_LoginAndMaster/Master.css';

class DropDownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.onClickProfile = this.onClickProfile.bind(this);
        this.OnClickLogout = this.OnClickLogout.bind(this);
        this.ShowDemo = this.ShowDemo.bind(this);
        this.ShowVirtualListDemo = this.ShowVirtualListDemo.bind(this);
        this.state = {
            showMenu: false,
        }
    }

    showMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        if (this.dropdownMenu) {
            if (!this.dropdownMenu.contains(event.target)) {
                this.setState({ showMenu: false }, () => {
                    document.removeEventListener('click', this.closeMenu);
                });
            }
        }
    }
    onClickProfile() {

        var navItem = {
            //vNavigationIcon(pin): null
            //dtModifiedOn(pin): "2018-08-31T15:22:45.167"
            iNavigationTypeId: 33,
            vNavigationName: "Profile",
            iParentNavigationId: -1,
            iNavigationId: -1,
            vURL: "Profile"
        }
        var strServiceNavigation = navItem.vNavigationName;
        var objServiceNavigation = {
            ShowOutlet: true,
            ComponentName: strServiceNavigation,
            NavData: navItem
        }
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?ServiceNavigation=' + strServiceNavigation;
        window.history.pushState({ path: newurl }, '', newurl);
        ApplicationState.SetProperty('OutletData', objServiceNavigation);
        ApplicationState.SetProperty('ActiveServiceNavigationId', navItem.iNavigationId);

    }
    OnClickLogout() {

        //var BaseUrl = "http://localhost:8082/Teacher/";
        fetch(this.props.JConfiguration.BaseUrl + "API/Framework/Services/login/logout" + '?sessionkey=' + JConfiguration.SessionKey, {
            method: "POST",
            //body: JSON.stringify({ UserName: this.state.strUserName, Password: this.state.strPassword, Host: window.location.host + '/' + window.location.pathname.split('/')[1] }),
            headers: { "Content-Type": "application/json" },
            credentials: 'same-origin'
        }).then(response => response.json())
            .then(json => {
                console.log(json);
                ApplicationState.SetProperty('IsLoggedIn', false);
                var pushUrl = this.props.JConfiguration.VirtualDirName;
                this.props.history.push({ pathname: pushUrl });

                //var strRouterPath = "/Teacher";
                //ApplicationState.SetProperty('RouterPath', strRouterPath);
                //var pushUrl = "/Teacher/TeacherLearningJournal/Learnjournal";           
                // else {
                //    alert('cant logout");
                //}


            });
    }
    //changeAppState(e) {
    //    //console.log(e.target.textContent );
    //    ApplicationState.SetProperty('ShowData', e.target.textContent );
    //}
    ShowDemo(e) {
        //var strRouterPath = "/Teacher/TeacherLearningJournal";
        var strRouterPath = "/Teacher";
        ApplicationState.SetProperty('RouterPath', strRouterPath);
        var pushUrl = "/Teacher/Vacation";
        //var pushUrl = "/Teacher/EntityDataAndRouting";
        this.props.history.push({ pathname: pushUrl });
    }
    ShowVirtualListDemo() {
        //alert("Clicked");
        ApplicationState.SetProperty('RouterPath', '/Teacher');
        var pushUrl = this.props.JConfiguration.VirtualDirName + 'VirtualList'
        this.props.history.push({ pathname: pushUrl });
    }
    render() {
        return (
            <div className="hdrTop">
                <span onClick={this.showMenu} className="dropdown hdr">Teacher</span>
                {this.state.showMenu ? (
                    <ul className="menu wid10" ref={(element) => { this.dropdownMenu = element; }}>
                        <li className="li" onClick={this.onClickProfile}>Profile</li>
                        <li className="li" onClick={this.ShowDemo}>DemoModule</li>
                        <li className="li" onClick={this.ShowVirtualListDemo}>VirtualList</li>
                        <li className="li" onClick={this.OnClickLogout}>Logout</li>

                    </ul>
                ) : null}
            </div>
        );
    }

}

export default withRouter(DropDownMenu);
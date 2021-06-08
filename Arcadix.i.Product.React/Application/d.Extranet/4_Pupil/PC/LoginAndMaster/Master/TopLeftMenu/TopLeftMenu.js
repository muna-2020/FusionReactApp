//Used in files-
//Dropdown menu that appears when the user clicks on a button,close the dropdown menu if the user clicks outside of it and performs the action if any of the menu-item is clicked
import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Inline Images import
import imgAngleDownWhite from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Master/TopLeftMenu/angle_down_white.svg?inline';

const TopLeftMenu = (props) => {

    let dropdownRef = useRef(null)
    //Hooks to set the initial classnames
    const [classTrigger, SetTrigger] = useState('dropdown-list'); // css classes for the list
    const [classActive, SetActive] = useState('dropdown-trigger'); // css classes for button
    const [classToggler, SetToggler] = useState(false); //set the toggle to hide or show the list


    /**
      * @name 
      * @summary On click of service navigation executes this.
      * */
    const OnProfileServiceNavigationClick = () => {
        let objNavigation = props.objEvents.Navigation;
        let strApplicationName = Object.keys(objNavigation)[1];
        let arrNavigationData = objNavigation[strApplicationName];
        const arrProfileServiceNavigationData = arrNavigationData.filter(x => x.ParentNavigationId == -2)[0];
        var strFullQueryString = window.location.search;
        var strRouterPath = "/" + arrProfileServiceNavigationData.URL;// + props.JConfiguration.VirtualDirName.split('/')[1];
        var pushUrl = strRouterPath + "/" + arrProfileServiceNavigationData.URL + strFullQueryString;
        if (arrProfileServiceNavigationData.URL != "Home") {
            strRouterPath = "";
            pushUrl = "/" + arrProfileServiceNavigationData.URL + strFullQueryString;
        }
        let RouterPathNavName = {
            RouterPath: strRouterPath,
            NavigationName: arrProfileServiceNavigationData.NavigationName,
            NavigationTitle: arrProfileServiceNavigationData.NavigationText ? arrProfileServiceNavigationData.NavigationText[props.JConfiguration.LanguageCultureInfo] : ''
        }
        ApplicationState.SetProperty('RouterPathNavName', RouterPathNavName);
        ApplicationState.SetProperty('IsPupilProfile', true);
        ApplicationState.SetProperty('SubNavigationList', []);
        var pushUrl = props.JConfiguration.VirtualDirName + arrProfileServiceNavigationData.URL + strFullQueryString;
        props.history.push({ pathname: pushUrl });
    };

    //Show the dropdownMenu and 
    const ShowMenu = () => {
        if (classToggler === false) {
            SetToggler(!classToggler);
            SetTrigger("dropdown-list show");
            SetActive("dropdown-trigger active");
        } else {
            //on clicking second time on the button set the toggle value to false and hide the dropdown list
            SetToggler(!classToggler);
            SetTrigger("dropdown-list");
            SetActive("dropdown-trigger");
        }
        document.addEventListener("click", CloseMenu);
    };


    //On clicking anywhere outside the dropdown,it will close
    const CloseMenu = event => {
        var dropdownMenu = dropdownRef.current; //document.getElementById("dropdown");
        if (dropdownMenu) {
            if (!dropdownMenu.contains(event.target)) {
                SetToggler(false);
                SetTrigger("dropdown-list");
                SetActive("dropdown-trigger");
            }
        }
        document.removeEventListener("click", CloseMenu);
    };

    let arrEvents = [
        { OptionText: props.objEvents.Resource ? props.objEvents.Resource["MyProfile"] : '', EventHandler: OnProfileServiceNavigationClick },
        { OptionText: props.objEvents.Resource ? props.objEvents.Resource["LogOut"] : '', EventHandler: props.objEvents.Events }
    ];

    return (
        <React.Fragment>
            <img
                onClick={OnProfileServiceNavigationClick}
                className="profile-pic" src={props.ProfileBackGroundImagePath ? props.ProfileBackGroundImagePath.ProfileImagePath : ''}
                alt="" />
            <div className="dropdown-wrapper" id="dropdown" ref={dropdownRef}>
                <button className={classActive} onClick={() => ShowMenu()}>
                    <span title={props.ClientUserDetails ? props.ClientUserDetails.UserName : ""}>{props.ClientUserDetails ? props.ClientUserDetails.UserName : ""}</span>
                    <img src={imgAngleDownWhite} alt="" />
                </button>
                <ul className={classTrigger}>
                    {
                        arrEvents.map((item) => {
                            return (
                                <li onClick={() => {
                                    item.EventHandler();
                                    ShowMenu();
                                }}>
                                    {item.OptionText}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </React.Fragment>
    );
}

TopLeftMenu.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/LoginAndMaster/Master/TopLeftMenu/TopLeftMenu.css"
    ];
    return arrStyles;
};

export default withRouter(TopLeftMenu);

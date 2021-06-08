//React imports
import React, { useReducer } from 'react';
import { withRouter } from 'react-router-dom';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//module specific imports
import * as TopRightMenu_Hook from '@shared/Application/d.Extranet/2_School/Phone/LoginAndMaster/Master/TopRightMenu/TopRightMenu_Hook';
import TopRightMenu_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/LoginAndMaster/Master/TopRightMenu/TopRightMenu_ModuleProcessor';

//Common functionalities.
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

/**
 * @name TopRightMenu
 * @summary Dropdown menu that appears when the user clicks on a button,close the dropdown menu if the user clicks outside of it and performs the action if any of the menu-item is clicked
 * @param {any} props Props
 * @returns {object} TopRightMenu JSX
 */
const TopRightMenu = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TopRightMenu_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["TopRightMenu_ModuleProcessor"]: new TopRightMenu_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.TopRightMenu_ModuleProcessor.Initialize(objContext, objContext.TopRightMenu_ModuleProcessor);

    /**
    * @name ShowMenu
    * @summary Show the dropdownMenu 
    */
    const ShowMenu = () => {
        if (state.blnToggler === false) {
            objContext.TopRightMenu_ModuleProcessor.UpdateState(objContext, !state.blnToggler, "dropdown-list show", "dropdown-trigger active");
        } else {
            //on clicking second time on the button set the toggle value to false and hide the dropdown list
            objContext.TopRightMenu_ModuleProcessor.UpdateState(objContext, !state.blnToggler, "dropdown-list", "dropdown-trigger");
        }
        document.addEventListener("click", CloseMenu);
    };

    /**
    * @name CloseMenu
    * @summary On clicking anywhere outside the dropdown,it will close
    * @param {any} event Event
    */
    const CloseMenu = event => {
        var dropdownMenu = document.getElementById("dropdown");
        if (dropdownMenu) {
            if (!dropdownMenu.contains(event.target)) {
                objContext.TopRightMenu_ModuleProcessor.UpdateState(objContext, false, "dropdown-list", "dropdown-trigger");
            }
        }
        document.removeEventListener("click", CloseMenu);
    };

    /**
    * @name OnServiceNavigationClick
    * @summary Form Service Navigation object for Outlet and assign it to Outlet Data and Assigns Active ServiceNavigation Id to Application State
    * @param {any} objServiceNavigation
    */
    function OnProfileServiceNavigationClick() {
        let objServiceNavigation = { ...props.objNavigation, IsServiceNavigation: "N" };
        var strPushUrl = "/" + objServiceNavigation.NavigationName;
        ApplicationState.SetProperty('RouterPath', "");
        props.history.push({
            pathname: strPushUrl,
            state: objServiceNavigation
        });
        props.CloseMenu();
    }

    /**
    * @name OnClickLogout
    * @summary makes the api call to clear session.
    * @param {any} objContext Context object
    */
    function OnClickLogout() {
        let cIsExternalMember = "N";
        if (props.JConfiguration.ApplicationTypeId == "1") {
            cIsExternalMember = (props.ClientUserDetails.TeacherDetails["cIsExternalMember"] != null && props.ClientUserDetails.TeacherDetails["cIsExternalMember"] == "Y") ? "Y" : "N";
        }
        let objParams = {
            "cIsExternalMember": cIsExternalMember
        };
        ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/Logout", "POST", objParams)
            .then(response => response.json())
            .then(objResponse => {
                let strBaseUrl = props.JConfiguration.BaseUrl.substring(0, props.JConfiguration.BaseUrl.length - 1);
                window.location = strBaseUrl;
            });
    }


    /**
     * @name GetContent
     * @summary returns the required jsx
     * @returns {object} JSX 
     * */
    function GetContent() {
        let strUserName = objContext.TopRightMenu_ModuleProcessor.GetUserName(objContext);
        const arrEvents = [
            { OptionText: Localization.TextFormatter(objContext.props.TextResource, "MyProfile"), EventHandler: () => OnProfileServiceNavigationClick(objContext) },
            { OptionText: Localization.TextFormatter(objContext.props.TextResource, "LogOut"), EventHandler: () => OnClickLogout() }
        ];
        return (
            <div className="profile-dropdown">
                <div className="dropdown-wrapper" id="dropdown">
                    <button className={state.classActive} onClick={() => ShowMenu()}>
                        <span title={strUserName}>{strUserName}</span>
                        <img src={props.JConfiguration.ExtranetSkinPath + '/Images/Common/Icons/angle_down.png'} alt="" />
                    </button>
                    <ul className={state.classTrigger}>
                        {
                            arrEvents.map((item) => {
                                return (
                                    <li onClick={() => { item.EventHandler(objContext); ShowMenu(); }}>
                                        {item.OptionText}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    return GetContent();

};

export default (withRouter(TopRightMenu));

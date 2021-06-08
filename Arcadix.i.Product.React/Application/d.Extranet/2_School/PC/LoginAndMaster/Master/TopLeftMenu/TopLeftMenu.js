//React imports
import React, { useReducer, useRef } from 'react';

//module specific imports
import * as TopLeftMenu_Hook from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/TopLeftMenu/TopLeftMenu_Hook';
import TopLeftMenu_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/TopLeftMenu/TopLeftMenu_ModuleProcessor';
//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';



//Inline Images import
import imgAngleDown from '@inlineimage/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/TopLeftMenu/angle_down.svg?inline';

/**
 * @name TopLeftMenu
 * @summary Dropdown menu that appears when the user clicks on a button,close the dropdown menu if the user clicks outside of it and performs the action if any of the menu-item is clicked
 * @param {any} props
 */
const TopLeftMenu = (props) => {

    const dropdownRef = useRef(null)

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TopLeftMenu_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["TopLeftMenu_ModuleProcessor"]: new TopLeftMenu_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.TopLeftMenu_ModuleProcessor.Initialize(objContext, objContext.TopLeftMenu_ModuleProcessor);

    /**
     * @name ShowMenu
     * @summary Show the dropdownMenu 
     * */
    const ShowMenu = () => {
        if (state.blnToggler === false) {
            objContext.TopLeftMenu_ModuleProcessor.UpdateState(objContext, !state.blnToggler, "dropdown-list show", "dropdown-trigger active");
        } else {
            //on clicking second time on the button set the toggle value to false and hide the dropdown list
            objContext.TopLeftMenu_ModuleProcessor.UpdateState(objContext, !state.blnToggler, "dropdown-list", "dropdown-trigger");
        }
        document.addEventListener("click", CloseMenu);
    };

    /**
     * @name CloseMenu
     * @summary On clicking anywhere outside the dropdown,it will close
     * @param {any} event
     */
    const CloseMenu = event => {
        //var dropdownMenu = document.getElementById("dropdown");
        var dropdownMenu = dropdownRef.current;
        if (dropdownMenu) {
            if (!dropdownMenu.contains(event.target)) {
                objContext.TopLeftMenu_ModuleProcessor.UpdateState(objContext, false, "dropdown-list", "dropdown-trigger");
            }
        }
        document.removeEventListener("click", CloseMenu);
    };

    /**
     * @name CleanupOutletComponent
     * @summary clean up the outlet component
     * */
    function CleanupOutletComponent() {
        var strExistingServiceNav = QueryString.GetQueryStringValue('ServiceNavigation');
        if (strExistingServiceNav !== "") {
            var strCurrentModule = strExistingServiceNav.split('/').length > 1 ? strExistingServiceNav.split('/')[1] : strExistingServiceNav.split('/')[0];
            ApplicationState.RemoveProperty(strCurrentModule.split('?')[0])
        }
    }

    /**
     * @name OnClickLogout
     * @summary makes the api call to clear session.
     * @param {any} objContext
     */
    function OnClickLogout() {
        let cIsExternalMember = "N";
        if (props.JConfiguration.ApplicationTypeId == "1") {
            cIsExternalMember = (props.ClientUserDetails.TeacherDetails["cIsExternalMember"] != null && props.ClientUserDetails.TeacherDetails["cIsExternalMember"] == "Y") ? "Y" : "N";
        }
        let objParams = {
            "cIsExternalMember": cIsExternalMember
        }
        ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/Logout", "POST", objParams)
            .then(response => response.json())
            .then(objResponse => {
                let strBaseUrl = props.JConfiguration.BaseUrl.substring(0, props.JConfiguration.BaseUrl.length - 1);
                window.location = strBaseUrl;
            });
    }

    /**
   * @name OnServiceNavigationClick
   * @summary Form Service Navigation object for Outlet and assign it to Outlet Data and Assigns Active ServiceNavigation Id to Application State
   * @param {any} objServiceNavigation
   */
    function OnProfileServiceNavigationClick() {
        let objServiceNavigation = props.objNavigation;
        ApplicationState.SetProperty("blnShowAnimation", true);
        if (objServiceNavigation.cIsOpenNewWindow !== 'Y') {
            let strComponentName = "";
            Performance.LogPerformance(objServiceNavigation.NavigationName);
            strComponentName = objServiceNavigation.URL;
            ApplicationState.SetProperty('ActiveServiceNavigationId', objServiceNavigation.NavigationId);
            ApplicationState.SetProperty('ActiveSubServiceNavigationId', 0);

            var objServiceNavigationForOutlet = {
                ShowOutlet: true,
                ComponentName: strComponentName,
                NavData: objServiceNavigation
            };
            var strNewURL1 = window.location.protocol + "//" + window.location.host + window.location.pathname;
            if (window.location.search == "") {
                strNewURL1 = strNewURL1 + "?ServiceNavigation=" + strComponentName;
            }
            else {
                strNewURL1 = strNewURL1 + window.location.search;
                var strServiceNavigation = QueryString.GetQueryStringValue('ServiceNavigation');
                if (strServiceNavigation == "") {
                    strNewURL1 = strNewURL1 + "&ServiceNavigation=" + strComponentName;
                }
                else {
                    strNewURL1 = QueryString.SetQueryStringValue(strNewURL1, "ServiceNavigation", strComponentName)
                }
            }
            console.log("new url:", strNewURL1);
            CleanupOutletComponent();
            window.history.pushState({ path: strNewURL1 }, '', strNewURL1);
            ApplicationState.SetProperty('OutletData', objServiceNavigationForOutlet);

        }
    }

    /**
     * @name GetContent
     * @summary returns the required jsx
     * */
    function GetContent() {
        let strUserName = objContext.TopLeftMenu_ModuleProcessor.GetUserName(objContext);
        const arrEvents = [
            { OptionText: Localization.TextFormatter(objContext.props.TextResource, "MyProfile"), EventHandler: () => OnProfileServiceNavigationClick(objContext) },
            { OptionText: Localization.TextFormatter(objContext.props.TextResource, "LogOut"), EventHandler: () => OnClickLogout() }
        ];
        return (
            <div className="dropdown-wrapper" id="dropdown" ref={dropdownRef}>
                <button className={state.classActive} onClick={() => ShowMenu()}>
                    <span title={strUserName}>{strUserName}</span>
                    <img src={imgAngleDown} alt="" />
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
        );
    }

    return GetContent();

};

export default TopLeftMenu;

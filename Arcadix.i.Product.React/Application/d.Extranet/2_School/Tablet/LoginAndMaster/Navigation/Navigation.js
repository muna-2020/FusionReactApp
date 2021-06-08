import React, { useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Common functionalities
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Module Specific
import Navigation_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Navigation/Navigation_ModuleProcessor';
import * as Navigation_Hook from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Navigation/Navigation_Hook';


//Inline Images import
import ExclamationMarkImage from '@inlineimage/Application/d.Extranet/2_School/Tablet/LoginAndMaster/Navigation/exclamation_mark.svg?inline';
import imgAngleDown from '@inlineimage/Application/d.Extranet/2_School/Tablet/LoginAndMaster/Navigation/angle_down.svg?inline';

const Navigation = (props) => {

    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Navigation_Hook.GetInitialState());

    let objContext = { dispatch, state, props, ["Navigation_ModuleProcessor"]: new Navigation_ModuleProcessor() };

    Navigation_Hook.Initialize(objContext);

    /**
    * @name GetSubNavigationElements
    * @summary returns the sub navigation elements.
    * @returns {jsx} li
    */
    function GetSubNavigationElements() {
        let arrElements = state.arrSubNavigation.map(objSubNav => {
            return (
                <li className={objSubNav.NavigationId === ApplicationState.GetProperty('ActiveSubNavigationId') ? "active" : ''} onClick={() => {
                    objContext.Navigation_ModuleProcessor.OnSubNavigationClickHandler(objContext, objSubNav);
                    ApplicationState.SetProperty("TabletNavigation", objSubNav);
                    CloseServiceNavigationOutlet();
                }}
                >
                    <span>{objSubNav.NavigationName}</span>
                    <img src={imgAngleDown} alt="" />
                </li>
            );
        });

        return arrElements;
    }

    /**
    * @name GetClassName
    * @summary returns the css classname based on subNavigations are there or not.
    * @returns {String} ClassName
    */
    function GetClassName() {
        let strClassName = 'active';
        if (state.arrSubNavigation && state.arrSubNavigation.length > 0)
            strClassName += ' has-children';
        return strClassName;
    }


    /**
    * @name CleanupOutletComponent
    * @summary Cleaning up module on outlet
    */
    function CleanupOutletComponent() {
        var strExistingServiceNav = QueryString.GetQueryStringValue('ServiceNavigation');
        if (strExistingServiceNav !== "") {
            var strCurrentModule = strExistingServiceNav.split('/').length > 1 ? strExistingServiceNav.split('/')[1] : strExistingServiceNav.split('/')[0];
            ApplicationState.RemoveProperty(strCurrentModule.split('?')[0]);
        }
    }

    /**
    * @name CloseServiceNavigationOutlet
    * @summary Closes the subnavigation outlet
    */
    function CloseServiceNavigationOutlet() {
        var newUrl1 = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
        newUrl1 = QueryString.RemoveQueryStringValue(newUrl1, "ServiceNavigation");
        CleanupOutletComponent();
        window.history.pushState({ path: newUrl1 }, '', newUrl1);
        ApplicationState.SetProperty('OutletData', {});
        ApplicationState.SetProperty('ActiveServiceNavigationId', 0);
        ApplicationState.SetProperty('ActiveSubServiceNavigationId', 0);
        ReactDOM.unmountComponentAtNode(document.getElementById('outlet'));
    }

    let ShowOnlineHelp = () => {
        let objOnlineHelpObject = {
            blnShowOnlineHelp: true
        };
        let arrFilteredMainNavigation = props.arrNavigation.filter(x => x.ParentNavigationId == 0);
        let objSelectedNavigation = ApplicationState.GetProperty("TabletNavigation");
        if (!objSelectedNavigation) {
            objOnlineHelpObject["OnlineHelpGroupKey"] = arrFilteredMainNavigation[0]["NavigationName"];
            objOnlineHelpObject["OnlineHelpKey"] = arrFilteredMainNavigation[0]["NavigationName"];
        }
        if (objSelectedNavigation && Object.keys(objSelectedNavigation).length !== 0) {
            objOnlineHelpObject["OnlineHelpGroupKey"] = objSelectedNavigation["NavigationName"];
            objOnlineHelpObject["OnlineHelpKey"] = objSelectedNavigation["NavigationName"];
        }
        ApplicationState.SetProperty("OnlineHelpGroupObject", objOnlineHelpObject);
    };

    /**
    * @name GetMainNavigationElements
    * @summary returns the main navigation elements.
    * @returns {jsx} React.Fragment
    */
    function GetMainNavigationElements() {
        let arrFilteredMainNavigation = [];
        if (props.arrNavigation && props.IsServiceNavigation == "N") {
            arrFilteredMainNavigation = props.arrNavigation.filter(x => x.ParentNavigationId == 0);
        } else if (props.arrNavigation && props.IsServiceNavigation == "Y") {
            arrFilteredMainNavigation = props.arrNavigation.filter(x => x.ParentNavigationId == -1);
        }
        let objShowHelp = ApplicationState.GetProperty("ShowHelp");
        if (state.arrSubNavigation.length > 0) { //means sub navigation is there
            let arrSelectedNavigation = state.arrSubNavigation.filter(objSubNav => objSubNav["NavigationId"] == ApplicationState.GetProperty('ActiveSubNavigationId'));
            if (!objShowHelp || (arrSelectedNavigation.length > 0 && objShowHelp.NavigationName != arrSelectedNavigation[0]["NavigationName"] && objShowHelp.ShowAt == "TabNavigation"))
                ApplicationState.SetProperty("ShowHelp", { NavigationName: arrSelectedNavigation[0]["NavigationName"], ShowHelpIcon: false, ShowAt: "TabNavigation" });
        } else {
            let objSelectedNavigation = ApplicationState.GetProperty("TabletNavigation");
            if (props.IsServiceNavigation == "N") {
                if (objSelectedNavigation) { //means main navigation is clicked
                    if (!objShowHelp || (objShowHelp.NavigationName != objSelectedNavigation["NavigationName"] && objShowHelp.ShowAt == "TabNavigation")) //not service navigation
                        ApplicationState.SetProperty("ShowHelp", { NavigationName: objSelectedNavigation["NavigationName"], ShowHelpIcon: false, ShowAt: "TabNavigation"  });
                } else {
                    if ((!objShowHelp && arrFilteredMainNavigation.length > 0 ) || (arrFilteredMainNavigation.length > 0 && objShowHelp.NavigationName != arrFilteredMainNavigation[0]["NavigationName"] && objShowHelp.ShowAt == "TabNavigation")) //not service navigation
                        ApplicationState.SetProperty("ShowHelp", { NavigationName: arrFilteredMainNavigation[0]["NavigationName"], ShowHelpIcon: false, ShowAt: "TabNavigation" });
                }
            }
            
        }
        console.log("state.objSelectedNavigation", state.objSelectedNavigation);
        let arrElements = [
            props.ShowHelp && props.ShowHelp.ShowHelpIcon && props.ShowHelp.ShowAt == "TabNavigation"?
                <li className="help-icon">
                    <div className="icon-trigger">
                        <img
                            onClick={() => { ShowOnlineHelp(); }}
                            src={ExclamationMarkImage} alt=""
                        />
                    </div>
                </li> : <React.Fragment />
        ];
        arrElements = [...arrElements,...arrFilteredMainNavigation.map(objNav => {
            return (
                <React.Fragment>
                    <li id={objNav.NavigationName} className={objNav.NavigationId == state.objSelectedNavigation.NavigationId ? GetClassName() : ''}
                        onClick={() => {
                            objContext.Navigation_ModuleProcessor.OnMainNavigationClick(objContext, objNav);
                            if (props.IsServiceNavigation == "N")
                                CloseServiceNavigationOutlet();
                        }}
                    >
                        <span>{objNav.NavigationName}</span>
                        <img src={imgAngleDown} alt="" />
                    </li>
                    {
                        objNav.NavigationId == state.iSelectedNavId ? <React.Fragment><ul className="sub-nav">{GetSubNavigationElements()}</ul></React.Fragment> : null
                    }
                </React.Fragment>
            );
        })];

        return arrElements;
    }

    return (        <React.Fragment>            {GetMainNavigationElements()}
        </React.Fragment>
    );
};

export default withRouter(Navigation);



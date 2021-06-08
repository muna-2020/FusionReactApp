import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import SubNavigation from '../Navigation/SubNavigation/SubNavigation';
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';
import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';
import { LogPerformanceToRedis } from "@root/Core/3_Route/RouteLoader";

//Inline Images import
import ExclamationMarkImage from '@inlineimage/Framework/ReactJs/PC/Controls/OnlineHelp/exclamation_mark.svg?inline';
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

//function mapStateToProps(state) {
//    if (!global["mode"]) {
//        return {
//            OutletData: state.ApplicationState.OutletData,
//            ActiveServiceNavigationId: state.ApplicationState.ActiveServiceNavigationId
//        };
//    }
//    else {
//        return {};
//    }
//}
//function reducer(state, action) {
//    switch (action.type) {
//        case 'SET_STATE_VALUES': {
//            return { ...state, ...action.payload };
//        }
//    }
//}



const Outlet1 = (props) => { //React.memo((props) => {
    //////const [state, dispatch] = useReducer(reducer, {
    //////    OutletComponentName: null
    //////});
    useEffect(() => {
        if (props["CloseServiceNavigation"]) {
            var newUrl1 = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
            newUrl1 = QueryString.RemoveQueryStringValue(newUrl1, "ServiceNavigation");
            props.CleanupOutletComponent();
            window.history.pushState({ path: newUrl1 }, '', newUrl1);
            ApplicationState.SetProperty('OutletData', {});
            ApplicationState.SetProperty('ActiveServiceNavigationId', 0);
            ApplicationState.SetProperty('ActiveSubServiceNavigationId', 0);
            ReactDOM.unmountComponentAtNode(document.getElementById('outlet'));
            ApplicationState.SetProperty("CloseServiceNavigation", false);
        }
    }, [props["CloseServiceNavigation"]]);


    useEffect(() => {
        if (props["OnClickBackButtonCloseServiceNavigation"]) {
            ApplicationState.SetProperty('OutletData', {});
            ApplicationState.SetProperty('ActiveServiceNavigationId', 0);
            ApplicationState.SetProperty('ActiveSubServiceNavigationId', 0);
            ApplicationState.SetProperty('OnClickBackButtonCloseServiceNavigation', false);
            ReactDOM.unmountComponentAtNode(document.getElementById('outlet'));
        }
    }, [props["OnClickBackButtonCloseServiceNavigation"]]);


    let ShowOnlineHelp = () => {
        //let objOnlineHelpObject = {
        //    blnShowOnlineHelp: true,
        //    OnlineHelpGroupKey: props.OutletData.ComponentName,
        //    OnlineHelpKey: props.OutletData.ComponentName
        //};
        //ApplicationState.SetProperty("OnlineHelpGroupObject", objOnlineHelpObject);

        let objHelpView = {
            "HelpAction": "Open",
            "HelpGroup": props.OutletData.ComponentName,
            "HelpKey": props.OutletData.ComponentName
        };
        ApplicationState.SetProperty("HelpData", objHelpView);
    };

    const GetSubNavigationData = (strComponentName) => {
        let strModuleName = "";
        let strNaveName = props.OutletData.NavData.NavigationText[props.JConfiguration.LanguageCultureInfo];
        if (strNaveName == "Verwalten") {
            props.arrAllNavigationData.map(objNavData => {
                if (objNavData.NavigationName == strComponentName)
                    strModuleName = objNavData.NavigationText[props.JConfiguration.LanguageCultureInfo];
            });
        } else {
            strModuleName = strNaveName;
        }
        return strModuleName;
    };

    console.log("OUTLET RERENDER", props.OutletData);
    var arrSubNavigation = [];
    if (props.OutletData && Object.keys(props.OutletData).length > 0) {
        var OutletComponent = null;
        let strActiveId = '';
        if (props.OutletData.ShowOutlet) {

            if (props.OutletData.NavData.URL === "") {
                arrSubNavigation = props.arrAllNavigationData.filter(x => x.ParentNavigationId == props.OutletData.NavData.NavigationId);
                console.log(arrSubNavigation);
            }
            var arrComponentName = props.OutletData.ComponentName.split('/');
            var strComponentName = "";
            if (arrComponentName[1] === undefined) {
                strComponentName = arrComponentName[0];
            }
            else
                strComponentName = arrComponentName[1];
            let objActiveNavigation = arrSubNavigation.find(objNav => objNav["NavigationName"] == strComponentName);
            if (objActiveNavigation)
                strActiveId = objActiveNavigation["NavigationId"]
        }

        let arrActiveNavigation = arrSubNavigation.filter(objNav => objNav["NavigationName"] == strComponentName);

        if (arrActiveNavigation.length == 0)
            arrActiveNavigation = props.arrAllNavigationData.filter(objNav => objNav["NavigationName"] == strComponentName);

        let  objActiveNavigation = arrActiveNavigation[0];


        let objShowHelp = ApplicationState.GetProperty("ShowHelp");

        let blnServerRenderModule = (props.OutletData.NavData != undefined && props.OutletData.NavData.SSREnabled != undefined && props.OutletData.NavData.SSREnabled == "Y") || (props.OutletData.NavData?.SSREnabled != "N" && JConfiguration["IsSSREnabled"] == true) ? true : false;
        let objJConfiguration = { ...props.JConfiguration, IsSSREnabled: blnServerRenderModule };
        let strInitialHtml = document.getElementById("ModuleContainerParent") != null ? document.getElementById("ModuleContainerParent").innerHTML : "";
        if (!objShowHelp || (objActiveNavigation && objShowHelp.NavigationName != objActiveNavigation.NavigationName && objShowHelp.ShowAt == "Outlet"))
            ApplicationState.SetProperty("ShowHelp", { NavigationName: objActiveNavigation.NavigationName, ShowHelpIcon: false, ShowAt: "Outlet" });

        return (
            <React.Fragment>
                {props.OutletData.ShowOutlet ?
                    (<div>
                        <div className="parent-heading" id="outletBand">
                            <span className="component-name">{GetSubNavigationData(strComponentName)}</span>
                            <span className="outlet-right-block">
                                {//JConfiguration.strDeviceType == "PC" && props.OutletData.NavData.NavigationName !== "Verwalten" && props.ShowHelp && props.ShowHelp.ShowHelpIcon ?
                                    JConfiguration.strDeviceType == "PC" && props.OutletData.NavData.NavigationName !== "Verwalten" ?
                                        <div className="icon-trigger">
                                            <img
                                                onClick={() => { ShowOnlineHelp(); }}
                                                src={ExclamationMarkImage} alt=""
                                            />
                                        </div>
                                        : <React.Fragment />
                                }

                                <span className="close-text" onClick={() => {
                                    var newUrl1 = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
                                    newUrl1 = QueryString.RemoveQueryStringValue(newUrl1, "ServiceNavigation");
                                    props.CleanupOutletComponent();
                                    window.history.pushState({ path: newUrl1 }, '', newUrl1);
                                    ApplicationState.SetProperty('OutletData', {});
                                    ApplicationState.SetProperty('ActiveServiceNavigationId', 0);
                                    ApplicationState.SetProperty('ActiveSubServiceNavigationId', 0);
                                    let Ref = props.OutletRef;

                                    //ReactDOM.unmountComponentAtNode(document.getElementById('outlet'));
                                    ReactDOM.unmountComponentAtNode(Ref.current);

                                    //Checking the Performance log data.
                                    let objAllPerformanceLogData = ApplicationState.GetProperty("AllPerformanceLogData");
                                    if (Object.keys(objAllPerformanceLogData).length > 0) {
                                        LogPerformanceToRedis();
                                    }

                                    Performance.Reset();
                                }}>Schliessen
                                <img className="close-button" src={CloseImage} />
                                </span>
                            </span>
                        </div>
                        <div className="outlet-sub-navigation" id="SubNavigation">{(props.OutletData.NavData.URL === "") ? <SubNavigation Id={"ExtranetSubNavigation"} arrSubNavigation={arrSubNavigation} JConfiguration={props.JConfiguration} ActiveServiceNavigationId={strActiveId} ShowHelp={props.ShowHelp}/*OnSubNavigationClickHandler={OnSubNavigationClickHandler}*/ /> : null}</div>
                        <div className="outlet-content-section">
                            <ComponentLoader
                                {...props}
                                OutletRef={null}
                                ComponentName={strComponentName}
                                IsFromRouteLoader={false}
                                DivName={"divOutlet"}
                                history={props.history}
                                ClientUserDetails={props.ClientUserDetails}
                                ComponentController={props.ComponentController}
                                JConfiguration={objJConfiguration}
                                InitialHtml={strInitialHtml}
                                />
                        </div>
                    </div>)
                    : null}
            </React.Fragment>
        );
    }
    else {
        return <div />;
    }
};
////    ,
////    (prevProps, nextProps) => {
////        if (prevProps.OutletData) {
////            if (Object.keys(prevProps.OutletData).length === 0) {
////                return false;
////            }
////            if (prevProps.OutletData.ShowOutlet && nextProps.OutletData.ComponentName !== prevProps.OutletData.ComponentName) {
////                if (nextProps.OutletData.ComponentName)
////                    //LogPerformance(nextProps.OutletData.ComponentName);
////                    return false;
////            }
////        }
////        if (nextProps.OutletData && typeof prevProps.OutletData === "undefined") {
////            if (Object.keys(nextProps.OutletData).length === 0) {
////                return false;
////            }
////            if (nextProps.OutletData.ShowOutlet) {
////                if (nextProps.OutletData.ComponentName)
////                    //LogPerformance(nextProps.OutletData.ComponentName);
////                    return false;
////            }
////        }
////        return true;
////    }
////);

//const LogPerformance = (strCompName) => {
//    var entityName = strCompName;
//    if (strCompName.split('/').length > 1) {
//        console.log("subcomponent", strCompName);
//        entityName = strCompName.split('/')[1];
//    }
//    Performance.SetProperty("Entity", entityName.split('?')[0]);
//    Performance.SetProperty("PerformanceLog", [...Performance.GetProperty("PerformanceLog"), { "ModuleName": entityName.split('?')[0] }]);
//};

//export default withRouter(connect(mapStateToProps)(Outlet1));

/**
* @name MapStateToProps
* @param {object} objState State object
* @param {object} objOwnProps Props passed
* @summary Returns list of objects used in the module
* @return {Array} Array of object list
*/
const MapStateToProps = (objState, objOwnProps) => {
    return ExtranetBase_Hook.MapStoreToProps([{ "StoreKey": "ApplicationState", "DataKey": "CloseServiceNavigation" }, { "StoreKey": "ApplicationState", "DataKey": "OutletData" }, { "StoreKey": "ApplicationState", "DataKey": "OnClickBackButtonCloseServiceNavigation" }]);
};

export default connect(MapStateToProps)(withRouter(Outlet1));
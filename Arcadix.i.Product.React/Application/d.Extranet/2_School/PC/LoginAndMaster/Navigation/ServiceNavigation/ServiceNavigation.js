//React imports 
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Component specific modules.
import Object_Extranet_Shared_DiskSpaceManagement from "@shared/Object/d.Extranet/5_Shared/DiskSpaceManagement/DiskSpaceManagement";
import { LogPerformanceToRedis } from "@root/Core/3_Route/RouteLoader";

/**
 * @name ServiceNavigation
 * @param {any} props
 */
const ServiceNavigation = (props) => {

    const [objCount, SetCount] = useState({ DocumentCount: 0, NewsCount: 0 })

    /**
    * @name CleanupOutletComponent
    * @summary Cleaning up module on outlet
    * */
    function CleanupOutletComponent() {
        var strExistingServiceNav = QueryString.GetQueryStringValue('ServiceNavigation');
        if (strExistingServiceNav !== "") {
            var strCurrentModule = strExistingServiceNav.split('/').length > 1 ? strExistingServiceNav.split('/')[1] : strExistingServiceNav.split('/')[0];
            ApplicationState.RemoveProperty(strCurrentModule.split('?')[0])
        }
    }

    useEffect(() => {
        if (ClientUserDetails.ApplicationTypeId == "1" && props.SelectedClassId) {
            let objParams = {
                ["uSchoolId"]: ClientUserDetails.TeacherDetails.uSchoolId,
                ["uUserId"]: ClientUserDetails.TeacherDetails.uTeacherId,
                ["uClassId"]: props.SelectedClassId,
            };
            //Object_Extranet_Shared_DiskSpaceManagement.GetRealTimeInfo(objParams, (objRes) => {
            //    let objData = objRes["Arcadix_Extranet_Shared_DiskSpaceManagement"]["Data"][0];
            //    SetCount(objData)
            //})
        }
    }, [props.SelectedClassId, props.RefreshDocumentData, props.RefreshNewsData])

    /**
     * @name OnServiceNavigationClick
     * @summary Form Service Navigation object for Outlet and assign it to Outlet Data and Assigns Active ServiceNavigation Id to Application State
     * @param {any} objServiceNavigation
     */
    function OnServiceNavigationClick(objServiceNavigation) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        if (objServiceNavigation.cIsOpenNewWindow !== 'Y') {
            let strComponentName = "";
            //Performance.LogPerformance(objServiceNavigation.NavigationName);
            if (objServiceNavigation.URL == "") {
                let arrChildren = props.arrAllNavigationData.filter(x => x.ParentNavigationId == objServiceNavigation.NavigationId);
                if (arrChildren.length > 0) {
                    strComponentName = arrChildren[0]["URL"];
                    ApplicationState.SetProperty('ActiveServiceNavigationId', objServiceNavigation.NavigationId);
                    ApplicationState.SetProperty('ActiveSubServiceNavigationId', arrChildren[0]["NavigationId"]);
                }
                else
                    Logger.LogError("URL missing for the service navigation:", objServiceNavigation);
            }
            else {
                strComponentName = objServiceNavigation.URL;
                ApplicationState.SetProperty('ActiveServiceNavigationId', objServiceNavigation.NavigationId);
                ApplicationState.SetProperty('ActiveSubServiceNavigationId', 0);
            }
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

            //Checking the Performance log data.
            let objAllPerformanceLogData = ApplicationState.GetProperty("AllPerformanceLogData");
            if (Object.keys(objAllPerformanceLogData).length > 0) {
                LogPerformanceToRedis();
            }
            
            Performance.Reset();
        }
    }

    useEffect(() => {
        if (props["HighlightServiceNavigations" + props.Id] && props["HighlightServiceNavigations" + props.Id].Id === props.Id) {
            var objServiceNavigation = props.arrServiceNavigation.filter(x => x.NavigationName == props["HighlightServiceNavigations" + props.Id].NavigationName)[0];
            ApplicationState.SetProperty('ActiveServiceNavigationId', objServiceNavigation.NavigationId);
            ApplicationState.SetProperty("HighlightServiceNavigations" + props.Id, {});
        }
    }, [props["HighlightServiceNavigations" + props.Id]]);


    let OnBrowserClick = (objServiceNavigation, isChild) => {
        ApplicationState.SetProperty("blnShowAnimation", true);
        if (objServiceNavigation.cIsOpenNewWindow !== 'Y') {
            let objServiceNavigationForOutlet = {};
            if (isChild) {
                let strComponentName = objServiceNavigation.URL;
                let objParentNavigation = props.arrAllNavigationData.find(x => x.NavigationId == objServiceNavigation.ParentNavigationId);
                if (objParentNavigation) {
                    ApplicationState.SetProperty('ActiveServiceNavigationId', objParentNavigation.NavigationId);
                    ApplicationState.SetProperty('ActiveSubServiceNavigationId', objServiceNavigation.NavigationId);
                }
                objServiceNavigationForOutlet = {
                    ShowOutlet: true,
                    ComponentName: strComponentName,
                    NavData: objParentNavigation
                };
            } else {
                ApplicationState.SetProperty('ActiveServiceNavigationId', objServiceNavigation.NavigationId);
                let strComponentName = objServiceNavigation.URL;
                objServiceNavigationForOutlet = {
                    ShowOutlet: true,
                    ComponentName: strComponentName,
                    NavData: objServiceNavigation
                };
            }

            ApplicationState.SetProperty('OutletData', objServiceNavigationForOutlet);
            Performance.Reset();
        }
    }

    useEffect(() => {
        window.onpopstate = (e) => {
            let queryString = window.location.search;
            let strNavigationName = QueryString.GetQueryStringValue('ServiceNavigation');
            if (strNavigationName != '') {
                let objNavigation = {};
                let isChild = false;
                if (strNavigationName.includes('/')) {
                    strNavigationName = strNavigationName.split('/')[1]
                    objNavigation = props.arrAllNavigationData.find(objNav => objNav["NavigationName"] == strNavigationName);
                    isChild = true;
                } else {
                    objNavigation = props.arrAllNavigationData.find(objNav => objNav["NavigationName"] == strNavigationName);
                }
                if (objNavigation) {
                    OnBrowserClick(objNavigation, isChild)
                }

            }
            else {
                ApplicationState.SetProperty('OnClickBackButtonCloseServiceNavigation', true)
            }
        };
    }, []);



    let strActiveServiceNavigationId = props.ActiveServiceNavigationId;

    return (
        <ul className="service-navigation">
            {
                (props.arrServiceNavigation !== null && props.arrServiceNavigation !== undefined) ? props.arrServiceNavigation.map((objItem) => {
                    var strClassName = objItem.NavigationId == strActiveServiceNavigationId ? "active" : "";
                    if (objItem.NavigationName == "DockStation") {
                        return (
                            <li>
                                <a href={objItem.URL} target="blank">
                                    <span>
                                        <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/Dockstation_Brown.svg"} />
                                    </span>
                                </a>
                            </li>
                        );
                    }
                    else if (objItem.NavigationName == "JobSkillsOffline") {
                        return (
                            <li>
                                <a href={objItem.URL} target="blank">
                                    <span>
                                        <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/jobskillsoffline.svg"} />
                                    </span>
                                </a>
                            </li>
                        );
                    } else {
                        return (
                            <li onClick={() => { OnServiceNavigationClick(objItem) }}>
                                <span className={strClassName}>
                                    {objItem.NavigationIcon ? (<img src={JConfiguration.ExtranetSkinPath + objItem.NavigationIcon} />) : null}
                                    {objItem.NavigationText[props.JConfiguration.LanguageCultureInfo]}
                                    {objItem.NavigationName == "TeacherDocument" ? <React.Fragment>({objCount.DocumentCount})</React.Fragment> : ''}
                                    {objItem.NavigationName == "TeacherNews" ? <React.Fragment>({objCount.NewsCount})</React.Fragment> : ''}
                                </span>
                            </li>
                        );
                    }
                })
                    : <React.Fragment />
            }


        </ul>
    );
}

/**
* @name MapStateToProps
* @param {object} objState State object
* @param {object} objOwnProps Props passed
* @summary Returns list of objects used in the module
* @return {Array} Array of object list
*/
const MapStateToProps = (objState, objOwnProps) => {
    return ExtranetBase_Hook.MapStoreToProps([
        { "StoreKey": "ApplicationState", "DataKey": "HighlightServiceNavigations" + objOwnProps["Id"] },
        { "StoreKey": "ApplicationState", "DataKey": "SelectedClassId" },
        { "StoreKey": "ApplicationState", "DataKey": "RefreshDocumentData" },
        { "StoreKey": "ApplicationState", "DataKey": "RefreshNewsData" },
        { "StoreKey": "ApplicationState", "DataKey": "ActiveServiceNavigationId" }
    ]);
};

export default connect(MapStateToProps)(withRouter(ServiceNavigation));
//Raect imports
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//module specific imports
import * as Master_Hook from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/Master_Hook';
import Master_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/Master_ModuleProcessor';

//Common functionalities
import RouteLoader from '@root/Core/3_Route/RouteLoader';
import MainNavigation from '@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Navigation/MainNavigation/MainNavigation';
import ServiceNavigation from '@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Navigation/ServiceNavigation/ServiceNavigation';
import Outlet from '@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Outlet/Outlet';
import Navigation from '@root/Application/d.Extranet/2_School/Tablet/LoginAndMaster/Navigation/Navigation';
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//Controls
import TopLeftMenu from '@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/TopLeftMenu/TopLeftMenu';

import Popup from "@root/Framework/Blocks/Popup/Popup";
import UserPreferenceClass from '@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/UserPreferenceClass/UserPreferenceClass';
import SchoolDropdown from '@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/SchoolDropdown/SchoolDropdown'
import * as RouterHelper from "@root/Framework/Services/ReactRouterHelper/ReactRouterHelper";
import DiskSpaceManagement from "@root/Framework/Controls/DiskSpaceManagement/DiskSpaceManagement";
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";

//import OnlineHelp from "@root/Framework/Controls/OnlineHelp/OnlineHelp";
import OnlineHelpView from '@root/Core/8_OnlineHelpView/OnlineHelpView/OnlineHelpView';

//Helper classes.
import Grid from "@root/Framework/Blocks/Grid/Grid";

//global imports
global.ExtranetBase_Hook = ExtranetBase_Hook;
global.Grid = Grid;

/**
 * @name Master
 * @summary master page for school and teacher
 * @param {any} props
 */
const Master = (props) => {

    const outletRef = useRef(null);

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Master_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Master", ["Master_ModuleProcessor"]: new Master_ModuleProcessor() };


    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Master_ModuleProcessor.Initialize(objContext, objContext.Master_ModuleProcessor);


    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Master_Hook, that contains all the custom hooks.
    * @returns null
    */
    Master_Hook.Initialize(objContext);

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

    var stlShowHideDiv = {};
    if (props.OutletData) {
        if (props.OutletData.ShowOutlet) {
            stlShowHideDiv = {
                display: 'none'
            };
        }
        else {
            stlShowHideDiv = {};
        }
    }

    function RouteToHome() {
        if (JConfiguration.ApplicationTypeId == "6") {
            ApplicationState.SetProperty("LoadNavigation", { NavigationName: "Teacher" });
        }
        if (JConfiguration.ApplicationTypeId == "1") {
            ApplicationState.SetProperty("LoadNavigation", { NavigationName: "TeacherStartPage" });
        }
        ApplicationState.SetProperty("CloseServiceNavigation", true);
    }

    const GetLogoPath = () => {
        let strLogoPath = "";
        if (objContext.props.JConfiguration) {
            strLogoPath = objContext.props.JConfiguration.WebDataPath + "Repo/Logo/" + objContext.props.JConfiguration.MainClientId + "/logo.svg";
            if (
                objContext.props.ClientUserDetails["TeacherDetails"]
                && objContext.props.ClientUserDetails["TeacherDetails"]["cIsExternalMember"] == "Y"
                && objContext.props.ClientUserDetails["License"]
                && objContext.props.ClientUserDetails["License"]["vLicenseJSON"]
                && JSON.parse(objContext.props.ClientUserDetails["License"]["vLicenseJSON"])["BasePackage"].toLowerCase() == "stellwerk"
            ) {
                strLogoPath = objContext.props.JConfiguration.WebDataPath + "Repo/Logo/Stellwerk_White.svg"
            }
        }
        return strLogoPath;
    };

    /**
     * @summary Gts the jsx to be returned by the component
     * @param {any} props
     */
    const GetContent = (props) => {

        let arrNavigation = DataRef(props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)["Data"];

        let arrNavigationData = null;
        let arrFilteredByExternalUserNavigation = null;
        let objProfileNavigation = null;
        let objTextResource = null;
        let arrFilteredSchoolData = [];
        let arrServiceNavigationData = null;
        let arrMainNavigationData = null;

        let arrLanguageData = DataRef(objContext.props.Object_Cockpit_Language)["Data"];
        let arrCountryData = DataRef(objContext.props.Object_Cockpit_Country)["Data"];
        let strMainClientId = objContext.props.ClientUserDetails.MainClientId;
        let strApplicationTypeId = objContext.props.ClientUserDetails.ApplicationTypeId
        let arrMainClientLanguageData = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage, "Object_Cockpit_MainClient_MainClientLanguage;iMainClientId;" + strMainClientId + ";iApplicationTypeId;" + strApplicationTypeId + ";cIsDeleted;N")["Data"];
        let arrFilteredLanguageData = objContext.Master_ModuleProcessor.GetFilteredLanguageData(arrLanguageData, arrMainClientLanguageData);
        let arrMainClientCountryData = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientCountry, "Object_Cockpit_MainClient_MainClientCountry;iMainClientId;" + strMainClientId + ";iApplicationTypeId;" + strApplicationTypeId + ";cIsDeleted;N")["Data"]
        let objCountryConfigured = arrCountryData != undefined ? arrCountryData.find(obj => obj["vCountryCultureInfo"] == props.JConfiguration.CountryCultureInfo) : {};

        if (arrNavigation !== undefined) {
            let objNavigation = DataRef(props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)["Data"][0];
            objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/LoginAndMaster/Master", props);
            let strApplicationName = Object.keys(objNavigation)[1];
            arrNavigationData = objNavigation[strApplicationName];
            objProfileNavigation = arrNavigationData.find(objNavigation => objNavigation.ParentNavigationId == -2);
            //Filtering Navigation data for Service Navigation and Main Navigation
            arrFilteredByExternalUserNavigation = objContext.Master_ModuleProcessor.GetFilterNavigationByExternalUser(objContext, arrNavigationData);
            arrMainNavigationData = arrFilteredByExternalUserNavigation.filter(x => x.ParentNavigationId !== -1 && x.ParentNavigationId !== -2);
            if (props.JConfiguration.ApplicationTypeId == "1" && props.ClientUserDetails.TeacherDetails["cIsSubjectExpertTeacherMarkedBySchool"] == "Y") {
                arrServiceNavigationData = arrFilteredByExternalUserNavigation.filter(x => x.ParentNavigationId == -1 && x["NavigationName"] != "Verwalten");
            } else {
                arrServiceNavigationData = arrFilteredByExternalUserNavigation.filter(x => x.ParentNavigationId == -1);
            }


            if (props.JConfiguration.ApplicationTypeId === "1") {
                arrFilteredSchoolData = objContext.Master_ModuleProcessor.GetFilteredSchool(props);
            }
        }
        let blnShowCultureAndLanguageDropdown = QueryString.GetQueryStringValue("AlwaysShowCultureAndLanguageDropdown") === "Y";

        if (typeof Performance !== "undefined") {
            //Performance.LogPerformance('Master_Render');
            //Performance.LogPerformance(props.JConfiguration.ApplicationName);
        }
        let strLogoPath = GetLogoPath();
        return (
            < div className="master-parent" >
                <div className="main-wrapper" >
                    <header className="wrap header" id="Header">
                        <div className="header-flex">
                            <div className="header-left">
                                <PerformanceProfiler ComponentName={"Master_TopLeftMenu_1"} JConfiguration={props.JConfiguration} >
                                    <TopLeftMenu
                                        objNavigation={{ ...objProfileNavigation }}
                                        ClientUserDetails={props.ClientUserDetails}
                                        JConfiguration={props.JConfiguration}
                                        TextResource={objTextResource}
                                    />
                                </PerformanceProfiler>
                                {
                                    arrFilteredSchoolData.length > 1
                                        ? <PerformanceProfiler ComponentName={"Master_SchoolDropdown"} JConfiguration={props.JConfiguration} >
                                            <SchoolDropdown arrSchoolData={arrFilteredSchoolData} />
                                        </PerformanceProfiler>
                                        : <React.Fragment />
                                }

                                {blnShowCultureAndLanguageDropdown && arrFilteredLanguageData.length > 1 &&
                                    <React.Fragment>
                                        <DropDown
                                            Id="iLanguageId"
                                            Data={{
                                                DropdownData: arrFilteredLanguageData,
                                                SelectedValue: QueryString.GetQueryStringValue("LanguageId") ? QueryString.GetQueryStringValue("LanguageId") : props.JConfiguration.InterfaceLanguageId
                                            }}
                                            Meta={{
                                                DependingTableName: "t_Framework_Language_Data",
                                                IsLanguageDependent: "Y",
                                                ValueColumn: "iFrameworkLanguageId",
                                                DisplayColumn: "vLanguageName",
                                            }}
                                            Resource={{
                                                Text: {
                                                    DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                                },
                                                JConfiguration: props.JConfiguration,
                                                SkinPath: props.JConfiguration.ExtranetSkinPath
                                            }}
                                            Events={{
                                                OnChangeEventHandler: (objChangeData) => objContext.Master_ModuleProcessor.HandleDropDownChange(objChangeData),
                                            }}
                                            ParentProps={{ ...props }}
                                        />

                                        <DropDown
                                            Id="iCountryId"
                                            Data={{
                                                DropdownData: arrCountryData,
                                                SelectedValue: QueryString.GetQueryStringValue("CountryId") ? QueryString.GetQueryStringValue("CountryId") : objCountryConfigured != undefined ? objCountryConfigured.iCountryId : 0
                                            }}
                                            Meta={{
                                                ValueColumn: "iCountryId",
                                                DisplayColumn: "vCountryCultureInfo",
                                            }}
                                            Resource={{
                                                Text: {
                                                    DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                                },
                                                JConfiguration: props.JConfiguration,
                                                SkinPath: props.JConfiguration.ExtranetSkinPath
                                            }}
                                            Callbacks={{
                                                CheckDeletedDropDownData: (objNode) => {
                                                    return objNode["cIsDeleted"] == "N" && arrMainClientCountryData.find(obj => obj["iCountryId"] == objNode["iCountryId"]) ? true : false
                                                }
                                            }}
                                            Events={{
                                                OnChangeEventHandler: (objChangeData) => objContext.Master_ModuleProcessor.HandleDropDownChange(objChangeData),
                                            }}
                                            ParentProps={{ ...props }}
                                        />
                                    </React.Fragment>
                                }
                            </div>

                            <div className="logo" onClick={() => { RouteToHome() }}>
                                <img src={strLogoPath} />
                            </div>
                            <div className="header-right">
                                {
                                    props.ClientUserDetails.ApplicationTypeId == "1" &&
                                    <PerformanceProfiler ComponentName={"Master_DiskSpaceManagement"} JConfiguration={props.JConfiguration} >
                                        <DiskSpaceManagement Data={{ MemoryConstant: objTextResource ? objTextResource.MemoryConstant : '' }} />
                                    </PerformanceProfiler>
                                }
                                <ServiceNavigation
                                    Id={"ExtranetServiceNavigation"}
                                    ClientUserDetails={props.ClientUserDetails}
                                    ComponentController={props.ComponentController}
                                    JConfiguration={props.JConfiguration}
                                    arrServiceNavigation={arrServiceNavigationData}
                                    arrAllNavigationData={arrNavigationData}
                                    IsServiceNavigation="Y" />
                            </div>
                        </div>
                        <div>
                            <MainNavigation
                                Id="ExtranetMainNavigation"
                                ClientUserDetails={props.ClientUserDetails}
                                ComponentController={props.ComponentController}
                                JConfiguration={props.JConfiguration}
                                arrNavigation={arrMainNavigationData}
                                arrAllNavigationData={arrFilteredByExternalUserNavigation}
                                IsServiceNavigation="N"
                                ShowHelp={props.ShowHelp}
                            />
                        </div>
                    </header>
                    <div className="tablet-nav-overlay">
                        <div className={state.blnShowTabletNavigation === true ? "tnav show" : "tnav"}>
                            <div className={state.blnShowTabletNavigation === true ? "tnav-trigger active" : "tnav-trigger"} onClick={() => { objContext.Master_ModuleProcessor.HandleTabletNavigation(objContext) }}>
                                <span className="bars bar1"></span>
                                <span className="bars bar2"></span>
                                <span className="bars bar3"></span>
                            </div>
                            {state.blnShowTabletNavigation || JConfiguration.strDeviceType === "Tablet" ? < div className="tnav-body">

                                <div className="top">
                                    <div className="profile-nav">
                                        <PerformanceProfiler ComponentName={"Master_TopLeftMenu2"} JConfiguration={props.JConfiguration} >
                                            <TopLeftMenu
                                                ClientUserDetails={props.ClientUserDetails}
                                                JConfiguration={props.JConfiguration}
                                                TextResource={objTextResource}
                                            />
                                        </PerformanceProfiler>
                                    </div>
                                    <ul className="main-nav">
                                        {
                                            <Navigation
                                                Id="ExtranetTabletMainNavigation"
                                                ClientUserDetails={props.ClientUserDetails}
                                                ComponentController={props.ComponentController}
                                                JConfiguration={props.JConfiguration}
                                                arrNavigation={arrMainNavigationData}
                                                arrAllNavigationData={arrFilteredByExternalUserNavigation}
                                                IsServiceNavigation="N"
                                                ShowHelp={props.ShowHelp}
                                            />
                                        }
                                    </ul>
                                </div>

                                <div className="bottom">
                                    <ul className="service-nav">
                                        {
                                            <Navigation
                                                Id="ExtranetTabletServiceNavigation"
                                                ClientUserDetails={props.ClientUserDetails}
                                                ComponentController={props.ComponentController}
                                                JConfiguration={props.JConfiguration}
                                                arrNavigation={arrFilteredByExternalUserNavigation}
                                                IsServiceNavigation="Y"
                                                ShowHelp={props.ShowHelp}
                                            />
                                        }
                                    </ul>

                                    <div className="bottom-logo">
                                        <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/logo.svg"} />
                                    </div>
                                </div>
                            </div> : <React.Fragment></React.Fragment>}
                        </div>
                    </div>
                    <section className="wrap content-wrap">
                        <div id="outlet" ref={outletRef} className="wrap">
                            <Outlet
                                ClientUserDetails={props.ClientUserDetails}
                                ComponentController={props.ComponentController}
                                JConfiguration={props.JConfiguration}
                                arrAllNavigationData={arrFilteredByExternalUserNavigation}
                                CleanupOutletComponent={CleanupOutletComponent}
                                OutletData={props.OutletData}
                                ShowHelp={props.ShowHelp}
                                OutletRef={outletRef}
                            />
                        </div>
                        <div className="outlet-window" >
                            <div className="wrap content-section bg">
                                {props.IsForServerRenderHtml ?
                                    objContext.Master_ModuleProcessor.LoadModuleForSSR(objContext)
                                    : <React.Fragment>
                                        {!JConfiguration.NoModule || JConfiguration.NoModule != "Y" ? <RouteLoader
                                            {...props}
                                            RouterPath={ApplicationState.GetProperty('RouterPath')}
                                            ClientUserDetails={props.ClientUserDetails}
                                            ComponentController={props.ComponentController}
                                            JConfiguration={props.JConfiguration} /> : <React.Fragment />
                                        }
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </section>
                    <PerformanceProfiler ComponentName={"Master_OnlineHelpView"} JConfiguration={props.JConfiguration} >
                        <OnlineHelpView {...props} />
                    </PerformanceProfiler>
                </div >
            </div >
        );

    }
    return (
        <React.Fragment>
            <React.Fragment>
                <PerformanceProfiler ComponentName={"PopupId"} JConfiguration={props.JConfiguration} >
                    <Popup Id="PopupId"
                        Meta={{ GroupName: "Popup" }}
                        Resource={{ SkinPath: props.JConfiguration.ExtranetSkinPath }}
                        ParentProps={props}
                    />
                </PerformanceProfiler>
                {/*
                <OnlineHelp 
                    Resource={{ "SkinPath": JConfiguration.ExtranetSkinPath }}
                />
                */}
            </React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(Master_ModuleProcessor.StoreMapList()))(Master);
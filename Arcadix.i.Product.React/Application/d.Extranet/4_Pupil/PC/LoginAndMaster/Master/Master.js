//React imports
import React, { useReducer, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//module specific imports
import * as Master_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Master/Master_Hook';
import Master_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Master/Master_ModuleProcessor';

//Common functionalities
import RouteLoader from '@root/Core/3_Route/RouteLoader';
import Navigation from '@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/Navigation';

//Controls
import TopLeftMenu from './TopLeftMenu/TopLeftMenu';
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";
import Animation from '@root/Framework/Controls/Animation/Animation';
import Popup from "@root/Framework/Blocks/Popup/Popup";
import SubNavigation from '../Navigation/SubNavigation/SubNavigation';
import OnlineHelpView from '@root/Core/8_OnlineHelpView/OnlineHelpView/OnlineHelpView';
import DiskSpaceManagement from "@root/Framework/Controls/DiskSpaceManagement/DiskSpaceManagement";

import Grid from "@root/Framework/Blocks/Grid/Grid";

//global imports
global.ExtranetBase_Hook = ExtranetBase_Hook;
global.Grid = Grid;


/**
 * @name Master
 * @summary pupil master page.
 * @param {any} props
 */
const Master = (props) => {

    const dropDownNavigationRef = useRef(null)

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
      * @name OnClickLogout
      * @summary Used to log out from the system.
      */
    const OnClickLogout = () => {
        objContext.Master_ModuleProcessor.OnClickLogout(objContext);
    };

    /**
     * @name DisableServiceNaivation
     * @summary disables the service navigation
     * */
    let DisableServiceNaivation = () => {
        if (dropDownNavigationRef) {
            dropDownNavigationRef.current.style.display = 'none';
            let counter = ApplicationState.GetProperty('CloseServiceNavigationFromMaster');
            counter = counter ? counter + 1 : 1;
            ApplicationState.SetProperty('CloseServiceNavigationFromMaster', counter)
        }
    }

    /**
     * @summary Initialization of disable service navigation method
     * */
    useEffect(() => {
        ApplicationState.SetProperty("FnDisableServiceNaivation", DisableServiceNaivation)
    }, [])

    /**
     * @name GetSchoolDropDown
     * @summary returns the school dropdown element.
     * @param {any} props
     */
    const GetSchoolDropDown = () => {
        let arrSchoolData = objContext.Master_ModuleProcessor.GetFilteredSchool(objContext);
        let objSchoolDropdownData = {
            DropdownData: arrSchoolData, //this is a mandatory prop
            SelectedValue: state.strSelectedSchoolId
        };

        if (arrSchoolData.length > 1) {
            return (
                <PerformanceProfiler ComponentName={"Master_SchoolDropdown"} JConfiguration={props.JConfiguration} >
                    <DropDown
                        Id="Master_SchoolDropdown"
                        Meta={objContext.Master_ModuleProcessor.GetMetaDataSchoolDropdown()}
                        Data={objSchoolDropdownData}
                        Resource={objContext.Master_ModuleProcessor.GetResourceDataDropdown()}
                        Events={objContext.Master_ModuleProcessor.GetEventsForSchoolDropdown(objContext)}
                        ParentProps={{ ...props }}
                    />
                </PerformanceProfiler>
            );
        } else {
            return (
                <React.Fragment />
            );
        }
    };

    /**
   * @name GetClassDropDown
   * @summary returns the Class dropdown element.
   * @param {any} props
   */
    const GetClassDropDown = () => {
        let arrClassData = objContext.Master_ModuleProcessor.GetFilteredClass(objContext);
        let objClassDropdownData = {
            DropdownData: arrClassData,
            SelectedValue: state.strSelectedClassId
        };

        if (arrClassData.length > 1) {
            return (
                <PerformanceProfiler ComponentName={"Master_ClassDropdown"} JConfiguration={props.JConfiguration} >
                    <DropDown
                        Id="Master_ClassDropdown"
                        Meta={objContext.Master_ModuleProcessor.GetMetaDataClassDropdown()}
                        Data={objClassDropdownData}
                        Resource={objContext.Master_ModuleProcessor.GetResourceDataDropdown()}
                        Events={objContext.Master_ModuleProcessor.GetEventsForClassDropdown(objContext)}
                        ParentProps={{ ...props }}
                    />
                </PerformanceProfiler>
            );
        } else {
            return (
                <React.Fragment />
            );
        }
    };

    /**
     * @name GetClassAndSchoolDropdown
     * @summary Gets School And Class Dropdown
     * */
    const GetClassAndSchoolDropdown = () => {
        return (
            global.ClientUserDetails != undefined && global.ClientUserDetails.PupilDetails.t_TestDrive_Member_Pupil_ExternalSourceMapping.length > 0 ?
                <div>
                    <div className="dropdown-wrapper">
                        {
                            GetSchoolDropDown()
                        }
                    </div>
                    <div className="dropdown-wrapper">
                        {
                            GetClassDropDown()
                        }
                    </div>
                </div>
                : <React.Fragment />
        );
    }

    const GetLogoPath = () => {
        let strLogoPath = "";
        if (objContext.props.JConfiguration) {
            strLogoPath = objContext.props.JConfiguration.WebDataPath + "Repo/Logo/" + objContext.props.JConfiguration.MainClientId + "/logo_white.svg";
            if (
                objContext.props.ClientUserDetails["PupilDetails"]["cIsExternalMember"] == "Y"
                && objContext.props.ClientUserDetails["License"]
                && objContext.props.ClientUserDetails["License"]["vLicenseJSON"]
                && JSON.parse(objContext.props.ClientUserDetails["License"]["vLicenseJSON"])["BasePackage"].toLowerCase() == "stellwerk"
            ) {
                strLogoPath = objContext.props.JConfiguration.WebDataPath + "Repo/Logo/Stellwerk_Black.svg"
            }
        }
        return strLogoPath;
    };

    /**
     * @name GetContent
     * @summary returns the jsx element for pupil master page.
     * @param {any} props
     */
    const GetContent = (props) => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/LoginAndMaster/Master", props);

        var route = '';
        try {
            route = window.location.pathname.split('/')[2];
        }
        catch (ex) {
        }
        let objNavigation = {};
        if (DataRef(props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)) {
            objNavigation = DataRef(props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)["Data"][0];
        }
        let strApplicationName = "";
        if (Object.keys(objNavigation).length > 0) {
            strApplicationName = Object.keys(objNavigation)[1];
        }
        let arrNavigationData = [];
        if (objNavigation[strApplicationName]) {
            arrNavigationData = objNavigation[strApplicationName];
        }

        let arrMainNavigationData = arrNavigationData.filter(x => x.ParentNavigationId != -1 && x.ParentNavigationId != -2);
        let objUserPreference = ApplicationState.GetProperty("ProfileBackGroundImagePath", objUserPreference);
        let objEvents = { Resource: objTextResource, Events: OnClickLogout, Navigation: objNavigation };
        if (typeof Performance !== "undefined")
            Performance.LogPerformance('Master_Render');
        let RouterPathNavName = ApplicationState.GetProperty('RouterPathNavName');
        let NavigationName = RouterPathNavName ? RouterPathNavName.NavigationName : '';
        let strBackGround = "rgb(57, 190, 73)";
        if (NavigationName == "LernProfil")
            strBackGround = "rgb(255, 74, 117)"
        if (NavigationName == "PupilNews" || NavigationName == "PupilDocument")
            strBackGround = "rgb(255, 155, 79)"
        //if (NavigationName == "PupilProfile")
        //    NavigationName = undefined;


        let NavigationClassName = "home-page";
        if (NavigationName != undefined)
            NavigationClassName = NavigationName.toLowerCase();

        let strLogoPath = GetLogoPath();

        let blnShowCultureAndLanguageDropdown = QueryString.GetQueryStringValue("AlwaysShowCultureAndLanguageDropdown") === "Y";
        return (
            <div className="pupil-wrapper">

                <div className={"pupil-master " + NavigationClassName} style={{
                    // background: `url(${props.JConfiguration.ExtranetSkinPath}/Images/Background/bg2.jpg) no-repeat`,
                    backgroundSize: "cover",
                    background: `url(${props.ProfileBackGroundImagePath ? props.ProfileBackGroundImagePath.BackgroundThemePath : ''}) no-repeat`,
                }}>
                    {/*<div className="pupil-master">*/}
                    <div className="pupil-header-padd" id="PupilHeader">
                        <div className="pupil-header">
                            <div className="pupil-header-flex">

                                <div className="top-left-dropdown">
                                    <PerformanceProfiler ComponentName={"Master_TopLeftMenu"} JConfiguration={props.JConfiguration} >
                                        <TopLeftMenu
                                            Id={"Master_TopLeftMenu"}
                                            objEvents={objEvents}
                                            ClientUserDetails={props.ClientUserDetails}
                                            JConfiguration={props.JConfiguration}
                                            {...props}
                                        />
                                    </PerformanceProfiler>

                                    {
                                        GetClassAndSchoolDropdown()
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
                                                        DefaultOptionText: "PleaseChoose", //Localization.TextFormatter(objTextResource, "PleaseChoose")
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
                                                    SelectedValue: QueryString.GetQueryStringValue("CountryId") ? QueryString.GetQueryStringValue("CountryId") : objCountryConfigured.iCountryId
                                                }}
                                                Meta={{
                                                    ValueColumn: "iCountryId",
                                                    DisplayColumn: "vCountryCultureInfo",
                                                }}
                                                Resource={{
                                                    Text: {
                                                        DefaultOptionText: "PleaseChoose", //Localization.TextFormatter(objTextResource, "PleaseChoose")
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
                                <div
                                    onClick={() => {
                                        let iCounter = ApplicationState.GetProperty("HomeButtonClicked") ? ApplicationState.GetProperty("HomeButtonClicked") : 0;
                                        ApplicationState.SetProperty("HomeButtonClicked", ++iCounter);
                                        ApplicationState.SetProperty("IsPupilProfile", undefined);
                                        ApplicationState.SetProperty("NavigatePupilNavigations" + "ExtranetPupilNavigation", { URL: 'Home', Id: 'ExtranetPupilNavigation' });
                                    }}
                                    className="logo">
                                    {
                                        NavigationName != undefined && NavigationName != "PupilProfile"
                                            ? <div
                                                className="module-title"
                                                style={{ display: "block", color: strBackGround }}>
                                                {RouterPathNavName != undefined ? RouterPathNavName.NavigationTitle : ''}
                                            </div>
                                            : <div>
                                                <img src={strLogoPath} />
                                            </div>
                                    }
                                </div>
                                <div className="right-column">
                                    {<DiskSpaceManagement Data={{ MemoryConstant: objTextResource ? objTextResource.MemoryConstant : '' }} />}
                                    <Navigation
                                        Id={"ExtranetPupilNavigation"}
                                        DropDownNavigationRef={dropDownNavigationRef}
                                        ClientUserDetails={props.ClientUserDetails}
                                        ComponentController={props.ComponentController}
                                        JConfiguration={props.JConfiguration}
                                        ParentName="Header"
                                        ShowNavigations={false}
                                        IsForServerRenderHtml={props.IsForServerRenderHtml}
                                        arrMainNavigationData={arrNavigationData} />
                                </div>
                            </div>
                            <div className="pupil-secondary-navigation" id="dropDownNavigation" ref={dropDownNavigationRef} style={{ display: 'none' }}>
                                <Navigation
                                    Id={"ExtranetPupilSecondaryNavigation"}
                                    DropDownNavigationRef={dropDownNavigationRef}
                                    ClientUserDetails={props.ClientUserDetails}
                                    ComponentController={props.ComponentController}
                                    JConfiguration={props.JConfiguration}
                                    ParentName="Dropdown"
                                    ShowNavigations={true}
                                    arrMainNavigationData={arrNavigationData}
                                    IsForServerRenderHtml={props.IsForServerRenderHtml}
                                    SecondaryNav={true} />

                            </div>
                        </div>

                    </div>
                    <div className="pupil-body">
                        <SubNavigation
                            ClientUserDetails={props.ClientUserDetails}
                            ComponentController={props.ComponentController}
                            JConfiguration={props.JConfiguration}
                            arrMainNavigationData={arrNavigationData}
                        />
                        <div className={(route !== "Home") ? "pupil-home-page" : ""}>

                            {
                                props.IsForServerRenderHtml ?
                                objContext.Master_ModuleProcessor.LoadModuleForSSR(objContext) :
                                <React.Fragment>
                                    <RouteLoader
                                        {...props}
                                        DropDownNavigationRef={dropDownNavigationRef}
                                        RouterPath={RouterPathNavName ? RouterPathNavName.RouterPath : ''}
                                        ClientUserDetails={props.ClientUserDetails}
                                        ComponentController={props.ComponentController}
                                        JConfiguration={props.JConfiguration} />
                                </React.Fragment>
                            }
                        </div>
                        <div className="wrap bottom-spacing" id="bottomSpacing" />
                    </div>
                    <PerformanceProfiler ComponentName={"Master_AnimationId"} JConfiguration={props.JConfiguration} >
                        <Animation
                            Resource={{ "ImagePath": props.JConfiguration.ExtranetSkinPath + '/Images/Common/Icons/Clock.gif' }}
                            Meta={{ "ShowAnimationImage": true }}
                            Id="Master_AnimationId"
                        />
                    </PerformanceProfiler>
                    <PerformanceProfiler ComponentName={"Master_OnlineHelpView"} JConfiguration={props.JConfiguration} >
                        <OnlineHelpView Id="Master_OnlineHelpView" {...props} />
                    </PerformanceProfiler>
                    <PerformanceProfiler ComponentName={"Master_PopupId"} JConfiguration={props.JConfiguration} >
                        <Popup Id="Master_PopupId"
                            Meta={{ GroupName: "Popup" }}
                            Resource={{ SkinPath: props.JConfiguration.ExtranetSkinPath }}
                            ParentProps={props}
                        />
                    </PerformanceProfiler>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <React.Fragment />}
        </React.Fragment>
    );
}

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(Master_ModuleProcessor.StoreMapList()))(Master);




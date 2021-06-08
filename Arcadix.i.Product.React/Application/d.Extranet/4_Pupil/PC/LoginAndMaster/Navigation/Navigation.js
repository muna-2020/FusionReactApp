//React imports
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Component specific modules.
import Object_Extranet_Shared_DiskSpaceManagement from "@shared/Object/d.Extranet/5_Shared/DiskSpaceManagement/DiskSpaceManagement";
import ApplicationState from '../../../../../../../Arcadix.h.Product.BusinessLogic/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixCacheData from '../../../../../../../Arcadix.h.Product.BusinessLogic/Framework/DataService/ArcadixCacheData/ArcadixCacheData';

//Inline Images import
import imgHome from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/Home.svg?inline';
import imgHamburger from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/hamburger.svg?inline';
import imgCrossWhite from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/cross_smallBrown.svg?inline';

import imgPupilLearningTest from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/worktest.svg?inline';
import imgLearningJournal from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/learningjournal.svg?inline';
import imgLearningJournalList from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/learningjournallist.svg?inline';
import imgLernProfile from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/flowPink.svg?inline';
import imgNews from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/news.svg?inline';
import imgDocument from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/document.svg?inline';
import imgDockStation from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/dockstation.svg?inline';
import imgJobSkills from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/jobskills.svg?inline';
import imgTest from '@inlineimage/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Navigation/Test.svg?inline';

/**
 * @name Navigation
 * @summary Returns the Navigations used in Pupil.
 * @param {any} props
 */
const Navigation = (props) => {

    /**
     * @name open
     * @summary 
     * */
    const [open, SetOpen] = useState(false);

    const [objCount, SetCount] = useState({ DocumentCount: 0, NewsCount: 0 })

    //let DisableServiceNaivation = () => {
    //    if (props.DropDownNavigationRef) {
    //        var dropDownNavigation = props.DropDownNavigationRef.current;
    //        dropDownNavigation.style.display = 'none';
    //        SetOpen(false);
    //    }
    //    SetOpen(false);
    //}

    useEffect(() => {
        if (props.CloseServiceNavigationFromMaster) {
            SetOpen(false);
        }
    }, [props.CloseServiceNavigationFromMaster])

    /*
     * To Refresh Navigations
     */
    useEffect(() => {
        //Call get Navigations     
        if (props.RefreshNavigations != undefined) {
            let arrNavigationParams = [
                {
                    "URL": "API/Object/Framework/Services/ExtranetNavigation",
                    "Params": {
                        "SearchQuery": {
                            "must": [
                                {
                                    "match": {
                                        "ApplicationType": props.JConfiguration.ApplicationTypeId
                                    }
                                }
                            ]
                        }
                    },
                    "MethodType": "Get",
                    "UseFullName": true
                }];
            ArcadixFetchData.Execute(arrNavigationParams, (objNavigationData) => {
                console.log(objNavigationData);
                let strEnityKey = "Object_Framework_Services_ExtranetNavigation;ApplicationType;16";
                let objData = objNavigationData.Object_Framework_Services_ExtranetNavigation[strEnityKey].Data;
                let objNavigationDataParams = {
                    Filter: strEnityKey,
                    Value: {
                        Data: objData,
                        TimeStamp: "",
                        PrimaryKeyName: "ApplicationType",
                        Count: objData.length
                    }
                };
                ArcadixCacheData.EditData("Object_Framework_Services_ExtranetNavigation", objNavigationDataParams)
            });
        }
    }, [props.RefreshNavigations])

    //to set the count for news and document.
    useEffect(() => {
        if (props.RefreshDocumentData != undefined || props.RefreshNewsData != undefined) {
            let objParams = {
                ["uSchoolId"]: ApplicationState.GetProperty("SelectedSchoolId"),//ClientUserDetails.PupilDetails.t_TestDrive_Member_School_Pupil.find(objSchool => objSchool["cIsDeleted"] == "N")["uSchoolId"],
                ["uUserId"]: ClientUserDetails.UserId,
                ["uClassId"]: ApplicationState.GetProperty("SelectedClassId")//ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(objClass => objClass["cIsDeleted"] == "N")["uClassId"]
            };
            Object_Extranet_Shared_DiskSpaceManagement.GetRealTimeInfo(objParams, (objRes) => {
                let objData = objRes["Arcadix_Extranet_Shared_DiskSpaceManagement"]["Data"][0];
                SetCount(objData);
                console.log("data of real tiome ", objRes);
            });
        }
    }, [props.RefreshDocumentData, props.RefreshNewsData]);

    useEffect(() => {
        let blnSetOpenToDefault = ApplicationState.GetProperty("HomeButtonClicked");
        if (blnSetOpenToDefault) {
            SetOpen(false);
        }
    }, [props.HomeButtonClicked])

    /**
     * @name GetLicensePackage
     * @summary Check for the license object and returns the base package
     * @param {any} objLicense Pupil License Object.
     */
    const GetLicensePackage = (objLicense) => {
        let strPackage = "";
        if (objLicense != null && objLicense["vLicenseJSON"] != null) {
            let objLicenseJSON = JSON.parse(objLicense["vLicenseJSON"]);
            if (objLicenseJSON != undefined
                && objLicenseJSON["BasePackage"] != undefined) {
                strPackage = objLicenseJSON["BasePackage"];
            }
        }
        return strPackage;
    }

    /**
     * @name GetMainNavigationList
     * @summary returns the main navigation list.
     * @param {any} props
     */
    const GetMainNavigationList = (props) => {
        var mainNavList = [];
        let arrMainNavigationData = props.arrMainNavigationData.filter(x => x.ParentNavigationId == 0);
        let RouterPathNavName = ApplicationState.GetProperty('RouterPathNavName');

        mainNavList = arrMainNavigationData.map((navItem, index) => {
            if (navItem.IsOpenNewWindow === 'Y') {
                let GetUrl = () => {
                    let strUrl = navItem["URL"]
                    if (navItem.NavigationName.toLowerCase().includes("test")) {
                        if (props.ClientUserDetails != undefined) {
                            let objPupilData = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(ppl => ppl["cIsDeleted"] == "N");
                            let objSchoolObject = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_School_Pupil[0];
                            strUrl = props.JConfiguration.BaseUrl + "StartTestExecution/Index?"
                                + "PupilId=" + props.ClientUserDetails.UserId
                                + "&ClassId=" + objPupilData.uClassId
                                + "&TeacherId=" + objPupilData.uTeacherId
                                + "&SchoolId=" + objSchoolObject["uSchoolId"]
                                + "&StateId=" + objSchoolObject["iStateId"]
                                + "&strPackage=" + GetLicensePackage(props.ClientUserDetails["License"])
                                + "&strTestId=" + navItem["uTestId"];
                        }
                    }
                    if (navItem.NavigationName === "JobSkillsPlus") {
                        if (props.ClientUserDetails != undefined) {
                            strUrl = props.JConfiguration.BaseUrl + "OpenJobSkills/Index?PupilId=" + props.ClientUserDetails.UserId
                        }
                    }

                    return strUrl;
                }
                let OnClickTestNavigation = () => {
                    if (navItem.cIsLicenseNavigation == "Y") {
                        if (navItem.cIsActive == "Y") {
                            window.open(GetUrl());
                        } else {
                            let ShowTestMessage = {
                                ShowNotActiveTestMessage: navItem.cIsEssayTest != "Y",
                                ShowEssayTestMessage: navItem.cIsEssayTest == "Y"
                            };
                            ApplicationState.SetProperty("ShowTestMessage", ShowTestMessage)
                        }
                    } else {
                        window.open(GetUrl());
                    }
                }

                return (
                    <li id={navItem.NavigationName}>
                        <a onClick={() => { OnClickTestNavigation() }}>
                            <img src={GetNavIcon(navItem.NavigationName)}
                                title={navItem.NavigationText[props.JConfiguration.LanguageCultureInfo]} />
                            {props.SecondaryNav === true ? <React.Fragment><span>  {navItem.NavigationText[props.JConfiguration.LanguageCultureInfo]} </span>
                            </React.Fragment> : ""}
                        </a>
                    </li>)
            } else {

                return (
                    <li id={navItem.NavigationName} onClick={() => { OnMainNavClick(props, navItem) }} className={RouterPathNavName && RouterPathNavName.NavigationName == navItem.NavigationName ? "active" : ""} >
                        <img src={GetNavIcon(navItem.NavigationName)}
                            title={navItem.NavigationText[props.JConfiguration.LanguageCultureInfo]} />
                        {props.SecondaryNav === true ? <React.Fragment><span> {navItem.NavigationText[props.JConfiguration.LanguageCultureInfo]} </span>
                            {navItem.NavigationName === "WorkTest" ? <div className="alerts"><span className="Notifications">2</span> </div> : ""}
                            {navItem.NavigationName === "LearningJournalList" ?
                                <div className="alerts"><span className="Notifications">2</span><span className="new-message">1</span> </div> : ""}
                            {navItem.NavigationName === "PupilNews" ? <div className="alerts"><span className="new-message">{objCount.NewsCount}</span> </div> : ""}
                            {navItem.NavigationName === "PupilDocument" ? <div className="alerts"><span className="new-message">{objCount.DocumentCount}</span> </div> : ""}
                        </React.Fragment> : ""}

                    </li>)
            }
        });
        return mainNavList;
    }

    //first load. should redirect to home page
    useEffect(() => {
        if (!props.IsForServerRenderHtml) {
            var browserUrl = window.location.pathname;
            var arrBrowserUrl = browserUrl.split("/");
            if (arrBrowserUrl.length <= 2) {
                const objHomeNav = { URL: 'Home' }
                OnMainNavClick(props, objHomeNav);
            }
            else {
                var strNavFromUrl = arrBrowserUrl[2];
                var objNavigation = (strNavFromUrl !== 'Home' && strNavFromUrl !== "") ? props.arrMainNavigationData.filter(x => x.NavigationName == strNavFromUrl)[0] : { URL: 'Home' };
                (strNavFromUrl !== 'Home') ? OnMainNavClick(props, objNavigation) : "";
            }
        }
        ApplicationState.SetProperty("PupilSelectedNavigationName", 'Home');
    }, []);

    //on props change call the OnMainNavClick
    useEffect(() => {
        if (props["NavigatePupilNavigations" + props.Id] && props["NavigatePupilNavigations" + props.Id].Id === props.Id) {
            OnMainNavClick(props, props["NavigatePupilNavigations" + props.Id]);
            ApplicationState.SetProperty("NavigatePupilNavigations" + props.Id, {});
        }
    }, [props["NavigatePupilNavigations" + props.Id]]);

    /**
    * @name OnMainNavClick
    * @summary Onclick of navigation navigates to respeective module.
    * @param {any} props
    * @param {any} navItem
    */
    const OnMainNavClick = (props, navItem) => {
        let arrSubNavigation = props.arrMainNavigationData.filter(x => x.ParentNavigationId == navItem.NavigationId)//setSelectedNavigationName(navItem.NavigationName);
        ApplicationState.SetProperty("PupilSelectedNavigationName", navItem.NavigationName);
        if (arrSubNavigation && arrSubNavigation.length > 0) {

            ApplicationState.SetProperty("SubNavigationList", arrSubNavigation);
        } else {
            ApplicationState.SetProperty("SubNavigationList", arrSubNavigation);
            if (navItem.IsOpenNewWindow !== 'Y') {
                ApplicationState.SetProperty("blnShowAnimation", true);
                let ObjData = ApplicationState.GetProperty('NavigationFromHome');
                if (ObjData != "Y" && props.IsFromHome) {
                    ApplicationState.SetProperty('NavigationFromHome', "Y");
                }
                var strFullQueryString = window.location.search;
                var strRouterPath = "/" + navItem.URL;// + props.JConfiguration.VirtualDirName.split('/')[1];
                var pushUrl = strRouterPath + "/" + navItem.URL + strFullQueryString;
                if (navItem.URL != "Home") {
                    strRouterPath = "";
                    pushUrl = "/" + navItem.URL + strFullQueryString;
                }
                let RouterPathNavName = {
                    RouterPath: strRouterPath,
                    NavigationName: navItem.NavigationName,
                    NavigationTitle: navItem.NavigationText ? navItem.NavigationText[props.JConfiguration.LanguageCultureInfo] : ''
                }
                ApplicationState.SetProperty('RouterPathNavName', RouterPathNavName);
                var strFullQueryString = window.location.search;
                props.history.push({ pathname: pushUrl });
            }
            Performance.Reset();
        }
    }

    //function ShowOnlineHelp() {
    //    let strSelectedNavigationName = ApplicationState.GetProperty("PupilSelectedNavigationName");
    //    let objOnlineHelpObject = {
    //        blnShowOnlineHelp: true,
    //        OnlineHelpGroupKey: strSelectedNavigationName,
    //        OnlineHelpKey: ""
    //    };
    //    ApplicationState.SetProperty("OnlineHelpGroupObject", objOnlineHelpObject);
    //}

    let GetNavIcon = (strNavigationName) => {
        let imgNavigation = null;
        switch (strNavigationName) {
            case 'PupilLearningTest':
                imgNavigation = imgPupilLearningTest;
                break;
            case 'PupilToPlan':
                imgNavigation = imgLearningJournal;
                break;
            case 'PupilThink':
                imgNavigation = imgLearningJournalList;
                break;
            case 'LearnProfile':
                imgNavigation = imgLernProfile;
                break;
            case 'TEST':
                imgNavigation = imgTest;
                break;
            case 'PupilNews':
                imgNavigation = imgNews;
                break;
            case 'PupilDocument':
                imgNavigation = imgDocument;
                break;
            case 'Dockstation':
                imgNavigation = imgDockStation;
                break;
            case 'JobSkillsPlus':
                imgNavigation = imgJobSkills;
                break;

        }
        return imgNavigation;

    }

    /**
     * @name GetContent
     * @summary returns the JSX of navigations.
     * */
    function GetContent() {
        var homeStyle = {};
        var openStyle = {};
        var strRoute = props.location.pathname.split('/')[2];
        var route = strRoute ? strRoute.split('?')[0] : "";
        if (props.ParentName === 'Header' && route !== 'Home') {
            homeStyle = {}
            openStyle = {}
        }
        else {
            homeStyle = { display: 'none' }
            openStyle = { display: 'none' }
        }
        let strSkinPath = props.JConfiguration.ExtranetSkinPath;
        let strSelectedNavigationName = ApplicationState.GetProperty("PupilSelectedNavigationName");

        return (
            <ul className="pupil-navigation">
                {props.IsPupilProfile == true ? <React.Fragment /> : <React.Fragment>
                    {props.ShowNavigations == true ? GetMainNavigationList(props) : null}
                    {/*strSelectedNavigationName && strSelectedNavigationName != "Home" ?
                        <li className="pupil-help-icon">
                            <div className="pupil-icon-trigger">
                                <img
                                    onClick={() => { ShowOnlineHelp(); }}
                                    src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/exclamation_mark.svg"} alt=""
                                />
                            </div>
                        </li> : <React.Fragment />*/}
                    <li style={homeStyle} onClick={(event) => { event.stopPropagation(); OnMainNavClick(props, { URL: 'Home' }) }}>
                        <img src={imgHome} alt="" title="Home" />
                    </li>
                    <li id="openCloseButton" style={openStyle} className={"navItem " + (open ? "close" : "open")}>
                        <img src={!open ? imgHamburger : imgCrossWhite}
                            title="Open Menu" alt="" onClick={(event) => {
                                event.preventDefault();
                                //var dropDownNavigation = document.getElementById('dropDownNavigation');
                                var dropDownNavigation = props.DropDownNavigationRef.current;
                                dropDownNavigation.style.display = dropDownNavigation.style.display == 'none' ? 'block' : 'none';
                                SetOpen(!open);
                                window.dispatchEvent(new Event('resize'));
                            }}
                        />
                    </li>
                </React.Fragment>
                }
            </ul>
        );
    }
    return GetContent();
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
        { "StoreKey": "ApplicationState", "DataKey": "NavigatePupilNavigations" + objOwnProps["Id"] },
        { "StoreKey": "ApplicationState", "DataKey": "RefreshDocumentData" },
        { "StoreKey": "ApplicationState", "DataKey": "RefreshNewsData" },
        { "StoreKey": "ApplicationState", "DataKey": "IsPupilProfile" },
        { "StoreKey": "ApplicationState", "DataKey": "RefreshNavigations" },
        { "StoreKey": "ApplicationState", "DataKey": "HomeButtonClicked" },
        { "StoreKey": "ApplicationState", "DataKey": "CloseServiceNavigationFromMaster" }

    ]);
};

export default connect(MapStateToProps)(withRouter(Navigation));

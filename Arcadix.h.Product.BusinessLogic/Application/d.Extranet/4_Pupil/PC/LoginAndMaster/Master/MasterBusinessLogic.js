import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
//import { schoolDocumentState } from '../../../2_School/Modules/SchoolDocument/SchoolDocumentBusinessLogic';

/**
 * Map StateToProps Function
 * @param {any} state default state
 * Maps OutletData, navigation, textresource data
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            OutletData: state.ApplicationState.OutletData,
            ActiveMainNavigationId: state.ApplicationState.ActiveMainNavigationId,
            frameworknavigation: DataRef(state.Entity, "Object_Framework_Services_FrameworkNavigation", true),
            textresource: DataRef(state.Entity, "Object_Framework_Services_TextResource", true),
            school: DataRef(state.Entity, "school", true)
        };
    }
    else {
        return {};
    }
}

/**
 * Default InitialDataParams Method
 * @param {any} JConfiguration Jconfiguration
 * @param {any} props Props for thsi entity
 * Forms queries for getting intial data for navigation and textresources
 */
export function InitialDataParams(props) {
    var objParams = {
        //"ForeignKeyFilter": {
        //    "iApplicationTypeId": props.JConfiguration.ApplicationTypeId
        //},
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "ApplicationType": props.JConfiguration.ApplicationTypeId
                    }
                }
            ]
        }
    };
    var objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": props.JConfiguration.LanguageCultureInfo + "/" + props.JConfiguration.ApplicationFolderName.replace("Application/","") + "/LoginAndMaster/Master"
                    }
                }
            ]
        }
    };
    
    var arrDataRequest = [
        {
            "URL": "API/Object/Framework/Services/FrameworkNavigation",
            "Params": objParams,
            "MethodType": "Get",
            "UseFullName": true
        },
        {
            "URL": "API/Object/Framework/Services/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true,
            "UseFullName": true
        }
    ];

        let arrSchoolIdShouldKeys = props
            .ClientUserDetails
            .PupilDetails
            .t_TestDrive_Member_School_Pupil
            .filter(x => x["cIsDeleted"] == "N")
            .map(x => { return { match: { uSchoolId: x.uSchoolId } } });
        if (arrSchoolIdShouldKeys.length > 1) {
            arrDataRequest.push({
                URL: "Object/Extranet/School",
                Params: {
                    SearchQuery: {
                        must: [
                            {
                                match: {
                                    cIsDeleted: "N"
                                }
                            }
                        ],
                        bool: {
                            should: arrSchoolIdShouldKeys
                        }
                    }
                }
            });
        }
    

    return { "DataCalls": arrDataRequest };
}

/**
 * @summary Makes Data Call from Initial Params Method
 * This method will make the Execute api call 
 * @param {any} props
 */
export function DataCall(props, strToggleExecute = "FetchAndCacheExecute") {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    switch (strToggleExecute) {
        case 'FetchAndCacheExecute':
            objArcadixFetchAndCacheData.Execute(InitialDataParams(props).DataCalls, function (objReturn) {
                //Do something       
            });
            break;
        case 'FetchExecuteCustomForLogout'://For log out
            ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/Logout", "POST", {})
                .then(response => response.json())
                .then(objResponse => {
                    let strBaseUrl = props.JConfiguration.BaseUrl.substring(0, props.JConfiguration.BaseUrl.length - 1);
                    window.location = strBaseUrl;
                });
            break;
    }
}

/**
 * @summary  Custom hook which will carry out the data call portion and take care of re-rendering on prop/state changes
 * @param {any} props
 */
export function useDataLoader(props) {
    const getRequiredData = () => {       
        DataCall(props);
    };
    useLayoutEffect(getRequiredData, []);
}

/**
 * @summary Custom hook which will check if all the data is loaded
 * @param {any} props
 * @param {any} state
 * @param {any} dispatch
 */
export function useDataLoaded(props, state, dispatch) {
    let arrSchoolIdShouldKeys = props
        .ClientUserDetails
        .PupilDetails
        .t_TestDrive_Member_School_Pupil
        .filter(x => x["cIsDeleted"] == "N")
        .map(x => { return { match: { uSchoolId: x.uSchoolId } } });
    useEffect(() => {

        if (!state.isLoadComplete &&
            //DataRef(props.frameworknavigation, "frameworknavigation;iapplicationtypeid;16;itargetdeviceid;7") &&
            DataRef(props.frameworknavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId) &&
            DataRef(props.textresource, "Object_Framework_Services_TextResource;Id;de/" + props.JConfiguration.ApplicationFolderName.replace("Application/","") + "/LoginAndMaster/Master") &&
            (arrSchoolIdShouldKeys.length <= 1 || DataRef(props.school, "school;cisdeleted;n"))
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);           
            dispatch({ type: "DATA_LOAD_COMPLETE", payload: true })
        }
        else {
            console.log("data is loading")
        }
    },
        [
            props.frameworknavigation,
            props.textresource,
            props.school
        ]);
}


/**
 * @summary reducer to maintain component state
 * @param {any} state
 * @param {any} action
 */
export function reducer(state, action) {
    switch (action.type) {
        case 'DATA_LOAD_COMPLETE': {
            return { ...state, ["isLoadComplete"]: action.payload }
        }
        case 'UPDATE_SCHOOLID': {
            return {
                ...state,
                ["strSelectedSchoolId"]: action.payload
            }
        }
    }
}

/**
 * @summary Gets Events for Top Left Dropdown
 * @param {any} props 
 */
export function GetTopLeftDropdownEvents(props, objEventHandlers) {

    const objTextResourceData = DataRef(props.textresource, "Object_Framework_Services_TextResource;Id;de/" + props.JConfiguration.ApplicationFolderName.replace("Application/","") + "/LoginAndMaster/Master").Data[0].Master;


    const arrEvents = [
        { OptionText: "Profil", EventHandler: objEventHandlers.OnProfileServiceNavigationClick },
        { OptionText: "LogOut", EventHandler: objEventHandlers.OnLogoutClick }
    ];
    return arrEvents;
}

export function HandleSchoolChange(objContext, objItem) {
    objContext.dispatch({ type: "strSelectedSchoolId", payload: objItem.SchoolId });
}

export function GetFilteredSchool(props) {
    let arrSchools = props
        .ClientUserDetails
        .PupilDetails
        .t_TestDrive_Member_School_Pupil
        .filter(x => x["cIsDeleted"] == "N");
    let arrFilteredSchoolData = [];
    if (arrSchools.length > 1) {
        let arrSchoolData = DataRef(props.arrTeacherSchoolData, "school;cisdeleted;n")["Data"];
        arrFilteredSchoolData = arrSchoolData
            .map(x => {
                return {
                    SchoolId: x.uSchoolId,
                    SchoolName: x.vFirstName + " " + x.vName
                }
            });
    }
    return arrFilteredSchoolData;
}
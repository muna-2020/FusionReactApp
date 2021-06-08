import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        Logger.Log("Mapping");
        return {
            subject: DataRef(state.Entity, "subject", true),
            textresource: DataRef(state.Entity, "textresource", true),
            extranettest: DataRef(state.Entity, "extranettest", true),
            testloginandresult: DataRef(state.Entity, "testloginandresult", true),
            clientsettings: DataRef(state.Entity, "clientsettings", true),
            cycle: DataRef(state.Entity, "cycle", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        return {};
    }
}

/**
 * it returns logged in pupil's classId
 * @param {any} props
 */
function GetClassId(props) {
    let objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(cls => cls["cIsDeleted"] == "N");
    return objClass["uClassId"];
}

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props) {
    let strClassId = GetClassId(props);
    let strCycleTypeId = GetCycleTypeId();
    let objResourceParams = {
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/WorkTest"
                    }
                }
            ]
        }
    };

    let objSubjectsParams = {
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
    };

    let objExtranetTestParams = {
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "uClassId": strClassId
                    }
                },
                {
                    "match": {
                        "uPupilId": props.ClientUserDetails.UserId
                    }
                },
                {
                    "match": {
                        "iCycleTypeId": strCycleTypeId
                    }
                },
                //{
                //    range: {
                //        dtCreatedOn: {
                //            "gte": "15.10.2015",
                //            "lte": "24.11.2019",
                //           "format": "dd.MM.yyyy"
                //        }
                //    }
                //}
            ]
        },
        iOffSet: 0,
        iInterval: 6000,
        cIsFilterBasedOnDate: 'N'
    };

    let objTestLoginAndResult = {
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "iCycleTypeId": strCycleTypeId
                    }
                },
                {
                    "match": {
                        "uPupilId": props.ClientUserDetails.UserId
                    }
                }
            ]
        }
    };

    let objClientSettingsParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iConfigurationFileId": 1
                    }
                },
                {
                    "match": {
                        "vParentKey": "ExtranetTeacher"
                    }
                },
                {
                    "match": {
                        "vSubParentKey": "LearningTest"
                    }
                },
                {
                    "match": {
                        "vKey": "NumberOfRepetitionForSystemGeneratedTest"
                    }
                }
            ]
        }
    };

    let objCycleParams = {
        "SearchQuery":
        {
            "must":
                [
                    {
                        "match": {
                            "iCycleTypeId": strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "cIsActive": "Y"
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
        }
    };

    let arrParams = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objSubjectsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/TestAndCycle/Test/ExtranetTest",
            "Params": objExtranetTestParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult/TestLoginAndResult",
            "Params": objTestLoginAndResult,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Blocks/SystemConfiguration/ClientSettings",
            "Params": objClientSettingsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/Cycle",
            "Params": objCycleParams,
            "MethodType": "Get"
        }
    ];
    return {
        "DataCalls": arrParams
    };
}

/**
 * to get data in display format
 * @param {any} objContext
 * @param {any} arrExtranetTestData
 * @param {any} arrSubject
 * @param {any} arrTestLoginAndResult
 * @param {any} objMaxRoundDetails
 */
export function GetFormatedData(objContext, arrExtranetTestData, arrSubject, arrTestLoginAndResult, objMaxRoundDetails) {
    if (objMaxRoundDetails == undefined) {
        objMaxRoundDetails = {
            vValue: "3"
        };
    }

    let GetMode = (test) => {
        let strMode = '';
        if (test.iTestUsageId == "3" || test.iTestUsageId == 3) {
            strMode = test.cIsSystemGenerated == "Y" ? "System Generated LT" : "Teacher Generated LT";

        } else if (test.iTestUsageId == "2" || test.iTestUsageId == 2) {
            strMode = "Low Stake";
        }
        return strMode;
    };

    let GetStatus = (test) => {
        let objStatus = {};
        if (test.t_TestDrive_Cycle_Pupil.length > 0) {
            objStatus["cHasRoundCompleted"] = test.t_TestDrive_Cycle_Pupil[0]["cHasRoundCompleted"] == "Y" ? "Y" : "N";
            objStatus["cNewTestAllowed"] = Number(test.t_TestDrive_Cycle_Pupil[0]["iRoundId"] ? test.t_TestDrive_Cycle_Pupil[0]["iRoundId"] : 0) < Number(objMaxRoundDetails.vValue) && objStatus["cHasRoundCompleted"] == "N" ? true : false;
            objStatus["cRoundFinished"] = Number(test.t_TestDrive_Cycle_Pupil[0]["iRoundId"] ? test.t_TestDrive_Cycle_Pupil[0]["iRoundId"] : 0) < Number(objMaxRoundDetails.vValue) && objStatus["cHasRoundCompleted"] == "Y" ? true : false;
            objStatus["cRoundsCompleted"] = test.t_TestDrive_Cycle_Pupil[0]["iRoundId"] ? test.t_TestDrive_Cycle_Pupil[0]["iRoundId"] : 0 == Number(objMaxRoundDetails.vValue) && objStatus["cHasRoundCompleted"] == "Y" ? true : false;
            objStatus["cShowRoundComplete"] = test.t_TestDrive_Cycle_Pupil[0]["iRoundId"] ? test.t_TestDrive_Cycle_Pupil[0]["iRoundId"] : 0 == Number(objMaxRoundDetails.vValue) && objStatus["cHasRoundCompleted"] == "N" ? true : false;
        }

        let objStatusToReturn = {
            strSatus: "NotStarted",
            vImgUrl: '',
            vResourceText: 'NotStarted',
            cHasRoundCompleted: objStatus["cHasRoundCompleted"],
            cNewTestAllowed: objStatus["cNewTestAllowed"],
            cShowRoundComplete: objStatus["cShowRoundComplete"],
            cManuallyCreated: test["cIsSystemGenerated"] == "Y" ? false : true
        };
        let objExecution = arrTestLoginAndResult.find(tlr => tlr["uTestId"] == test["uTestId"]);
        if (objStatus["cHasRoundCompleted"] != null && objStatus["cHasRoundCompleted"] == "Y") {
            objStatusToReturn.strSatus = 'Completed';
            objStatusToReturn.vResourceText = 'Completed';
        }
        else {
            if (test["cIsSystemGenerated"] == "N") {
                if (test["iTestUsageId"] == "2") {
                    if (objExecution != null && objExecution["TestExecution"] != null) {
                        if (objExecution["TestExecution"].length != 0 && objExecution["TestExecution"][0]["iTestStatusId"] == "5" && test["cHasRoundCompleted"] == "N") {
                            objStatusToReturn.strSatus = 'Completed';
                            objStatusToReturn.vResourceText = 'Completed';
                        }
                        else {
                            objStatusToReturn.strSatus = 'Started';
                            objStatusToReturn.vResourceText = 'Started';
                        }
                    }
                    else {
                        objStatusToReturn.strSatus = 'NotStarted';
                        objStatusToReturn.vResourceText = 'NotStarted';
                    }
                }

                else if (test["iTestUsageId"] == "3") {
                    let arrTestRepitation = arrTestLoginAndResult.filter(tlr => tlr["uTestId"] == test["uTestId"]).sort((x, y) => { return Number(x["iCycleRepetition"]) - Number(y["iCycleRepetition"]); });
                    if (objExecution != null && objExecution["TestExecution"] != null) {
                        if (test["cIsSystemGenerated"] == "N" && arrTestRepitation.length > 0 && arrTestRepitation.length >= 7 && arrTestRepitation[6]["TestExecution"].length != 0 && arrTestRepitation[6]["TestExecution"][0]["iTestStatusId"] == "5") {
                            {
                                objStatusToReturn.strSatus = 'Completed';
                                objStatusToReturn.vResourceText = 'Completed';
                            }
                        }
                        else {
                            if (objExecution["TestExecution"].length != 0 && objExecution["TestExecution"][0]["iTestStatusId"] == "5") {
                                objStatusToReturn.strSatus = 'NotCompleted';
                                objStatusToReturn.vResourceText = 'NotCompleted';
                            }
                            else {
                                objStatusToReturn.strSatus = 'Started';
                                objStatusToReturn.vResourceText = 'Started';
                            }
                        }
                    }
                    else {
                        objStatusToReturn.strSatus = 'NotStarted';
                        objStatusToReturn.vResourceText = 'NotStarted';
                    }
                }

            }
            else {
                if (objExecution != null && objExecution["TestExecution"] != null) {
                    if (objExecution["TestExecution"].length != 0 && objExecution["TestExecution"][0]["iTestStatusId"] == "5" && objStatus["cHasRoundCompleted"] == "N") {
                        objStatusToReturn.strSatus = 'NotCompleted';
                        objStatusToReturn.vResourceText = 'NotCompleted';
                    }
                    else {
                        objStatusToReturn.strSatus = 'Started';
                        objStatusToReturn.vResourceText = 'Started';
                    }
                }
                else {
                    objStatusToReturn.strSatus = 'NotStarted';
                    objStatusToReturn.vResourceText = 'NotStarted';
                }
            }
        }
        return objStatusToReturn;
    };

    let GetNumberOfAttempts = (test) => {
        let objTestLoginResult = arrTestLoginAndResult.find(tlr => tlr["uTestId"] == test["uTestId"]);
        let iAttempts = 0;
        if (objTestLoginResult)
            iAttempts = objTestLoginResult.TestExecution[0].iNoOfLoginAttempts;
        return iAttempts;
    };

    let GetRoundDetails = (test) => {
        let strRoundDetails = undefined;
        if (test.t_TestDrive_Cycle_Pupil.length > 0) {
            strRoundDetails = "( " + " Rounde" + test.t_TestDrive_Cycle_Pupil[0].iRoundId + "/" + objMaxRoundDetails.vValue + " )";
        }
        return strRoundDetails;
    };

    let GetTestLink = (test) => {
        let objPupilDetails = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(cls => cls["cIsDeleted"] == "N");
        let GetUniqueId = () => {
            var objdate = new Date();
            return objdate.getDate().toString() + objdate.getMonth().toString() + objdate.getFullYear().toString() + objdate.getHours().toString()
                + objdate.getMinutes().toString() + objdate.getSeconds().toString();
        };
        let strLink = objContext.props.JConfiguration.TestApplicationUrl + "JloginforTest.aspx?SessionKey=" + GetUniqueId() + "&ShowSaveAndCloseButton=Y&CycleId=" + objContext.state.strCycleId + "&TestIdGuid=" + test.uTestId.toUpperCase() + "&ClassId=" + objPupilDetails.uClassId.toUpperCase() + "&PupilId=" + objContext.props.ClientUserDetails.UserId.toUpperCase() + "&TeacherId=" + objPupilDetails.uTeacherId.toUpperCase() + "&SchoolId=" + objPupilDetails.uSchoolId.toUpperCase() + "&StateId=" + objPupilDetails.iStateId + "&IsDirectJLoginCall=Y&OpenTestInPopup=";
        if (objContext.state.cOpenTestInPopup == "Y") {
            strLink += "Y";
        }
        else {
            strLink += "N";
        }
        return strLink;
    };

    let arrFormatedData = arrExtranetTestData.map(test => {
        let objSubject = arrSubject.find(sub => {
            return sub.iSubjectId == test.iSubjectId;
        });
        let objMainSubject = objSubject;
        if (objSubject.iParentSubjectId > 0) {
            objMainSubject = arrSubject.find(sub => {
                return sub.iSubjectId == objSubject.iParentSubjectId
            });
        }

        return {
            uTestId: test.uTestId,
            vTestName: test.vTestName,
            dtCreatedOn: test.dtCreatedOn,
            vSubjectName: objMainSubject.t_TestDrive_Subject_Data[0].vSubjectName,
            iSubjectId: objMainSubject.iSubjectId,
            cIsSystemGenerated: test.cIsSystemGenerated,
            iTestUsageId: test.iTestUsageId,
            vModeText: GetMode(test),
            vRoundDetails: GetRoundDetails(test),
            iNumberOfAttempts: GetNumberOfAttempts(test),
            objStatus: GetStatus(test),
            vTestLink: GetTestLink(test)
        };
    });

    if (objContext.state.objSubSubject && objContext.state.objSubSubject.iSubjectId != -1) {
        arrFormatedData = arrFormatedData.filter(test => test["iSubjectId"] == objContext.state.objSubSubject.iSubjectId)
    }
    if (objContext.state.objMode && objContext.state.objMode.value != "0") {
        if (objContext.state.objMode.value == "3") {
            if (objContext.state.objMode.cIsSystemGenerated == 'Y') {
                arrFormatedData = arrFormatedData.filter(test => test.cIsSystemGenerated == 'Y' && (test.iTestUsageId == 3 || test.iTestUsageId == "3"))
            } else {
                arrFormatedData = arrFormatedData.filter(test => test.cIsSystemGenerated == 'N' && (test.iTestUsageId == 3 || test.iTestUsageId == "3"))

            }
        } else { //for low stake
            arrFormatedData = arrFormatedData.filter(test => test.cIsSystemGenerated == 'N' && (test.iTestUsageId == 2 || test.iTestUsageId == "2"))
        }
    }
    return arrFormatedData;
}

/**
 * Update state search click is happened
 * @param {any} objContext
 */
export const OnClickSearch = (objContext) => {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { blnInitialDataLoaded: false } })

};

/**
 * 
 * @param {*} arrParams 
 * @param {*} strToggleExecute 
 * @summary   Call 'Execute' method to make the api call.
 */
export function DataCall(arrParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {

    });
}

export function NoCacheDataCall(arrParams, objContext) {  
    ArcadixFetchData.Execute(arrParams,  (objReturn) => {
      
        let strCycleTypeId = GetCycleTypeId();
        let arrExtranetTest = DataRef(objReturn["extranettest"],"extranettest;uclassid;" + objContext.state.strClassId + ";upupilid;" + objContext.props.ClientUserDetails.UserId+ ";icycletypeid;" + strCycleTypeId)["Data"];
        console.log("objReturn ###################", objReturn, arrExtranetTest);
        objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { blnInitialDataLoaded: false, arrExtranetTest: arrExtranetTest } })
    });
}


/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(GetRequiredData, []);
}

export function useDataLoadedForExtranetTest(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { blnInitialDataLoaded: false } })
        }
    }, [objContext.props.extranettest]);
}

export function useSchoolYearPeriodDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let objItem = objContext.state.objSchoolYear;
            let objExtranetTestParams = {
                "SearchQuery":
                {
                    "must": [
                        {
                            "match": {
                                "uClassId": GetClassId(objContext.props)
                            }
                        },
                        {
                            "match": {
                                "uPupilId": objContext.props.ClientUserDetails.UserId
                            }
                        },
                        {
                            "match": {
                                "iCycleTypeId": GetCycleTypeId()
                            }
                        },
                        {
                            range: {
                                "dtFromDate": objItem.StartDate,
                                "dtToDate": objItem.EndDate,
                                "format": "dd.MM.yyyy"
                            }
                        }
                    ]
                },
                iOffSet: 0,
                iInterval: 6000,
                cIsFilterBasedOnDate: 'N'
            };
            let arrParams = [

                {
                    "URL": "API/Object/Intranet/TestAndCycle/Test/ExtranetTest",
                    "Params": objExtranetTestParams,
                    "MethodType": "Get"
                }
            ];

            NoCacheDataCall(arrParams, objContext);
        }
    }, [objContext.state.objSchoolYear])
}


export function OnChangeWeekDisplay(objContext, objItem) {   
    if (objContext.state.blnMakeCall) {
        // let objItem = objContext.state.objSchoolYear;
        let objExtranetTestParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "uClassId": GetClassId(objContext.props)
                        }
                    },
                    {
                        "match": {
                            "uPupilId": objContext.props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "iCycleTypeId": GetCycleTypeId()
                        }
                    },
                    {
                        range: {
                            "dtFromDate": objItem.StartDate,
                            "dtToDate": objItem.EndDate,
                            "format": "yyyy-MM-dd'T'HH:mm:ss.SSS"
                        }
                    }
                ]
            },
            iOffSet: 0,
            iInterval: 6000,
            cIsFilterBasedOnDate: 'N'
        };
        let arrParams = [

            {
                "URL": "API/Object/Intranet/TestAndCycle/Test/ExtranetTest",
                "Params": objExtranetTestParams,
                "MethodType": "Get"
            }
        ];

        NoCacheDataCall(arrParams, objContext);
    }

    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSchoolYear: objItem, blnMakeCall: true } })

}



/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = GetClassId(objContext.props);
    let strCycleTypeId = GetCycleTypeId();
    let strPupilId = objContext.props.ClientUserDetails.UserId;
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.textresource, "textresource;id;de/d.extranet/4_pupil/modules/WorkTest") &&
            DataRef(objContext.props.extranettest, "extranettest;uclassid;" + strClassId + ";upupilid;" + strPupilId + ";icycletypeid;" + strCycleTypeId) &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strCycleTypeId + ";upupilid;" + strPupilId) &&
            DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n") &&
            DataRef(objContext.props.clientsettings, "clientsettings;iconfigurationfileid;1;vparentkey;extranetteacher;vsubparentkey;learningtest;vkey;numberofrepetitionforsystemgeneratedtest") &&
            DataRef(objContext.props.subject, "subject;cisdeleted;n")
        ) {
            let objCycle = DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n")["Data"][0];
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: { strClassId: strClassId, isLoadComplete: true, strCycleId: objCycle["uCycleId"] } });
            ApplicationState.SetProperty("blnShowAnimation", false);
            ApplicationState.SetProperty("DisplayFor", 4);
        }
    }, [
            objContext.props.subject,
            objContext.props.textresource,
            objContext.props.extranettest,
            objContext.props.testloginandresult,
            objContext.props.clientsettings,
            objContext.props.cycle,
        ]);
}


/**
 * 
 * @param {} objContext 
 * @summary  returns an array of Modes to load in the drop down
 */
export function GetModesDropdownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/4_pupil/modules/worktest").Data[0]["WorkTest"];
    return [
        { key: objTextResource["ModesDropdownItem1"], value: "0", cIsSystemGenerated: 'N' },
        { key: objTextResource["ModesDropdownItem2"], value: "3", cIsSystemGenerated: 'N' },
        { key: objTextResource["ModesDropdownItem3"], value: "3", cIsSystemGenerated: 'Y' },
        { key: objTextResource["ModesDropdownItem4"], value: "2", cIsSystemGenerated: 'N' }
    ];
}


/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the Subject dropdown selection changes
 */
export function OnChangeSubjectDropDown(objContext, objItem) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { objSubject: objItem } });
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the sub Subject dropdown selection changes
 */
export function OnChangeSubSubjectDropDown(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSubSubject: objItem } });
}

/**
 * 
 * @param {*} objContext
 * @param {*} objItem 
 * @summary   Triggers when the Modes dropdown selection changes
 */
export function OnChangeModesDropDown(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objMode: objItem } });
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState() {
    return {
        strClassId: undefined,
        strCycleId: undefined,
        isLoadComplete: false,
        intSelectedSubjectId: -1,
        blnIsClassSelectionChanged: false,
        objSubject: undefined,
        objSubSubject: undefined,
        objMode: undefined,
        blnInitialDataLoaded: false,
        arrDisplayData: [],
        cOpenTestInPopup: 'Y',
        arrExtranetTest: undefined,
        objSchoolYear: undefined,
        blnMakeCall:false
    };
}

export function GetCycleTypeId() {
    return "3";
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action) {
    switch (action.type) {
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
        case 'DATA_LOAD_COMPLETE':
            return {
                ...state,
                ...action.payload
            };
    }
}

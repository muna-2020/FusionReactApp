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
            class: DataRef(state.Entity, "class", true),
            textresource: DataRef(state.Entity, "textresource", true),
            pupil: DataRef(state.Entity, "pupil", true),
            subject: DataRef(state.Entity, "subject", true),
            extranettest: DataRef(state.Entity, "extranettest", true),
            cycle: DataRef(state.Entity, "cycle", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        Logger.Log("not mapping");
        return {};
    }
}


/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/LearningTestSystem"
                    }
                }
            ]
        }
    };
    let objClassParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
            "Type": "nested"
        }
    };
    let objSubjectsParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                },
                {
                    "match": {
                        "cIsActive": "Y"
                    }
                },
                {
                    "match": {
                        "cIsReadyForSystemLearningTest": "Y"
                    }
                }
            ]
        }
    };
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
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
            "URL": "API/Object/Blocks/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/Class",
            "Params": objClassParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objSubjectsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/Cycle",
            "Params": objCycleParams,
            "MethodType": "Get"
        }

    ];
    return { "DataCalls": arrParams };
}

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params of pupil for the component.
 */
export function GetPupilDataParams(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };

    let arrParams = [
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        }
    ];
    return arrParams;
}

export function GetExtranetTestParams(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();

    let strTeacherId = objContext.props.ClientUserDetails.UserId;
    let strFromDate = "";
    let strToDate = "";
    if (objContext.state.objWeekDisplaySelection["StartDate"] && objContext.state.objWeekDisplaySelection["EndDate"]) {
        strFromDate = objContext.state.objWeekDisplaySelection["StartDate"];
        strToDate = objContext.state.objWeekDisplaySelection["EndDate"];
    }

    let objExtranetTestParams = {
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iCycleTypeId": strCycleTypeId
                    }
                },
                {
                    "match": {
                        "uClassId": strClassId
                    }
                },
                {
                    "match": {
                        "uTeacherId": strTeacherId
                    }
                },
                {
                    "range": {
                        "dtFromDate": strFromDate,
                        "dtToDate": strToDate
                    }
                }
            ]
        }
    };
    let arrParams = [
        {
            "URL": "API/Object/Intranet/Test/ExtranetTest",
            "Params": objExtranetTestParams,
            "MethodType": "Get"
        }
    ];
    return arrParams;
}

/**
 * 
 * @param {*} arrParams 
 * @param {*} strToggleExecute 
 * @summary   Call 'Execute' method to make the api call.
 */
export function DataCall(objContext, arrParams, strToggleExecute = 'FetchAndCacheExecute') {
    switch (strToggleExecute) {
        case 'FetchAndCacheExecute':
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
            break;
        case "FetchExecuteForExtranetTest":
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                let arrData = objReturn["extranettest"][Object.keys(objReturn["extranettest"])[0]]["Data"];
                Logger.Log("#######", arrData);
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrExtranetTestData": arrData } });
            });
            break;
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(objContext, InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
        DataCall(objContext, GetExtranetTestParams(objContext), "FetchExecuteForExtranetTest");
        return () => {
            ApplicationState.RemoveProperty("DisplayFor");
        };
    };
    useLayoutEffect(GetRequiredData, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForPupil(objContext) {
    const GetRequiredData = () => {
        if (objContext.state.isLoadComplete) {
            DataCall(objContext, GetPupilDataParams(objContext));
            DataCall(objContext, GetExtranetTestParams(objContext), "FetchExecuteForExtranetTest");
        }
    };
    useLayoutEffect(GetRequiredData, [objContext.state.blnIsClassSelectionChanged]);
}

export function useDataLoaderForWeekDisplaySelection(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete) {
            if (objContext.state.intWeekDisplayChangeCount > 0) {
                DataCall(objContext, GetExtranetTestParams(objContext), "FetchExecuteForExtranetTest");
            }
            else {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intWeekDisplayChangeCount": objContext.state.intWeekDisplayChangeCount + 1 } });
            }
        }
    }, [objContext.state.objWeekDisplaySelection]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();
    useEffect(() => {
        if (DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.subject, "subject;cisdeleted;n;cisactive;y;cisreadyforsystemlearningtest;y") &&
            DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n") &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/LearningTestSystem") &&
            DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
            objContext.state.arrExtranetTestData) {
            let arrPupilData = [];
            let arrTempPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
            let arrTempSubjectData = DataRef(objContext.props.subject, "subject;cisdeleted;n;cisactive;y;cisreadyforsystemlearningtest;y").Data;
            if (arrTempPupilData.length > 0) {
                arrPupilData = arrTempPupilData.filter(objPupil => objPupil["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
            }
            let objAllPupil = {
                "uPupilId": -1,
                "vFirstName": "Alle"
            };
            arrPupilData = [objAllPupil, ...arrPupilData];
            var inttaskSetCount = 0;
            objContext.state.arrExtranetTestData.map((objTestDetails) => {
                if (objTestDetails["t_TestDrive_Cycle_Pupil"].length > 0) {
                    var intPupilId = objTestDetails["t_TestDrive_Cycle_Pupil"][0]["uPupilId"];
                    arrPupilData.map((objPupilDetails) => {
                        if (objPupilDetails["uPupilId"] === intPupilId) {
                            inttaskSetCount = inttaskSetCount + 1;
                        }
                    });
                }
            });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupilData": arrPupilData, "arrFilterPupilData": arrPupilData, "arrSubjectData": arrTempSubjectData, "arrFilterExtranetTestData": objContext.state.arrExtranetTestData, "inttaskSetCount": inttaskSetCount } });
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                ApplicationState.SetProperty("blnShowAnimation", false);
                ApplicationState.SetProperty("DisplayFor", 4);//for week display component
            }
        }
    }, [objContext.props.class, objContext.props.subject, objContext.props.textresource, objContext.props.pupil, objContext.props.extranettest, objContext.state.arrExtranetTestData, objContext.props.cycle]);
}

export function OnFilterSelect(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    console.log(strClassId, objContext.state.intSelectedSubSubjectId, objContext.state.intSelectedSubjectId, objContext.state.strSelectedPupilId, objContext.state.strSelectedClassId);
    if (objContext.state.strSelectedClassId !== -1) {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnIsClassSelectionChanged": !objContext.state.blnIsClassSelectionChanged, "strSelectedPupilId": -1, "intSelectedSubjectId": -1, "intSelectedSubSubjectId": -1, "strSelectedClassId": -1 } });
    }

    if (objContext.state.strSelectedPupilId !== -1) {
        var arrPupil = [];
        objContext.state.arrPupilData.map((objPupilDetails) => {
            if (objPupilDetails["uPupilId"] === objContext.state.strSelectedPupilId) {
                arrPupil = [...arrPupil, objPupilDetails];
            }
        });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrFilterPupilData": arrPupil } });
    }
    else {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrFilterPupilData": objContext.state.arrPupilData } });
    }

    if (objContext.state.intSelectedSubjectId !== -1) {
        var arrFilterExtranetTestData = [];
        objContext.state.arrExtranetTestData.map((objTestDetails) => {
            var intTestSubjectId = objTestDetails["iSubjectId"];
            objContext.state.arrSubjectData.map((objSubject) => {
                if (objSubject["iParentSubjectId"] === objContext.state.intSelectedSubjectId) {
                    if (intTestSubjectId === objSubject["iSubjectId"]) {
                        arrFilterExtranetTestData = [...arrFilterExtranetTestData, objTestDetails];
                    }
                }
            });
        });
        if (objContext.state.intSelectedSubSubjectId === -1) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrFilterExtranetTestData": arrFilterExtranetTestData } });
        }
        else {
            arrFilterExtranetTestData = arrFilterExtranetTestData.filter((objFilterTestData) => objFilterTestData["iSubjectId"] === objContext.state.intSelectedSubSubjectId);
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrFilterExtranetTestData": arrFilterExtranetTestData } });
        }
    }
    else {

        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrFilterExtranetTestData": objContext.state.arrExtranetTestData } });
    }
}

/**
 * 
 * @param {} objContext 
 * @summary  returns an array of classes to load in the drop down
 */
export function GetClassDropDownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestsystem").Data[0]["LearningTestSystem"];
    let arrTempClass = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data.map((objClass) => {
        return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") };
    });
    let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
    arrTempClass.forEach((objClass) => {
        let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N" }) };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrMainClassData = [...arrMainClassData, objTempClassData];
        }
        objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N") };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
        }
        objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y") };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
        }
    }
    );
    let arrFinalClassData = [
        {
            "Title": objTextResource["ClassDropDownMainClassTitle"],
            "Data": arrMainClassData
        },
        {
            "Title": objTextResource["ClassDropDownCoTeacherTitle"],
            "Data": arrCoTeacherClassData
        },
        {
            "Title": objTextResource["ClassDropDownSubjectExpertTitle"],
            "Data": arrSubjectExpertClassData
        }
    ];
    return arrFinalClassData;
}

/**
 * 
 * @param {*} objContext 
 * @summary   reurns Week Display dropdown.
 */
export function GetWeekDisplayDropdownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestsystem").Data[0]["LearningTestSystem"];
    let arrDropdownData = [
        {
            Key: objTextResource["WeekDisplayDropdownWeekTitle"],
            Value: 2
        },
        {
            Key: objTextResource["WeekDisplayDropdownSemesterTitle"],
            Value: 3
        },
        {
            Key: objTextResource["WeekDisplayDropdownSchoolYearTitle"],
            Value: 4
        }
    ];
    return arrDropdownData;
}

export function GetTestData(objPupilDetails, objContext) {
    var arrTestData = [];
    var intTestSubjectId;
    var arrSubSubjectData = [];
    var arrSubjectData = [];
    objContext.state.arrFilterExtranetTestData.map((objTestDetails) => {
        if (objTestDetails["t_TestDrive_Cycle_Pupil"].length > 0) {
            var intPupilId = objTestDetails["t_TestDrive_Cycle_Pupil"][0]["uPupilId"];
            if (objPupilDetails["uPupilId"] === intPupilId) {
                arrTestData = [...arrTestData, objTestDetails];
                intTestSubjectId = objTestDetails["iSubjectId"];
                objContext.state.arrSubjectData.map((objSubject) => {
                    if (objSubject["iSubjectId"] === intTestSubjectId) {
                        if (objSubject["iParentSubjectId"] !== 0) {
                            objContext.state.arrSubjectData.map((objSubSubject) => {
                                if (objSubSubject["iSubjectId"] === objSubject["iParentSubjectId"]) {
                                    arrSubSubjectData = [...arrSubSubjectData, objSubSubject];
                                    arrSubjectData = [...arrSubjectData, objSubject];
                                }
                            });
                        }
                    }
                });
            }
        }
    });
    var objResult = {
        "arrTestData": arrTestData, "objSubjectData": arrSubjectData, "objSubSubjectData": arrSubSubjectData
    };
    return objResult;
}

export function GetClassName(objContext) {
    var strClassName = "";
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    var arrClassdata = GetClassDropDownData(objContext);
    arrClassdata.map((arrClasses) => {
        arrClasses.Data.map((obj) => {
            if (obj["uClassId"] === strClassId) {
                strClassName = obj["vClassName"];
            }
        });
    });
    return strClassName;
}

export function GetFormattedDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('.');
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the class dropdown selection changes
 */
export function OnChangeClassDropDown(objContext, objItem) {
    //set selected class id to state
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strSelectedClassId": objItem.uClassId } });
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the pupil dropdown selection changes
 */
export function OnChangePupilDropDown(objContext, objItem) {
    //set selected class id to state
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strSelectedPupilId": objItem.uPupilId } });
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the subject dropdown selection changes
 */
export function OnChangeSubjectDropDown(objContext, objItem) {
    //set selected class id to state
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubjectId": objItem.iSubjectId, "intSelectedSubSubjectId": -1 } });
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the sub subject dropdown selection changes
 */
export function OnChangeSubSubjectDropDown(objContext, objItem) {
    //set selected class id to state
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubSubjectId": objItem.iSubjectId } });
}

/**
 * 
 * @param {*} objItem 
 * @summary   Trigerred when the change is there in week display component.
 */
export function OnChangeWeekDisplay(objContext, objItem) {
    if (objContext.state.objWeekDisplaySelection["StartDate"] !== objItem["StartDate"] && objContext.state.objWeekDisplaySelection["EndDate"] !== objItem["EndDate"]) {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objWeekDisplaySelection": objItem } });
    }
}

/**
 * 
 * @param {*} objItem 
 * @summary   Trigerred when the selection changes in the WeekDisplayDropdown.
 */
export function OnChangeDisplayDropdown(objContext, objItem) {
    ApplicationState.SetProperty("DisplayFor", objItem["Value"]);
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSelectedSubjectId: -1,
        intSelectedSubSubjectId: -1,
        strSelectedClassId: -1,
        strSelectedPupilId: -1,
        blnIsClassSelectionChanged: false,
        arrPupilData: [],
        intWeekDisplayChangeCount: 0,
        objWeekDisplaySelection: {}
    };
}

function GetCycleTypeId() {
    return "3";
}

export function GetCycleObject(objContext) {
    let strCycleTypeId = GetCycleTypeId();
    let objCycle = DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n")["Data"][0];
    return objCycle;
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
                ["isLoadComplete"]: action.payload
            };
    }
}

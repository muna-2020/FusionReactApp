import { useState, useLayoutEffect, useEffect } from "react";
import ArcadixFetchAndCacheData, { DataRef } from "@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData";

/**
 * this function has to be sent to connect HOC for redux mapping
 * this will contain the Entity/ApplicationState mappings
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: DataRef(state.Entity, "textresource", true),
            class: DataRef(state.Entity, "class", true),
            pupil: DataRef(state.Entity, "pupil", true),
            practicetestdisplay: DataRef(state.Entity, "practicetestdisplay", true)
        };
    } else {
        return {};
    }
}

/**
 * Custom hook which will carry out the data call portion and take care of re-rendering on prop/state changes
 * @param {*} props
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        Logger.Log("getting required data");
        DataCall(objContext);
    };
    useLayoutEffect(GetRequiredData, []);
}

/**
 * This method will make the Execute api call and return a promise. You resolve the same in the custom hook below and carry out any specific operation
 * @param {*} props 
  objArcadixFetchAndCacheData.Execute is used to fetch textresource
  ArcadixFetchData.Execute is used to fetch data directly from database(tablevalues)
 * // 
 */
export function DataCall(objContext) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls, function (objReturn) {
    });
}

/**
 * @param {*} JConfiguration
 * @param {*} props
 * this function will return an object which contains an arrays -
 *  arrDataRequest -> an array containing the data params.
 */
export function InitialDataParams(JConfiguration, props) {
    var blnIsPupil = QueryString.GetQueryStringValue("cIsPupil") === "Y";
    var objResourceParams = {
        SearchQuery: {
            must: [
                {
                    match: {
                        Id: JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/PracticeTestDisplay"
                    }
                }
            ]
        }
    };
    var arrDataRequest = [
        {
            URL: "API/Object/Blocks/TextResource/TextResource",
            Params: objResourceParams,
            ReturnDataOnServerRender: true,
            MethodType: "Get"
        }
    ];
    var strPupilId = "-1";
    var strClassId = "";
    if (blnIsPupil) {
        strPupilId = props.ClientUserDetails.UserId;
        let objClass = props
            .ClientUserDetails
            .PupilDetails
            .t_TestDrive_Member_Class_Pupil
            .find(objClass => objClass["cIsDeleted"] === "N");
        strClassId = objClass.uClassId;
    }
    else {
        strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            }
        };
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            }
        };
        arrDataRequest = arrDataRequest.concat(
            [
                {
                    "URL": "API/Object/Extranet/Teacher/Class",
                    "Params": objClassParams,
                    "MethodType": "Get"
                },
                {
                    "URL": "API/Object/Extranet/Pupil/Pupil",
                    "Params": objPupilParams,
                    "MethodType": "Get"
                }
            ]);
    }
    arrDataRequest.push({
        "URL": "API/Extranet/PracticeTestDisplay",
        "Params": {
            uClassId: strClassId,
            iCycleTypeId: GetCycleTypeId(),
            uPupilId: strPupilId,
            SearchQuery: {
                must: [
                    {
                        match: {
                            uPupilId: strPupilId
                        }
                    }
                ]
            }
        },
        "MethodType": "Get"
    });
    return { DataCalls: arrDataRequest };
}

/**
 *
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    var blnIsPupil = QueryString.GetQueryStringValue("cIsPupil") == "Y";
    var arrDataToCheck = [
        objContext.props.textresource,
        objContext.props.practicetestdisplay,
    ];
    var strPupilId = "-1";
    if (blnIsPupil) {
        strPupilId = objContext.props.ClientUserDetails.UserId;
    }
    else {
        arrDataToCheck.push(objContext.props.class);
        arrDataToCheck.push(objContext.props.pupil);
        if (objContext.state.strSelectedPupilId != undefined) {
            strPupilId = objContext.state.strSelectedPupilId;
        }
    }
    useEffect(() => {
        if (
            DataRef(objContext.props.textresource, "textresource;id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/PracticeTestDisplay")
            && (blnIsPupil || DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId))
            && (blnIsPupil || DataRef(objContext.props.pupil, "pupil;t_testdrive_member_class_pupil.uclassid;" + ApplicationState.GetProperty("SelectedClassId").toLowerCase()))
            && DataRef(objContext.props.practicetestdisplay, "practicetestdisplay;upupilid;" + strPupilId.toLowerCase())
        ) {
            if (!blnIsPupil) {
                let arrClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId)["Data"];
                let arrPupilData = GetPupilData(objContext);
                objContext.dispatch({
                    type: "CLASS_DATA_LOAD",
                    payload: arrClassData
                });
                objContext.dispatch({
                    type: "PUPIL_DATA_LOAD",
                    payload: arrPupilData
                });
            }
            let arrPracticeTestDisplayData = DataRef(objContext.props.practicetestdisplay, "practicetestdisplay;upupilid;" + strPupilId.toLowerCase())["Data"];
            objContext.dispatch({
                type: "PRACTICE_DATA_LOAD",
                payload: arrPracticeTestDisplayData
            });
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({
                    type: "DATA_LOAD_COMPLETE",
                    payload: true
                });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        }
    }, arrDataToCheck);
}


/**
 * Gets Non Deleted Pupil Records from store for selected Class
 * @param {any} objContext
 */
export function GetPupilData(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
    let arrFilteredPupilData = arrPupilData
        .filter(objTempData =>
            objTempData["t_TestDrive_Member_Class_Pupil"]
                .filter(objTempClassPupil =>
                    objTempClassPupil["uClassId"] == strClassId
                    && objTempClassPupil["cIsDeleted"] == "N"
                ).length > 0
        );
    objContext.dispatch({ type: "PUPILCHANGED_UPDATE", payload: "-1" });
    return arrFilteredPupilData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForPupil(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete) {
            var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(GetPupilDataParams(objContext), function (objReturn) {
            });
        }
    }, [objContext.state.blnClassChangedInDropdown]);
};

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
    return [
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
    ];
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function GetPracticeTestDetailsForSelectedPupil(objContext) {    
    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.strSelectedPupilId != "-1") {
            var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            ApplicationState.SetProperty("blnShowAnimation", true);
            objArcadixFetchAndCacheData.Execute(GetPracticeDetailsParams(objContext), function (objReturn) {
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
    }, [objContext.state.strSelectedPupilId]);
};

export function GetPracticeDetailsParams(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();
    return [
        {
            "URL": "API/Extranet/PracticeTestDisplay",
            "Params": {
                uClassId: strClassId,
                iCycleTypeId: strCycleTypeId,
                uPupilId: objContext.state.strSelectedPupilId,
                SearchQuery: {
                    must: [
                        {
                            match: {
                                uPupilId: objContext.state.strSelectedPupilId
                            }
                        }
                    ]
                }
            },
            "MethodType": "Get"
        },
    ];
}

/**
 * 
 * @param {} objContext 
 * @summary  returns an array of classes to load in the drop down
 */
export function GetClassDropDownData(objContext) {
    var blnIsPupil = QueryString.GetQueryStringValue("cIsPupil") == "Y";
    if (blnIsPupil) {
        return [];
    } else {
        let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/practicetestdisplay").Data[0]["PracticeTestDisplay"];
        let arrTempClass = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data
            .map((objClass) => {
                return {
                    ...objClass,
                    ["t_TestDrive_Member_Class_Teacher"]:
                        objClass.t_TestDrive_Member_Class_Teacher
                            .filter(objClassTeacher =>
                                objClassTeacher.cIsDeleted == "N")
                }
            });
        let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
        arrTempClass.forEach((objClass) => {
            let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N" }) };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsCoTeacher === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsSubjectExpert === "Y") };
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
            },
        ];
        return arrFinalClassData;
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the class dropdown selection changes
 */
export function HandleOnChangeClassDropDown(objContext, objItem) {
    objContext.dispatch({ type: "CLASSCHANGED_UPDATE", payload: !objContext.state.blnClassChangedInDropdown });
    objContext.dispatch({ type: "PRACTICE_DATA_LOAD", payload: [] });
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the pupil dropdown selection changes
 */
export function HandleOnChangePupilDropDown(objContext, objItem) {
    objContext.dispatch({ type: "PUPILCHANGED_UPDATE", payload: objItem.uPupilId });
};

/**
 * @summary Sets Initial states
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        isPreSelectValueSet: false,
        arrClassData: [],
        arrPupilData: [],
        arrPracticeTestData: [],
        blnClassChangedInDropdown: false,
        strSelectedPupilId: '-1'
    };
}

function GetCycleTypeId() {
    return "4";
}

/**
 * @summary reducer to maintain component state
 * @param {any} state
 * @param {any} action
 */
export function Reducer(state, action) {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE": {
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        }
        case "CLASS_DATA_LOAD": {
            return {
                ...state,
                ["arrClassData"]: action.payload
            };
        }
        case "PUPIL_DATA_LOAD": {
            return {
                ...state,
                ["arrPupilData"]: action.payload
            };
        }
        case "PRACTICE_DATA_LOAD": {
            return {
                ...state,
                ["arrPracticeTestData"]: action.payload
            };
        }
        case "CLASSCHANGED_UPDATE": {
            return {
                ...state,
                ["blnClassChangedInDropdown"]: action.payload
            };
        } case "PUPILCHANGED_UPDATE": {
            return {
                ...state,
                ["strSelectedPupilId"]: action.payload
            };
        }
    }
}

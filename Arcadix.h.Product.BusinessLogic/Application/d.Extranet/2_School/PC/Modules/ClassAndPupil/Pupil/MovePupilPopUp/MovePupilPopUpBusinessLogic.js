import { useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';


/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        //Logger.Log("Mapping Pupil");
        return {
            textresource: DataRef(state.Entity, "textresource", true),
            teacher: DataRef(state.Entity, "teacher", true),
            class: DataRef(state.Entity, "class", true),
            pupil: DataRef(state.Entity, "pupil", true),
            school: DataRef(state.Entity, "school", true)
        };
    }
    else {
        //Logger.Log("not mapping pupil");
        return {};
    }
};

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
function DataCall(arrRequest, objContext) {
    ArcadixFetchData.Execute(arrRequest, (res) => {
        ApplicationState.SetProperty("blnShowAnimation", false);
        let arrPupilData = res["movepupil"]["Data"][0]["SourcePupil"];
        let arrSamePupilList = res["movepupil"]["Data"][0]["SamePupilList"];
        let strClassId = objContext.props.Data.PresentClass.t_TestDrive_Member_Class_Teacher[0].uClassId;
        let strFilter = "pupil;t_testdrive_member_class_pupil.uclassid;" + strClassId.toLowerCase();
        let objPupilData = {
            Filter: strFilter,
            Value: {
                Data: arrPupilData,
                TimeStamp: "",
                PrimaryKeyName: "uPupilId",
                Count: arrPupilData.length
            }
        }
        let arrFilteredPupilData = arrPupilData.filter(x => x["t_TestDrive_Member_Class_Pupil"].find(y => y["cIsDeleted"] == "N" && y["cIsArchive"] == "N" && y["uClassId"] == strClassId))
        if (arrSamePupilList && arrSamePupilList.length > 0) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupilData": arrFilteredPupilData, blnDuplicatePupilPresent: true } });
        } else {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupilData": arrFilteredPupilData } });
        }
        ArcadixCacheData.EditData("pupil", objPupilData, (storeResponse) => {

        })
    })
}

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
function DataCallForCache(arrParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        //Do something
    });
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data(text resource, grid config, class group, gender) is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/classandpupil/pupil") && !objContext.state.isLoadComplete) {
            if (objContext.state.blnIsMovePupilAttempted &&
                DataRef(objContext.props.pupil, "pupil;t_testdrive_member_class_pupil.uclassid;" + objContext.props.Data.PresentClass.uClassId)) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.props.closePopUp(objContext.props.objModal);
            }
            else
                if (objContext.props.JConfiguration.ApplicationTypeId === "6" &&
                    DataRef(objContext.props.teacher, "teacher;t_testdrive_member_teacher_school.uschoolid;" + objContext.props.Data.ClientUserDetails.UserId) &&
                    DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uschoolid;" + objContext.props.Data.ClientUserDetails.UserId)) {
                    let arrPupil = objContext.props.Data.PupilData.map(objTempPupil => {
                        return {
                            ...objTempPupil, ["t_TestDrive_Member_Class_Pupil"]: objTempPupil["t_TestDrive_Member_Class_Pupil"]
                                .filter(objTempClassPupil => { return objTempClassPupil.cIsDeleted === "N" })
                        }
                    }).filter(objTempPupil => objTempPupil["t_TestDrive_Member_Class_Pupil"].length > 0);
                    let arrTeachers = GetTeachers(objContext);
                    let arrClasses = GetClasses(objContext, objContext.props.Data.PresentClass.uClassId, arrTeachers[0].uTeacherId);
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrClassData": arrClasses, "arrPupilData": arrPupil, "SelectedTeacherId": arrTeachers[0].uTeacherId, "SelectedClassId": "" } });
                    if (!objContext.state.isLoadComplete) {
                        objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                    }
                }
                else if (objContext.props.JConfiguration.ApplicationTypeId === "1" &&
                    DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.Data.ClientUserDetails.UserId)) {
                    let arrPupil = objContext.props.Data.PupilData.map(objTempPupil => {
                        return {
                            ...objTempPupil, ["t_TestDrive_Member_Class_Pupil"]: objTempPupil["t_TestDrive_Member_Class_Pupil"]
                                .filter(objTempClassPupil => { return objTempClassPupil.cIsDeleted === "N" })
                        }
                    }).filter(objTempPupil => objTempPupil["t_TestDrive_Member_Class_Pupil"].length > 0);
                    let arrClasses = GetClasses(objContext, objContext.props.Data.PresentClass.uClassId);
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrClassData": arrClasses, "arrPupilData": arrPupil, "SelectedTeacherId": objContext.props.Data.ClientUserDetails.UserId, "SelectedClassId": "" } });
                    if (!objContext.state.isLoadComplete) {
                        objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                    }
                }
        }
    }, [objContext.props.teacher, objContext.props.class, objContext.props.textresource, objContext.props.pupil]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns an array of teachers. 
 */
export function GetTeachers(objContext) {
    let strSchoolId = objContext.state.objSelectedSchool ? objContext.state.objSelectedSchool["uSchoolId"] : objContext.props.Data.ClientUserDetails.UserId;
    let arrTempTeachers = DataRef(objContext.props.teacher, "teacher;t_testdrive_member_teacher_school.uschoolid;" + strSchoolId).Data;
    let arrTeachers = [];
    if (arrTempTeachers) {
        arrTeachers = arrTempTeachers.map(objTempTeacher => {
            return {
                ...objTempTeacher, ["t_TestDrive_Member_Teacher_School"]: objTempTeacher["t_TestDrive_Member_Teacher_School"]
                    .filter(objTempTeacherSchool => objTempTeacherSchool.cIsDeleted === 'N')
            }
        }).filter(objTempTeacher => objTempTeacher["t_TestDrive_Member_Teacher_School"].length > 0);
    }

    //Logger.Log('...............Teachers', arrTeachers);
    return arrTeachers;
};

/**
 * return a list of schools
 * @param {any} objContext
 */
export function GetSchools(objContext) {
    return DataRef(objContext.props.school, "school;imainclientid;" + objContext.props.Data.ClientUserDetails.MainClientId + ";cisdeleted;n")["Data"];
};

/**
 * updating state with selected school
 * @param {any} objContext
 * @param {any} arrClassTeacher
 */
export function OnChangeSchoolDropDown(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSelectedSchool: objItem } });
}

export function useTeacherDataLoaderForSchoolDropDownChange(objContext) {
    useEffect(() => {
        if (objContext.props.JConfiguration.ApplicationTypeId === "6" && objContext.state.isLoadComplete && objContext.state.objSelectedSchool) {

            let objTeacherParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.state.objSelectedSchool["uSchoolId"],
                    "Type": "nested"
                }
            };

            let objClassParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "nested": {
                                "path": "t_TestDrive_Member_Class_Teacher",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_TestDrive_Member_Class_Teacher.uSchoolId": objContext.state.objSelectedSchool["uSchoolId"],
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            };

            let arrRequestParams = [
                {
                    "URL": "API/Object/Extranet/Teacher",
                    "Params": objTeacherParams,
                    "MethodType": "Get"
                },
                {
                    "URL": "API/Object/Extranet/Teacher/Class",
                    "Params": objClassParams,
                    "MethodType": "Get"
                }
            ];

            DataCallForCache(arrRequestParams);

        }
    }, [
            objContext.state.objSelectedSchool
        ])
}



/**
 * 
 * @param {*} objContext 
 * @param {*} arrClassTeacher 
 * @summary   Returns the classes filtered on the basis of Main teacher and active teachers.
 */
function GetFilteredClass(objContext, arrClassTeacher) {
    let arrTempClassTeacher = arrClassTeacher.filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" && objTempClassTeacher.cIsDeleted === "N" });
    let arrCT = [];
    if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
        let arrTempTeachers = GetTeachers(objContext);
        arrTempClassTeacher.forEach(objTempClassTeacher => {
            if (arrTempTeachers.filter(objTeacher => { return objTeacher.uTeacherId === objTempClassTeacher.uTeacherId }).length > 0) {
                arrCT = [...arrCT, objTempClassTeacher];
            }
        });
    }
    else
        if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
            arrCT = arrTempClassTeacher.filter(objTempClassTeacher => { return objTempClassTeacher["uTeacherId"] === objContext.props.Data.ClientUserDetails.UserId });
        }
    return arrCT;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} intActivationStatusToggle 
 * @param {*} uTeacherId 
 * @summary   Returns array of classes based on Activation Status and Teacher.
 */
export function GetClasses(objContext, strExcludeClassId, uTeacherId) {
    let arrClasses = [];
    if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
        let strSchoolId = objContext.state.objSelectedSchool ? objContext.state.objSelectedSchool["uSchoolId"] : objContext.props.Data.ClientUserDetails.UserId;
        let arrTempClasses = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uschoolid;" + strSchoolId).Data;
        Logger.Log('...............Classes', arrTempClasses);
        arrClasses = arrTempClasses.map(objTempClass => { return { ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: GetFilteredClass(objContext, objTempClass["t_TestDrive_Member_Class_Teacher"]) } })
            .filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0).filter(objTempClass => { return objTempClass.uClassId !== strExcludeClassId && objTempClass["t_TestDrive_Member_Class_Teacher"][0].uTeacherId === uTeacherId });
    }
    else if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
        let arrTempClasses = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.Data.ClientUserDetails.UserId).Data;
        Logger.Log('...............Classes', arrTempClasses);
        arrClasses = arrTempClasses.map(objTempClass => { return { ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: GetFilteredClass(objContext, objTempClass["t_TestDrive_Member_Class_Teacher"]) } })
            .filter(objTempClass => { return objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0 && objTempClass.uClassId !== strExcludeClassId && objTempClass["t_TestDrive_Member_Class_Teacher"][0].uTeacherId === objContext.props.Data.ClientUserDetails.UserId });
    }
    Logger.Log('...............Filtered Classes', arrClasses);
    return arrClasses;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the check box selection changes
 */
export function HandleOnCheckBoxItemChange(objContext, strValue, isChecked) {
    if (strValue === "AllPupil" && isChecked) {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": true, "arrSelectedPupil": [], "strValidationMessage": "" } })
    }
    else if (strValue === "AllPupil" && !isChecked) {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": false, "arrSelectedPupil": [], "strValidationMessage": "" } })
    }
    else if (strValue !== "AllPupil" && isChecked) {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": false, "arrSelectedPupil": [strValue, ...objContext.state.arrSelectedPupil], "strValidationMessage": "" } })
    }
    else if (strValue !== "AllPupil" && !isChecked) {
        if (objContext.state.isSelectAll) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": false, "arrSelectedPupil": [strValue] } })
        }
        else {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": false, "arrSelectedPupil": objContext.state.arrSelectedPupil.filter(pupil => { return pupil !== strValue }), "strValidationMessage": "" } })
        }
    }
    if (objContext.state.objValidationResult["ValidatedField"] === "pupilSelection") {
        let objValidationResult = {
            "IsValid": true,
            "ValidatedField": "",
            "ValidationMessage": ""
        };
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidationResult": objValidationResult } });
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the teacher dropdown selection changes
 */
export function HandleOnChangeTeacherDropDown(objContext, objTeacherData) {
    Logger.Log("..........dropdown item", objTeacherData);
    // let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/classandpupil/pupil").Data[0]["Pupil"];
    let arrClasses = GetClasses(objContext, objContext.props.Data.PresentClass.uClassId, objTeacherData.uTeacherId);
    // let arrClassesForDropDown = [{...arrClasses[0], "uClassId": "", "vClassName": objTextResource["ClassDropDownItem1"], ["t_testdrive_member_class_teacher"]: []}, ...arrClasses];
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrClassData": arrClasses, "SelectedTeacherId": objTeacherData.uTeacherId, "SelectedClassId": "" } });
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the class dropdown selection changes
 */
export function HandleOnChangeClassDropDown(objContext, objClassData) {
    Logger.Log("..........dropdown item", objClassData);
    if (objContext.state.objValidationResult["ValidatedField"] === "div_classDropdown") {
        let objValidationResult = {
            "IsValid": true,
            "ValidatedField": "",
            "ValidationMessage": ""
        };
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "SelectedClassId": objClassData.uClassId, "objValidationResult": objValidationResult } });
    }
    else {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "SelectedClassId": objClassData.uClassId } });
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if all the conditions are staisfied for moving the pupil, returns a json object.
 */
function CheckIdAllConditionsAreSatisfiedForMovingPupil(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/classandpupil/pupil").Data[0]["Pupil"];
    if (objContext.state.SelectedClassId !== "") {
        if (objContext.state.arrSelectedPupil.length > 0) {
            return {
                "IsValid": true,
                "ValidatedField": "",
                "ValidationMessage": ""
            };
        }
        else {
            return {
                "IsValid": false,
                "ValidatedField": "pupilSelection",
                "ValidationMessage": objTextResource["MovePupilPopUpNoPupilSelectedErrorText"]
            };
        }
    }
    else {
        return {
            "IsValid": false,
            "ValidatedField": "div_classDropdown",
            "ValidationMessage": objTextResource["MovePupilPopUpNoClassSelectedErrorText"]
        };
    }
};

function GetTargetSchoolId(objContext) {
    let strSchoolId = "";
    if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
        strSchoolId = objContext.state.objSelectedSchool ? objContext.state.objSelectedSchool.uSchoolId : objContext.props.Data.ClientUserDetails.UserId;
    } else {
        strSchoolId = objContext.props.Data.ClientUserDetails.TeacherDetails.uSchoolId;
    }

    return strSchoolId;
}

function GetSchoolIdByApplicationType(props) {
    let strUserId = props.Data.ClientUserDetails.UserId;
    console.log("application type id", props.Data.ClientUserDetails.ApplicationTypeId);
    if (props.Data.ClientUserDetails.ApplicationTypeId == "1") {
        strUserId = props.Data.ClientUserDetails.TeacherDetails.uSchoolId;
    }
    return strUserId;
}

function GetTargetTeacherId(objContext) {
    let { props } = objContext;
    let strUserId = props.Data.ClientUserDetails.UserId;
    console.log("application type id", props.Data.ClientUserDetails.ApplicationTypeId);
    if (props.Data.ClientUserDetails.ApplicationTypeId === "6") {
        strUserId = objContext.state.SelectedTeacherId;
    }
    return strUserId;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Creates call parameters to Move pupil and calls the API.
 */
export function MovePupil(objContext) {
    let objValidationResult = CheckIdAllConditionsAreSatisfiedForMovingPupil(objContext)
    if (objValidationResult["IsValid"]) {
        let arrPupilId = objContext.state.arrSelectedPupil.map(ppl => {
            return {
                uPupilId: ppl
            }
        })

        let objPupilParams = {
            "SourceClassId": objContext.props.Data.PresentClass.t_TestDrive_Member_Class_Teacher[0].uClassId,
            "TargetClassId": objContext.state.SelectedClassId,
            "PupilJson": arrPupilId, //array of pupil id's           
            "AddDuplicatePupil": objContext.state.blnDuplicatePupilPresent ? "Y" : "N",
            "blnMoveSchool": objContext.props.JConfiguration.ApplicationTypeId === "6",
            "SourceSchoolId": GetSchoolIdByApplicationType(objContext.props),
            "TargetSchoolId": GetTargetSchoolId(objContext),
            "TargetTeacherId": GetTargetTeacherId(objContext)
        };
        let arrParams =
            [
                {
                    "URL": "API/Extranet/Pupil/MovePupil",
                    "Params": objPupilParams
                }
            ];
        ApplicationState.SetProperty("blnShowAnimation", true);
        DataCall(arrParams, objContext);
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnIsMovePupilAttempted": true } });
    }
    else {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidationResult": objValidationResult } });
        Logger.Log("ValidationMessage");
    }
};

/**
 * @summary Returns Initial state of the component.
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrPupilData: [],
        arrSelectedPupil: [],
        isSelectAll: false,
        arrClassData: [],
        SelectedTeacherId: "",
        SelectedClassId: "",
        objValidationResult: {},
        strValidationMessage: "",
        blnIsMovePupilAttempted: false,
        objSelectedSchool: undefined,
        blnDuplicatePupilPresent: false

    };
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export const Reducer = (state, action) => {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        case "SET_STATE_VALUES":
            return {
                ...state,
                ...action.payload
            };
    }
};

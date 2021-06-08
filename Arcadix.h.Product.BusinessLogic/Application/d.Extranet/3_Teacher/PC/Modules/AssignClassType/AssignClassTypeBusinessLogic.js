import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        console.log("mapping");
        return {
            class: DataRef(state.Entity, "class", true),
            pupil: DataRef(state.Entity, "pupil", true),
            textresource: DataRef(state.Entity, "textresource", true),
            subject: DataRef(state.Entity, "subject", true),
            classtype: DataRef(state.Entity, "classtype", true),
            pupilsubjectclasstype: DataRef(state.Entity, "pupilsubjectclasstype", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        return {};
    }
}

export function InitialDataParams(JConfiguration, props) {
    let iStateId = props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].iStateId;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objGetClassesParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
            "Type": "nested"
        },
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
                                            "t_TestDrive_Member_Class_Teacher.cIsDeleted": "N"
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        },
        "SortKeys": [],
        "OutputColumns": []
    };

    let objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/AssignClassType"
                    }
                }
            ]
        }
    };

    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        },
        "SearchQuery": {},
        "SortKeys": [],
        "OutputColumns": []
    };

    let objSubjectsParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                },
                {
                    "match": {
                        "cIsHighStakeSubject": "Y"
                    }
                },
                {
                    "match": {
                        "iParentSubjectId": 0
                    }
                }
            ]
        },
        "SortKeys": [],
        "OutputColumns": []
    };

    let objClassTypeParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "iStateId": iStateId
                    }
                }
            ]
        },
        "SortKeys": [],
        "OutputColumns": []
    };

    let objAssignedClassTypeParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        },
        "SearchQuery":
        {
        },
        "SortKeys": [],
        "OutputColumns": []
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/Teacher/Class",
            "Params": objGetClassesParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true
        },
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objSubjectsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Teacher/ClassType",
            "Params": objClassTypeParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Pupil/PupilSubjectClassType",
            "Params": objAssignedClassTypeParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrDataRequest };
}

export function useDataLoadForClassChange(objContext) {
    let GetDataAfterClassChange = () => {
        if (objContext.state.isLoadComplete == true) {
            let strClassId = objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher[0].uClassId;
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                    "Type": "nested"
                },
                "SearchQuery": {},
                "SortKeys": [],
                "OutputColumns": []
            };

            let objAssignedClassTypeParams = {

                "ForeignKeyFilter": {
                    "uClassId": strClassId
                },
                "SearchQuery":
                {
                },
                "SortKeys": [],
                "OutputColumns": []
            };

            let arrDataRequest = [
                {
                    "URL": "API/Object/Extranet/Pupil/Pupil",
                    "Params": objPupilParams,
                    "MethodType": "Get"
                },
                {
                    "URL": "API/Object/Pupil/PupilSubjectClassType",
                    "Params": objAssignedClassTypeParams,
                    "MethodType": "Get"
                }
            ];
            DataCall(arrDataRequest);
        }
    };
    useEffect(GetDataAfterClassChange, [objContext.state.objSelectedClass]);
}

export function useDataLoadForPupil(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
            if (DataRef(objContext.props.pupilsubjectclasstype, "pupilsubjectclasstype;uclassid;" + strClassId) &&
                DataRef(objContext.props.pupil, "pupil;t_testdrive_member_class_pupil.uclassid;" + strClassId)) {
                objContext.dispatch({ type: 'Change_Status', payload: false });
            }
        }
    }, [objContext.props.pupil, objContext.props.pupilsubjectclasstype]);
}

export function OnchangeSubject(objContext, objSubject) {
    objContext.dispatch({ type: 'Update_Subject', payload: objSubject });
}

export function OnChangeClass(objContext, objItem) {
    objContext.dispatch({ type: "Update_SelClass", payload: objItem });
}

export function DataCall(objParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
    });
}

export function FormAssignClassTypeData(objContext,arrPupilData, arrClassTypeData, arrAssignedClassTypeData, iSubjectId) {
    let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
    let arrManipulatedData = arrPupilData.map((objPupilData, pInx) => {
        let objAssignedType = arrAssignedClassTypeData.find((objAssignedClassTypeData, actIdx) => objAssignedClassTypeData["uPupilId"] == objPupilData["uPupilId"] && objAssignedClassTypeData["uClassId"] == strClassId && iSubjectId == objAssignedClassTypeData["iSubjectId"]);
        return {
            uPupilId: objPupilData["uPupilId"],
            vPupilName: objPupilData["vFirstName"],
            uPupilSubjectClassTypeId: objAssignedType ? objAssignedType.uPupilSubjectClassTypeId : '00000000-0000-0000-0000-000000000000',
            arrClassTypeData: arrClassTypeData.map((objClassType, ctIdx) => {
                return {
                    iClassTypeId: objClassType["iClassTypeId"],
                    isSelected: arrAssignedClassTypeData.find((objAssignedClassTypeData, actIdx) => objAssignedClassTypeData["uPupilId"] == objPupilData["uPupilId"] && objClassType["iClassTypeId"] == objAssignedClassTypeData["iClassTypeId"] && iSubjectId == objAssignedClassTypeData["iSubjectId"]) ? true : false
                };
            })
        };
    });
    return arrManipulatedData;
}

export function UpdateStateOnClickCheckBox(objContext, value, objPupil, objClassType, index) {
    let arrManipulatedData = objContext.state.arrManipulatedClassTypeData.map((objClassTypeData, pInx) => {
        if (objClassTypeData["uPupilId"] == objPupil["uPupilId"]) {
            return {
                ...objClassTypeData,
                arrClassTypeData: objClassTypeData.arrClassTypeData.map(objClassData => {
                    if (objClassData["iClassTypeId"] == objClassType["iClassTypeId"]) {
                        return {
                            ...objClassData,
                            isSelected: value
                        };
                    } else {
                        return {
                            ...objClassData,
                            isSelected: false
                        };
                    }
                })
            };
        } else {
            return {
                ...objClassTypeData
            };
        }
    });
    objContext.dispatch({ type: 'Update_Data', payload: { arrManipulatedData: arrManipulatedData, objSelectedClassType: objClassType, indexOfClassType: index}  })
}

export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(GetRequiredData, []);
}

export function ToggleAllPupil(objContext, objClassType, value, iIndex) {
    let arrManipulatedData = objContext.state.arrManipulatedClassTypeData.map((objClassTypeData, pIdx) => {
        return {
            ...objClassTypeData,
            arrClassTypeData: objClassTypeData.arrClassTypeData.map((objClassData, objClassDataIndex) => {
                if (objClassDataIndex == iIndex) {
                    return {
                        ...objClassData,
                        isSelected: value
                    };
                }
                else {
                    return {
                        ...objClassData,
                        isSelected: false
                    };
                }
            })
        };
    });
    objContext.dispatch({ type: 'Update_Data', payload: { arrManipulatedData: arrManipulatedData, objSelectedClassType: objClassType, indexOfClassType: iIndex } });
}

export function GetModifiedClassTypeData(arrClassTypeData) {
    let arrModifiedClassTypeData = arrClassTypeData.map(objClassData => {
        return {
            ...objClassData,
            isSelected: false
        };
    });
    return arrModifiedClassTypeData;
}

export function useSelectAllClassType(objContext) {
    useEffect(() => { }, objContext.state.selectAll);
}

export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let iStateId = objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].iStateId;
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId + ";t_testdrive_member_class_teacher.cisdeleted;n") &&
            DataRef(objContext.props.pupil, "pupil;t_testdrive_member_class_pupil.uclassid;" + strClassId) &&
            DataRef(objContext.props.subject, "subject;cisdeleted;n;cishighstakesubject;y;iparentsubjectid;0") &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/assignclasstype") &&
            DataRef(objContext.props.classtype, "classtype;istateid;" + iStateId) &&
            DataRef(objContext.props.pupilsubjectclasstype, "pupilsubjectclasstype;uclassid;" + strClassId)
        ) {
            let objSubject = DataRef(objContext.props.subject, "subject;cisdeleted;n;cishighstakesubject;y;iparentsubjectid;0")["Data"][0];
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({
                type: "DATA_LOAD_COMPLETE", payload: {
                    isLoadComplete: true,
                    strUserPreferenceClassId: strClassId,
                    objUserPreference: objUserPreference,
                    iStateId: iStateId,
                    objSelectedSubject: objSubject
                }
            });
        }
        else {
            console.log("data is loading");
        }
    },
        [
            objContext.props.classtype,
            objContext.props.subject,
            objContext.props.class,
            objContext.props.pupil,
            objContext.props.textresource,
            objContext.props.pupilsubjectclasstype
        ]);
}

export function SaveData(objContext) {
    let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
    let arrSelectedPupil = objContext.state.arrManipulatedClassTypeData.map((objClassTypeData, pIdx) => {
        return {
            uPupilId: objClassTypeData.uPupilId,
            uClassId: strClassId,
            uPupilSubjectClassTypeId: objClassTypeData.uPupilSubjectClassTypeId,
            iSubjectId: objContext.state.objSelectedSubject.iSubjectId,
            iClassTypeId: objClassTypeData["arrClassTypeData"].find(ct => ct.isSelected == true).iClassTypeId
        };
    });

    let objAssignedClassTypeParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        },
        "SearchQuery":
        {
        },
        "vEditData": arrSelectedPupil
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/Pupil/PupilSubjectClassType",
            "Params": objAssignedClassTypeParams,
            "MethodType": "Put"
        }
    ];
    DataCall(arrDataRequest);
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        objSelectedClass: undefined,
        objSelectedSubject: undefined,
        strUserPreferenceClassId: undefined,
        objUserPreference: undefined,
        iStateId: undefined,
        blnDataLoaded: false,
        arrManipulatedClassTypeData: [],
        arrClassTypeData: [],
        objSelectedClassType:undefined,
        intIndexOfClassType:-1
    };
}

export function Reducer(state, action) {
    switch (action.type) {
        case 'DATA_LOAD_COMPLETE': {
            return {
                ...state,
                ["isLoadComplete"]: action.payload.isLoadComplete,
                ["strUserPreferenceClassId"]: action.payload.strUserPreferenceClassId,
                ["objUserPreference"]: action.payload.objUserPreference,
                ["iStateId"]: action.payload.iStateId,
                ["objSelectedSubject"]: action.payload.objSubject
            };
        }
        case 'Update_ManipulatedData': {
            return {
                ...state,
                arrManipulatedClassTypeData: action.payload.arrManipulatedClassTypeData,
                blnDataLoaded: true,
                arrClassTypeData: action.payload.arrClassTypeData
            };
        }

        case 'Update_Data': {
            return {
                ...state,
                arrManipulatedClassTypeData: action.payload.arrManipulatedData,
                objSelectedClassType: action.payload.objSelectedClassType,
                intIndexOfClassType: action.payload.indexOfClassType
            };
        }
        case "Update_SelClass": {
            return {
                ...state,
                objSelectedClass: action.payload

            };
        }

        case "Change_Status": {
            return {
                ...state,
                blnDataLoaded: action.payload
            };
        }

        case "Update_Subject": {
            return {
                ...state,
                blnDataLoaded: false,
                objSelectedSubject: action.payload
            };
        }
    }
}



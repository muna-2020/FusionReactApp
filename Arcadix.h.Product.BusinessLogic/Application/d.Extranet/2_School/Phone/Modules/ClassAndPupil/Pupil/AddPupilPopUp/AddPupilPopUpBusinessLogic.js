import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import { useEffect } from 'react';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        //Logger.Log("Mapping Pupil");
        return {
            objClassAndPupil: state.ApplicationState.ClassAndPupil,
            pupil: DataRef(state.Entity, "pupil", true),
            class: DataRef(state.Entity, "class", true),
            classgroup: DataRef(state.Entity, "classgroup", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
            textresource: DataRef(state.Entity, "textresource", true)          
        };
    }
    else {
        //Logger.Log("not mapping pupil");
        return {};
    }
};

export function InitialDataParams(JConfiguration, props) {
    let arrParams = [];
    return { "DataCalls": arrParams };
};

function DataCall(arrParams, objContext) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { isInitialLoadComplete: false } })
    });
};

function DataCallForSavePupil(arrParams, objContext) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { isInitialLoadComplete: false } })
    });
};

export function GetPupilDisplayData(objContext) {
    let strSchoolId = objContext.props.Data.ClientUserDetails.TeacherDetails.uSchoolId;
    let strClassId = "";
    if (!objContext.state.isClassChanged && objContext.props.objClassAndPupil) {
        let objData = objContext.props.objClassAndPupil["SelectedClassData"];
        strClassId = objData["uClassId"];
    } else {
        strClassId = objContext.state.objSelClass.uClassId;
    }

    //if(!objContext.state.isInitialLoadComplete || objContext.)
    let arrSchoolPupil = DataRef(objContext.props.pupil, "pupil;t_testdrive_member_school_pupil.uschoolid;" + strSchoolId)["Data"];

    let arrClassPupil = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
    let arrFilteredPupil = [];
    if (arrClassPupil) {
        for (let schlPpl of arrSchoolPupil) {
            let objClassPupil = arrClassPupil.find(ppl => ppl["uPupilId"] == schlPpl["uPupilId"]);
            if (objClassPupil == undefined) {
                arrFilteredPupil = [...arrFilteredPupil, { ...schlPpl, isSelected: false, selectedClassGroup: undefined }];
            }
        }
        let arrSorted = arrFilteredPupil.sort((a, b) => {
            if (a["vName"] < b["vName"]) {
                return -1;
            } else if (a["vName"] > b["vName"]) {
                return 1;
            } else {
                return 0;
            }
        })
        console.log("lenght of pupil", arrFilteredPupil.length);
        objContext.dispatch({
            type: 'SET_STATE_VALUES', payload: {
                arrPupilDisplayData: arrSorted,
                isInitialLoadComplete: true,
                isFirstNameAscending: true,
                isNameAscending: true,
                arrAllPupilDisplayData: arrSorted
            }
        });
    }
}

export function GetClassDropDownData(props) {
    let strSchoolId = props.Data.ClientUserDetails.TeacherDetails.uSchoolId;
    let arrClassData = DataRef(props.class, "class;t_testdrive_member_class_teacher.uschoolid;" + strSchoolId).Data;
    let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
    arrClassData.forEach((objClass) => {
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
            "Title": "ClassTeacher", //objTextResource.ClassTeacherTextForDropDown,
            "Data": arrMainClassData
        },
        {
            "Title": "CoTeacher",//objTextResource.CoTeacherTextForDropDown,
            "Data": arrCoTeacherClassData
        },
        {
            "Title": "CoTeacher",//objTextResource.SubjectExpertTeacherTextForDropDown,
            "Data": arrSubjectExpertClassData
        }
    ];
    //Logger.Log("................Final Data", arrFinalClassData);
    return [...arrFinalClassData];
}

export function useDataLoaderForClassChange(objContext) {
    useEffect(() => {
        if (objContext.state.isClassChanged) {
            let strClassId = objContext.state.objSelClass["uClassId"];
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                    "Type": "nested"
                }
            };
            let objParams = [
                {
                    "URL": "API/Object/Extranet/Pupil/Pupil",
                    "Params": objPupilParams,
                    "MethodType": "Get"
                }
            ];
            DataCall(objParams, objContext);
        }

    }, [objContext.state.objSelClass]);
}

export function OnChangeClass(objContext, objClass) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSelClass: objClass, isClassChanged: true, isInitialLoadComplete: false, strSelectedAllPupilName: '' } })
}

export function MarkAll(objContext, value) {
    let arrPupilDisplayData = objContext.state.arrPupilDisplayData.map(ppl => {
        return { ...ppl, isSelected: value }
    });
    let strName = GetSelectedPupilNameString(arrPupilDisplayData);
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { arrPupilDisplayData: arrPupilDisplayData, strSelectedAllPupilName: strName, showValidationMessage:false } });
}

export function OnChangeClassGroup(objContext, objGroup, objPupil) {
    let arrPupilDisplayData = objContext.state.arrPupilDisplayData.map(ppl => {
        if (objPupil["uPupilId"] == ppl["uPupilId"]) {
            return { ...ppl, selectedClassGroup: objGroup };
        } else {
            return { ...ppl };
        }
    });
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { arrPupilDisplayData: arrPupilDisplayData } });
}

export function Sort(objContext, strSortBy, strSortStateVariable) {
    let isAscending = !objContext.state[strSortStateVariable];
    let arrPupilDisplayData = [];
    if (isAscending) {
        arrPupilDisplayData = objContext.state.arrPupilDisplayData.sort((a, b) => {
            if (a[strSortBy] < b[strSortBy]) {
                return -1;
            } else if (a[strSortBy] > b[strSortBy]) {
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        arrPupilDisplayData = objContext.state.arrPupilDisplayData.sort((a, b) => {
            if (b[strSortBy] < a[strSortBy]) {
                return -1;
            } else if (b[strSortBy] > a[strSortBy]) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { arrPupilDisplayData: arrPupilDisplayData, [strSortStateVariable]: isAscending } });
}

export function OnChangeSearchBox(objContext, event) {
    let { name, value } = event.target;
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { [name]: value } })
}

export function Search(objContext, strSearchKey, strSearchValue, showIconVariableName) {
    if (strSearchValue != '') {
        let arrPupilDisplayData = objContext.state.arrPupilDisplayData.filter(ppl => ppl[strSearchKey].includes(strSearchValue));
        objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { arrPupilDisplayData: arrPupilDisplayData, [showIconVariableName]: false } });
    }
}

export function Close(objContext) {
    let arrPupil = objContext.state.arrAllPupilDisplayData.map(ppl => { return { ...ppl } });
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { arrPupilDisplayData: arrPupil, showNameSearchIcon: true, showFirstNameSearchIcon: true, strSearchName: '', strSearchFirstName: '' } });
}

export function GetSelectedPupilNameString(arrPupilData) {
    let arrFilteredData = arrPupilData.filter(ppl => ppl["isSelected"] == true);
    let strSelectedAllPupilName = '';
    let x = 1;
    for (let ppl of arrFilteredData) {
        strSelectedAllPupilName += ppl["vName"];
        if (arrFilteredData.length > 1 && arrFilteredData.length != x) {
            strSelectedAllPupilName += ', ';
        }
        x++;
    }
    return strSelectedAllPupilName;
}

export function Save(objContext, isClose = false) {
    let arrSelectedData = objContext.state.arrPupilDisplayData.filter(ppl => ppl["isSelected"] == true);
    if (arrSelectedData && arrSelectedData.length > 0) {
        let strClassId = '';
        if (!objContext.state.isClassChanged && objContext.props.objClassAndPupil) {
            let objData = objContext.props.objClassAndPupil["SelectedClassData"];
            strClassId = objData["uClassId"];
        } else {
            strClassId = objContext.state.objSelClass.uClassId;
        }
        let arrSaveData = arrSelectedData.map(ppl => {
            return {
                uPupilId: ppl["uPupilId"],
                t_TestDrive_Member_Class_Pupil: [{
                    uClassId: strClassId,
                    cIsArchive: 'N',
                    uClassGroupId: ppl["selectedClassGroup"] ? ppl["selectedClassGroup"]["uClassGroupId"] : undefined
                }]
            }
        })
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "vEditData": arrSaveData,
            "uUserId": objContext.props.Data.ClientUserDetails.UserId
        };
        let arrParams =
            [
                {
                    "URL": "API/Object/Extranet/Pupil/Pupil",
                    "Params": objPupilParams,
                    "MethodType": "Put"
                }
            ];
        DataCallForSavePupil(arrParams, objContext);
        if (isClose) {
            objContext.props.closePopUp(objContext.props.objModal);
        }
        console.log("save pupil data", arrSaveData);
    }
    else {
        objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { showValidationMessage:true } });
    }
}


/**
 * @summary Returns Initial state of the component.
 */
export function GetInitialState(props) {
    return {
        isClassChanged: false,
        isInitialLoadComplete: false,
        arrPupilDisplayData: [],
        arrAllPupilDisplayData: [],
        isFirstNameAscending: true,
        isNameAscending: true,
        strSearchName: '',
        strSearchFirstName: '',
        showNameSearchIcon: true,
        showFirstNameSearchIcon: true,
        strSelectedAllPupilName: '',
        showValidationMessage:false
    };
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export const Reducer = (state, action) => {
    switch (action.type) {
        case "SET_STATE_VALUES":
            return {
                ...state,
                ...action.payload
            };
    }
};
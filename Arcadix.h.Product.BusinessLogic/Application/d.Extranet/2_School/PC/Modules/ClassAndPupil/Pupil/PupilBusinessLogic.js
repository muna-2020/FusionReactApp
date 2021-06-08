import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            objClassAndPupil: state.ApplicationState.ClassAndPupil,
            pupil: DataRef(state.Entity, "pupil", true),
            gender: DataRef(state.Entity, "gender", true),
            class: DataRef(state.Entity, "class", true),
            classgroup: DataRef(state.Entity, "classgroup", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        return {};
    }
}

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
function DataCall(arrParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        //Do something
    });
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the pupil's data is loaded to props and then set the component state accordingly.  
 */
export function useDataLoaderForPupilData(objContext) {
    useLayoutEffect(() => {
        let objData = GetClassDataFromApplicationState(objContext);
        if (objData && JSON.stringify(objData) !== "{}") {
            let strClassId = objData["uClassId"];
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
            DataCall(objParams);
        }
    }, [objContext.props.objClassAndPupil]);
}

export function useDataLoaderForSchoolPupilData(objContext) {
    useLayoutEffect(() => {
        if (IsAdminTeacher(objContext)) {
            let strSchoolId = GetSchoolIdByApplicationType(objContext.props);
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_School_Pupil.uSchoolId": strSchoolId,
                    "Type": "nested"
                },
            };

            let objParams = [
                {
                    "URL": "API/Object/Extranet/Pupil/Pupil",
                    "Params": objPupilParams,
                    "MethodType": "Get"
                }
            ];
            DataCall(objParams);
        }

    }, []);
}

export function GetSchoolIdByApplicationType(props) {
    let strSchoolId = props.ClientUserDetails.UserId;
    if (props.ClientUserDetails.ApplicationTypeId == "1") {
        strSchoolId = props.ClientUserDetails.TeacherDetails.uSchoolId;
    }
    return strSchoolId;
}

function IsAdminTeacher(objContext) {
    let blnAdminTeacher = false;
    if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
        if (objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y") {
            blnAdminTeacher = true;
        }
    }
    return blnAdminTeacher;
}

function CheckDataLoadedForSchoolPupil(objContext) {
    let isDataLoaded = false;
    if (IsAdminTeacher(objContext)) {
        let strSchoolId = GetSchoolIdByApplicationType(objContext.props);
        if (DataRef(objContext.props.pupil, "pupil;t_testdrive_member_school_pupil.uschoolid;" + strSchoolId)) {
            isDataLoaded = true;
        }
    } else {
        isDataLoaded = true;
    }

    return isDataLoaded;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data(text resource, grid config, class group, gender) is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let objClassData = GetClassDataFromApplicationState(objContext);

    
    useEffect(() => {
        if (objClassData && JSON.stringify(objClassData) !== "{}" &&
            DataRef(objContext.props.gender) &&
            DataRef(objContext.props.classgroup, "classgroup;cisdeleted;n") &&
            DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + objClassData["uClassId"]) &&
            CheckDataLoadedForSchoolPupil(objContext)) {
            console.log("pupil business logic useDataLoaded");
            let arrPupilData = GetPupil(objContext, objContext.state.intActivationStatusTogglValue);
            ApplicationState.SetProperty("blnShowAnimation", false);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupilGridData": arrPupilData, "isNewRowAdded": false, "objClass": GetClassDataFromApplicationState(objContext) } });
        }
    }, [objContext.props.pupil, objContext.props.gender, objContext.props.classgroup, objContext.props.objClassAndPupil]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the Selected class data from application state.
 */
export function GetClassDataFromApplicationState(objContext) {
    let objData;
    if (objContext.props.objClassAndPupil) {
        objData = objContext.props.objClassAndPupil["SelectedClassData"];
    }
    return objData;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns an array of pupil. 
 */
export function GetPupil(objContext, intStatusToggle = -1) {
    console.log("Get pupil from pupil bussiness logic is calling");
    let objClassData = GetClassDataFromApplicationState(objContext);
    let arrTempPupil = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + objClassData["uClassId"]).Data;
    let arrPupil = [];
    //Logger.Log('...............Pupil', arrPupil);
    if (intStatusToggle === 1) {
        arrPupil = arrTempPupil.map(objTempPupil => {
            return {
                ...objTempPupil, ["t_TestDrive_Member_Class_Pupil"]: objTempPupil["t_TestDrive_Member_Class_Pupil"]
                    .filter(objTempClassPupil => { return objTempClassPupil["cIsDeleted"] === "N" && objTempClassPupil["cIsArchive"] === "N" && objTempClassPupil["uClassId"] === objClassData["uClassId"] })
            };
        })
            .filter(objTempPupil => objTempPupil["t_TestDrive_Member_Class_Pupil"].length > 0);
    }
    else if (intStatusToggle === 2) {
        arrPupil = arrTempPupil.map(objTempPupil => {
            return {
                ...objTempPupil, ["t_TestDrive_Member_Class_Pupil"]: objTempPupil["t_TestDrive_Member_Class_Pupil"]
                    .filter(objTempClassPupil => { return objTempClassPupil["cIsDeleted"] === "Y" && objTempClassPupil["cIsArchive"] === "N" && objTempClassPupil["uClassId"] === objClassData["uClassId"] })
            };
        })
            .filter(objTempPupil => objTempPupil["t_TestDrive_Member_Class_Pupil"].length > 0);
    }
    else {
        arrPupil = arrTempPupil.map(objTempPupil => {
            return {
                ...objTempPupil, ["t_TestDrive_Member_Class_Pupil"]: objTempPupil["t_TestDrive_Member_Class_Pupil"]
                    .filter(objTempClassPupil => { return objTempClassPupil["uClassId"] === objClassData["uClassId"] && objTempClassPupil["cIsArchive"] === "N" })
            };
        }).filter(objTempPupil => objTempPupil["t_TestDrive_Member_Class_Pupil"].length > 0);
    }
    //Logger.Log('...............Filtered pupil', arrPupil);
    return arrPupil;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Add a new default pupil to the present array of pupil.
 */
export function AddPupil(objContext) {
    let objClassData = GetClassDataFromApplicationState(objContext);
    let arrClassGroup = DataRef(objContext.props.classgroup, "classgroup;cisdeleted;n").Data;
    let arrGender = DataRef(objContext.props.gender).Data;
    let arrPupil = GetPupil(objContext, -1);
    let objPupil = {
        ...arrPupil[0],
        iGenderId: arrGender[0].iGenderId,
        vFirstName: "",
        vName: "",
        vBirthdate: "",
        vEmail: "",
        uUserId: objContext.props.ClientUserDetails.UserId,
        iLanguageId: objContext.props.JConfiguration.InterfaceLanguageId,
        iMainClientId: objContext.props.ClientUserDetails.MainClientId,
        t_TestDrive_Member_Class_Pupil: [{
            uClassId: objClassData["uClassId"],
            cIsDeleted: "N",
            cIsArchive: "N",
            uClassGroupId: arrClassGroup[0].uClassGroupId,
            uTeacherId: objClassData["t_TestDrive_Member_Class_Teacher"][0]["uTeacherId"],
            uSchoolId: objClassData["t_TestDrive_Member_Class_Teacher"][0]["uSchoolId"],
            iStateId: objClassData["t_TestDrive_Member_Class_Teacher"][0]["iStateId"],
            cIsCoTeacher: objClassData["t_TestDrive_Member_Class_Teacher"][0]["cIsCoTeacher"],
            cIsSubjectExpert: objClassData["t_TestDrive_Member_Class_Teacher"][0]["cIsSubjectExpert"]
        }],
        t_TestDrive_Member_School_Pupil: [{
            uSchoolId: objClassData["t_TestDrive_Member_Class_Teacher"][0]["uSchoolId"],
            cIsDeleted: "N",
            cIsAdmin: "N",
            iStateId: objClassData["t_TestDrive_Member_Class_Teacher"][0]["iStateId"]
        }],
        cIsNew: "Y",
        strMode: "Edit"
    };
    objContext.dispatch({ type: "ADD_NEW_PUPIL", payload: objPupil });
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objPupilData 
 * @summary   Save the new Pupil.
 */
export function SavePupil(objContext, objPupilData) {
    let objClassData = GetClassDataFromApplicationState(objContext);
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": objClassData["uClassId"],
            "Type": "nested"
        },
        "vAddData": objPupilData,
        "uUserId": objContext.props.ClientUserDetails.UserId
    };
    let arrParams =
        [
            {
                "URL": "API/Object/Extranet/Pupil/Pupil",
                "Params": objPupilParams,
                "MethodType": "Post"
            }
        ];
    DataCall(arrParams);
    ApplicationState.SetProperty("blnShowAnimation", true);
};

/**
 * 
 * @param {*} objContext 
 * @param {*} arrPupilData 
 * @summary   Activate and Edit pupil
 */
export function EditPupil(objContext, arrPupilData) {
    let objClassData = GetClassDataFromApplicationState(objContext);
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": objClassData["uClassId"],
            "Type": "nested"
        },
        "vEditData": arrPupilData,
        "uUserId": objContext.props.ClientUserDetails.UserId
    };
    let arrParams =
        [
            {
                "URL": "API/Object/Extranet/Pupil/Pupil",
                "Params": objPupilParams,
                "MethodType": "Put"
            }
        ];
    DataCall(arrParams);
    ApplicationState.SetProperty("blnShowAnimation", true);
}

/**
 * 
 * @param {*} objContext 
 * @param {*} arrPupilData 
 * @summary   De-Activate Pupil
 */
export function DeletePupil(objContext, arrPupilData) {
    let objClassData = GetClassDataFromApplicationState(objContext);
    let objPupilParams =
    {
        "ForeignKeyFilter":
        {
            "t_TestDrive_Member_Class_Pupil.uClassId": objClassData["uClassId"],
            "Type": "nested"
        },
        "vDeleteData": arrPupilData
    };
    let arrParams =
        [
            {
                "URL": "API/Object/Extranet/Pupil/Pupil",
                "Params": objPupilParams,
                "MethodType": "Delete"
            }
        ];
    DataCall(arrParams);
    ApplicationState.SetProperty("blnShowAnimation", true);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returs an array for Activation Status Toggle dropdown
 */
export function GetActivationStatusToggleData(objContext) {
    let objTextResource = objContext.props.TextResource;
    let arrActivationStatusToggleData = [
        { key: objTextResource["PupilDropdownAllItem"], value: -1 },
        { key: objTextResource["PupilDropdownActiveItem"], value: 1 },
        { key: objTextResource["PupilDropdownInactiveItem"], value: 2 }
    ];
    return arrActivationStatusToggleData;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Get Coulmns Headers for the grid which are passed to the grid.
 */
export function GetColumns(objContext) {
    let arrGridColumns = objContext.props.GridConfiguration["t_Framework_ObjectConfiguration_Column"];
    if (objContext.props.ClientUserDetails.ApplicationTypeId == "1") {
        if (objContext.props.ClientUserDetails.TeacherDetails.cIsExternal && objContext.props.ClientUserDetails.TeacherDetails.cIsExternal == "Y") {
            arrGridColumns = objContext.props.GridConfiguration["t_Framework_ObjectConfiguration_Column"].filter(itm => itm["vColumnName"] != "Edit");
        }
    }
    return arrGridColumns;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gives dropdown data to be displayed in the grid which are passed to the grid.
 */
export function GetDropdownData(objContext) {
    let objDropdownData = {};
    if (objContext.state.arrPupilGridData && objContext.state.arrPupilGridData.length > 0) {
        objDropdownData = {
            iGenderId:
            {
                "cISLanguageDependent": "Y",
                "ValueColumn": "iGenderId",
                "DisplayColumn": "vGenderName",
                "DependingTableName": "t_TestDrive_Member_Gender_Data",
                "Data": DataRef(objContext.props.gender).Data
            },
            "t_TestDrive_Member_Class_Pupil.uClassGroupId": {
                "cISLanguageDependent": "Y",
                "ValueColumn": "uClassGroupId",
                "DisplayColumn": "vGroupName",
                "DependingTableName": "t_TestDrive_Member_Class_Group_Data",
                "Data": DataRef(objContext.props.classgroup, "classgroup;cisdeleted;n").Data
            }
        };
        //Logger.Log("........dropdown data", objDropdownData);
    }
    return objDropdownData;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gives Buttons on the top of the grid which are passed to the grid.
 */
export function GetHeaderButtons(objContext, maxHeight, maxWidth, minHeight, minWidth) {
    let objClassData = GetClassDataFromApplicationState(objContext);
    let objTextResource = objContext.props.TextResource;
    let arrHeaderButonData = [];
    let cIsExternalUser = false;
    if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
        cIsExternalUser = (objContext.props.ClientUserDetails.TeacherDetails.cIsExternal && objContext.props.ClientUserDetails.TeacherDetails.cIsExternal == "Y") ? true : false;
    }
    if (objContext.state.intActivationStatusTogglValue !== 2 && objClassData["uClassId"] !== "00000000-0000-0000-0000-000000000000" && objClassData["t_TestDrive_Member_Class_Teacher"][0]["cIsDeleted"] === "N" && !cIsExternalUser) {
        let objAddHeaderButonData = {
            "Key": "Add",
            "Type": "Type",
            "Text": (IsAdminTeacher(objContext)) ? objTextResource["ExternalAddButtonText"] : objTextResource["AddButtonText"],
            "Image": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/pluswhite.svg",
            "Action": () => {
                if (IsAdminTeacher(objContext)) {
                    objContext.props.showPopup({
                        MaxHeight: maxHeight,
                        MaxWidth: maxWidth,
                        popUpMinHeight: minHeight,
                        popUpMinWidth: minWidth,
                        showHeader: false,
                        popUpName: 'addpupilpopup',
                        passedEvents: {},
                        headerTitle: '',
                        popupClassName: "move-pupil-parent",
                        Data: {
                            JConfiguration: objContext.props.JConfiguration,
                            ClientUserDetails: objContext.props.ClientUserDetails
                        }
                    });
                } else {
                    if (!objContext.state.isNewRowAdded) { AddPupil(objContext); }
                }

            }
        };
        let objMovePupilHeaderButonData = {};
        let arrDeActivaedPupil = objContext.state.arrPupilGridData.filter(objTempDetails => { return objTempDetails["t_TestDrive_Member_Class_Pupil"][0]["cIsDeleted"] === "N" });
        if (objContext.state.arrPupilGridData.length > 0 && arrDeActivaedPupil.length > 0) {
            objMovePupilHeaderButonData = {
                "Key": "MovePupil",
                "Type": "Type",
                "Text": objTextResource["MovePupilButtonText"],
                "ClassName": "grey-button",
                "Image": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/movePupil.svg",
                "Action": () => {
                    ApplicationState.SetProperty("blnShowAnimation", true);
                    objContext.props.showPopup({
                        MaxHeight: maxHeight,
                        MaxWidth: maxWidth,
                        popUpMinHeight: minHeight,
                        popUpMinWidth: minWidth,
                        showHeader: false,
                        popUpName: 'movepupilpopup',
                        passedEvents: {},
                        headerTitle: '',
                        popupClassName: "move-pupil-parent",
                        Data: {
                            PupilData: objContext.state.arrPupilGridData,
                            PresentClass: objClassData,
                            ClientUserDetails: objContext.props.ClientUserDetails
                        }
                    });
                }
            };
        }
        else {
            objMovePupilHeaderButonData = {
                "Key": "MovePupil",
                "Type": "Type",
                "Text": objTextResource["MovePupilButtonText"],
                "ClassName": "grey-button",
                "Image": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/movePupil.svg",
                "Action": () => {
                    objContext.props.showPopup({
                        MaxHeight: '233px',
                        MaxWidth: '380px',
                        popUpMinHeight: '233px',
                        popUpMinWidth: '380px',
                        popUpName: 'errorpupilpopup',
                        passedEvents: {},
                        headerTitle: '',
                        Data: {}
                    });
                }
            };
        }

        arrHeaderButonData = [objAddHeaderButonData, objMovePupilHeaderButonData];
    }
    return arrHeaderButonData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns ACTIVATE AND DEACTIVATE buttons which are passed to the grid.
 */
export function GetActionButtons(objContext) {
    let objTextResource = objContext.props.TextResource;
    return {
        "Activate": {
            "Key": "Activate",
            "Type": "Activate",
            "Text": objTextResource["ActivateButtonText"],
            "Action": (ActionObject) => {
                //Logger.Log("........Activate action object", ActionObject.ActionObjectToActivate);
                // ActionObject.ActionObjectToActivate.t_TestDrive_Member_Class_Pupil[0].cIsDeleted = "N";
                let arrPupilDataToEdit = [{
                    "uPupilId": ActionObject.ActionObjectToActivate["uPupilId"],
                    "t_TestDrive_Member_Class_Pupil": [{
                        ["cIsDeleted"]: "N",
                        ["uClassId"]: ActionObject.ActionObjectToActivate["t_TestDrive_Member_Class_Pupil"][0]["uClassId"]
                    }]
                }];
                EditPupil(objContext, arrPupilDataToEdit);
            }
        },
        "Deactivate": {
            "Key": "Deactivate",
            "Type": "Deactivate",
            "Text": objTextResource["DeactivateButtonText"],
            "Action": (ActionObject) => {
                //Logger.Log("........De-Activate action object", ActionObject.ActionObjectToDeactivate);
                let arrPupilDataToDelete = [{
                    "uPupilId": ActionObject.ActionObjectToDeactivate["uPupilId"],
                    "uClassId": ActionObject.ActionObjectToDeactivate["t_TestDrive_Member_Class_Pupil"][0]["uClassId"]
                }];
                DeletePupil(objContext, arrPupilDataToDelete);
            }
        }
    };
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objSaveData 
 * @summary   Toggle objSaveData for new/edited pupil and calls EditClass or SaveClass.
 */
export function SaveMethod(objContext, objSaveData) {
    if (!objSaveData["cIsNew"]) {
        EditPupil(objContext, [objSaveData]);
    }
    else {
        SavePupil(objContext, objSaveData);
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Delete the newly added pupil.
 */
export function DeleteEmptyRow(objContext) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupilGridData": GetPupil(objContext, objContext.state.intActivationStatusTogglValue), "isNewRowAdded": false } });
};

/**
 * 
 * @param {*} objClass 
 * @summary   Log pupil data
 */
export function HandleOnClickRow(objPupilData) {
    if (!objPupilData.cIsNew) {
        //Logger.Log("......pupil object clicked", objPupilData);
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary Fired when the dropdown data of activation status dropdown chamges. Toggle between All, Active and Inactive pupil.
 */
export function HandleStatusToggle(objContext, objItem) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupilGridData": GetPupil(objContext, objItem.value), "intActivationStatusTogglValue": objItem.value, "isNewRowAdded": false } });
};

/**
 * @summary Returns Initial state of the component.
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        isNewRowAdded: false,
        arrPupilGridData: [],
        intActivationStatusTogglValue: -1
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
        case "ADD_NEW_PUPIL":
            return {
                ...state,
                ["arrPupilGridData"]: [action.payload, ...state.arrPupilGridData],
                ["isNewRowAdded"]: true
            };
        case "SET_STATE_VALUES":
            return {
                ...state,
                ...action.payload
            };
    }
};

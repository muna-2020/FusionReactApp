import { useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            intranetadministrator: DataRef(state.Entity, "object_intranet_member_intranetadministrator", true)
        };
    }
    else {
        Logger.Log("not mapping class");
        return {};
    }
}

/**
* @param {*} objContext
* @summary Setting up TabData and RibbonData
*/
export function useInitializeRibbon(objContext) {
    let arrTabData = [
        { "text": "ACTIONS", "type": "ribbon" }
    ];
    let arrRibbonData = [
        {//Group1
            "vGroupName": objContext.props.Data.objTextResource["ToSave"],
            "t_GroupData": [
                {
                    "vTextName": objContext.props.Data.objTextResource["ToSave"],
                    "uImageUrl": "Save_Large.svg",
                    "type": "single",
                    "OnClick": () => {
                        AddMethod(objContext);
                    }
                },
                {
                    "vTextName": objContext.props.Data.objTextResource["SaveAndClose"],
                    "uImageUrl": "SaveAndClose_Large.svg",
                    "type": "single",
                    "OnClick": () => {
                        AddMethod(objContext, true);

                    }
                }
            ]
        }
    ];

    //this is done to update the reference 
    useEffect(() => {
        ApplicationState.SetProperty("PopupTabData", { "addeditintranetadministrator": arrTabData });
        ApplicationState.SetProperty("PopupRibbonData", { "addeditintranetadministrator": arrRibbonData });
    }, [objContext.state]);
}

/**
* @param {*} objContext
* @summary Setting up Content Data
*/
export function useInitializeTabs(objContext) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Data.objTextResource["RoleManagement"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Data.objTextResource["MainClientUser"],
                    "Id": "CompetencyLevel",
                    "Event": () => {
                        ShowDiv("MainClientUser", objContext);
                    }
                }
            ]
        }

        //include it later
        //{//Group1
        //    "Text": objContext.props.Data.objTextResource["Audit"],
        //    "Id": "NavId2",
        //    "Children": [
        //        {
        //            "Text": objContext.props.Data.objTextResource["Audit"],
        //            "Id": "Audit",
        //            "Event": () => { ObjValidationColumnTabMapping("Audit", objContext) }
        //        }
        //    ]
        //}
    ];
    useEffect(() => {
        ApplicationState.SetProperty("PopupNavigationData", { "addeditintranetadministrator": arrContentData });
    },
        []);
}

/**
* Setting up objData state and objValidationColumnTabMapping state
*/
export function useInitializeData(objContext) {
    //the key fields should be in serial order with the div it is present in
    var objValidationColumnTabMapping = {
        "vName": "MainClientUser",
        "vFirstName": "MainClientUser",
        "vEmail": "MainClientUser"
    };

    var objAddData = {
        "iMainClientId": objContext.props.Data.JConfiguration.MainClientId,
        "vName": "",
        "vFirstName": "",
        "vEmail": "",
        "cIsDeleted": "N",
        "vIPRestriction": null        
    };

    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
    //let objNewEditData = ModifyEditData(objContext, arrSelectedRows, objTempEditData);
    let tempObjData = objContext.props.Data.blnIsEdit ? objEditData : objAddData;

    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": tempObjData } });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidationColumnTabMapping": objValidationColumnTabMapping } });
    },
        []);
}

/**
* @param {*} strDivId
* @param {*} objContext
* Show div method to show different divs div when defferent competencies and audits are selected
*/
export const ShowDiv = (strDivId, objContext) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strDivToShow": strDivId } });
};

/**
* @param {*} strId
* @param {*} strValue
* @param {*} strId
* @param {*} objContext
* @param strLanguageId
* @param blnChecked
* @summary Handle change method to handle changes in the jsx elements
*/
export const HandleChange = (strId, strValue, objContext, strLanguageId = "", blnChecked = false) => {
    let objMetaData = GetObjectHeader(strId, objContext);
    var strCellName = strId;
    var objEditData = {};
    var objTempData = JSON.parse(JSON.stringify(objContext.state.objData));
    Object.keys(objContext.state.objData).map((strDataKey) => {
        switch (objMetaData["vColumnName"]) {
            case "cIsActive":
                if (blnChecked === true) {
                    objEditData[strDataKey] = strCellName === strDataKey ? "Y" : objTempData[strDataKey];
                } else {
                    objEditData[strDataKey] = strCellName === strDataKey ? "N" : objTempData[strDataKey];
                }
                break;

            case "cIspreselect":
                if (blnChecked === true) {
                    objEditData[strDataKey] = strCellName === strDataKey ? "Y" : objTempData[strDataKey];
                } else {
                    objEditData[strDataKey] = strCellName === strDataKey ? "N" : objTempData[strDataKey];
                }
                break;
            default:
                if (objMetaData["vColumnName"].split('.').length > 1) {
                    let strTableName = objMetaData["vColumnName"].split('.')[0];
                    let strColumnName = objMetaData["vColumnName"].split('.')[1];
                    let arrTemp = objContext.state.objData[strTableName].map((objSubject) => {
                        if (objSubject["iLanguageId"].toString() !== strLanguageId.toString()) {
                            return objSubject;
                        } else {
                            return { ...objSubject, [strColumnName]: strValue };
                        }
                    });
                    objEditData[strDataKey] = strCellName.split('.')[0] === strDataKey ? arrTemp : objTempData[strDataKey];
                }
                else {
                    objEditData[strDataKey] = strCellName === strDataKey ? strValue : objTempData[strDataKey];
                }
                break;
        }

    });

    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": objEditData } });

    var objNewValidationMessages = FieldValidator.OnValidateEditData(strValue, objMetaData, objContext.state.objValidationMessages);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidationMessages": objNewValidationMessages } });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strValidationMessage": objNewValidationMessages[strCellName] } });
};

/**
* @param {*} objContext
* hits the add/edit api after validation succeeds
*/
export const AddMethod = (objContext, blnClose = false) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnSaveClicked": true } });
    let arrMetaData = [GetObjectHeader("vName", objContext), GetObjectHeader("vFirstName", objContext), GetObjectHeader("vEmail", objContext)];
    var blnIsValid = true;
    var objValidationMessages = FieldValidator.GetValidationMessages(objContext.state.objValidationMessages, arrMetaData);
    Object.keys(objValidationMessages).map(item => {
        if (typeof objValidationMessages[item] == "string")
            blnIsValid = false;
    });
    if (blnIsValid) {
        let arrParams = [];
        if (objContext.props.Data.blnIsAdd && !objContext.state.blnAddedOnce) {
            let objIntranetAdministrtorParams = {
                "vAddData": objContext.state.objData
            };
            let arrParams = [
                {
                    "URL": "API/Object/Intranet/Member/IntranetAdministrator",
                    "Params": objIntranetAdministrtorParams,
                    "MethodType": "Post",
                    "UseFullName": true
                }];

            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, cIsNewData) {
                if (cIsNewData) {
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objIntranetAdministrator": objReturn[0] } });
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnAddedOnce": true } });
                    if (blnClose) {
                        objContext.props.closePopUp(objContext.props.objModal);
                    }
                }
            });
        } else {
            if (objContext.state.blnAddedOnce) {
                var objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
                objEditData["uMainClientUserId"] = objContext.state.objIntranetAdministrator["uMainClientUserId"];
            }
            let objIntranetAdministrtorParams = {
                "vEditData": objContext.state.blnAddedOnce ? [objEditData] : [objContext.state.objData]
            };
            arrParams = [...arrParams,
            {
                "URL": "API/Object/Intranet/Member/IntranetAdministrator",
                "Params": objIntranetAdministrtorParams,
                "MethodType": "Put",
                "UseFullName": true
            }];
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, cIsNewData) {
                if (cIsNewData) {
                    if (blnClose) {
                        ApplicationState.SetProperty("SelectedRows", []);
                        objContext.props.closePopUp(objContext.props.objModal);
                    }
                }
            });
        }
    }
    else {
        // it checks the objValidationColumnTabMapping's keys if it's present in objValidationMessages. If 1st match is found it shows the div having that attribute name
        let blnIsColumnNameFound = false;
        Object.keys(objContext.state.objValidationColumnTabMapping).map((strColumnnName) => {
            if (objValidationMessages[strColumnnName] && !blnIsColumnNameFound) {
                ShowDiv(objContext.state.objValidationColumnTabMapping[strColumnnName], objContext);
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strColumnNameDivIds": strColumnnName } });
                objContext.props.NavigateTabs(objContext.state.objValidationColumnTabMapping[strColumnnName]);
                blnIsColumnNameFound = true;
            }
        });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidationMessages": objValidationMessages } });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnShowValidationMessage": true } });
    }
};

/**
* @param {*} vColumnName
* @param {*} objContext
* return the respective object of the metadata
*/
export const GetObjectHeader = (vColumnName, objContext) => {
    return objContext.props.Data.arrHeaderData.filter((objHeader) => objHeader["vColumnName"] === vColumnName)[0];
};

/**
* @param {*} objContext
* @summary   Returns the validation fail message
*/
export const GetValidationMessage = (objContext) => {
    if (objContext.state.strValidationMessage === "number") {
        return objContext.props.Data.objTextResource["NumberValidationMessage"];
    } else if (objContext.state.strValidationMessage === "required") {
        return objContext.props.Data.objTextResource["RequireValidationMessage"];
    } 
};

export function GetInitialState() {
    return {
        isLoadComplete: false,
        objData: {},
        objIntranetAdministrator: {},
        blnAddedOnce: false,
        objValidationMessages: {},
        strValidationMessage: "",
        blnSaveClicked: false,
        blnShowValidationMessage: false,
        objValidationColumnTabMapping: {},
        strColumnNameDivIds: "",
        strDivToShow: "MainClientUser"
    };
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
    }
};
import { useEffect } from 'react';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            state: DataRef(state.Entity, "object_extranet_state_state", true)
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
        ApplicationState.SetProperty("PopupTabData", { "addeditstate": arrTabData });
        ApplicationState.SetProperty("PopupRibbonData", { "addeditstate": arrRibbonData });
    }, [objContext.state]);
}

/**
* @param {*} objContext
* @summary Setting up Content Data
*/
export function useInitializeTabs(objContext) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Data.objTextResource["General"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Data.objTextResource["StateManagement"],
                    "Id": "StateManagement",
                    "Event": () => {
                        ShowDiv("StateManagement", objContext);
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
        //            "Event": () => { ShowDiv("LogoUpload", objContext) }
        //        }
        //    ]
        //}
    ];
    useEffect(() => {
        ApplicationState.SetProperty("PopupNavigationData", { "addeditstate": arrContentData });
    },
        []);
}

/**
* @param {*} objContext
* @summary Setting up objData state and objValidationColumnTabMapping state
*/
export function useInitializeData(objContext) {
    //the key fields should be in serial order with the div it is present in
    var objValidationColumnTabMapping = {
        "iDisplayOrder": "StateManagement"
    };
    var objAddData = {
        "iDisplayOrder": null,
        "iMainClientId": objContext.props.Data.JConfiguration.MainClientId,
        "iStateNumberForTestToken": null,
        "iTitleId": null,
        "vFirstName": "",
        "vName": "",
        "vLongName": "",
        "cIsDeleted": "N",        
        "uUserId": objContext.props.Data.ClientUserDetails.UserId,
        "t_TestDrive_Member_State_Data": GetMultiLanguageData(objContext)["arrMultiLanguageData"]
    };
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    let objTempEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
    let objNewEditData = ModifyEditData(objContext, arrSelectedRows, objTempEditData);

    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": objContext.props.Data.blnIsEdit ? objNewEditData : objAddData } });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidationColumnTabMapping": objValidationColumnTabMapping } });
    }, []);
}

/**
* @param {*} objContext
* @summary GetMultiLanguageData to form the two arrays arrMultiLanguageData and arrMultiLanguageDetails
*/
export function GetMultiLanguageData(objContext) {
    let arrClientLanguageId = [];
    let arrMultiLanguageData = [];
    let arrMultiLanguageDetails = [];
    if (objContext.props.Data.MainClientLanguageData && objContext.props.Data.LanguageData) {
        objContext.props.Data.MainClientLanguageData.map((objMainClientLanguage) => {
            arrClientLanguageId = [...arrClientLanguageId, objMainClientLanguage["iLanguageId"]];
        });

        objContext.props.Data.LanguageData.map((objLanguage) => {
            if (arrClientLanguageId.includes(objLanguage["iFrameworkLanguageId"])) {
                let obj = {
                    "iLanguageId": objLanguage["iFrameworkLanguageId"],
                    "vShortStateName": "",
                    "vStateName": ""
                };
                arrMultiLanguageData = [...arrMultiLanguageData, obj];
                arrMultiLanguageDetails = [...arrMultiLanguageDetails, objLanguage];
            }
        });
    }
    return { arrMultiLanguageData, arrMultiLanguageDetails };
}

/**
* @param {*} objContext
* @param {*} arrSelectedRows
* @param {*} objTempEditData
* @summary modifying the subject table of edit row data to sync with multi language data
*/
export function ModifyEditData(objContext, arrSelectedRows, objTempEditData) {
    let arrSubjectData = [];
    let objNewEditData = {};
    if (objContext.props.Data.blnIsEdit && arrSelectedRows) {
        let arrMultiLanguageData = GetMultiLanguageData(objContext)["arrMultiLanguageData"];
        arrMultiLanguageData.map((objMultiLanguageData) => {
            let arrTempSubjectData = objTempEditData["t_TestDrive_Member_State_Data"].filter((objTableData) => objTableData["iLanguageId"].toString() === objMultiLanguageData["iLanguageId"].toString());
            if (arrTempSubjectData.length > 0) {
                arrSubjectData = [...arrSubjectData, arrTempSubjectData[0]];
            } else {
                arrSubjectData = [...arrSubjectData, objMultiLanguageData];
            }
        });
        objNewEditData = { ...objTempEditData, "t_TestDrive_Member_State_Data": arrSubjectData };
    }
    return objNewEditData;
}

/**
* @param {*} arrSubjectFieldName
* @param {*} objField
* @param {*} objContext
* @summary   Gets the datas for the dropdown
*/
export const GetDropDownData = (objContext) => {

    var arrDropDownData = [], blnIsLanguageDependent = "", strDisplayColumn = "", strDependingTableName = "", strValueColumn = "";
    var objDropDownData = GetAddEditDropdownObject(objContext);
    arrDropDownData = objDropDownData["Data"];
    blnIsLanguageDependent = objDropDownData["cISLanguageDependent"];
    strDependingTableName = objDropDownData["DependingTableName"];
    strDisplayColumn = objDropDownData["DisplayColumn"];
    strValueColumn = objDropDownData["ValueColumn"];
    const objDataDropDown = JSON.parse(JSON.stringify(objContext.state.objData));
    return { arrDropDownData, blnIsLanguageDependent, strDisplayColumn, strDependingTableName, strValueColumn, objDataDropDown };
};

/**
* @param {*} objContext
* @summary Return subject dropdown object
*/
function GetAddEditDropdownObject(objContext) {
    let objDropDownData = {
        "cISLanguageDependent": "Y",
        "ValueColumn": "iTitleId",
        "DisplayColumn": "vTitleName",
        "DependingTableName": "t_TestDrive_Member_Title_Data",
        "Data": []
    };

    //let objMainTitleData = {
    //    "iTitleId": -1,
    //    "iDisplayOrder": null,
    //    "t_TestDrive_Member_Title_Data": [
    //        {
    //            "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId,
    //            "iTitleId": -1,
    //            "vTitleName": objContext.props.Data.objTextResource["PleaseChoose"],
    //            "cIsTranslatedBySystem": null
    //        }
    //    ]
    //};

    //objDropDownData["Data"] = [...objDropDownData["Data"], objMainTitleData];
    objContext.props.Data.arrTitleData.map((objTitleData) => {
        objDropDownData["Data"] = [...objDropDownData["Data"], objTitleData];
    });
    return objDropDownData;
}   

/**
* @param {*} objContext
* @summary Show div method to show different divs div when defferent competencies and audits are selected
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
    let objMetaData = GetObjectHeader(strId, objContext.props);
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
            case "cIsTestedAtThisTime":
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
                    let arrTemp = objContext.state.objData[strTableName].map((objState) => {
                        if (objState["iLanguageId"].toString() !== strLanguageId.toString()) {
                            return objState;
                        } else {
                            return { ...objState, [strColumnName]: strValue };
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
* @param {*} objChangeData 
* @param {*} props 
* @param {*} objContext
* @summary   To change the row Data on change of the dropdown value
*/
export const DropDownChange = (objChangeData, props, objContext) => {
    var strCellName = props["ValueColumn"];
    var objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
    if (objChangeData[strCellName] === -1) {
        objEditData["iTitleId"] = null;
    } else {
        objEditData["iTitleId"] = objChangeData[strCellName];
    }
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": objEditData } });
};

/**
*@param {*} objContext
* @summary hits the add/edit api after validation succeeds
*/
export const AddMethod = (objContext, blnClose = false) => {

    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnSaveClicked": true } });
    let arrMetaData = [GetObjectHeader("iDisplayOrder", objContext.props)];
    var blnIsValid = true;
    var objValidationMessages = FieldValidator.GetValidationMessages(objContext.state.objValidationMessages, arrMetaData);
    Object.keys(objValidationMessages).map(item => {
        if (typeof objValidationMessages[item] == "string")
            blnIsValid = false;
    });
    if (blnIsValid) {
        let arrParams = [];
        if (objContext.props.Data.blnIsAdd && !objContext.state.blnAddedOnce) {
            arrParams = [...arrParams,
            {
                "URL": "API/Object/Extranet/State/State",
                "Params": { "vAddData": objContext.state.objData },
                "MethodType": "Post",
                "UseFullName": true
            }];

            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, cIsNewData) {

                if (cIsNewData) {
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objState": objReturn[0] } });
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnAddedOnce": true } });
                    if (blnClose) {
                        objContext.props.closePopUp(objContext.props.objModal);
                    }
                }
            });

        } else {
            if (objContext.state.blnAddedOnce) {
                var objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
                objEditData["iStateId"] = objContext.state.objState["iStateId"];
            }
            arrParams = [...arrParams,
            {
                "URL": "API/Object/Extranet/State/State",
                "Params": { "vEditData": objContext.state.blnAddedOnce ? objEditData : objContext.state.objData },
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
* @param {*} props
* @summary return the respective object of the metadata which matches the vColumnName
*/
export const GetObjectHeader = (vColumnName, props) => {
    return props.Data.arrHeaderData.filter((objHeader) => objHeader["vColumnName"] === vColumnName)[0];
};

/**
* @param {*} arrSubjectFieldName
* @param {*} objField
* @param {*} objContext
* @summary   Gets the language names for multi language datas
*/
export const GetLanguageName = (arrSubjectFieldName, objField, objContext) => {
    if (arrSubjectFieldName.length > 1) {
        return GetMultiLanguageData(objContext)["arrMultiLanguageDetails"].filter((objMultiLanguageDetails) =>
            objMultiLanguageDetails["iFrameworkLanguageId"].toString() === objField["iLanguageId"].toString())[0]["vLanguageCultureInfo"];
    } else {
        return "";
    }
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
        objState: {},
        objData: {},
        objValidationMessages: {},
        strValidationMessage: "",
        blnAddedOnce: false,
        blnSaveClicked: false,
        blnShowValidationMessage: false,
        objValidationColumnTabMapping: {},
        strColumnNameDivIds: "",
        strDivToShow: "StateManagement"
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
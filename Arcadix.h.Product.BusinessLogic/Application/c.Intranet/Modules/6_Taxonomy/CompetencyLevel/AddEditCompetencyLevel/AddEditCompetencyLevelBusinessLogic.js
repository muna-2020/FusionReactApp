import { useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            category: DataRef(state.Entity, "object_intranet_taxonomy_competencylevel", true)
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
                       AddMethod(objContext)
                    }
                },
                {
                    "vTextName": objContext.props.Data.objTextResource["SaveAndClose"],
                    "uImageUrl": "SaveAndClose_Large.svg",
                    "type": "single",
                    "OnClick": () => {
                       AddMethod(objContext, true)

                    }
                }
            ]
        },
    ];

    //this is done to update the reference 
    useEffect(() => {
        console.log("useEffect useInitializeRibbon ")
        ApplicationState.SetProperty("PopupTabData", { "addeditcompetencylevel": arrTabData });
        ApplicationState.SetProperty("PopupRibbonData", { "addeditcompetencylevel": arrRibbonData });
    }, [objContext.state]);
}

/**
* @param {*} objContext
* @summary Setting up Content Data
*/
export function useInitializeTabs(objContext) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Data.objTextResource["CompetencyLevel"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Data.objTextResource["CompetencyLevel"],
                    "Id": "CompetencyLevel",
                    "Event": () => {
                        //ShowDiv("CompetencyLevel", objContext)
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
        ApplicationState.SetProperty("PopupNavigationData", { "addeditcompetencylevel": arrContentData });
    },
        [])
}

/**
* Setting up objData state and objValidationColumnTabMapping state
*/
export function useInitializeData(objContext) {
    //the key fields should be in serial order with the div it is present in
    var objValidationColumnTabMapping = {
        "iDisplayOrder": "CompetencyLevel",
    }

    var objAddData = {
        "iCompetencyRangeId": null,
        "iMainClientId": objContext.props.Data.JConfiguration.MainClientId,
        "iDisplayOrder": null,
        "cIsDeleted": "N",
        "iSubjectId": objContext.props.Data.intSubjectDropdownSelectedValue,
        "t_testdrive_Category_Competency_CompetencyLevel_Data": GetMultiLanguageData(objContext)["arrMultiLanguageData"]
    };

    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")
    let objTempEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {}
    let objNewEditData = ModifyEditData(objContext, arrSelectedRows, objTempEditData)
    let tempObjData = objContext.props.Data.blnIsEdit ? objNewEditData : objAddData

    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": tempObjData } });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidationColumnTabMapping": objValidationColumnTabMapping } });
    },
        [])
}

/**
* GetMultiLanguageData to form the two arrays arrMultiLanguageData and arrMultiLanguageDetails
*/
export function GetMultiLanguageData(objContext) {
    let arrClientLanguageId = []
    let arrMultiLanguageData = []

    let arrMultiLanguageDetails = []
    if (objContext.props.Data.MainClientLanguageData && objContext.props.Data.LanguageData) {
        objContext.props.Data.MainClientLanguageData.map((objMainClientLanguage) => {
            arrClientLanguageId = [...arrClientLanguageId, objMainClientLanguage["iLanguageId"]]
        })

        objContext.props.Data.LanguageData.map((objLanguage) => {
            if (arrClientLanguageId.includes(objLanguage["iFrameworkLanguageId"])) {
                let obj = {
                    "iLanguageId": objLanguage["iFrameworkLanguageId"],
                    "cCompetencyLevel": ""
                }
                arrMultiLanguageData = [...arrMultiLanguageData, obj]
                arrMultiLanguageDetails = [...arrMultiLanguageDetails, objLanguage]
            }

        })
    }
    return { arrMultiLanguageData, arrMultiLanguageDetails }
}

/**
 * @param {*} props
* modifying the subject table of edit row data to sync with multi language data
 */
export function ModifyEditData(objContext, arrSelectedRows, objTempEditData) {
    let arrSubjectData = []
    let objNewEditData = {}
    if (objContext.props.Data.blnIsEdit && arrSelectedRows) {
        let arrMultiLanguageData = GetMultiLanguageData(objContext)["arrMultiLanguageData"]
        arrMultiLanguageData.map((objMultiLanguageData) => {
            let arrTempSubjectData = objTempEditData["t_testdrive_Category_Competency_CompetencyLevel_Data"].filter((objTableData) => objTableData["iLanguageId"].toString() === objMultiLanguageData["iLanguageId"].toString())
            if (arrTempSubjectData.length > 0) {
                arrSubjectData = [...arrSubjectData, arrTempSubjectData[0]]
            } else {
                arrSubjectData = [...arrSubjectData, objMultiLanguageData]
            }
        })
        objNewEditData = { ...objTempEditData, "t_testdrive_Category_Competency_CompetencyLevel_Data": arrSubjectData }
    }
    return objNewEditData
}

/**
* @param {*} strDivId
* @param {*} objContext
* Show div method to show different divs div when defferent competencies and audits are selected
*/
export const ShowDiv = (strDivId, objContext) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strDivToShow": strDivId } });
}

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
    let objMetaData = GetObjectHeader(strId, objContext)
    var strCellName = strId;
    var objEditData = {};
    var objTempData = JSON.parse(JSON.stringify(objContext.state.objData))
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
                    let strTableName = objMetaData["vColumnName"].split('.')[0]
                    let strColumnName = objMetaData["vColumnName"].split('.')[1]
                    let arrTemp = objContext.state.objData[strTableName].map((objSubject) => {
                        if (objSubject["iLanguageId"].toString() !== strLanguageId.toString()) {
                            return objSubject
                        } else {
                            return { ...objSubject, [strColumnName]: strValue }
                        }
                    })
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
}

/**
* @param {*} objContext
* hits the add/edit api after validation succeeds
*/
export const AddMethod = (objContext, blnClose = false) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnSaveClicked": true } });
    let arrMetaData = [GetObjectHeader("iDisplayOrder", objContext)]
    var blnIsValid = true;
    var objValidationMessages = FieldValidator.GetValidationMessages(objContext.state.objValidationMessages, arrMetaData);
    Object.keys(objValidationMessages).map(item => {
        if (typeof objValidationMessages[item] == "string")
            blnIsValid = false;
    })
    if (blnIsValid) {
        let arrParams = []
        if (objContext.props.Data.blnIsAdd && !objContext.state.blnAddedOnce) {
            let objCompetencyRangeParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iSubjectId": objContext.props.Data.intSubjectDropdownSelectedValue.toString()
                            }
                        },
                    ]
                },
                "vAddData": objContext.state.objData
            };
            let arrParams = [
                {
                    "URL": "API/Object/Intranet/Taxonomy/CompetencyLevel",
                    "Params": objCompetencyRangeParams,
                    "MethodType": "Post",
                    "UseFullName": true
                }];

            console.log("arrParams ", arrParams)
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, cIsNewData) {
                if (cIsNewData) {
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objCompetencyLevel": objReturn[0] } });
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnAddedOnce": true } });
                    if (blnClose) {
                        objContext.props.closePopUp(objContext.props.objModal);
                    }
                }
            });
        } else {
            if (objContext.state.blnAddedOnce) {
                var objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
                objEditData["iCompetencyLevelId"] = objContext.state.objCompetencyLevel["iCompetencyLevelId"];
            }
            let objCompetencyRangeParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iSubjectId": objContext.props.Data.intSubjectDropdownSelectedValue.toString()
                            }
                        },
                    ]
                },
                "vEditData": objContext.state.blnAddedOnce ? objEditData : objContext.state.objData
            };
            arrParams = [...arrParams,
            {
                "URL": "API/Object/Intranet/Taxonomy/CompetencyLevel",
                "Params": objCompetencyRangeParams,
                "MethodType": "Put",
                "UseFullName": true
            }];
            console.log("arrParams ", arrParams)
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, cIsNewData) {
                if (cIsNewData) {
                    if (blnClose) {
                        ApplicationState.SetProperty("SelectedRows", [])
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
                ShowDiv(objContext.state.objValidationColumnTabMapping[strColumnnName], objContext)
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strColumnNameDivIds": strColumnnName } });
                objContext.props.NavigateTabs(objContext.state.objValidationColumnTabMapping[strColumnnName])
                blnIsColumnNameFound = true;
            }
        });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidationMessages": objValidationMessages } });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnShowValidationMessage": true } });
    }

}

/**
* @param {*} vColumnName
* @param {*} objContext
* return the respective object of the metadata
*/
export const GetObjectHeader = (vColumnName, objContext) => {
    return objContext.props.Data.arrHeaderData.filter((objHeader) => objHeader["vColumnName"] === vColumnName)[0]
}

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
}

/**
* @param {*} objContext
* @summary   Returns the validation fail message
*/
export const GetValidationMessage = (objContext) => {
    if (objContext.state.strValidationMessage === "number") {
        return objContext.props.Data.objTextResource["NumberValidationMessage"]
    } else if (objContext.state.strValidationMessage === "required") {
        return objContext.props.Data.objTextResource["RequireValidationMessage"]
    } else {

    }
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        objData: {},
        objCompetencyLevel: {},
        blnAddedOnce: false,
        objValidationMessages: {},
        strValidationMessage: "",
        blnSaveClicked: false,
        blnShowValidationMessage: false,
        objValidationColumnTabMapping: {},
        strDivToShow: "CompetencyLevel",
    };
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            }
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
    }
}
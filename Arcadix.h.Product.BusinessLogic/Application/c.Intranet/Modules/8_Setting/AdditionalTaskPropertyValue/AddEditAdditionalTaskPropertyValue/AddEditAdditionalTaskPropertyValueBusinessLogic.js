import { useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            taskadditionalpropertyvalue: DataRef(state.Entity, "taskadditionalpropertyvalue", true),
            taskadditionalproperty: DataRef(state.Entity, "taskadditionalproperty", true)
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
        ApplicationState.SetProperty("PopupTabData", { "addeditadditionaltaskpropertyvalue": arrTabData });
        ApplicationState.SetProperty("PopupRibbonData", { "addeditadditionaltaskpropertyvalue": arrRibbonData });
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
            "Id": "General",
            "Children": [
                {
                    "Text": objContext.props.Data.objTextResource["General"],
                    "Id": "General",
                    "Event": () => {
                        ShowDiv("General", objContext)
                    }
                }
            ]
        },
        {//Group1
            "Text": objContext.props.Data.objTextResource["Audit"],
            "Id": "Audit",
            "Children": [
                {
                    "Text": objContext.props.Data.objTextResource["Audit"],
                    "Id": "Audit",
                    "Event": () => {
                        ShowDiv("Audit", objContext)
                    }
                }
            ]
        }
    ];
    useEffect(() => {
        ApplicationState.SetProperty("PopupNavigationData", { "addeditadditionaltaskpropertyvalue": arrContentData });
    },
        [])
}

/**
* Setting up objData state and objValidationColumnTabMapping state
*/
export function useInitializeData(objContext) {
    //the key fields should be in serial order with the div it is present in
    var objValidationColumnTabMapping = {
        "iOrderId": "General"
    }

    var objAddData = {
        "iAdditionalTaskPropertyValueId": null,
        "iAdditionalTaskPropertyId":objContext.props.Data.strSelectedPropertyId,
        "iMainClientId": objContext.props.Data.JConfiguration.MainClientId, //97,
        "iOrderId": null,
        "uUserId": objContext.props.Data.ClientUserDetails.UserId,
        "dtCreatedOn": null,
        "cIsDeleted": "N",
        "dtModifiedOn":null,
        "t_TestDrive_Task_AdditionalTaskProperty_Value_Data":GetMultiLanguageData(objContext)["arrMultiLanguageData"]
    };

    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")
    let objTempEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {}
    let objNewEditData = ModifyEditData(objContext, arrSelectedRows, objTempEditData)
    let tempObjData = objContext.props.Data.blnIsEdit ? objNewEditData : objAddData;

    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": tempObjData } });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidationColumnTabMapping": objValidationColumnTabMapping } });
    },[])
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
                let objDataTableItem = {
                    iLanguageId: objLanguage["iFrameworkLanguageId"],
                    vAdditionalTaskProperty: null
                }
                arrMultiLanguageData = [...arrMultiLanguageData, objDataTableItem]
                arrMultiLanguageDetails = [...arrMultiLanguageDetails, objLanguage]
            }


        })
    }
    return { arrMultiLanguageData, arrMultiLanguageDetails }
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
        if (objMetaData["vColumnName"].split('.').length > 1) {
            let strTableName = objMetaData["vColumnName"].split('.')[0]
            let strColumnName = objMetaData["vColumnName"].split('.')[1]
            let arrTemp = objContext.state.objData[strTableName].map((objPropertyValue) => {
                if (objPropertyValue["iLanguageId"].toString() !== strLanguageId.toString()) {
                    return objPropertyValue
                } else {
                    return { ...objPropertyValue, [strColumnName]: strValue }
                }
            })
            objEditData[strDataKey] = strCellName.split('.')[0] === strDataKey ? arrTemp : objTempData[strDataKey];
        }
        else {
            objEditData[strDataKey] = strCellName === strDataKey ? strValue : objTempData[strDataKey];
        }
    });
    var objNewValidationMessages = FieldValidator.OnValidateEditData(strValue, objMetaData, objContext.state.objValidationMessages);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": objEditData, "objValidationMessages": objNewValidationMessages, "strValidationMessage": objNewValidationMessages[strCellName] } });

}

/**
* @param {*} objContext
* hits the add/edit api after validation succeeds
*/
/**
* @param {*} objContext
* hits the add/edit api after validation succeeds
*/
export const AddMethod = (objContext, blnClose = false) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnSaveClicked": true } });
    let arrMetaData = [GetObjectHeader("iOrderId", objContext)]
    var blnIsValid = true;//Object.keys(objValidationMessages).length === 0 ? true:false;
    var objValidationMessages = FieldValidator.GetValidationMessages(objContext.state.objValidationMessages, arrMetaData);
    Object.keys(objValidationMessages).map(item => {
        if (typeof objValidationMessages[item] == "string")
            blnIsValid = false;
    })
    if (blnIsValid) {
        let arrParams = []
        if (objContext.props.Data.blnIsAdd && !objContext.state.blnAddedOnce) {
            let objAdditionalPropertyParams = {
                "vAddData": objContext.state.objData
            };
            // console.log("///",objAdditionalPropertyParams)
            arrParams = [...arrParams,
            {
                "URL": "API/Object/Intranet/TaskAdditionalPropertyValue",
                "Params": objAdditionalPropertyParams,
                "MethodType": "Post"
            }];


            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, cIsNewData) {
                if (cIsNewData) {
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objAdditionalProperty": objReturn[0] } });
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnAddedOnce": true } });
                    if (blnClose) {
                        objContext.props.closePopUp(objContext.props.objModal);
                    }
                }
            });
        } else {
            if (objContext.state.blnAddedOnce) {
                var objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
                objEditData["iAdditionalTaskPropertyValueId"] = objContext.state.objAdditionalProperty["iAdditionalTaskPropertyValueId"];
            }
            let objAdditionalPropertyParams = {
                "vEditData": objContext.state.blnAddedOnce ? objEditData : objContext.state.objData,
                "uUserId": objContext.props.Data.ClientUserDetails.UserId
            };
            arrParams = [...arrParams,
            {
                "URL": "API/Object/Intranet/TaskAdditionalPropertyValue",
                "Params": objAdditionalPropertyParams,
                "MethodType": "Put"
            }];
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
* @param {*} strDivId
* @param {*} objContext
* Show div method to show different divs div when defferent competencies and audits are selected
*/
export const ShowDiv = (strDivId, objContext) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strDivToShow": strDivId } });
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
            let arrTempSubjectData = objTempEditData["t_TestDrive_Task_AdditionalTaskProperty_Value_Data"].filter((objTableData) => objTableData["iLanguageId"].toString() === objMultiLanguageData["iLanguageId"].toString())

            if (arrTempSubjectData.length > 0) {
                arrSubjectData = [...arrSubjectData, arrTempSubjectData[0]]
            } else {
                arrSubjectData = [...arrSubjectData, objMultiLanguageData]
            }
        })
        objNewEditData = { ...objTempEditData, "t_TestDrive_Task_AdditionalTaskProperty_Value_Data": arrSubjectData }
    }
    return objNewEditData
}

/**
* @param {*} arrSubjectFieldName
* @param {*} objField
* @param {*} objContext
* @summary   Gets the language names for multi language datas
*/
export const GetLanguageName = (arrTaskPropertyFieldName, objField, objContext) => {
    if (arrTaskPropertyFieldName.length > 1) {
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
        null;
    }

}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        objData: {},
        blnAddedOnce: false,
        blnSaveClicked: false,
        strDivToShow: "General",
        objValidationMessages: {},
        blnShowValidationMessage: false,
        strValidationMessage: "",
        objAdditionalProperty: {}
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
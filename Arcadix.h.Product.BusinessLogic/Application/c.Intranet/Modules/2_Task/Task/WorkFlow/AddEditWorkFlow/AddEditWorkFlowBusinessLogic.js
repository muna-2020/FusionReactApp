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
           // Workflow: DataRef(state.Entity, "Workflow", true)
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
        ApplicationState.SetProperty("PopupTabData", { "addeditworkflow": arrTabData });
        ApplicationState.SetProperty("PopupRibbonData", { "addeditworkflow": arrRibbonData });
    }, [objContext.state]);
}

/**
* @param {*} objContext
* @summary Setting up Content Data
*/
export function useInitializeTabs(objContext) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Data.objTextResource["Workflow"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Data.objTextResource["Workflow"],
                    "Id": "WorflowDiv",
                    "Event": () => { ShowDiv("WorflowDiv", objContext) }
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
        //            "Event": () => { ShowDiv("Audit", objContext) }
        //        }
        //    ]
        //}
    ];
    useEffect(() => {
        ApplicationState.SetProperty("PopupNavigationData", { "addeditworkflow": arrContentData });
    },[]);
}

/**
* @param {*} objContext
* @summary Setting up objData state and objValidationColumnTabMapping state
*/
export function useInitializeData(objContext) {     
    useEffect(() => {
        var objAddData = {
            "uWorkflowTypeId": objContext.props.Data.strWorkflowTypeId,
            "iMainClientId": objContext.props.Data.JConfiguration.MainClientId,
            "cIsDeleted": "N",
            "t_TestDrive_Workflow_Data": GetMultiLanguageData(objContext)["arrMultiLanguageData"]
        };
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
        let objTempEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        let objNewEditData = ModifyEditData(objContext, arrSelectedRows, objTempEditData);
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": objContext.props.Data.blnIsAdd ? objAddData : objNewEditData } });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strWorkflowTypeId": objContext.props.Data.strWorkflowTypeId } });
    },[]);
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
            arrClientLanguageId = [...arrClientLanguageId, objMainClientLanguage["iLanguageId"]]
        });

        objContext.props.Data.LanguageData.map((objLanguage) => {
            if (arrClientLanguageId.includes(objLanguage["iFrameworkLanguageId"])) {
                let obj = {
                    "iLanguageId": objLanguage["iFrameworkLanguageId"],
                    "uWorkflowDataId": null,
                    "uWorkflowId": null,
                    "vName": null,
                    "vDescription": null
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
* @summary modifying the Workflow table of edit row data to sync with multi language data
*/
export function ModifyEditData(objContext, arrSelectedRows, objTempEditData) {
    let arrWorkflowData = [];
    let objNewEditData = {};
    if (!objContext.props.Data.blnIsAdd && arrSelectedRows) {
        let arrMultiLanguageData = GetMultiLanguageData(objContext)["arrMultiLanguageData"];
        arrMultiLanguageData.map((objMultiLanguageData) => {
            let arrTempWorkflowData = objTempEditData["t_TestDrive_Workflow_Data"].filter((objTableData) => objTableData["iLanguageId"].toString() === objMultiLanguageData["iLanguageId"].toString());
            if (arrTempWorkflowData.length > 0) {
                arrWorkflowData = [...arrWorkflowData, arrTempWorkflowData[0]];
            } else {
                arrWorkflowData = [...arrWorkflowData, objMultiLanguageData];
            }
        });
        objNewEditData = { ...objTempEditData, "t_TestDrive_Workflow_Data": arrWorkflowData };
    }
    return objNewEditData;
}

/**
* @param {*} objContext
* @summary Show div method to show different divs div when defferent competencies and audits are selected
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
    var objNewData;
    if(strId.split('.').length > 1){
        let strTableName = strId.split('.')[0];
        let strColumnName = strId.split('.')[1];
        let arrLanguageData = objContext.state.objData[strTableName].map((objItem) => {
                return objItem["iLanguageId"] == strLanguageId ? { ...objItem, [strColumnName]: strValue } : objItem
        })
        objNewData = {...objContext.state.objData,[strTableName]:arrLanguageData};
    }
    else
    {
        objNewData = {...objContext.state.objData,[strId]:strValue};
    }
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {objData : objNewData} });
    ValidateOnHandleChange(strId, strValue, objContext);    
}

const ValidateOnHandleChange = (strId, strValue, objContext)=>{   
    var objMetaData = GetObjectHeader(strId,objContext.props);
    var objNewValidationMessages = FieldValidator.OnValidateEditData(strValue, objMetaData, objContext.state.objValidationMessages);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidationMessages": objNewValidationMessages } });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strValidationMessage": objNewValidationMessages[strId] } });
}

/**
* @param {*} objChangeData 
* @param {*} props 
* @param {*} objContext
* @summary   To change the row Data on change of the dropdown value
*/
export const DropDownChange = (objChangeData, props, objContext) => {
    var strCellName = props["ValueColumn"];
    var objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
    if (objChangeData[strCellName] === -2) {
        objEditData["iParentWorkflowId"] = 0;
    } else {
        objEditData["iParentWorkflowId"] = objChangeData[strCellName];
    }
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": objEditData } });
}

/**
* @param {*} vColumnName
* @param {*} props
* @summary return the respective object of the metadata which matches the vColumnName
*/
export const GetObjectHeader = (vColumnName, props) => {
    return props.Data.arrHeaderData.filter((objHeader) => objHeader["vColumnName"] === vColumnName)[0];
}

export const GetRespectiveHeaders = (arrColumnNames, props) => {
    var arrHeaderData = arrColumnNames.map(vColumnName=>{
        return GetObjectHeader(vColumnName,props)
    })
    return arrHeaderData;
}

/**
*@param {*} objContext
* @summary hits the add/edit api after validation succeeds
*/
export const AddMethod = (objContext, blnClose = false) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnSaveClicked": true } });
    let arrMetaData = GetRespectiveHeaders(["t_TestDrive_Workflow_Data.vName"],objContext.props);
    var blnIsValid = true;
    var objValidationMessages = FieldValidator.GetValidationMessages(objContext.state.objValidationMessages, arrMetaData);
    var blnIsValid = Object.keys(objValidationMessages).length === 0 ? true:false;
    if (blnIsValid) {
        let arrParams = []
      
        if (objContext.props.Data.blnIsAdd && !objContext.state.blnAddedOnce) {
            arrParams = [
            {
                "URL": "API/Object/Intranet/Task/WorkFlow",
                "Params": {
                    //"SearchQuery": objSearchQuery,
                     "vAddData": objContext.state.objData,
                     "uUserId":objContext.props.Data.ClientUserDetails.UserId
                     },
                "MethodType": "Post"
            }];          
            
        }
        else {
            arrParams = [
            {
                "URL": "API/Object/Intranet/Task/WorkFlow",
                "Params": {
                     //"SearchQuery": objSearchQuery,
                     "vEditData": objContext.props.Data.blnIsAdd ? {...objContext.state.objData,"uWorkflowId":objContext.state.objSavedData["uWorkflowId"]} : objContext.state.objData,
                     "uUserId": objContext.props.Data.ClientUserDetails.UserId
                     },
                "MethodType": "Put"
            }];
            console.log("on add arrParams ", arrParams)
        }
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, blnAdded) {
            //Do something
            if (blnAdded) {
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objSavedData": objReturn[0] } });
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnAddedOnce": true } });
                    if (blnClose) {
                        objContext.props.closePopUp(objContext.props.objModal);
                    }
            }
        });
    }
    else {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: {objValidationMessages : objValidationMessages} });
    }

}

/**
* @param {*} arrWorkflowFieldName
* @param {*} objField
* @param {*} objContext
* @summary   Gets the language names for multi language datas
*/
export const GetLanguageName = (arrWorkflowFieldName, objField, objContext) => {
    if (arrWorkflowFieldName.length > 1) {
        return GetMultiLanguageData(objContext)["arrMultiLanguageDetails"].filter((objMultiLanguageDetails) =>
            objMultiLanguageDetails["iFrameworkLanguageId"].toString() === objField["iLanguageId"].toString())[0]["vLanguageCultureInfo"];
    } else {
        return "";
    }
}

export function GetInitialState() {
    return {
        objData: {},
        blnAddedOnce: false,
        blnSaveClicked: false,
        objValidationMessages: {},
        strWorkflowTypeId : -1,
        objSavedData : {},
        strDivToShow : "WorflowDiv"
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
}
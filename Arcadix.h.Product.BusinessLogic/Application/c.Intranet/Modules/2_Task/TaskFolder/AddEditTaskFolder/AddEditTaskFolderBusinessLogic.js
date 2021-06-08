import { useEffect, useCallback } from 'react';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            task: DataRef(state.Entity, "task", true),
            FolderId: state.ApplicationState.FolderId,
        };
    }
    else {
        console.log("not mapping class");
        return {};
    }
}

export function InitializeData(objContext) {
    
    let objEditData = objContext.props.Data.objSelectedRow;
    let objData = objContext.props.Data.blnIsAdd ? GetInitilaData(objContext) : objEditData;
    //if(!objContext.props.Data.blnIsAdd)
    objData = {...objData,"iTaskTypeId":1};
    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: {'objData':objData }});
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: {'objDropDownData': objContext.props.Data.objDropDownData }});
    },
    [])
    
}

function GetInitilaData(objContext){
    let objAddData = {
        "uUserId": objContext.props.Data.ClientUserDetails.UserId,
        "iPageParentFolderID":objContext.props.FolderId,
        // "dtModifiedOn":"2014-10-06T06:27:13.457",
        "t_CMS_FileSystem_PageFolder_Data" : GetMultiLanguageData(objContext)["arrMultiLanguageData"]
    }
    return objAddData;
}

export function SetApplicationState(objContext) {
    useEffect(()=>{
        const arrDivIds = GetDivIds();
        let arrRibbonData = [
            {
                Text: objContext.props.Data.objTextResource["Actions"],
                ToolBarData: [
                    {//Group1
                        "vGroupName": "to save",
                        "t_GroupData": [
                            {
                                "vTextName": "to save",
                                "uImageUrl": "Save_Large.svg",//"down.png",
                                "type": "single",
                                "OnClick": () => {
                                    AddMethod(objContext)
                                    //objContext.dispatch({ type: "SET_STATE_VALUES", payload: {blnAddedOnce : true} });
                                }
                            },
                            {
                                "vTextName": "Save and close",
                                "uImageUrl": "SaveAndClose_Large.svg",
                                "type": "single",
                                "OnClick": () => {
                                    //ref.current.AddMethod() 
                                    AddMethod(objContext, true);
                                }
                            }
                        ]
                    },
                ]
            }
        ];     
        
        let Navdata = [
            {//Group1
                "Text": objContext.props.Data.objTextResource["Folder"],
                "Id": "NavId1",
                "Children": [
                    {
                        "Text": objContext.props.Data.objTextResource["BaseData"],
                        "Id": arrDivIds[0],
                        "Event": () => { ShowSelectedDiv(arrDivIds[0]) }
                    }           
                ]
            }
        ]               
        objContext.props.SetOfficeRibbonData(arrRibbonData);
        objContext.props.SetNavigationData(Navdata);
    },[objContext.state])    
}

export function GetDivIds(){
    var arrDivIds = ["TaskDiv","ClassificationDiv","DevelopmentHistoryDiv","EmpiricalDataDiv","SubjectAreaDiv","AuditDiv"];
    return arrDivIds;
}

export function ShowSelectedDiv(DivId){
    var arrDivIds = GetDivIds();
    arrDivIds.map(id => {
        document.getElementById(id).style.display = id == DivId ? 'block' : "none";
    })
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
        })

        objContext.props.Data.LanguageData.map((objLanguage) => {
            if (arrClientLanguageId.includes(objLanguage["iFrameworkLanguageId"])) {
                let obj = {
                    //"iPageId":null, //for edit id is required
                    "iLanguageId": objLanguage["iFrameworkLanguageId"],
                    "iPageFolderDataId": null,
                    "vPageFolderTitle": null,
                    "iPageFolderId": null,
                };
                arrMultiLanguageData = [...arrMultiLanguageData, obj];
                arrMultiLanguageDetails = [...arrMultiLanguageDetails, objLanguage];
            }
        })
    }
    return { arrMultiLanguageData, arrMultiLanguageDetails };
}

export function GetLanguageData(objContext,strTableName,strColumnName){
    var arrLanguageData = objContext.state.objData[strTableName];
    var objLanguageData = arrLanguageData ? arrLanguageData.find(item => {return item.iLanguageId == objContext.props.Data.JConfiguration.InterfaceLanguageId}) : {};
    return objLanguageData[strColumnName];
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
            objMultiLanguageDetails["iFrameworkLanguageId"] === objField["iLanguageId"])[0]["vLanguageCultureInfo"];
    } else {
        return "";
    }
}

export function HandleChange(strId, strValue, objContext, strLanguageId=""){
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
    var objMetadata = GetObjectHeader(strId,objContext.props);
    // var objNewValidationMessages = FieldValidator.OnValidateEditData(strValue, objMetadata, objContext.state.objValidationMessages)
    // objContext.dispatch({ type: "SET_STATE_VALUES", payload: {objValidationMessages : objNewValidationMessages} });
}

/**
* return the respective object of the metadata
*/
export const GetObjectHeader = (vColumnName, props) => {    
    return props.Data.arrHeaderData.find((objHeader) => objHeader["vColumnName"] === vColumnName);
}

export const GetRespectiveHeaders = (arrColumnNames, props) => {
    var arrHeaderData = arrColumnNames.map(vColumnName=>{
        return GetObjectHeader(vColumnName,props)
    })
    return arrHeaderData;
}

export function AddMethod(objContext, blnClosePopup = false){
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {blnSaveClicked : true} });
    let arrMetaData = GetRespectiveHeaders(["vPageFolderName"],objContext.props);
    var objValidationMessages = FieldValidator.GetValidationMessages(objContext.state.objValidationMessages, arrMetaData);
    var blnIsValid = Object.keys(objValidationMessages).length === 0 ? true:false;
    if (blnIsValid) {
        let arrParams = []
        if (objContext.props.Data.blnIsAdd && !objContext.state.blnAddedOnce) {
            arrParams = [
            {
                "URL": "API/Object/Intranet/Task/TaskFolder",
                "Params": {
                    "SearchQuery": {},
                     "vAddData": objContext.state.objData,
                     "uUserId":objContext.props.Data.ClientUserDetails.UserId
                     },
                "MethodType": "Post"
            }];          
            
        }
        else {
            arrParams = [
            {
                "URL": "API/Object/Intranet/Task/TaskFolder",
                "Params": {
                    "SearchQuery": {},
                     "vEditData": objContext.props.Data.blnIsAdd ? {...objContext.state.objData,"iPageId":objContext.state.objSavedTask["iPageId"]} : objContext.state.objData,
                     "uUserId": objContext.props.Data.ClientUserDetails.UserId
                     },
                "MethodType": "Put"
            }];
            console.log("on add arrParams ", arrParams)
        }
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, blnIsAdded) {
            if (objContext.props.Data.blnIsAdd) {
                let objTaskFolder = objReturn[0];
                ApplicationState.SetProperty("FolderId", objTaskFolder.iPageFolderID);
                ApplicationState.SetProperty("SelectedNode", objTaskFolder);
            }            
            if (blnIsAdded && blnClosePopup) {
                objContext.props.closePopUp(objContext.props.objModal);
            }
        });
    }
    else {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: {objValidationMessages : objValidationMessages} });
    }

}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export function Reducer(state, action) {
    switch (action.type) {
        case 'DATA_LOAD_COMPLETE': {
            return { ...state, ["isLoadComplete"]: action.payload }
        }
        case 'SET_STATE_VALUES':
        return{
            ...state,
            ...action.payload
        };

    }
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        objData: {},
        objValidationMessages: {},
        strValidationMessage: "",
        blnSaveClicked: false,
        blnAddedOnce : false,
        blnShowValidationMessage: false,
        objDropDownData : {},
        objSelectedSubject:{},
        objSelectedSubSubject:{},
        objSelectedCategory :{},
        objSelectedCompetency:{},
        objSelectedCompetencyRange:{},
        objSelectedCompetencyLevel:{}

    };
}
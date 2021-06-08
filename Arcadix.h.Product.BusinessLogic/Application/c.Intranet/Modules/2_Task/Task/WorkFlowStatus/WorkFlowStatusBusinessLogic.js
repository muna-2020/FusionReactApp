import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from "@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData";

/**
    * @param {*} state 
    * @summary   maps entity/application state to props of the component.
    */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            workflowtype: DataRef(state.Entity, "workflowtype", true),
            workflow: DataRef(state.Entity, "workflow", true),
            workflowstatus: DataRef(state.Entity, "workflowstatus", true),
            textresource: DataRef(state.Entity, "textresource", true),
            mainclientlanguage: DataRef(state.Entity, "mainclientlanguage", true),
            language: DataRef(state.Entity, "language", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        DataCall(objContext, InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }, []);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/WorkFlowStatus")["Data"]
            && DataRef(objContext.props.workflowtype)["Data"]
            && DataRef(objContext.props.workflow)["Data"]
            && DataRef(objContext.props.workflowstatus)["Data"]   
            && DataRef(objContext.props.mainclientlanguage)["Data"] 
            && DataRef(objContext.props.language)["Data"]          
        ) {
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/WorkFlowStatus")["Data"]["0"]["WorkFlowStatus"];
            let arrWorkFlowTypeData = DataRef(objContext.props.workflowtype)["Data"];
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { objTextResource: objTextResource } });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { arrWorkFlowTypeData: arrWorkFlowTypeData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
            objContext.props.textresource,
            objContext.props.workflowtype,
            objContext.props.workflow,
            objContext.props.workflowstatus,
            objContext.props.mainclientlanguage,
            objContext.props.language
        ]);
}

/**
* @param {*} objContext
* @summary Set RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("RibbonData", GetRibbonData(objContext))
    }, [objContext.state])
}

export function useOnWorkFlowStatusUpdate(objContext){
    useEffect(()=>{
        if(objContext.state.isLoadComplete){
            SetWorkFlowStatusState(objContext, objContext.state.strWorkflowId)
        }        
    },[objContext.props.workflowstatus])
}

/** 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props) {
    var objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/WorkFlowStatus"
                    }
                }
            ]
        }
    };
    var arrDataRequest = [
        {
            "URL": "API/Object/Intranet/Task/WorkFlowType",
            "Params": {},
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Task/WorkFlow",
            "Params": {},
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Task/WorkFlowStatus",
            "Params": {},
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Framework/Blocks/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Framework/SystemObjects/MainClientLanguage",
            "Params": {},
            "MethodType": "Get",
        },
        {
            "URL": "API/Object/Framework/SystemObjects/Language",
            "Params": {},
            "MethodType": "Get",
        }
    ];
    return {
        "DataCalls": arrDataRequest
    };
};

export function GetRibbonData(objContext) {
    let objTextResource = objContext.state.objTextResource;

    return (
        [
            {
                "vGroupName": objTextResource["New"],
                "t_GroupData": [
                    {
                        "vTextName": objTextResource["New"],
                        "uImageUrl": "New_Large.png",
                        "type": "single",
                        "OnClick": () => AddEditAction(objContext)
                    },
                    {
                        "vTextName": objTextResource["Edit"],
                        "uImageUrl": "Edit_Large.png",
                        "type": "single",
                        "OnClick": () => AddEditAction(objContext, false)
                    },
                    {
                        "vTextName": objTextResource["Delete"],
                        "uImageUrl": "Delete_Large.png",
                        "type": "single",
                        "OnClick": () => DeleteAction(objContext)
                    }
                ]
            }
        ]
    )
}

/**
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objContext, arrParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        //Do something
    });
}

export const GetDropDownData = (objContext, strDropDownType) => {
    let strValueColumn, strDisplayColumn, strDependingTableName, objData;
    switch (strDropDownType){
        case "WorkFlowType":
            strValueColumn = "uWorkflowTypeId";
            strDisplayColumn = "vWorkflowType";
            strDependingTableName = "t_TestDrive_WorkflowType_Data";
            objData = objContext.state.arrWorkFlowTypeData;
        break;
        case "WorkFlow":
            strValueColumn = "uWorkflowId";
            strDisplayColumn = "vName";
            strDependingTableName = "t_TestDrive_Workflow_Data";
            objData = objContext.state.arrWorkFlowData;
        break;
    }

    let objDropDownData = {
        "cISLanguageDependent": "Y",
        "ValueColumn": strValueColumn,
        "DisplayColumn": strDisplayColumn,
        "DependingTableName": strDependingTableName,
        "Data": objData
    };
    return objDropDownData;
}

export function GetContentData(objContext) {
    let arrHeaderData = GetHeaderData();
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/WorkFlowStatus")["Data"]["0"]["WorkFlowStatus"];
    let arrRowData = objContext.state.arrWorkFlowStatusData ? objContext.state.arrWorkFlowStatusData : [];
    arrRowData = GetNonDeletedData(arrRowData);
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2);
    arrMainClientlanguageData = GetNonDeletedData(arrMainClientlanguageData);
    let arrLanguageData = DataRef(objContext.props.language)["Data"];
    arrLanguageData = GetNonDeletedData(arrLanguageData, "cIsActive", "Y");
    let objContentData = {
        arrHeaderData,
        objTextResource,
        arrRowData,
        arrMainClientlanguageData,
        arrLanguageData
    }
    return objContentData;
}

function GetNonDeletedData(arrData, strKey = "cIsDeleted", strValue = "N") {
    return arrData.filter(objData => { return objData[strKey] == strValue });
}


export function GetHeaderData() {
    return [
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Order",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsProductionReady",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "ProductionReady",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatusShortName",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Shortname",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatus",
            "vDataType": "string",
            // "iDisplayOrder":2,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "WorkflowStatus",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatusDescription",
            "vDataType": "string",
            // "iDisplayOrder":2,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }
    ];
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem  selected item
 * in this function once the item is selected api request has been made to get the assigned test for that particular cycle
 */
export function OnDropDownChange(objContext, objItem, strDropDownType) {
    switch (strDropDownType) {
        case "WorkFlowType":
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strWorkflowTypeId": objItem.uWorkflowTypeId } });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { arrWorkFlowStatusData: [] } });
            //To set arrWorkFlowData 
            let arrWorkFlowData = DataRef(objContext.props.workflow)["Data"].filter(objWorkFlowData => { return objWorkFlowData.uWorkflowTypeId == objItem.uWorkflowTypeId && objWorkFlowData.cIsDeleted == "N"});            
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrWorkFlowData": arrWorkFlowData } });
            
        break;
        case "WorkFlow":
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strWorkflowId": objItem.uWorkflowId } });
                SetWorkFlowStatusState(objContext, objItem.uWorkflowId)
        break;
    }
}

function SetWorkFlowStatusState(objContext, strWorkflowId){
    let arrWorkFlowStatusData = DataRef(objContext.props.workflowstatus)["Data"].filter(objWorkFlowStatusData => { return objWorkFlowStatusData.uWorkflowId == strWorkflowId });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { arrWorkFlowStatusData: arrWorkFlowStatusData } });
}

/**
 * 
 * @param {*} objContext
 * Save data 
 */
export function AddEditAction(objContext, blnIsAdd=true) {
    let objTextResource = objContext.state.objTextResource;
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");

    var blnOpenPopup = false;
    if(blnIsAdd && objContext.state.strWorkflowId != -1){
        blnOpenPopup = true;
    }
    else if(!blnIsAdd && arrSelectedRows && arrSelectedRows.length > 0 ){
        blnOpenPopup = true;
    }
    if (blnOpenPopup) {
        OpenAddEditPopup(objContext, blnIsAdd);
    }
    else{
        OpenErrorPopup(objContext,(blnIsAdd ? objTextResource["ErrorTextPleaseSelect"] : objTextResource["ErrorTextNotSelected"]));
    }
}

function OpenAddEditPopup(objContext, blnIsAdd) {
    let objContentData = GetContentData(objContext);
    var objDropDownData = {};
        var objData = {
            isSSRDisabled: true,
            ModuleName: "addeditworkflowstatus",
            Title: "workflow",
            blnIsAdd,
            arrHeaderData: GetHeaderDataForAddEdit(),
            objTextResource: objContext.state.objTextResource,
            MainClientLanguageData: objContentData.arrMainClientlanguageData,
            LanguageData: objContentData.arrLanguageData,
            objDropDownData,
            strWorkflowTypeId : objContext.state.strWorkflowTypeId,
            strWorkflowId : objContext.state.strWorkflowId,
            JConfiguration: objContext.props.JConfiguration,
            ClientUserDetails: objContext.props.ClientUserDetails
        }
        objContext.props.showPopup({
            MaxHeight: "662px",
            MaxWidth: "950px",
            popUpMinHeight: "662px",
            popUpMinWidth: "950px",
            showHeader: false,
            popUpName: 'masteraddedit', //name of the component to be displayed inside the popup. must be present in ComponentController
            passedEvents: {
            },
            headerTitle: '',
            popupClassName: "master-add-edit",
            Data: objData,
        })
}

function GetHeaderDataForAddEdit(){
    return [
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Order",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsProductionReady",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "ProductionReady",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatusShortName",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Shortname",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatus",
            "vDataType": "string",
            // "iDisplayOrder":2,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "WorkflowStatus",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatusDescription",
            "vDataType": "string",
            // "iDisplayOrder":2,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }
    ];
}

/**
* @param {*} objContext
* @summary Call Error Popup
*/
function OpenErrorPopup(objContext, strText) {
    objContext.props.showPopup({
        MaxHeight: "137px",
        MaxWidth: "400px",
        popUpMinHeight: "137px",
        popUpMinWidth: "400px",
        popUpName: 'errorpopup',
        showHeader: true,
        passedEvents: {},
        headerTitle: '',
        popupClassName: 'error-popup-parent',
        Data: {
            ErrorText : strText,
            OkText : objContext.state.objTextResource.OK
        },
    });
}

/**
* @param {*} objContext
* @summary Call Confirmation popup for Deleting subject
*/
function DeleteAction(objContext) {
    let objTextResource = objContext.state.objTextResource;
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    if (arrSelectedRows && arrSelectedRows.length > 0) {
        OpenDeletePopup(objContext, arrSelectedRows);
    } else {
        OpenErrorPopup(objContext, objTextResource["ErrorTextNotSelected"]);
    }
}

function OpenDeletePopup(objContext){
    let objTextResource = objContext.state.objTextResource;
    objContext.props.showPopup({
        MaxHeight: "222px",
        MaxWidth: "390px",
        popUpMinHeight: "222px",
        popUpMinWidth: "390px",
        popUpName: 'confirmationpopup',
        showHeader: true,
        passedEvents: {},
        headerTitle: '',
        popupClassName: 'delete-popup-parent',
        Data: {
            HeaderText: objTextResource["DeletePopupHeaderText"],
            SubheaderText: objTextResource["DeletePopupSubheaderText"],
            ConfirmationText: objTextResource["DeletePopupWarningText"],
            ConfirmButtonText: objTextResource["DeletePopupConfirmButtonText"],
            OkText: objTextResource["OK"],
            OnConfirmationClick: (objModal) => DeleteWorkFlowStatus(objModal, objContext)
        },
    });
}

function DeleteWorkFlowStatus(objModal, objContext){
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    let arrDeleteRow = [];
    arrSelectedRows.map(objSelectedRows => {
        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    });
    let objParams = {
        "vDeleteData": arrDeleteRow,
        "uUserId": objContext.props.ClientUserDetails.UserId
    };
    let arrDataRequest = [
        {
            "URL": "API/Object/Intranet/Task/WorkFlowStatus",
            "Params": objParams,
            "MethodType": "Delete"
        }];
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrDataRequest, function (objReturn, blnIsDeleted) {
        if (blnIsDeleted) {
            objContext.props.closePopup(objModal);
            ApplicationState.SetProperty("SelectedRows",[]);
        }
    });
}

/**
  * @summary Returns Initial state of the component.
  */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        strWorkflowTypeId: "-1",
        strWorkflowId: "-1",
        arrWorkFlowData: [],
        arrWorkFlowTypeData: [],
        arrWorkFlowStatusData : []
    };
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export function Reducer(state, action) {
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

import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
    * @param {*} state 
    * @summary   maps entity/application state to props of the component.
    */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            workflowtype: DataRef(state.Entity, "workflowtype", true),
            workflow: DataRef(state.Entity, "workflow", true),
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
            &&DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/WorkFlow")["Data"]
            && DataRef(objContext.props.workflowtype)["Data"]
            && DataRef(objContext.props.workflow)["Data"] 
            && DataRef(objContext.props.mainclientlanguage)["Data"] 
            &&  DataRef(objContext.props.language)["Data"] 
        ) {
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/WorkFlow")["Data"]["0"]["WorkFlow"];
            let arrWorkFlowTypeData = DataRef(objContext.props.workflowtype)["Data"];
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { objTextResource: objTextResource } });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { arrWorkFlowTypeData: arrWorkFlowTypeData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
            objContext.props.textresource,
            objContext.props.workflowtype,
            objContext.props.workflow,
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

export function useOnWorkFlowUpdate(objContext){
    useEffect(()=>{
        if(objContext.state.isLoadComplete){
            SetWorkflowState(objContext, objContext.state.strWorkflowTypeId)
        }        
    },[objContext.props.workflow])
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
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/WorkFlow"
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
        },
    ];
    return {
        "DataCalls": arrDataRequest
    };
};

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
                    },
                    {
                        "vTextName": objTextResource["Delete"],
                        "uImageUrl": "Set_Default.png",
                        "type": "single",
                        "OnClick": () => ActivateAction(objContext)
                    }
                ]
            }
        ]
    )
}

export const GetWorkFlowTypeDropDownData = (objContext) => {
    let objWorkFlowTypeDropDownData = {
        "cISLanguageDependent": "Y",
        "ValueColumn": "uWorkflowTypeId", 
        "DisplayColumn": "vWorkflowType",
        "DependingTableName": "t_TestDrive_WorkflowType_Data",
        "Data": objContext.state.arrWorkFlowTypeData
    };
    return objWorkFlowTypeDropDownData;  
}

export function GetContentData(objContext) {
    let arrHeaderData = GetHeaderData();
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/WorkFlow")["Data"][0]["WorkFlow"];
    let arrRowData = objContext.state.arrWorkFlowData ? objContext.state.arrWorkFlowData : [];
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
            "vColumnName": "t_TestDrive_Workflow_Data.vName",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "WorkflowName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "uWorkflowTypeId",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "WorkflowTypeId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },        
        {
            "vColumnName": "t_TestDrive_Workflow_Data.vDescription",
            "vDataType": "string",
            // "iDisplayOrder":2,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "cIsActive",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Activ",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
    ];
}

export function GetGridDropDownData(objContext){
    let objGridDropDownData = {
        uWorkflowTypeId : GetWorkFlowTypeDropDownData(objContext)
    }
    return objGridDropDownData;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem  selected item
 * in this function once the item is selected api request has been made to get the assigned test for that particular cycle
 */
export function OnDropDownChange(objContext, objItem) {
    SetWorkflowState(objContext,objItem.uWorkflowTypeId); 
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strWorkflowTypeId": objItem.uWorkflowTypeId } });    
    ApplicationState.SetProperty("SelectedRows",[]);

}

function SetWorkflowState(objContext, strWorkflowTypeId){
    let arrWorkFlowData = DataRef(objContext.props.workflow)["Data"].filter(objWorkFlowData => {return objWorkFlowData.uWorkflowTypeId == strWorkflowTypeId})
    arrWorkFlowData = AssignActiveColumn(arrWorkFlowData);        
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrWorkFlowData": arrWorkFlowData } });
}

function AssignActiveColumn(arrWorkFlowData) {
    let arrWorkFlowDataWithActiveColumn = arrWorkFlowData.map(objWorkFlowData => {
        var strCIsActive = objWorkFlowData["t_TestDrive_Workflow_Active"].length > 0 ? "Y" : "N";
        return { ...objWorkFlowData, cIsActive: strCIsActive }
    });
    return arrWorkFlowDataWithActiveColumn;
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
    if(blnIsAdd && objContext.state.strWorkflowTypeId != -1){
        blnOpenPopup = true;
    }
    else if(!blnIsAdd && arrSelectedRows && arrSelectedRows.length > 0 ){
        blnOpenPopup = true;
    }
    if (blnOpenPopup) {
        OpenAddEditPopup(objContext, blnIsAdd)
    }
    else{
        let strText = blnIsAdd ? objTextResource["ErrorTextPleaseSelect"] : objTextResource["ErrorTextNotSelected"];
        OpenErrorPopup(objContext,strText);
    }
}

function OpenAddEditPopup(objContext, blnIsAdd){
    var objDropDownData = GetWorkFlowTypeDropDownData(objContext);
    let objContentData = GetContentData(objContext);
    var objData = {
        isSSRDisabled: true,
        ModuleName: "addeditworkflow",
        Title: "workflow",
        blnIsAdd,
        arrHeaderData: GetHeaderDataForAddEdit(),
        objTextResource: objContentData.objTextResource,
        MainClientLanguageData: objContentData.arrMainClientlanguageData,
        LanguageData: objContentData.arrLanguageData,
        objDropDownData,
        strWorkflowTypeId : objContext.state.strWorkflowTypeId,
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

/**
* @param {*} objContext
* @summary Call Error Popup
*/
function OpenErrorPopup(objContext , strText) {
    
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
            ErrorText: strText,
            OkText : objContext.state.objTextResource.OK
        },
    });
}

function GetHeaderDataForAddEdit() {
    return [
        {
            "vColumnName": "t_TestDrive_Workflow_Data.vName",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "WorkflowName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "required",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "uWorkflowTypeId",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "WorkflowTypeId",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "required",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Workflow_Data.vDescription",
            "vDataType": "string",
            // "iDisplayOrder":2,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Workflow_Active.uWorkflowActiveId",
            "vDataType": "int",
            // "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Activ",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
    ];
}

/**
* @param {*} objContext
* @summary Call Confirmation popup for Deleting subject
*/
function DeleteAction(objContext) {
    let objTextResource = objContext.state.objTextResource;
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    var blnSystemRoleData = false;  

    if (arrSelectedRows && arrSelectedRows.length > 0) {
        arrSelectedRows.map(objSelectedRow=>{
            if(objSelectedRow.iMainClientId == 0)
            blnSystemRoleData = true;
        })
        if(!blnSystemRoleData)
            OpenDeletePopup(objContext)
        else
            OpenErrorPopup(objContext,objTextResource["ErrorTextForSystemRole"]);
        
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
            OnConfirmationClick: (objModal) => DeleteWorkFlow(objModal, objContext)
        },
    });
}

function DeleteWorkFlow(objModal, objContext){
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
            "URL": "API/Object/Intranet/Task/WorkFlow",
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

const ActivateAction = (objContext)=>{
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");    
    if(arrSelectedRows && arrSelectedRows.length > 0){
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objRowToActivate = {...arrSelectedRows[0], "IsActivate":"Y"};
        let objParams = {
            "vEditData": objRowToActivate,
            "uUserId": objContext.props.ClientUserDetails.UserId
        };
        let arrDataRequest = [
            {
                "URL": "API/Object/Intranet/Task/WorkFlow",
                "Params": objParams,
                "MethodType": "Put"
            }];
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrDataRequest, function (objReturn, blnIsAdded) {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }
}

/**
  * @summary Returns Initial state of the component.
  */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrIntranetTest: [],
        strWorkflowTypeId: "-1",
        arrStateCycle: [],
        arrSelectedData: []
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

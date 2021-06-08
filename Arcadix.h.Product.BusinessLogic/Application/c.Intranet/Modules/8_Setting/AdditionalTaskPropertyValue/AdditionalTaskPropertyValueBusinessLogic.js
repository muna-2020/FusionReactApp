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
            taskadditionalpropertyvalue: DataRef(state.Entity, "taskadditionalpropertyvalue", true),
            taskadditionalproperty: DataRef(state.Entity, "taskadditionalproperty", true),
            textresource: DataRef(state.Entity, "textresource", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
            mainclientlanguage: DataRef(state.Entity, "mainclientlanguage", true),
            language: DataRef(state.Entity, "language", true)
        };
    }
}

/**
 *
 * @param {*} objContext
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
      Logger.Log("Getting initial data");
      DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(GetRequiredData, []);
  }  
  
 /**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
    if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.taskadditionalproperty)["Data"] &&
            DataRef(objContext.props.taskadditionalpropertyvalue)["Data"] &&
            DataRef(objContext.props.language)["Data"] &&
            DataRef(objContext.props.mainclientlanguage)["Data"] &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/taskadditionalpropertyvalue")["Data"])
        {
        objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: { "isLoadComplete": true } });     
        ApplicationState.SetProperty("blnShowAnimation", false);
        }
    else {
        Logger.Log("data is loading")
    }
    [objContext.props.taskadditionalproperty, objContext.props.taskadditionalpropertyvalue, objContext.props.textresource, objContext.props.language, objContext.props.mainclientlanguage]});
}

/**
* @param {*} objContext
* @summary Set RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("RibbonData", GetAdditionalTaskValue(objContext))            
    },[objContext.state.isLoadComplete,objContext.state.arrSelectedAdditionalPropertyValueData,objContext.state.objSelectedProperty])
}

export function useOnTaskAdditionalPropertyValueUpdate(objContext){
    useEffect(() => { 
        if (objContext.state.isLoadComplete) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrSelectedAdditionalPropertyValueData": DataRef(objContext.props.taskadditionalpropertyvalue)["Data"].filter(objPropertyValueItem => objPropertyValueItem["iAdditionalTaskPropertyId"] == objContext.state.strSelectedPropertyId) } });
        }
       },[objContext.props.taskadditionalpropertyvalue])
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
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/TaskAdditionalPropertyValue"
                    }
                }
            ]
        }
    };


    var arrDataRequest = [
        {
            "URL": "API/Object/Intranet/TaskAdditionalPropertyValue",
            "Params": {},
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/TaskAdditionalProperty",
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

/**
 * 
 * @param {*} arrParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(arrParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        //Do something
    });
}

export function CreateItemEventHandler(objItem) { //action to be performed
   if (objItem["cIsDeleted"] === "N") {
       return true;
   }
   else {
       return false;
   }
}

export function OnDropDownChange(objContext, objSelectedProperty) { 
    let arrAdditionalPropertyValueData = DataRef(objContext.props.taskadditionalpropertyvalue)["Data"];
    let arrSelectedAdditionalPropertyValueData = [];
    arrAdditionalPropertyValueData.map(objPropertyItem =>{
        if(objPropertyItem.iAdditionalTaskPropertyId === objSelectedProperty.iAdditionalTaskPropertyId){
            arrSelectedAdditionalPropertyValueData=[...arrSelectedAdditionalPropertyValueData,objPropertyItem]
        }
    })
    objContext.dispatch({type: "SET_STATE_VALUES",payload: {"arrSelectedAdditionalPropertyValueData": arrSelectedAdditionalPropertyValueData, "objSelectedProperty" : objSelectedProperty ,"strSelectedPropertyId":objSelectedProperty.iAdditionalTaskPropertyId }});
}

export function GetAdditionalTaskValue(objContext) {
    let objTextResourceData =  DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/taskadditionalpropertyvalue").Data["0"].TaskAdditionalPropertyValue;
    return (
        [
             {//Group3
                "vGroupName": objTextResourceData["New"],//"New",
                "t_GroupData": [
                    {
                        "vTextName": objTextResourceData["New"],//"New",
                        "uImageUrl": "New_Large.svg",//"down.png",
                        "type": "single",
                        "OnClick": () => AddPopup(objContext)
                    },
                    {
                        "vTextName": objTextResourceData["Edit"],//"To Edit",
                        "uImageUrl": "Edit_Large.svg",
                        "type": "single",
                        "OnClick": () => EditPopup(objContext)
                    },
                    {
                        "vTextName": objTextResourceData["Delete"],//"clear",
                        "uImageUrl": "Delete_Large.svg",
                        "type": "single",
                        "OnClick": () => DeletePopup(objContext)
                    }
                ]
            },
        ]
    )
}

export function GetObjectGenerator(){
    return [
        {
            "vColumnName": "iOrderId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "TaskAdditionalPropertyValue",
            "vTextResourceKey": "iOrderId",
            "vControlType": "label",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
          },
          {
            "vColumnName": "t_TestDrive_Task_AdditionalTaskProperty_Value_Data.vAdditionalTaskPropertyValueText",
            "vDataType": "string",
            "iDisplayOrder":2,
            "vTextResourcePage": "TaskAdditionalPropertyValue",
            "vTextResourceKey": "vAdditionalTaskPropertyValueText",
            "vControlType": "label",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
          }
    ];
}

/**
* @summary returns the meta data for addedit
*/
function GetAddEditMetaData() {
    return [
        {
            "vColumnName": "iAdditionalTaskPropertyValueId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
        },        
        {
            "vColumnName": "iOrderId",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number"
        },
        {
            "vColumnName": "t_TestDrive_Task_AdditionalTaskProperty_Value_Data.vAdditionalTaskPropertyValueText",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
}
/**
* @param {*} objContext
* @summary Call AddEditPopup for Adding category
*/
function AddPopup(objContext) {
    let objTextResource =  DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/taskadditionalpropertyvalue").Data["0"].TaskAdditionalPropertyValue;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
    let arrAdditionalPropertyData = DataRef(objContext.props.taskadditionalproperty)["Data"];
    let arrHeaderData = GetAddEditMetaData();

    if (objContext.state.strSelectedPropertyId !== -1) {
        objContext.props.showPopup({
            MaxHeight: "662px",
            MaxWidth: "950px",
            popUpMinHeight: "662px",
            popUpMinWidth: "950px",
            showHeader: false,
            popUpName: 'masteraddedit', 
            passedEvents: {
                objTextResource: {},
                ClientUserDetails: objContext.props.ClientUserDetails,
            },
            headerTitle: '',
            popupClassName: "master-add-edit",
            Data: {
                isSSRDisabled: true,
                ModuleName: "addeditadditionaltaskpropertyvalue",
                objTextResource,
                arrAdditionalPropertyData,
                strSelectedPropertyId: objContext.state.strSelectedPropertyId,
                MainClientLanguageData: arrMainClientlanguageData,
                LanguageData: arrLanguageData,
                JConfiguration: objContext.props.JConfiguration,
                ClientUserDetails: objContext.props.ClientUserDetails,
                blnIsEdit: false,
                blnIsAdd: true,
                arrHeaderData
            },
            isSSRDisabled: true

        })
    } else {
        ErrorPopup(objContext, objTextResource);
    }
}

/**
* @param {*} objContext
* @summary Call AddEditPopup for Editing category
*/
function EditPopup(objContext) {
    let arrHeaderData = GetAddEditMetaData();
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/taskadditionalpropertyvalue").Data["0"].TaskAdditionalPropertyValue;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");

    let selectedRows = ApplicationState.GetProperty("SelectedRows");

    if (objContext.state.strSelectedPropertyId !== -1 && selectedRows && selectedRows.length > 0) {
        objContext.props.showPopup({
            MaxHeight: "662px",
            MaxWidth: "950px",
            popUpMinHeight: "662px",
            popUpMinWidth: "950px",
            showHeader: false,
            popUpName: 'masteraddedit', //name of the component to be displayed inside the popup. must be present in ComponentController
            passedEvents: {
                objTextResource: {},
                ClientUserDetails: objContext.props.ClientUserDetails,
            },
            headerTitle: '',
            popupClassName: "master-add-edit",
            Data: {
                isSSRDisabled: true,
                ModuleName: "addeditadditionaltaskpropertyvalue",
                objTextResource,
                strSelectedPropertyId: objContext.state.strSelectedPropertyId,
                MainClientLanguageData: arrMainClientlanguageData,
                LanguageData: arrLanguageData,
                JConfiguration: objContext.props.JConfiguration,
                ClientUserDetails: objContext.props.ClientUserDetails,
                blnIsEdit: true,
                blnIsAdd: false,
                arrHeaderData
            },
            isSSRDisabled: true

        })
    } else {
        ErrorPopup(objContext, objTextResource);
    }
}

/**
* @param {*} objContext
* @summary Call Error Popup
*/
function ErrorPopup(objContext, objTextResource) {
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
            ErrorText: objTextResource["EditPopupErrorText"],
            objTextResource
        },
    });
}

/**
* @param {*} objContext
* @summary Call ConfirmationPopup for Deleting category
*/
function DeletePopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/taskadditionalpropertyvalue").Data["0"].TaskAdditionalPropertyValue;
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");

    if (arrSelectedRows && arrSelectedRows.length > 0) {
        
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
                OnConfirmationClick: (objModal) => DeleteAdditionalPropertyValue(arrSelectedRows, objModal, objContext)
            },
        })
    } else {
        ErrorPopup(objContext, objTextResource)
    }
}

/**
* @param {*} arrSelectedRows
* @param {*} objModal
* @param {*} objContext
* @summary Deletes category and close popup on sccess
*/
const DeleteAdditionalPropertyValue = (arrSelectedRows, objModal, objContext) => {
    let arrDeleteRow = [];
    arrSelectedRows.map(objSelectedRows => {
        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    });

    let objDeleteParams= {
        "vDeleteData": arrDeleteRow
    }

    let arrParams = [
        {
            URL: "API/Object/Intranet/TaskAdditionalPropertyValue",
            Params: objDeleteParams,
            MethodType: "Delete"
        }
    ];

    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, blnIsNew) {
        if (blnIsNew) {
            ApplicationState.SetProperty("SelectedRows", [])
            objContext.props.closePopup(objModal);
        }
    });
};

export function GetInitialState() {
    return {
      isLoadComplete: false,
      arrSelectedAdditionalPropertyValueData:[],
      objSelectedProperty:{},
      strSelectedPropertyId:-1,
      arrTaskAdditionalPropertyValue:[]
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
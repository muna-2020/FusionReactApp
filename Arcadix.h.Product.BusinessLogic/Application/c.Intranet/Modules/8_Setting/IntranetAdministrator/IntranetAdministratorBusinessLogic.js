import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            objectgenerator: DataRef(state.Entity, "objectgenerator", true),            
            textresource: DataRef(state.Entity, "textresource", true),
            intranetadministrator: DataRef(state.Entity, "object_intranet_member_intranetadministrator", true),   
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        Logger.Log("not mapping class");
        return {};
    }
}

/** 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initial request params for the component.
 */
export function InitialDataParams(JConfiguration, props) {
    let objGeneratorParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "vObjectName": "IntranetAdministrator"
                    }
                }
            ]
        }
    };
    let objResourceParams = {      
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/IntranetAdministrator"
                    }
                }
            ]
        }
    };
    let arrDataRequest = [
        {
            "URL": "API/Object/Framework/Blocks/ObjectGenerator",
            "Params": objGeneratorParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Member/IntranetAdministrator",
            "Params": {},
            "MethodType": "Get",
            "UseFullName": true
        },
        {
            "URL": "API/Object/Framework/Blocks/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        }

    ];
    return { "DataCalls": arrDataRequest };
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
 * @param {*} arrParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
function DataCall(objParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {

    });
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props.objectgenerator,"objectgenerator;vobjectname;intranetadministrator")["Data"]
            && DataRef(objContext.props.intranetadministrator)["Data"]
            && DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/intranetadministrator")["Data"]) {
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    },[objContext.props.objectgenerator,
    objContext.props.intranetadministrator,
    objContext.props.textresource]);
}

/**
* @param {*} objContext
* @summary Set RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("RibbonData", GetAdministratorToolData(objContext));
    }, [objContext.state.isLoadComplete]);
}

/**
* @param {*} objContext
* @summary Get data to initialize RibbonData
*/
export function GetAdministratorToolData(objContext) {
    let objTextResource= DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/intranetadministrator")["Data"][0]["IntranetAdministrator"];   
    return (
        [
            {//Group3
                "vGroupName": objTextResource["New"],
                "t_GroupData": [
                    {
                        "vTextName": objTextResource["New"],
                        "uImageUrl": "New_Large.svg",
                        "type": "single",
                        "OnClick": () => AddPopup(objContext)
                    },
                    {
                        "vTextName": objTextResource["Edit"],
                        "uImageUrl": "Edit_Large.svg",
                        "type": "single",
                        "OnClick": () => EditPopup(objContext)
                    },
                    {
                        "vTextName": objTextResource["Delete"],
                        "uImageUrl": "Delete_Large.svg",
                        "type": "single",
                        "OnClick": () => DeletePopup(objContext)
                    },
                    {
                        "vTextName": objTextResource["SendLogin"],
                        "uImageUrl": "SendLogin_Large.svg",
                        "type": "single",
                        "OnClick": () => OpenSendLoginProgressBarPopup(objContext)
                    }
                ]
            }
        ]
    );
}

/**
* @param {*} objContext
* @summary Call AddEditPopup for Adding subject
*/
function AddPopup(objContext) {
    let objGeneratorData = DataRef(objContext.props.objectgenerator,"objectgenerator;vobjectname;intranetadministrator")["Data"][0];
    let arrHeaderData = objGeneratorData.t_Framework_ObjectConfiguration_Column;
    let arrIntranetAdministratorData = DataRef(objContext.props.intranetadministrator)["Data"];
    let objTextResource= DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/intranetadministrator")["Data"][0]["IntranetAdministrator"];   
    
    objContext.props.showPopup({
        MaxHeight: "662px",
        MaxWidth: "950px",
        popUpMinHeight: "662px",
        popUpMinWidth: "950px",
        showHeader: false,
        popUpName: 'masteraddedit', //name of the component to be displayed inside the popup. must be present in ComponentController
        passedEvents: {
            objTextResource: {},
            ClientUserDetails: objContext.props.ClientUserDetails
        },
        popupClassName: "master-add-edit",
        Data: {
            ModuleName: "addeditintranetadministrator",
            arrHeaderData,
            objTextResource,
            arrIntranetAdministratorData,            
            JConfiguration: objContext.props.JConfiguration,
            ClientUserDetails: objContext.props.ClientUserDetails,
            blnIsEdit: false,
            blnIsAdd: true
        }
    });
}

/**
* @param {*} objContext
* @summary Call AddEditPopup for Adding subject
*/
function EditPopup(objContext) {
    let objGeneratorData = DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;intranetadministrator")["Data"][0];
    let arrHeaderData = objGeneratorData.t_Framework_ObjectConfiguration_Column;
    let arrIntranetAdministratorData = DataRef(objContext.props.intranetadministrator)["Data"];
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/intranetadministrator")["Data"][0]["IntranetAdministrator"];   
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    if (arrSelectedRows && arrSelectedRows.length > 0) {
        objContext.props.showPopup({
            MaxHeight: "662px",
            MaxWidth: "950px",
            popUpMinHeight: "662px",
            popUpMinWidth: "950px",
            showHeader: false,
            popUpName: 'masteraddedit', //name of the component to be displayed inside the popup. must be present in ComponentController
            passedEvents: {
                objTextResource: {},
                ClientUserDetails: objContext.props.ClientUserDetails
            },
            popupClassName: "master-add-edit",
            Data: {
                ModuleName: "addeditintranetadministrator",
                arrHeaderData,
                objTextResource,
                arrIntranetAdministratorData,
                JConfiguration: objContext.props.JConfiguration,
                ClientUserDetails: objContext.props.ClientUserDetails,
                blnIsEdit: true,
                blnIsAdd: false
            }
        });
    } else {
        ErrorPopup(objContext);
    }
}



/**
* @param {*} objContext
* @summary Call Confirmation popup for Deleting subject
*/
function DeletePopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/intranetadministrator")["Data"][0]["IntranetAdministrator"];   
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
                OnConfirmationClick: (objModal) => DeleteIntranetAdministrator(arrSelectedRows, objModal, objContext)
            }
        });
    } else {
        ErrorPopup(objContext);
    }
}

/**
* @param {*} arrSelectedRows
* @param {*} objModal
* @param {*} objContext
* @summary Deletes competency range and close popup on success
*/
const DeleteIntranetAdministrator = (arrSelectedRows, objModal, objContext) => {
    let arrDeleteRow = [];
    arrSelectedRows.map(objSelectedRows => {
        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    });

    let arrParams = [
        {
            URL: "API/Object/Intranet/Member/IntranetAdministrator",
            Params: { "vDeleteData": arrDeleteRow },
            MethodType: "Delete",
            "UseFullName": true
        }
    ];

    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, blnIsNew) {
        if (blnIsNew) {
            ApplicationState.SetProperty("SelectedRows", []);
            objContext.props.closePopup(objModal);
        }
    });
};

/**
* @param {*} objContext
* @summary Call Error Popup
*/
function ErrorPopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/intranetadministrator")["Data"][0]["IntranetAdministrator"];   

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
            OkText: objTextResource["OK"]
        }
    });
}


function sendLogin(objContext, strProgressBarID, arrSelectedRows) {
    let objSendMailParams =
    {
        ["IntranetAdmins"]: arrSelectedRows,
        ["ProgressBarId"]: strProgressBarID
    };
    let objRequestParam =
    {
        "URL": "API/Object/Intranet/Member/IntranetAdministrator/sendIntranetAdministratorLogin",
        "Params": objSendMailParams
    };
    ArcadixFetchData.Execute([objRequestParam], (response) => {
        console.log(response);
    });
}


export function OpenSendLoginProgressBarPopup(objContext) {
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/intranetadministrator")["Data"][0]["IntranetAdministrator"];
    
    if (arrSelectedRows && arrSelectedRows.length > 0) {
        let arrMainClientUserIds = arrSelectedRows.map(t => t.uMainClientUserId);
        console.log("==>", arrSelectedRows);
        let strProgressBarId = "";

        objContext.props.showPopup({
            MaxHeight: '257px',
            MaxWidth: '380px',
            popUpMinHeight: '257px',
            popUpMinWidth: '380px',
            popUpName: 'progressbar',
            isDevMode: false,
            passedEvents: {
                OnStartProgress: (strProgressBarID) => {
                    strProgressBarId = strProgressBarID;
                    sendLogin(objContext, strProgressBarId, arrMainClientUserIds);
                },
                //ShowProgressStatus:"Y",
                // HasCancelButton:"N",
                //HasCloseButton:"Y",
                //CloseProgessBarOnComplete:"N",
                TitleText: objTextResource["Process"],
                CancelButtonText: objTextResource["AbortStop"],
                CloseButtonText: objTextResource["ShutDown"],
                JConfiguration: objContext.props.JConfiguration,
                ClientUserDetails: objContext.props.ClientUserDetails
            },
            headerTitle: 'Teacher Login',
            Data: {}
        });
    }
    else
    {
        ErrorPopup(objContext);
    }
    
}

export function GetInitialState() {
    return {
        isLoadComplete: false        
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

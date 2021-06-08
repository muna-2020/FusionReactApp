import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';


/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            userrole: DataRef(state.Entity, "object_cockpit_userrole", true),
            textresource: DataRef(state.Entity, "textresource", true),
            mainclientlanguage: DataRef(state.Entity, "object_cockpit_mainclient_mainclientlanguage", true),
            language: DataRef(state.Entity, "object_cockpit_language", true),
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
    let objResourceParams = {
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles"
                    }
                }
            ]
        }
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Cockpit/UserRole",
            "Params": {},
            "MethodType": "Get",
            "UseFullName": true
        },
        {
            "URL": "API/Object/Cockpit/MainClient/MainClientLanguage",
            "Params": {},
            "MethodType": "Get",
            "UseFullName": true
        },
        {
            "URL": "API/Object/Cockpit/Language",
            "Params": {},
            "MethodType": "Get",
            "UseFullName": true
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
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(GetRequiredData, []);
}

/**
 * 
 * @param {*} arrParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objParams) {
    ApplicationState.SetProperty("blnShowAnimation", true);
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
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.userrole)
            && DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/businessunitteamrole/roles")
            && DataRef(objContext.props.mainclientlanguage)["Data"]
            && DataRef(objContext.props.language)["Data"]
        ) {
            objContext.dispatch({
                type: "SET_STATE_VALUES", payload: {
                    "arrUserRole": DataRef(objContext.props.userrole)["Data"],
                    "objTextResource": DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/businessunitteamrole/roles").Data["0"].Roles
                }
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
        }
    }, [
            objContext.props.userrole,
            objContext.props.textresource,
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
            ApplicationState.SetProperty("RibbonData", GetBusinessUnitToolData(objContext));
    }, [objContext.state.isLoadComplete]);
}


/**
* @param {*} objContext
* @summary Get data to initialize RibbonData
*/
export function GetBusinessUnitToolData(objContext) {
    let objTextResource = objContext.state.objTextResource;//DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_Setting/schoolyear").Data["0"].SchoolYear;

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
                    }
                ]
            }
        ]
    );
}

/**
* @param {*} objContext
* @summary Call AddEditPopup for Adding Roles
*/
function AddPopup(objContext) {
    let arrHeaderData = GetAddEditMetaData();
    let objTextResource = objContext.state.objTextResource;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");

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
            ModuleName: "addeditroles",
            arrHeaderData,
            objTextResource,
            JConfiguration: objContext.props.JConfiguration,
            MainClientLanguageData: arrMainClientlanguageData,
            ClientUserDetails: objContext.props.ClientUserDetails,
            LanguageData: arrLanguageData,
            blnIsEdit: false,
            blnIsAdd: true
        }
    });
}

/**
* @param {*} objContext
* @summary Call AddEditPopup for Editing subject
*/
function EditPopup(objContext) {
    let arrHeaderData = GetAddEditMetaData();
    let objTextResource = objContext.state.objTextResource;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    if (arrSelectedRows && arrSelectedRows.length > 0) {
        if (arrSelectedRows[0]["cIsSystemRole"].toUpperCase() == "N") {
            objContext.props.showPopup({
                MaxHeight: "662px",
                MaxWidth: "950px",
                popUpMinHeight: "662px",
                popUpMinWidth: "950px",
                showHeader: false,
                popUpName: 'masteraddedit',
                passedEvents: {
                    objTextResource: {},
                    ClientUserDetails: objContext.props.ClientUserDetails
                },
                popupClassName: "master-add-edit",
                Data: {
                    ModuleName: "addeditroles",
                    arrHeaderData,
                    objTextResource,
                    JConfiguration: objContext.props.JConfiguration,
                    MainClientLanguageData: arrMainClientlanguageData,
                    ClientUserDetails: objContext.props.ClientUserDetails,
                    LanguageData: arrLanguageData,
                    blnIsEdit: true,
                    blnIsAdd: false
                }
            });
        } else {
            ErrorPopup(objContext, true);
        }
    } else {
        ErrorPopup(objContext);
    }
}

/**
* @param {*} objContext
* @summary Call Confirmation popup for Deleting subject
*/
function DeletePopup(objContext) {
    let objTextResource = objContext.state.objTextResource;
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
                OnConfirmationClick: (objModal) => DeleteRoles(arrSelectedRows, objModal, objContext)
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
* @summary Deletes subject and close popup on sccess
*/
const DeleteRoles = (arrSelectedRows, objModal, objContext) => {
    let arrDeleteRow = [];
    arrSelectedRows.map(objSelectedRows => {
        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    });

    let arrParams = [
        {
            URL: "API/Object/Cockpit/UserRole",
            Params: { vDeleteData: arrDeleteRow },
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
function ErrorPopup(objContext, blnIsSystemRole = false) {
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
            ErrorText: blnIsSystemRole ? objContext.state.objTextResource["SystemRoleErrorText"]: objContext.state.objTextResource["EditPopupErrorText"],
            OkText: objContext.state.objTextResource["OK"]
        }
    });
}


/**
* @param {*} objContext
* @summary MetaData for BusinessUnit
*/
export function GetMetaData() {
    return [
        {
            "vColumnName": "t_Framework_MainClient_UserRole_Data.vUserRoleName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "UserRole",
            "vTextResourceKey": "UserRoleName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "cIsSystemRole",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "UserRole",
            "vTextResourceKey": "IsSystemRole",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
}

/**
* @param {*} objContext
* @summary MetaData for Add edit popup
*/
export function GetAddEditMetaData() {
    return [
        {
            "vColumnName": "t_Framework_MainClient_UserRole_Data.vUserRoleName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "cIsSystemRole",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
}

/**
* @param {*} objContext
* @summary UseEffect to be executed whenever BusinessUnit updates
*/
export function useOnUserRoleUpdate(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrUserRole": DataRef(objContext.props.userrole)["Data"] } });
        }
    }, [objContext.props.userrole]);
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrUserRole: [],
        objTextResource: {}
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
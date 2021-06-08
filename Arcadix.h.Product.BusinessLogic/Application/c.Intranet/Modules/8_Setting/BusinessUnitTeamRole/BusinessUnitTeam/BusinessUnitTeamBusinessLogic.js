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
            businessunit: DataRef(state.Entity, "object_cockpit_businessunit", true),
            textresource: DataRef(state.Entity, "textresource", true),
            businessunitteam: DataRef(state.Entity, "object_cockpit_businessunitteam", true),
            userrole: DataRef(state.Entity, "object_cockpit_userrole", true),
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
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam"
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
            "URL": "API/Object/Cockpit/BusinessUnit",
            "Params": {},
            "MethodType": "Get",
            "UseFullName": true
        },
        {
            "URL": "API/Object/Cockpit/BusinessUnitTeam",
            "Params": {},
            "MethodType": "Get",
            "UseFullName": true
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
            && DataRef(objContext.props.businessunit)
            && DataRef(objContext.props.businessunitteam)
            && DataRef(objContext.props.userrole)
            && DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/businessunitteamrole/businessunitteam")
            && DataRef(objContext.props.mainclientlanguage)["Data"]
            && DataRef(objContext.props.language)["Data"]
        ) {
            objContext.dispatch({
                type: "SET_STATE_VALUES", payload: {
                    "arrBusinessUnit": DataRef(objContext.props.businessunit)["Data"],
                    "arrBusinessUnitTeam": DataRef(objContext.props.businessunitteam)["Data"].filter(objBusinessUnit => objBusinessUnit["uBusinessUnitId"] == objContext.state.strBusinessUnitId),
                    "objTextResource": DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/businessunitteamrole/businessunitteam").Data["0"].BusinessUnitTeam,
                    "arrUserRole": DataRef(objContext.props.userrole)["Data"].filter(objUserRole => objUserRole["cIsDeleted"] !== "Y")
                }
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
        }
    }, [
            objContext.props.businessunit,
            objContext.props.businessunitteam,
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
            ApplicationState.SetProperty("RibbonData", GetBusinessUnitTeamToolData(objContext));
    }, [objContext.state.isLoadComplete, objContext.state.strBusinessUnitId]);
}


/**
* @param {*} objContext
* @summary Get data to initialize RibbonData
*/
export function GetBusinessUnitTeamToolData(objContext) {
    let objTextResource = objContext.state.objTextResource;

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
* @summary Call AddEditPopup for Adding subject
*/
function AddPopup(objContext) {
    let arrHeaderData = GetAddEditMetaData();
    let objTextResource = objContext.state.objTextResource;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
    let strBusinessUnitId = objContext.state.strBusinessUnitId;
    if (strBusinessUnitId !== "-1") {
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
                ModuleName: "addeditbusinessunitteam",
                arrHeaderData,
                objTextResource,
                strBusinessUnitId,
                arrUserRole: objContext.state.arrUserRole,
                JConfiguration: objContext.props.JConfiguration,
                MainClientLanguageData: arrMainClientlanguageData,
                ClientUserDetails: objContext.props.ClientUserDetails,
                LanguageData: arrLanguageData,
                blnIsEdit: false,
                blnIsAdd: true
            }
        });
    } else {
        ErrorPopup(objContext);
    }
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
    let strBusinessUnitId = objContext.state.strBusinessUnitId;
    if (strBusinessUnitId !== "-1" && arrSelectedRows && arrSelectedRows.length > 0) {
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
                ModuleName: "addeditbusinessunitteam",
                arrHeaderData,
                objTextResource,
                strBusinessUnitId,
                arrUserRole: objContext.state.arrUserRole,
                JConfiguration: objContext.props.JConfiguration,
                MainClientLanguageData: arrMainClientlanguageData,
                ClientUserDetails: objContext.props.ClientUserDetails,
                LanguageData: arrLanguageData,
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
* @summary Call Confirmation popup for Deleting BusinessUniteTeam
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
                OnConfirmationClick: (objModal) => DeleteBusinessUnitTeam(arrSelectedRows, objModal, objContext)
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
const DeleteBusinessUnitTeam = (arrSelectedRows, objModal, objContext) => {
    let arrDeleteRow = [];
    arrSelectedRows.map(objSelectedRows => {
        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    });

    let arrParams = [
        {
            URL: "API/Object/Cockpit/BusinessUnitTeam",
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
function ErrorPopup(objContext) {
    objContext.props.showPopup({
        MaxHeight: "137px",
        MaxWidth: "400px",
        popUpMinHeight: "137px",
        popUpMinWidth: "400px",
        popUpName: 'errorpopup',
        showHeader: true,
        passedEvents: {},
        popupClassName: 'error-popup-parent',
        Data: {
            ErrorText: objContext.state.objTextResource["EditPopupErrorText"],
            OkText: objContext.state.objTextResource["OK"]
        }
    });
}

/**
* @param {*} objContext
* @param {*} objTextResource
* @param {*} arrSubjectData
* @param {*} strType
* @summary returns the subject/sub subject dropdown data based on the strType passed
*/
export const GetBusinessUnitDropDownData = (objContext) => {
    let objBusinessUnitDropDownData = {
        "cISLanguageDependent": "N",
        "ValueColumn": "uBusinessUnitId",
        "DisplayColumn": "vBusinessUnitName",
        "Data": []
    };
    objContext.state.arrBusinessUnit.map((objBusinessUnit) => {
        objBusinessUnitDropDownData["Data"] = [...objBusinessUnitDropDownData["Data"], objBusinessUnit];
    });
    return objBusinessUnitDropDownData;
};

/**
* @param {*} objItem
* @summary   To filter the dropdown data based on the condition
*/
export function CreateItemEventHandler(objItem) { //action to be performed
    if (objItem["cIsDeleted"] === "N") {
        return true;
    }
    else {
        return false;
    }
}

/**
* @param {*} objChangeData 
* @param {*} props 
* @summary   To change the subject Dropdown Data on change of the subject dropdown value
*/
export const DropDownChange = (objChangeData, props) => {
    props.ObjContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strBusinessUnitId": objChangeData["uBusinessUnitId"], "arrBusinessUnitTeam": [] } });
};

/**
* @param {*} objContext
* @summary MetaData for BusinessUnit
*/
export function GetMetaData() {
    return [
        {
            "vColumnName": "vTeamName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "BusinessUnitTeam",
            "vTextResourceKey": "Team",
            "vControlType": "textbox",
            "IsMandatory": "Y",
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
            "vColumnName": "vTeamName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null
        }
    ];
}

/**
* @param {*} objContext
* @summary UseEffect to be executed whenever BusinessUnit updates
*/
export function useOnBusinessUnitTeamUpdate(objContext) {
    
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let arrBusinessUnitTeam = DataRef(objContext.props.businessunitteam)["Data"];
            console.log("useOnBusinessUnitTeamUpdate ", arrBusinessUnitTeam.filter(objBusinessUnit => objBusinessUnit["uBusinessUnitId"] == objContext.state.strBusinessUnitId))
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrBusinessUnitTeam": arrBusinessUnitTeam.filter(objBusinessUnit => objBusinessUnit["uBusinessUnitId"] == objContext.state.strBusinessUnitId) } });
        }
    }, [objContext.props.businessunitteam, objContext.state.strBusinessUnitId]);
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrBusinessUnit: [],
        arrBusinessUnitTeam: [],
        objTextResource: {},
        strBusinessUnitId: "-1",
        arrUserRole: []
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
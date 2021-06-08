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
            textresource: DataRef(state.Entity, "textresource", true),
            objectgenerator: DataRef(state.Entity, "objectgenerator", true),
            competencyrange: DataRef(state.Entity, "object_intranet_taxonomy_competencyrange", true),
            mainclientlanguage: DataRef(state.Entity, "object_cockpit_mainclient_mainclientlanguage", true),
            language: DataRef(state.Entity, "object_cockpit_language", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        console.log("not mapping class");
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
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/6_Taxonomy/CompetencyRange"
                    }
                }
            ]
        }
    };

    let objGeneratorParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "vObjectName": "CompetencyRange"
                    }
                }
            ]
        }
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/Framework/Blocks/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Framework/Blocks/ObjectGenerator",
            "Params": objGeneratorParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/CompetencyRange",
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
            && DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/6_Taxonomy/CompetencyRange")
            && DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;competencyrange")["Data"]
            && DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;competencyrange")["Data"][0]
            && DataRef(objContext.props.competencyrange)["Data"]
            && DataRef(objContext.props.mainclientlanguage)["Data"]
            && DataRef(objContext.props.language)["Data"]
        ) {
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
            objContext.props.textresource,
            objContext.props.objectgenerator,
            objContext.props.competencyrange,
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
            ApplicationState.SetProperty("RibbonData", GetCompetencyRangeToolData(objContext));
    }, [objContext.state.isLoadComplete]);
}

/**
* @param {*} objContext
* @summary Get data to initialize RibbonData
*/
export function GetCompetencyRangeToolData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/CompetencyRange").Data["0"].CompetencyRange;

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
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/CompetencyRange").Data["0"].CompetencyRange;
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
            ModuleName: "addeditcompetencyrange",
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
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/CompetencyRange").Data["0"].CompetencyRange;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");

    if (arrSelectedRows && arrSelectedRows.length > 0) {
       
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
                ModuleName: "addeditcompetencyrange",
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
        ErrorPopup(objContext);
    }
}

/**
* @param {*} objContext
* @summary Call Confirmation popup for Deleting subject
*/
function DeletePopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/CompetencyRange").Data["0"].CompetencyRange;
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
            popupClassName: 'delete-popup-parent',
            Data: {
                HeaderText: objTextResource["DeletePopupHeaderText"],
                SubheaderText: objTextResource["DeletePopupSubheaderText"],
                ConfirmationText: objTextResource["DeletePopupWarningText"],
                ConfirmButtonText: objTextResource["DeletePopupConfirmButtonText"],
                OkText: objTextResource["OK"],
                OnConfirmationClick: (objModal) => DeleteCompetencyRange(arrSelectedRows, objModal, objContext)
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
const DeleteCompetencyRange = (arrSelectedRows, objModal, objContext) => {
    let arrDeleteRow = [];
    arrSelectedRows.map(objSelectedRows => {
        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    });

    let arrParams = [
        {
            URL: "API/Object/Intranet/Taxonomy/CompetencyRange",
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
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/CompetencyRange").Data["0"].CompetencyRange;

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

/**
* @summary returns the meta data for addedit
*/
function GetAddEditMetaData() {
    return [
        {
            "vColumnName": "iDisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number"
        },
        {
            "vColumnName": "t_testdrive_Category_Competency_CompetencyRange_Data.vCompetencyRange",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "cIspreselect",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
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
    }
};
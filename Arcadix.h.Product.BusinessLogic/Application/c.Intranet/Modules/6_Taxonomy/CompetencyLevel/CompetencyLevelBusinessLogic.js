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
            subject: DataRef(state.Entity, "object_intranet_taxonomy_subject", true),
            textresource: DataRef(state.Entity, "textresource", true),
            objectgenerator: DataRef(state.Entity, "objectgenerator", true),
            competencylevel: DataRef(state.Entity, "object_intranet_taxonomy_competencylevel", true),
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
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/6_Taxonomy/CompetencyLevel"
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
                        "vObjectName": "CompetencyLevel"
                    }
                }
            ]
        }
    };

    let arrDataRequest = [

        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": {},
            "MethodType": "Get",
            "UseFullName": true
        },
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Framework/Blocks/ObjectGenerator",
            "Params": objGeneratorParams,
            "MethodType": "Get"
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
export function DataCall(objParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
        //Do something
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
            && DataRef(objContext.props.subject)["Data"]
            && DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/competencylevel")
            && DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;competencylevel")["Data"]
            && DataRef(objContext.props.mainclientlanguage)["Data"]
            && DataRef(objContext.props.language)["Data"]
        ) {
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
            objContext.props.subject,
            objContext.props.textresource,
            objContext.props.objectgenerator,
            objContext.props.mainclientlanguage,
            objContext.props.language]);

}

/**
* @param {*} objContext
* @summary Set RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("RibbonData", GetCompetencyLevelToolData(objContext));
    }, [objContext.state.isLoadComplete, objContext.state.intSubjectDropdownSelectedValue]);
}

/**
* @param {*} objContext
* @summary Get data to initialize RibbonData
*/
export function GetCompetencyLevelToolData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/competencylevel").Data["0"].CompetencyLevel;

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
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/competencylevel").Data["0"].CompetencyLevel;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");

    if (objContext.state.intSubjectDropdownSelectedValue !== -1) {
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
                ModuleName: "addeditcompetencylevel",
                arrHeaderData,
                objTextResource,
                intSubjectDropdownSelectedValue: objContext.state.intSubjectDropdownSelectedValue,
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
    let arrSubjectData = DataRef(objContext.props.subject)["Data"];
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/competencylevel").Data["0"].CompetencyLevel;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");

    if (objContext.state.intSubjectDropdownSelectedValue !== -1 && arrSelectedRows && arrSelectedRows.length > 0) {
        
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
                ModuleName: "addeditcompetencylevel",
                arrHeaderData,
                objTextResource,
                arrSubjectData,
                intSubjectDropdownSelectedValue: objContext.state.intSubjectDropdownSelectedValue,
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
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/competencylevel").Data["0"].CompetencyLevel;
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");

    if (objContext.state.intSubjectDropdownSelectedValue !== -1 && arrSelectedRows && arrSelectedRows.length > 0) {
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
                OnConfirmationClick: (objModal) => DeleteCompetencyLevel(arrSelectedRows, objModal, objContext)
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
* @summary Deletes competency level and close popup on sccess
*/
const DeleteCompetencyLevel = (arrSelectedRows, objModal, objContext) => {
    let arrDeleteRow = [];
    arrSelectedRows.map(objSelectedRows => {
        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    });

    let objDeleteParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iSubjectId": objContext.state.intSubjectDropdownSelectedValue.toString()
                    }
                }
            ]
        },
        "vDeleteData": arrDeleteRow
    };

    let arrParams = [
        {
            URL: "API/Object/Intranet/Taxonomy/CompetencyLevel",
            Params: objDeleteParams,
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
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/competencylevel").Data["0"].CompetencyLevel;

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
            "vColumnName": "t_testdrive_Category_Competency_CompetencyLevel_Data.cCompetencyLevel",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
}

/**
* @param {*} objContext
* @param {*} state.intSubjectDropdownSelectedValue
* hooks to get the CompetencyLevel data after every subject dropdown change and change the respective state
*/
export const useSubjectDropDownChange = (objContext) => {

    useEffect(() => {
        if (objContext.state.intSubjectDropdownSelectedValue !== -1) {
            let objCompetencyLevelParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iSubjectId": objContext.state.intSubjectDropdownSelectedValue.toString()
                            }
                        }
                    ]
                }
            };
            let arrParams = [
                {
                    "URL": "API/Object/Intranet/Taxonomy/CompetencyLevel",
                    "Params": objCompetencyLevelParams,
                    "MethodType": "Get",
                    "UseFullName": true
                }];
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                // Do something

            });
        }
    }, [objContext.state.intSubjectDropdownSelectedValue]);
};

export const useCompetencyLevelChange = (objContext) => {
    useEffect(() => {
        if (objContext.props.competencylevel
            && objContext.state.intSubjectDropdownSelectedValue !== null
            && DataRef(objContext.props.competencylevel, "object_intranet_taxonomy_competencylevel;isubjectid;" + objContext.state.intSubjectDropdownSelectedValue.toString())["Data"]
        ) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrCompetencyLevelData": DataRef(objContext.props.competencylevel, "object_intranet_taxonomy_competencylevel;isubjectid;" + objContext.state.intSubjectDropdownSelectedValue.toString())["Data"] } });
        }
    }, [objContext.props.competencylevel]);
};

export const GetSubjectDropDownData = (objContext, objTextResource, arrSubjectData) => {
    let objSubjectDropDownData = {
        "cISLanguageDependent": "Y",
        "ValueColumn": "iSubjectId",
        "DisplayColumn": "vSubjectName",
        "DependingTableName": "t_TestDrive_Subject_Data",
        "Data": []
    };

    //let objFirstDropdownData = {
    //    "iSubjectId": -1,
    //    "iParentSubjectId": 0,
    //    "cIsDeleted": "N",
    //    "t_TestDrive_Subject_Data": [
    //        {
    //            "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId,
    //            "vSubjectName": objTextResource["PleaseChoose"],
    //            "vSubjectDisplayName": null,
    //            "vSubjectShortName": null,
    //            "tSubjectDescription": null,
    //            "iDataMainClientId": objContext.props.JConfiguration.MainClientId
    //        }
    //    ]
    //};

    //objSubjectDropDownData["Data"] = [...objSubjectDropDownData["Data"], objFirstDropdownData];

    arrSubjectData.map((objSubjectData) => {
        if (objSubjectData["iParentSubjectId"] === 0) {
            objSubjectDropDownData["Data"] = [...objSubjectDropDownData["Data"], objSubjectData];
        }
    });

    return objSubjectDropDownData;
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
* @summary   To change the subject Dropdown Value state on change of the subject dropdown
*/
export const OnDropDownChange = (objChangeData, props) => {
    if (objChangeData["iSubjectId"] === -1)
        props.ObjContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSubjectDropdownSelectedValue": objChangeData["iSubjectId"], arrCompetencyLevelData: [] } });
    else
        props.ObjContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSubjectDropdownSelectedValue": objChangeData["iSubjectId"] } });
};

export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSubjectDropdownSelectedValue: -1,
        arrCompetencyLevelData: []
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
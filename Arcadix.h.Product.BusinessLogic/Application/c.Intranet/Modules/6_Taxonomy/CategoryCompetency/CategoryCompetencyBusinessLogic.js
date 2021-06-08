import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            subject: DataRef(state.Entity, "object_intranet_taxonomy_subject", true),
            textresource: DataRef(state.Entity, "textresource", true),
            objectgenerator: DataRef(state.Entity, "objectgenerator", true),
            category: DataRef(state.Entity, "object_intranet_taxonomy_category", true),
            categorycompetency: DataRef(state.Entity, "object_intranet_taxonomy_categorycompetency", true),
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
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/6_Taxonomy/CategoryCompetency"
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
                        "vObjectName" : "CategoryCompetencyGrid"
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
            "URL": "API/Object/Framework/Blocks/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
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
* @param {*} objContext objContext
* @summary   Calls the DataCall method and the InitialDataParams.
*/
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        //Logger.Log("Getting initial data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(GetRequiredData, []);
}

/**
 * @param {*} arrParams arrParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objParams, intToggleExecute = 0) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    if (intToggleExecute === 0) {
        objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
            //Do something
        });
    }
    else {
        objArcadixFetchAndCacheData.ExecuteCustom(objParams[0].URL, objParams[0].MethodType, objParams[0], function (objReturn) {
            //Do something
        });
    }
}


/**
* @param {*} objContext objContext
* @summary   Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {

        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.subject)["Data"]
            && DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/CategoryCompetency")
            && DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;categorycompetencygrid")["Data"]
            && DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;categorycompetencygrid")["Data"][0]
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
            objContext.props.language
        ]);
}

/**
* @param {*} objContext objContext
* @summary Set RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("RibbonData", GetCategoryCompetencyToolData(objContext));
    }, [objContext.state.isLoadComplete, objContext.state.intCategoryDropdownSelectedValue]);
}

/**
* @param {*} objContext
* @summary Get data to initialize RibbonData
*/
export function GetCategoryCompetencyToolData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/CategoryCompetency").Data["0"].CategoryCompetency;

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
* @param {*} objContext objContext
* @summary Call AddEditPopup for Adding subject
*/
function AddPopup(objContext) {
    let arrHeaderData = GetAddEditMetaData();
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/CategoryCompetency").Data["0"].CategoryCompetency;
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
            ModuleName: "addeditcategorycompetency",
            arrHeaderData,
            objTextResource,
            intCategoryDropdownSelectedValue: objContext.state.intCategoryDropdownSelectedValue,
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
* @param {*} objContext objContext
* @summary Call AddEditPopup for Editing subject
*/
function EditPopup(objContext) {
    let arrHeaderData = GetAddEditMetaData();
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/CategoryCompetency").Data["0"].CategoryCompetency;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    
    if (objContext.state.intCategoryDropdownSelectedValue !== -1 && arrSelectedRows && arrSelectedRows.length > 0) {
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
                ModuleName: "addeditcategorycompetency",
                arrHeaderData,
                objTextResource,
                intCategoryDropdownSelectedValue: objContext.state.intCategoryDropdownSelectedValue,
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
* @param {*} objContext objContext
* @summary Call Confirmation popup for Deleting subject
*/
function DeletePopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/CategoryCompetency").Data["0"].CategoryCompetency;
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");

    if (objContext.state.intSubjectDropdownSelectedValue !== null && arrSelectedRows && arrSelectedRows.length > 0) {     
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
                OnConfirmationClick: (objModal) => DeleteCategoryCompetency(arrSelectedRows, objModal, objContext)
            }
        });
    } else {
        ErrorPopup(objContext);
    }
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
            "vColumnName": "vCompetencykeyword",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "t_TestDrive_Category_Competency_Data.tCompetencyText",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
}

/** 
* @param {*} arrSelectedRows arrSelectedRows
* @param {*} objModal objModal 
* @param {*} objContext objContext
* @summary Deletes category competency and close popup on sccess
*/
const DeleteCategoryCompetency = (arrSelectedRows, objModal, objContext) => {
    let arrDeleteRow = [];
    arrSelectedRows.map(objSelectedRows => {
        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    });

    let objDeleteParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iCategoryId": objContext.state.intCategoryDropdownSelectedValue.toString()
                    }
                }
            ]
        },
        "vDeleteData": arrDeleteRow
    };

    let arrParams = [
        {
            URL: "API/Object/Intranet/Taxonomy/CategoryCompetency",
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
* @param {*} objContext objContext
* @summary Call Error Popup
*/
function ErrorPopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_Taxonomy/CategoryCompetency").Data["0"].CategoryCompetency;

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
* @param {*} objContext objContext
* @param {*} intSubjectDropdownSelectedValue
* @summary  useEffect to get the subsubject data after every subject dropdown change and change state
*/
export const useSubjectDropDownChange = (objContext, intSubjectDropdownSelectedValue) => {
    useEffect(() => {
        if (intSubjectDropdownSelectedValue !== -1) {
            objContext.dispatch({
                type: "SET_STATE_VALUES", payload: {
                    "arrSubSubjectData": GetSubSubjectData(intSubjectDropdownSelectedValue, objContext),
                    "intCategoryDropdownSelectedValue": -1,
                    "arrCategoryCompetencyData": []
                }
            });

        } else {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrSubSubjectData": [] } });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrCategoryData": [] } });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrCategoryCompetencyData": [] } });
        }
    }, [intSubjectDropdownSelectedValue]);
};

/**
* @param {*} intSubjectDropdownSelectedValue intSubjectDropdownSelectedValue
* @param {*} objContext objContext
* @summary  returns the subsubject data whose parent subject id matches the selected subject dropdown id
*/
function GetSubSubjectData(intSubjectDropdownSelectedValue, objContext) {
    let arrSubjectData = DataRef(objContext.props.subject)["Data"];
    let arr = [];
    arrSubjectData.map((objSubSubjectData) => {
        if (objSubSubjectData["iParentSubjectId"] === intSubjectDropdownSelectedValue) {
            arr = [...arr, objSubSubjectData];
        }
    });
    return arr;
}

/**
* @param {*} objChangeData objChangeData
* @param {*} intSubSubjectDropdownSelectedValue intSubSubjectDropdownSelectedValue
* @summary Hooks to get the category data after the sub subject dropdown is selected and change the respective states
*/
export const useSubSubjectDropDownChange = (objContext, intSubSubjectDropdownSelectedValue) => {

    useEffect(() => {
        if (intSubSubjectDropdownSelectedValue !== -1) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intCategoryDropdownSelectedValue": -1, "arrCategoryCompetencyData": [] } });
            let objCategoryParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iSubjectId": intSubSubjectDropdownSelectedValue.toString()
                            }
                        }
                    ]
                }
            };
            let arrParams = [
                {
                    "URL": "API/Object/Intranet/Taxonomy/Category",
                    "Params": objCategoryParams,
                    "MethodType": "Get",
                    "UseFullName": true

                }];
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {


            });
        } else {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrCategoryData": [] } });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrCategoryCompetencyData": [] } });
        }
    }, [intSubSubjectDropdownSelectedValue]);
};

/**
* @param {*} objContext objContext
* @param {*} intSubSubjectDropdownSelectedValue intSubSubjectDropdownSelectedValue
* @summary Hooks to set/change arrCategoryData state whenever category data is changed
*/
export const useCategoryChange = (objContext, intSubSubjectDropdownSelectedValue) => {
    useEffect(() => {
        if (objContext.props.category
            && intSubSubjectDropdownSelectedValue !== -1
            && DataRef(objContext.props.category, "object_intranet_taxonomy_category;isubjectid;" + intSubSubjectDropdownSelectedValue.toString())["Data"]
        ) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrCategoryData": DataRef(objContext.props.category, "object_intranet_taxonomy_category;isubjectid;" + intSubSubjectDropdownSelectedValue.toString())["Data"] } });
        }

    }, [objContext.props.category]);
};

/**
* @param {*} objContext objContext
* @param {*} intCategoryDropdownSelectedValue intCategoryDropdownSelectedValue
* @summary  to get category competency data
*/
export const useCategoryDropDownChange = (objContext, intCategoryDropdownSelectedValue) => {
    useEffect(() => {
        if (intCategoryDropdownSelectedValue !== -1) {
            let objCategoryCompetencyParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iCategoryId": intCategoryDropdownSelectedValue.toString()
                            }
                        }
                    ]
                }
            };
            let arrParams = [
                {
                    "URL": "API/Object/Intranet/Taxonomy/CategoryCompetency",
                    "Params": objCategoryCompetencyParams,
                    "MethodType": "Get",
                    "UseFullName": true
                }];
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {


            });
        } else {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrCategoryCompetencyData": [] } });
        }
    }, [intCategoryDropdownSelectedValue]);
};

/**
* @param {*} objContext objContext
* @param {*} intCategoryDropdownSelectedValue intCategoryDropdownSelectedValue
* @summary  hooks to change state after category competency api is hit
*/
export const useCategoryCompetencyChange = (objContext, intCategoryDropdownSelectedValue) => {
    useEffect(() => {
        if (objContext.props.categorycompetency
            && intCategoryDropdownSelectedValue !== null
            && DataRef(objContext.props.categorycompetency, "object_intranet_taxonomy_categorycompetency;icategoryid;" + intCategoryDropdownSelectedValue.toString())["Data"]

        ) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrCategoryCompetencyData": DataRef(objContext.props.categorycompetency, "object_intranet_taxonomy_categorycompetency;icategoryid;" + intCategoryDropdownSelectedValue.toString())["Data"] } });
        }
    }, [objContext.props.categorycompetency]);
};

/**
* @param {*} objContext
* @param {*} objTextResource
* @param {*} arrSubjectData
* @summary  returns the subject dropdown data
*/
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
* @param {*} objChangeData 
* @param {*} props 
* @summary   To change the subject selected value on change of the subject dropdown
*/
export const OnSubjectDropDownChange = (objChangeData, props) => {
    props.ObjContext.dispatch({
        type: "SET_STATE_VALUES", payload: {
            "intSubjectDropdownSelectedValue": objChangeData["iSubjectId"],
            "intSubSubjectDropdownSelectedValue": -1,
            "intCategoryDropdownSelectedValue": -1,
            "arrSubSubjectData": [],
            "arrCategoryData": []
        }
    });
};

/**
* @param {*} objContext
* @param {*} objTextResource
* @param {*} arrSubSubjectData
* @summary  returns the subsubject dropdown data
*/
export const GetSubSubjectDropDownData = (objContext, objTextResource, arrSubSubjectData) => {
    let objSubSubjectDropDownData = {
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

    //objSubSubjectDropDownData["Data"] = [...objSubSubjectDropDownData["Data"], objFirstDropdownData];

    arrSubSubjectData.map((objSubSubjectData) => {
        objSubSubjectDropDownData["Data"] = [...objSubSubjectDropDownData["Data"], objSubSubjectData];
    });

    return objSubSubjectDropDownData;
};

/**
* @param {*} objChangeData 
* @param {*} props 
* @summary   To change the sub subject Dropdown value on change of the sub subject dropdown 
*/
export const OnSubSubjectDropDownChange = (objChangeData, props) => {
    props.ObjContext.dispatch({
        type: "SET_STATE_VALUES", payload: {
            "intSubSubjectDropdownSelectedValue": objChangeData["iSubjectId"],
            "intCategoryDropdownSelectedValue": -1,
            "arrCategoryData": []
        }
    });
};

/**
* @param {*} objContext
* @param {*} objTextResource
* @param {*} arrCategoryData
* @summary returns the category dropdown data
*/
export const GetCategoryDropDownData = (objContext, objTextResource, arrCategoryData) => {
    let objCategoryDropDownData = {
        "cISLanguageDependent": "Y",
        "ValueColumn": "iCategoryId",
        "DisplayColumn": "vCategoryName",
        "DependingTableName": "t_TestDrive_Category_Data",
        "Data": []
    };

    //let objFirstDropdownData = {
    //    "iCategoryId": -1,
    //    "cIsDeleted": "N",
    //    "t_TestDrive_Category_Data": [
    //        {
    //            "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId,
    //            "vCategoryName": objTextResource["PleaseChoose"]
    //        }
    //    ]
    //};

    //objCategoryDropDownData["Data"] = [...objCategoryDropDownData["Data"], objFirstDropdownData];

    arrCategoryData.map((objCategoryData) => {
        objCategoryDropDownData["Data"] = [...objCategoryDropDownData["Data"], objCategoryData];
    });

    return objCategoryDropDownData;
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
* @summary   To change the category selected value on change of the category dropdown 
*/
export const OnCategoryDropDownChange = (objChangeData, props) => {
    props.ObjContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intCategoryDropdownSelectedValue": objChangeData["iCategoryId"] } });
};

export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSubjectDropdownSelectedValue: -1,
        arrSubSubjectData: [],
        intSubSubjectDropdownSelectedValue: -1,
        arrCategoryData: [],
        intCategoryDropdownSelectedValue: -1,
        arrCategoryCompetencyData: []
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
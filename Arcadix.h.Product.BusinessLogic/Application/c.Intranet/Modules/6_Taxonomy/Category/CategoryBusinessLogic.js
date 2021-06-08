import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name mapStateToProps
 * @param {*} state state
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            subject: DataRef(state.Entity, "object_intranet_taxonomy_subject", true),
            textresource: DataRef(state.Entity, "textresource", true),
            objectgenerator: DataRef(state.Entity, "objectgenerator", true),
            category: DataRef(state.Entity, "object_intranet_taxonomy_category", true),
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
 * @param {*} JConfiguration JConfiguration
 * @param {*} props props
 * @summary Get initial request params for the component.
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
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/6_Taxonomy/Category"
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
                        "vObjectName": "CategoryGrid"
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
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {

        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.subject)["Data"]
            && DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/Category")
            && DataRef(objContext.props.objectgenerator, "objectgenerator;vObjectName;CategoryGrid")["Data"]
            && DataRef(objContext.props.objectgenerator, "objectgenerator;vObjectName;CategoryGrid")["Data"][0]
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
* @param {*} objContext
* @summary Set RibbonData
*/
export function SetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("RibbonData", GetCategoryToolData(objContext));
    }, [objContext.state.isLoadComplete, objContext.state.intSubSubjectDropdownSelectedValue]);
}

/**
* @param {*} objContext
* @summary Get data to initialize RibbonData
*/
export function GetCategoryToolData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/category").Data["0"]["Category"];
    return (
        [
            {//Group3
                "vGroupName": objTextResource["New"],//"New",
                "t_GroupData": [
                    {
                        "vTextName": objTextResource["New"],//"New",
                        "uImageUrl": "New_Large.svg",//"down.png",
                        "type": "single",
                        "OnClick": () => AddPopup(objContext)
                    },
                    {
                        "vTextName": objTextResource["Edit"],//"To Edit",
                        "uImageUrl": "Edit_Large.svg",
                        "type": "single",
                        "OnClick": () => EditPopup(objContext)
                    },
                    {
                        "vTextName": objTextResource["Delete"],//"clear",
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
* @summary Call AddEditPopup for Adding category
*/
function AddPopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/category").Data["0"].Category;
    let arrHeaderData = GetAddEditMetaData();
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
    
    if (objContext.state.intSubSubjectDropdownSelectedValue !== -1) {
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
                ModuleName: "addeditcategorypopup",
                arrHeaderData,
                objTextResource,
                intSubjectDropdownSelectedValue: objContext.state.intSubjectDropdownSelectedValue,
                intSubSubjectDropdownSelectedValue: objContext.state.intSubSubjectDropdownSelectedValue,
                JConfiguration: objContext.props.JConfiguration,
                MainClientLanguageData: arrMainClientlanguageData,
                LanguageData: arrLanguageData,
                ClientUserDetails: objContext.props.ClientUserDetails,
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
* @summary Call ConfirmationPopup for Deleting category
*/
function DeletePopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/Category").Data["0"].Category;
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
                OnConfirmationClick: (objModal) => DeleteCategory(arrSelectedRows, objModal, objContext)
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
* @summary Deletes category and close popup on sccess
*/
const DeleteCategory = (arrSelectedRows, objModal, objContext) => {
    let arrDeleteRow = [];
    arrSelectedRows.map(objSelectedRows => {
        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    });

    let objDeleteParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iSubjectId": objContext.state.intSubSubjectDropdownSelectedValue.toString()
                    }
                }
            ]
        },
        "vDeleteData": arrDeleteRow
    };

    let arrParams = [
        {
            URL: "API/Object/Intranet/Taxonomy/Category",
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
* @summary Call AddEditPopup for Editing category
*/
function EditPopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/Category").Data["0"].Category;
    let arrHeaderData = GetAddEditMetaData();
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
    let selectedRows = ApplicationState.GetProperty("SelectedRows");

    if (objContext.state.intSubSubjectDropdownSelectedValue !== -1 && selectedRows && selectedRows.length > 0) {
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
                ModuleName: "addeditcategorypopup",
                arrHeaderData,
                objTextResource,
                intSubjectDropdownSelectedValue: objContext.state.intSubjectDropdownSelectedValue,
                intSubSubjectDropdownSelectedValue: objContext.state.intSubSubjectDropdownSelectedValue,
                JConfiguration: objContext.props.JConfiguration,
                MainClientLanguageData: arrMainClientlanguageData,
                LanguageData: arrLanguageData,
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
* @summary Call Error Popup
*/
function ErrorPopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/category").Data["0"].Category;

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
            "vColumnName": "t_TestDrive_Category_Data.vCategoryName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "iDisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number"
        },
        {
            "vColumnName": "t_TestDrive_Category_Data.tConceptAndSkills",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "t_TestDrive_Category_Data.tClarificationNotes",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "vCategoryKeyword",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
}

/**
* @param {*} objContext
* @param {*} objTextResource
* @param {*} arrSubjectData
* @param {*} strType
* @summary returns the subject/sub subject dropdown data based on the strType passed
*/
export const GetSubjectDropDownData = (objContext, objTextResource, arrSubjectData, strType) => {
    let objSubjectDropDownData = {
        "cISLanguageDependent": "Y",
        "ValueColumn": "iSubjectId",
        "DisplayColumn": "vSubjectName",
        "DependingTableName": "t_TestDrive_Subject_Data",
        "Data": []
    };
    //let objFirstDropdownData = {
    //    "iSubjectId": -1,
    //    //"iParentSubjectId": 0,
    //    "cIsDeleted": "N",
    //    "t_TestDrive_Subject_Data": [
    //        {
    //            "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId,
    //            "vSubjectName": objTextResource["PleaseChoose"],//"Please choose",
    //            "vSubjectDisplayName": null,
    //            "vSubjectShortName": null,
    //            "tSubjectDescription": null,
    //            "iDataMainClientId": objContext.props.JConfiguration.MainClientId
    //        }
    //    ]
    //};
    //objSubjectDropDownData["Data"] = [...objSubjectDropDownData["Data"], objFirstDropdownData];
    if (strType === "subject") {
        arrSubjectData.map((objSubjectData) => {
            if (objSubjectData["iParentSubjectId"] === 0) {
                objSubjectDropDownData["Data"] = [...objSubjectDropDownData["Data"], objSubjectData];
            }
        });
        return objSubjectDropDownData;
    }
    if (strType === "subSubject") {
        arrSubjectData.map((objSubSubjectData) => {
            objSubjectDropDownData["Data"] = [...objSubjectDropDownData["Data"], objSubSubjectData];
        });
        return objSubjectDropDownData;
    }
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
    props.ObjContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSubjectDropdownSelectedValue": objChangeData["iSubjectId"], "intSubSubjectDropdownSelectedValue": -1, "arrSubSubjectData": [] } });
};

/**
* @param {*} objContext
* @param {*} intSubjectDropdownSelectedValue
* @summary  Hooks to get the subsubject data after every subject dropdown change and change state
*/
export const useSubjectDropDownChange = (objContext, intSubjectDropdownSelectedValue) => {
    useEffect(() => {
        if (intSubjectDropdownSelectedValue !== -1) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrSubSubjectData": GetSubSubjectData(intSubjectDropdownSelectedValue, objContext), "arrCategoryData": [] } });
        }
    }, [intSubjectDropdownSelectedValue]);
};

/**
* @param {*} intSubjectDropdownSelectedValue
* @param {*} objContext
* @summary  returns the sub subjects of the selected subject
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
* @param {*} objChangeData 
* @param {*} props 
* @summary   To change the sub subject Dropdown Data on change of the subject dropdown value
*/
export const SubSubjectDropDownChange = (objChangeData, props) => {
    props.ObjContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSubSubjectDropdownSelectedValue": objChangeData["iSubjectId"] } });
};

/**
* @param {*} intSubSubjectDropdownSelectedValue
* @summary  Calls Category data after each subsubject dropdown selected
*/
export const useSubSubjectDropDownChange = (objContext, intSubSubjectDropdownSelectedValue) => {
    useEffect(() => {
        if (intSubSubjectDropdownSelectedValue !== -1) {
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
            objContext.dispatch({
                type: "SET_STATE_VALUES", payload: { "arrCategoryData": [] }
            });
        }
    }, [intSubSubjectDropdownSelectedValue]);
};

/**
* @param {*} objContext
* @param {*} intSubSubjectDropdownSelectedValue
* @summary  set state after category changes
*/
export const useCategoryChange = (objContext, intSubSubjectDropdownSelectedValue) => {
    useEffect(() => {
        if (objContext.props.category
            && intSubSubjectDropdownSelectedValue !== null
            && DataRef(objContext.props.category, "object_intranet_taxonomy_category;isubjectid;" + intSubSubjectDropdownSelectedValue.toString())["Data"]
        ) {
            objContext.dispatch({
                type: "SET_STATE_VALUES", payload: {
                    "arrCategoryData": DataRef(objContext.props.category, "object_intranet_taxonomy_category;isubjectid;" + intSubSubjectDropdownSelectedValue.toString())["Data"]
                }
            });
        }
    }, [objContext.props.category]);
};


export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSubjectDropdownSelectedValue: -1,
        arrSubSubjectData: [],
        intSubSubjectDropdownSelectedValue: -1,
        arrCategoryData: []
    };
}

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
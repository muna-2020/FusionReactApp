//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_OnlineHelp from '@shared/Object/c.Cockpit/OnlineHelp/OnlineHelp';
import Object_Cockpit_OnlineHelpGroup from '@shared/Object/c.Cockpit/OnlineHelp/OnlineHelpGroup/OnlineHelpGroup';
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Editor_TaskContent_CMSPageContent from '@shared/Object/e.Editor/TaskContent/1_CMSPageContent/CMSPageContent';

//Module Objects
import * as AddEditOnlineHelp_MetaData from '@shared/Application/c.Cockpit/Modules/OnlineHelp/OnlineHelp/AddEditOnlineHelp/AddEditOnlineHelp_MetaData';

//Module related imports.
import * as OnlineHelp_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/OnlineHelp/OnlineHelp/OnlineHelp_OfficeRibbon';

//Editor Main Module.
import Editor from '@root/Application/e.Editor/PC/Editor';

/**
 * @name OnlineHelp_ModuleProcessor
 * @summary Class for OnlineHelp module display.
 */
class OnlineHelp_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_OnlineHelp",
            "Object_Cockpit_OnlineHelpGroup",
            "Object_Cockpit_ApplicationType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/OnlineHelp",
            "Object_Cockpit_MainClient_MainClient",
            { "StoreKey": "ApplicationState", "DataKey": "SelectedRows" }
        ];
     }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        var objOnlineHelpParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iMainClientId": props.JConfiguration.MainClientId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iHelpId": {
                        "order": "asc"
                    }
                }
            ]
        };

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        //OnlineHelp object
        Object_Cockpit_OnlineHelp.Initialize(objOnlineHelpParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_OnlineHelp];

        //OnlineGroupHelp object
        Object_Cockpit_OnlineHelpGroup.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_OnlineHelpGroup];

        //ApplicationType object
        Object_Cockpit_ApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/OnlineHelp"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name LoadPageJson(objContext)
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @summary Makes call to get the page json from server.
     * @returns {object} Page json.
     */
     LoadPageJson(objContext) {
        let iPageId = ApplicationState.GetProperty("SelectedRows")?.["OnlineHelpGrid"]?.[0]?.iPageId ?? null;
        if (iPageId) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iPageId": iPageId
                            }
                        },
                        {
                            "match": {
                                "iLanguageId": JConfiguration.InterfaceLanguageId
                            }
                        }
                    ]
                },
                "cIsForEditor": "Y"
            };
            Object_Editor_TaskContent_CMSPageContent.GetData(objParams, (objResponse) => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                let objPageJson = objResponse["Object_Editor_TaskContent_CMSPageContent"]["Data"][0];
                objContext.dispatch({ type: "SET_STATE", payload: { "objPageJson": objPageJson } });
            });
        }
        else {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "objPageJson": null } });
        }
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation popup for Deleting subject
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        let arrHeaderData = AddEditOnlineHelp_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/OnlineHelp", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["OnlineHelpGrid"] : 0;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        else {
            blnShowErrorPopup = objContext.state.objFilter["iApplicationTypeId"] == -1 || objContext.state.objFilter["uHelpGroupId"] == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    DropdownData: {
                        ApplicationTypeData: DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"],
                        MainClientData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"],
                        HelpGroupData: DataRef(objContext.props.Object_Cockpit_OnlineHelpGroup)["Data"],
                        ApplicationTypeId: objContext.state.objFilter["iApplicationTypeId"],
                        HelpGroupId: objContext.state.objFilter["uHelpGroupId"]
                    },
                    Object_Cockpit_OnlineHelp: objContext.props.Object_Cockpit_OnlineHelp,
                    IsEdit: blnIsEdit
                },
                Meta: {
                    PopupName: "AddEditOnlineHelp",
                    HeaderData: arrHeaderData,
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                },
                Events: {
                },
                CallBacks: {
                },
            });
        } else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: blnIsEdit ? "ErrorPopup" : "AddErrorPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting subject
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/OnlineHelp", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["OnlineHelpGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vHostURL"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    Variables: objVaribales
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (objModal) => this.DeleteOnlineHelp(arrSelectedRows, objModal)
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name DeleteOnlineHelp
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes OnlineHelp and close popup on success
     */
    DeleteOnlineHelp(arrSelectedRows, objModal) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "iMainClientId": JConfiguration.MainClientId
                    }
                }
            ]
        }
        Object_Cockpit_OnlineHelp.DeleteData({ "SearchQuery": objSearchQuery, vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                Popup.ClosePopup(objModal);
                let fnSelectAdjacentGridRow = ApplicationState.GetProperty("SelectAdjacentGridRow") && ApplicationState.GetProperty("SelectAdjacentGridRow")["OnlineHelpGrid"] ? ApplicationState.GetProperty("SelectAdjacentGridRow")["OnlineHelpGrid"] : null;
                if (fnSelectAdjacentGridRow) {
                    fnSelectAdjacentGridRow(arrSelectedRows);
                }
            }
        });
    }

    /**
     * @name OnApplicationTypeDropDownChange
     * @param {*} objChangeData objChangeData
     * @param {*} props props
     * @param {*} objContext objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    OnApplicationTypeDropDownChange(objChangeData, objContext) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "OnlineHelpGrid": null });        
        objContext.dispatch({ type: "SET_STATE", payload: { objFilter: { ...objContext.state.objFilter, "iApplicationTypeId": objChangeData["iApplicationTypeId"], "uHelpGroupId": -1} } });
    };

    /**
     * @name OnHelpGroupIdeDropDownChange
     * @param {*} objChangeData objChangeData
     * @param {*} props props
     * @param {*} objContext objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    OnHelpGroupIdeDropDownChange(objChangeData, objContext) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "OnlineHelpGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { objFilter: { ...objContext.state.objFilter, "uHelpGroupId": objChangeData["uHelpGroupId"] } } });
        objContext.dispatch({ type: "SET_STATE", payload: { objFilter: { ...objContext.state.objFilter, "uHelpGroupId": objChangeData["uHelpGroupId"] } } });
    };

    /**
     * @name OpenContent
     * @param {object} objContext passes Context object.
     * @summary this open the Editor.
     */
    OpenContent(objContext) {
        let arrPageIds = [], arrPageProperties = [];
        ApplicationState.GetProperty("SelectedRows")["OnlineHelpGrid"].forEach(objTemp => {
            arrPageIds = [...arrPageIds, parseInt(objTemp.iPageId)];
            arrPageProperties = [...arrPageProperties, { "iPageId": parseInt(objTemp.iPageId), "vPageName": objTemp.vHelpKey }];
        });
        if (ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["OnlineHelpGrid"].length > 0) {
            let objParams = {
                "Data": {
                    "PageIds": arrPageIds,
                    "SubjectForMainClient": null,
                    "TaskProperties": arrPageProperties,
                    "LanguageData": null,
                    "IsFirstTask": true,
                    "IsLastTask": true,
                    "IsNotFromIntranet": true,
                    "ContentUsageGroupId": "UseCaseContentGroup",
                    "MultiMediaUsageGroupId": "UseCaseMediaGroup"
                },
                "CallBacks": {
                    "EditorCloseCallback": (objPageJson) => {
                        objContext.dispatch({ type: "SET_STATE", payload: { "objPageJson": objPageJson } });
                    }
                },
                "ParentProps": {
                    "JConfiguration": objContext.props.JConfiguration,
                    "ClientUserDetails": objContext.props.ClientUserDetails,
                }
            };
            let objEditor = new Editor();
            objEditor.OpenEditor(objParams);
        }
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.OnlineHelp_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.OnlineHelp_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.OnlineHelp_ModuleProcessor.OpenDeletePopup(objContext),
            "OpenContent": () => objContext.OnlineHelp_ModuleProcessor.OpenContent(objContext),
        };
        ApplicationState.SetProperty("OfficeRibbonData", OnlineHelp_OfficeRibbon.GetOnlineHelpOfficeRibbonData(objRibbonData));
    } 

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css"
        ];
    }
}

export default OnlineHelp_ModuleProcessor;
//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Framework_Services_Tip from '@shared/Object/a.Framework/Services/Tip/Tip';
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module related files.
import * as AddEditTip_MetaData from '@shared/Application/c.Cockpit/Modules/Tip/AddEditTip/AddEditTip_MetaData';
import * as Tip_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/Tip/Tip_OfficeRibbon';
import * as Tip_MetaData from '@shared/Application/c.Cockpit/Modules/Tip/Tip_MetaData';

//Editor Main Module.
import Editor from '@root/Application/e.Editor/PC/Editor';

/**
* @name Tip_ModuleProcessor
* @summary Class for Tip module display.
*/
class Tip_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_Tip",
            "Object_Cockpit_ApplicationType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/Tip",
            "Object_Cockpit_MainClient_MainClient",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language"
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

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        //ApplicationType object
        Object_Cockpit_ApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];

        //Tip object
        Object_Framework_Services_Tip.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_Tip];

        //Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        //Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        //Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/Tip"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let intApplicationTypeForLanguageData = objContext.props.ClientUserDetails.MainClientId == 0 ? 7 : 2;
        let objData = {
            RowData: DataRef(objContext.props.Object_Framework_Services_Tip)["Data"] ?? [],
            LanguageData: objContext.Tip_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData)
        };
        return objData;
    }

    /**
     * @name GetMetaData
     * @param {object} objContext
     * @summary it returns the object for Grid Meta Data
     * @returns {object}  MetaData object
     */
    GetMetaData(objContext) {
        return {
            ...Tip_MetaData.GetAddEditMetaData(),
            Filter: {
                "cIsDeleted": "N",
                "iMainClientId": objContext.props.ClientUserDetails.MainClientId == 0 ? objContext.state.strMainClientId : objContext.props.ClientUserDetails.MainClientId,
                "iApplicationTypeId": objContext.state.strApplicationId
            }
        }
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/Tip", objContext.props) ?? {};
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation popup for Deleting subject
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        let arrHeaderData = AddEditTip_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/Tip", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TipGrid"] : 0;
        let intApplicationTypeForTipData = 0;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0 ? true : false;
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForTipData),
                    DropdownData: {
                        ApplicationTypeId: objContext.state.strApplicationId,
                        ApplicationTypeData: DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"],
                        MainClientData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"],
                    },
                    //Object_Framework_Services_Tip: objContext.props.Object_Framework_Services_Tip,
                    IsEdit: blnIsEdit
                },
                Meta: {
                    PopupName: "AddEditTip",
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
                }
            });
        } else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/Tip", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TipGrid"] : [];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows.t_TestDrive_Tip_Data.find(objTopicData => objTopicData.iLanguageId == objContext.props.JConfiguration.InterfaceLanguageId)["vTipTitle"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                    Variables: objVaribales
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (objModal) => this.DeleteTip(arrSelectedRows, objModal)
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
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
     * @name DeleteTip
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Tip and close popup on success
     */
    DeleteTip(arrSelectedRows, objModal) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Framework_Services_Tip.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                ApplicationState.SetProperty("SelectedRows", []);
                Popup.ClosePopup(objModal);
            }
        });
    }

    /**
     * @name OnMainClientDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the subject Dropdown Data on change of the subject dropdown value
     */
    OnMainClientDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TipGrid": null });

        objContext.dispatch({ type: "SET_STATE", payload: { objFilter: { ...objContext.state.objFilter, "iMainclientId": objChangeData["iMainClientId"] } } });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "strMainClientId": objChangeData["iMainClientId"],
                "strApplicationId": -1,
                "arrApplicationId": objChangeData.iMainClientId == -1 ? objContext.props.Object_Cockpit_ApplicationType["Data"] : objContext.props.Object_Cockpit_ApplicationType["Data"].filter(x => x.iMainClientId == objChangeData["iApplicationTypeId"])
                //"arrClientHostUrlData": []
            }
        });
    };

    /**
     * @name OnApplicationTypeDropDownChange
     * @param {*} objChangeData objChangeData
     * @param {*} objContext objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    OnApplicationTypeDropDownChange(objChangeData, objContext) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TipGrid": null });
        //objContext.dispatch({
        //    type: "SET_STATE", payload: {
        //        "strApplicationId": objChangeData["iApplicationTypeId"], "objFilter": { ...objContext.state.objFilter, "iApplicationTypeId": objChangeData["iApplicationTypeId"] }
        //    }
        //});
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "strApplicationId": objChangeData["iApplicationTypeId"]
            }
        });
    }

    /**
     * @name CreateItemEventHandler
     * @param {*} objItem objItem
     * @summary   To filter the dropdown data based on the condition
     * @return {bool} boolean
     */
    CheckDeletedDropDownDataEventHandler(objItem) {
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @name OpenContent
     * @param {object} objContext passes Context object.
     * @summary this open the Editor.
     */
    OpenContent(objContext) {
        if (ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["TipGrid"] && ApplicationState.GetProperty("SelectedRows")["TipGrid"].length > 0) {
            let arrPageIds = ApplicationState.GetProperty("SelectedRows")["TipGrid"].map(objTip => {
                return parseInt(objTip.iPageId);
            });
            let arrPageProperties = ApplicationState.GetProperty("SelectedRows")["TipGrid"].map(objTip => {
                return {
                    "iPageId": parseInt(objTip.iPageId),
                    "vPageName": objTip.t_TestDrive_Tip_Data.find(objTipData => objTipData["iLanguageId"] == JConfiguration.InterfaceLanguageId)?.vTipTitle
                };
            });
            if (arrPageIds.length > 0) {
                let objEditor = new Editor();
                let objParams = {
                    "Data": {
                        "PageIds": arrPageIds,
                        "TaskProperties": arrPageProperties,
                        "iLanguageId": objContext.props.JConfiguration["InterfaceLanguageId"],
                        "IsFirstTask": true,
                        "IsLastTask": true,
                        "IsNotFromIntranet": true,
                        "ContentUsageGroupId": "UseCaseContentGroup",
                        "MultiMediaUsageGroupId": "UseCaseMediaGroup"
                    },
                    "CallBacks": {
                        "GetAdjacentTask": (strTaskId, strType) => {
                            return -1;
                        }
                    },
                    "ParentProps": {
                        "JConfiguration": objContext.props.JConfiguration,
                        "ClientUserDetails": objContext.props.ClientUserDetails,
                    }
                };
                objEditor.OpenEditor(objParams);
            }
        }
    }

    /**
     * @name OpenPreviewInNewTab
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}
     * @summary This method is responsible for opening the preview component.
     */
    OpenPreviewInNewTab(objContext) {
        if (ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["TipGrid"] && ApplicationState.GetProperty("SelectedRows")["TipGrid"][0]) {
            let intPageId = ApplicationState.GetProperty("SelectedRows")["TipGrid"][0]["iPageId"];
            let strUrl = objContext.props.JConfiguration.OnlineBaseUrl + "TaskPreview?TaskId=" + intPageId + "&LanguageId=" + JConfiguration.InterfaceLanguageId;
            window.open(strUrl, "_blank");
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
            "AddPopup": () => objContext.Tip_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.Tip_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.Tip_ModuleProcessor.OpenDeletePopup(objContext),
            "OpenContent": () => objContext.Tip_ModuleProcessor.OpenContent(objContext),
            "OpenPreviewInNewTab": () => objContext.Tip_ModuleProcessor.OpenPreviewInNewTab(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", Tip_OfficeRibbon.GetTipOfficeRibbonData(objRibbonData));
    }

    ///**
    // * @name GetDependingColumnData
    // * @param {*} objContext objContext
    // * @summary Return depending column Dropdown data
    // * @returns {obj} depending column object
    // */
    //GetDependingColumnData(objContext) {
    //    let objClientDropDownData = {
    //        "IsLanguageDependent": "N",
    //        "ValueColumn": "iClientId",
    //        "DisplayColumn": "vClientName",
    //        "Data": []
    //    };

    //    let objTargetGroupDropDownData = {
    //        "IsLanguageDependent": "N",
    //        "ValueColumn": "iTargetGroupId",
    //        "DisplayColumn": "vTargetGroupName",
    //        "DependingTableName": "t_Framework_MainClient_Configuration_TargetGroup",
    //        "Data": []
    //    };

    //    objContext.props.Object_Cockpit_Client["Data"].map((objClient) => {
    //        objClientDropDownData["Data"] = [...objClientDropDownData["Data"], objClient];
    //    });
    //    objContext.props.Object_Cockpit_TargetGroup["Data"].map((objTargetGroup) => {
    //        objTargetGroupDropDownData["Data"] = [...objTargetGroupDropDownData["Data"], objTargetGroup];
    //    });
    //    return { "iClientId": objClientDropDownData, "iTargetGroupId": objTargetGroupDropDownData };
    //}

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

    /**
     * @name GetPrefetchFiles
     * @param {object} props props
     * @returns {object} PrefetchFiles
     */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"]
        }
    }
}

export default Tip_ModuleProcessor;
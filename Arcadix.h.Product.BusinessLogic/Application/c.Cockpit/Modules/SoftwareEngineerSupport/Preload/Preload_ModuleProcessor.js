//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Framework_SystemTracking_Preload from '@shared/Object/a.Framework/SystemTracking/Preload/Preload';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';

//Module related imports.
import * as Preload_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/SoftwareEngineerSupport/Preload/Preload_OfficeRibbon';

/**
 * @name Preload_ModuleProcessor
 * @summary Class for Preload module display.
 */
class Preload_ModuleProcessor extends CockpitBase_ModuleProcessor {
    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/SoftwareEngineerSupport/Preload",
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
     * @summary Calls the Queue and Execute method
     * @returns {object} returns object contains Columns data.
     */
    GetColumnParameters() {
        return {
            "ElasticSearchURL": "ElasticSearchURL",
            "chkCheckColumn": "Select Object",
            "Objects": "Objects",
            "Filters": "Filters",
            "SearchQuery":"SearchQuery",
            "Choose": "Please_Choose",
            "Running_Preloads": "Running Preloads",
            "MainClient": "MainClients"
        };
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

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/SoftwareEngineerSupport/Preload"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    LoadPreloadConfigData(objContext) {
        let objPreloadParam = {};
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Framework_SystemTracking_Preload.GetPreloadConfig(objPreloadParam, (objReturn) => {
            let objPreloadData = objReturn["Object_Framework_SystemTracking_Preload"]["Data"][0]["PreloadConfig"] ? objReturn["Object_Framework_SystemTracking_Preload"]["Data"][0]["PreloadConfig"] : [];
            let arrPreloaData = objPreloadData["MainClientSpecificEntities"].map(t => { return { ...t, strEntityType: "MainClientSpecificEntities" } });
            arrPreloaData = [...arrPreloaData, ...objPreloadData["CycleSpecificEntities"].map(t => { return { ...t, strEntityType: "CycleSpecificEntities" } })];
            arrPreloaData = [...arrPreloaData, ...objPreloadData["CockpitEntities"].map(t => { return { ...t, strEntityType: "CockpitEntities" } })];
            arrPreloaData = [...arrPreloaData, ...objPreloadData["FrameworkEntities"].map(t => { return { ...t, strEntityType: "FrameworkEntities" } })];
            arrPreloaData = arrPreloaData.sort((a, b) => (a.Object > b.Object) ? 1 : ((b.Object > a.Object) ? -1 : 0));
            let arrElasticConnections = objReturn["Object_Framework_SystemTracking_Preload"]["Data"][0]["ElasticConnections"];
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "blnStateLoaded": true,
                    "activePreloadCount": arrPreloaData.length,
                    "arrPreloadData": arrPreloaData.map(t => { return { ...t, isSelected: false, strFilter: "" } }),
                    "arrTotalPreloadData": objPreloadData,
                    "arrLanguageCultureInfo": objContext.props.Object_Cockpit_Language["Data"],
                    "arrElasticConnections": arrElasticConnections,
                    "strElasticConnectionServer": arrElasticConnections[0]
                }
            });
            ApplicationState.SetProperty("arrPreloadData", arrPreloaData.map(t => { return { ...t, isSelected: false, strFilter: "" } }));
            ApplicationState.SetProperty("arrLanguageCultureInfo", objContext.props.Object_Cockpit_Language["Data"]);
            ApplicationState.SetProperty("blnShowAnimation", false);
        });

    }


    /**
     * @name ConfirmationPopup
     * @param {any} objContext
     * @summary to openPopup to get Execution name
     */
    ConfirmationPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/SoftwareEngineerSupport/Preload", objContext.props);

        if (!objContext.state.selectedMainClient || objContext.state.selectedMainClient.iMainClientId == -1) {
            Popup.ShowErrorPopup({
                Data: {
                    Count: 2
                },
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: {
                        "ErrorPopup_ErrorText:1": Localization.TextFormatter(objTextResource, "Error_Popup"),
                        "ErrorPopup_ErrorText:n": Localization.TextFormatter(objTextResource, "Error_Popup"),
                        "ErrorPopup_ErrorText": Localization.TextFormatter(objTextResource, "Error_Popup"),
                        "ErrorPopup_OkButtonText": "Okay",
                    },
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    TextResourcesKey: "ErrorPopup",
                    Variables: {
                        "ErrorVariable": "Error popup",
                        "ConfirmVariable": "CONFIRM"
                    }
                },
                Events: {},
                CallBacks: {},
            });
        }
        else {
            Popup.ShowPopup({
                Data: {
                    ModuleName: "CurrentExecutionName",
                    IsEdit: false,
                    Id: "CurrentExecutionName",
                    objContext: objContext
                },
                Meta: {
                    PopupName: "CurrentExecutionName",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: 200,
                    Width: 500,
                    HeaderData: []
                },
                Resource: {
                    Text: Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/SoftwareEngineerSupport/Preload", objContext.props),
                    ClientUserDetails: objContext.props.ClientUserDetails,
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                },
                Events: {
                    ConfirmEvent: (strPopupUniqueId) => {
                        Popup.ClosePopup(strPopupUniqueId);
                        this.OnClickPreload(objContext);
                    }
                },
                CallBacks: {}
            })
        }
    }

    /**
     * @name OnClickLanguageCheckBox
     * @param {any} objContext
     * @param {any} event
     * @summary Handle Language check box to preload based on Language
     */
    OnClickLanguageCheckBox(objContext, event) {
        let arrLanguage = objContext.state.arrLanguageCultureInfo.map(objLanguage => {
            if (objLanguage.isChecked == true)
                return { ...objLanguage, isChecked: false }
            else if (event.target.value == objLanguage.vLanguageCultureInfo)
                return { ...objLanguage, isChecked: true };
            else
                return objLanguage;
        })
        objContext.dispatch({ type: "SET_STATE", payload: { "arrLanguageCultureInfo": arrLanguage } });
        ApplicationState.SetProperty("arrLanguageCultureInfo", arrLanguage);
    }

    /**
     * @name OnClickPreload
     * @param {any} objContext
     * @param {any} event
     * @summary executes to preload the data
     */
    OnClickPreload(objContext) {
        let arrPreloadEntities = [];
        let dtTodaysDate = new Date();
        let objDataParams = {};
        let strMainClient = objContext.state.selectedMainClient ? objContext.state.selectedMainClient.iMainClientId : ApplicationState.GetProperty("selectedMainClient").iMainClientId;
        let strLanguageCultureInfo = "";
        let arrLanguageCultureInfo = objContext.state.arrLanguageCultureInfo ? objContext.state.arrLanguageCultureInfo : ApplicationState.GetProperty("arrLanguageCultureInfo");
        let arrPreloadData = objContext.props.Data != undefined ? objContext.props.Data.cIsForCockpit == "Y" ? objContext.state.arrPreloadData.map(t => {
            return { ...t, isSelected: true }
        }) : objContext.state.arrPreloadData ? objContext.state.arrPreloadData : ApplicationState.GetProperty("arrPreloadData") : objContext.state.arrPreloadData ? objContext.state.arrPreloadData : ApplicationState.GetProperty("arrPreloadData");
        objContext.dispatch({ type: "SET_STATE", payload: { "FilePath": "" } });
        arrLanguageCultureInfo.map(objParam => {
            if (objParam.isChecked)
                strLanguageCultureInfo = objParam.vLanguageCultureInfo;
        });
        let strFilename = dtTodaysDate.getFullYear() + "" + dtTodaysDate.getDate() + "" + dtTodaysDate.getMonth() + "" + dtTodaysDate.getHours() + "" + dtTodaysDate.getMinutes() + "" + dtTodaysDate.getSeconds();
        arrPreloadData.map(objEntities => {
            let objPreloadParam = {}
            if (objEntities.isSelected) {
                objPreloadParam = {
                    ["Object"]: objEntities.Object,
                    ["ForeignKeyFilter"]: objEntities.ForeignKeyFilter,
                    ["SearchQuery"]: objEntities.SearchQuery,
                }
                //if (objEntities.strFilter != "") {
                //    let objFilter = { [objEntities.ForeignKeyName]: objEntities.strFilter };
                //    objPreloadParam = {
                //        ["Object"]: objEntities.Object,
                //        ["ForeignKeyFilter"]: objFilter
                //    }
                //}
                //else {
                //    objPreloadParam = {
                //        ["Object"]: objEntities.Object
                //    }
                //}
                arrPreloadEntities = [...arrPreloadEntities, objPreloadParam]
            }
        })
        let objAdditionalParams = {};
        if (strLanguageCultureInfo != "")
            objAdditionalParams = { ["LanguageCultureInfo"]: strLanguageCultureInfo };
        let strEventName = "OfflineProcessExecution_" + Date.now() + "_" + JConfiguration.ClientUserId;
        if (arrPreloadEntities != []) {
            objDataParams =
            {
                ["OfflineProcessParams"]: {
                    ["vExecutionName"]: ApplicationState.GetProperty("vExecutionName"),
                    ["Entities"]: arrPreloadEntities,
                    ["MainClient"]: strMainClient,
                    ["TextFileName"]: strFilename,
                    ["cIsCompleted"]: "N",
                    ["ElasticSearchURL"]: "",
                    ["AdditionalParams"]: objAdditionalParams,
                    ["Event"]: strEventName,
                    ["UserId"]: objContext.props.Data != undefined ? objContext.props.Data.cIsForCockpit == "Y" ? objContext.props.ParentProps.ClientUserDetails.UserId : objContext.props.ClientUserDetails.UserId : objContext.props.ClientUserDetails.UserId,
                    ["ElasticServer"]: objContext.state.strElasticConnectionServer
                },
                ["OfflineProcessKeyWord"]: "RunPreload"
            };
        }

        Object_Cockpit_OfflineProcess_OfflineProcessExecution.StartOfflineExecution(objDataParams, objContext, (objReturn) => {
            Popup.ClosePopup(objContext.props.Id);
        });

    }

    /**
     * @name OnChangeMainClientEventHandler
     * @param {any} objContext
     * @param {object} objSelectedItems selected items details
     * @summary Handler to update the MainClient Dropdown.
     */
    OnChangeMainClientEventHandler(objContext, objSelectedItems) {
        objContext.dispatch({ type: 'SET_STATE', payload: { "selectedMainClient": objSelectedItems } });
        ApplicationState.SetProperty("selectedMainClient", objSelectedItems);
        let strDefaultExecutionName = objSelectedItems.vMainClientIdentifier + "_" + Localization.DateTimeFormatter(new Date()).replace(" ", ":");
        ApplicationState.SetProperty("vExecutionName", strDefaultExecutionName);
        let arrPreloadData = [];
        if (objSelectedItems) {
            arrPreloadData = objSelectedItems.iMainClientId == 0 ? [...objContext.state.arrTotalPreloadData["CockpitEntities"], ...objContext.state.arrTotalPreloadData["FrameworkEntities"]] : [...objContext.state.arrTotalPreloadData["MainClientSpecificEntities"], ...objContext.state.arrTotalPreloadData["CycleSpecificEntities"], ...objContext.state.arrTotalPreloadData["FrameworkEntities"]]
        }
        else {
            arrPreloadData = objContext.state.arrTotalPreloadData ? [...objContext.state.arrTotalPreloadData["CockpitEntities"], ...objContext.state.arrTotalPreloadData["FrameworkEntities"], ...objContext.state.arrTotalPreloadData["MainClientSpecificEntities"], ...objContext.state.arrTotalPreloadData["CycleSpecificEntities"]] : [];
        }
        arrPreloadData = arrPreloadData.sort((a, b) => (a.Object > b.Object) ? 1 : ((b.Object > a.Object) ? -1 : 0));
        objContext.dispatch({ type: 'SET_STATE', payload: { "arrPreloadData": arrPreloadData.map(t => { return { ...t, isSelected: false, strFilter: "" } }), "blnIsAllSelected": false } });
        ApplicationState.SetProperty("arrPreloadData", arrPreloadData.map(t => { return { ...t, isSelected: false, strFilter: "" } }));
        //if (objContext.props.Data.cIsForCokpit == "Y") {

        //    this.OnClickPreload(objContext);
        //}
    }

    /**
     * @name OnClickCheckBox 
     * @param {object} objContext
     * @param {any} event event object .
     * @summary Handler for Check box.
     */
    OnClickCheckBox(objContext, event) {
        let arrPreloadData = objContext.state.arrPreloadData.map(t => {
            if (event.target.value == t.Object)
                return {
                    ...t,
                    isSelected: event.target.checked
                }
            else
                return {
                    ...t
                }
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { "arrPreloadData": arrPreloadData } });
        ApplicationState.SetProperty("arrPreloadData", arrPreloadData);
    }

    /**
     * @name OnClickTextBox
     * @param {object} objEvent
     * @summary updating text box for entity
     */
    OnClickTextBox(objContext, objEvent, strType) {
        let arrPreloadData = objContext.state.arrPreloadData.map(objEntity => {
            if (objEvent.target.id == objEntity.Object) {
                if (strType === "ForeignKeyFilter")
                    return {
                        ...objEntity,
                        ["ForeignKeyFilter"]: {
                            [objEntity.ForeignKeyName]: objEvent.target.value
                        },
                    }
                else if (strType === "SearchQueryKeys") {
                    let arrSearchFilter = objEvent.target.value.split(",").map((strValue, intIndex) => {
                        return {                            
                            ["match"]: {
                                [objEntity.SearchQueryKeys.split(",")[intIndex]]: strValue
                            }                            
                        }
                    });
                    return {
                        ...objEntity,
                        ["SearchQuery"]: {
                            ["must"]: arrSearchFilter
                        }
                    }
                }
            }
            else
                return {
                    ...objEntity
                }
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { "arrPreloadData": arrPreloadData } });
        ApplicationState.SetProperty("arrPreloadData", arrPreloadData);
    }

    /**
     * @name MarkAll
     * @param {object} objContext 
     * @param {object} value selected values.
     * @summary for marking all check box.
     */
    MarkAll(objContext, value) {
        let arrPreloadData = objContext.state.arrPreloadData.map(t => {
            return { ...t, isSelected: value }
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { "arrPreloadData": arrPreloadData, "blnIsAllSelected": value } });
        ApplicationState.SetProperty("arrPreloadData", arrPreloadData);
    }

    /**
     * @name GetElasticConnectionDropDownData
     * @param {any} objContext
     * @summary To Get ElasticConnection details DropDownData
     */
    GetElasticConnectionDropDownData(objContext) {
        let arrElasticConnections = objContext.state.arrElasticConnections;
        let arrDropDownData = [];
        arrElasticConnections?.filter(strElastic => strElastic == "LOCAL" ? JConfiguration.IsDevelopment : true)?.map((strText, i) => {
            arrDropDownData = [...arrDropDownData, {
                "OptionId": i,
                "OptionText": strText
            }];
        });
        return arrDropDownData;
    }

    HandleElasticConnectionDropDownDataChange(objContext, objChangeData) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strElasticConnectionServerId": objChangeData.OptionId, "strElasticConnectionServer": objChangeData.OptionText } });
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "ConfirmationPopup": () => objContext.Preload_ModuleProcessor.ConfirmationPopup(objContext),
        };
        //ApplicationState.SetProperty("OfficeRibbonData", Preload_OfficeRibbon.GetPreloadOfficeRibbonData(objRibbonData));
        if (objContext.props.Data != undefined ? objContext.props.Data.cIsForCockpit == "Y" : false) {
            //objContext.props.Events.SetPreloadOfficeRibbon();//Preload_ActivityTracker_OfficeRibbon.GetOfficeRibbonData(objRibbonData)
            objContext.props.SetOfficeRibbonData(Preload_OfficeRibbon.GetPreloadOfficeRibbonData(objRibbonData));
        }
        else
            ApplicationState.SetProperty("OfficeRibbonData", Preload_OfficeRibbon.GetPreloadOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStlyes
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css",
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

export default Preload_ModuleProcessor
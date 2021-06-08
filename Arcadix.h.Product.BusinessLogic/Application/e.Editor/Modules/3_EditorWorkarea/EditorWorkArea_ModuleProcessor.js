//React imports
import React from 'react';

//Module Objects
import EditorWorkArea_ContextMenu from '@shared/Application/e.Editor/Modules/3_EditorWorkArea/EditorWorkArea_ContextMenu';
import Object_Editor_TaskContent_CMSPageContent from '@shared/Object/e.Editor/TaskContent/1_CMSPageContent/CMSPageContent';
import Object_Intranet_Task_Task from '@shared/Object/c.Intranet/2_Task/Task/Task';
import * as ContainerTemplateSelection_MetaData from "@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/ContainerTemplateSelection/ContainerTemplateSelection_BusinessLogic/ContainerTemplateSelection_MetaData";

//Module related classes/methods
import * as CMSContainer_Editor_MetaData from '@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_MetaData';
import * as EditorWorkArea_MetaData from '@shared/Application/e.Editor/Modules/3_EditorWorkArea/EditorWorkArea_MetaData';

//Application State
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//UndoRedo Classes
import { InitAppState } from '@shared/Application/e.Editor/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//Module realted fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";
import * as CMSRadio_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Editor/CMSRadio_Editor_MetaData";

// Component used.
import Editor from '@root/Application/e.Editor/PC/Editor';

/**
 * @name EditorWorkArea_ModuleProcessor
 * @summary Contains business logic for EditorWorkArea.
 */
class EditorWorkArea_ModuleProcessor extends EditorWorkArea_ContextMenu {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module.
     * @return {Array} Array of object list.
     */
    static StoreMapList() {
        return ["Object_Editor_TaskContent_CMSPageContent;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/1_EditorFrame/EditorFrame"];
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {Array} return arrDataRequest
     */
    InitialDataParams(props) {
        let arrDataRequest = [];
        if (!props.IsPrefetch) {
            Object_Editor_TaskContent_CMSPageContent.Initialize(props, props.PageIds, props.LanguageId, "Y");
            arrDataRequest = [Object_Editor_TaskContent_CMSPageContent];
        }
        return arrDataRequest;
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name CopyTaskInNewLanguage
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @summary Gets patge json with new id's. Changes the language id.
     */
    async CopyTaskInNewLanguage({ objContext, intNewLanguageId }) {
        /* develblock:start */
        global.ApplicationLog.Log("CopyTaskInNewLanguage: Entered");
        /* develblock:end */
        let arrPageDetails = [];
        ApplicationState.SetProperty("blnShowAnimation", true);
        for (let i = 0; i < objContext.state.PageDetails.length; i++) {
            if (objContext.state.PageDetails[i]["iPageId"] === objContext.state.ActiveTaskId) {
                if (objContext.state.PageDetails[i]["PageJson"].Ref.current.GetTaskEditStatus && objContext.state.PageDetails[i]["PageJson"].Ref.current.GetTaskEditStatus()) {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    await objContext.state.PageDetails[i]["PageJson"].Ref.current.OpenTaskClosePopup(true);
                    ApplicationState.SetProperty("blnShowAnimation", true);
                }
                let objCopiedTask = await objContext.state.PageDetails[i]["PageJson"].Ref.current.GetPageJsonForCopy(intNewLanguageId);
                arrPageDetails = [
                    ...arrPageDetails,
                    {
                        ...objContext.state.PageDetails[i],
                        ["PageJson"]: {
                            ...objCopiedTask,
                            ["Ref"]: React.createRef(null)
                        }
                    }
                ];
            }
            else {
                arrPageDetails = [
                    ...arrPageDetails,
                    objContext.state.PageDetails[i]
                ];
            }
        }
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "PageDetails": arrPageDetails
            }
        });
        ApplicationState.SetProperty("blnShowAnimation", false);
        objContext.EditorWorkArea_ModuleProcessor.UpdateLanguageId(objContext, true);
        /* develblock:start */
        global.ApplicationLog.Log("CopyTaskInNewLanguage: Exiting");
        /* develblock:end */
    }

    /**
     * @name GetUpdatedPageProperties
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {number} intPageId Page Id for which page properties are required.
     * @summary Gets the latest page properties for the page.
     * @returns {object} Page properties.
     */
    async GetUpdatedPageProperties(objContext, intPageId) {
        /* develblock:start */
        global.ApplicationLog.Log("GetUpdatedPageProperties: Entered");
        /* develblock:end */
        let objTaskParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iPageId": intPageId
                        }
                    }
                ]
            },
            "OutputColumns": [
                "iPageId",
                "iFolderId",
                "vPageName",
                "vPageDescription",
                "iTaskTypeId",
                "iTaskUsageId",
                "cIsAdaptiveTask",
                "iSubjectId",
                "iCategoryId",
                "iCategoryCompetencyId",
                "iCategoryCompetencyLevelId",
                "iCategoryCompetencyRangeId",
                "dPoints",
                "iEstimatedTimeToSolveSolveInSeconds",
                "t_TestDrive_Task_AssignedTaskDifficultyLevel",
                "cIsShortcut",
                "vCustomerTaskId",
                "iIntermediateId",
                "vSource",
                "cIsForInternalTesting",
                "uSkinId",
                "t_CMS_Page_Container",
                "t_CMS_Page_Language",
                "t_CMS_Page_AssignedWorkflowStatus",
                "t_CMS_Page_Data",
                "cIsDeleted",
                "uUserId",
                "uModifiedById",
                "dtCreatedOn",
                "dtModifiedOn",
                "cIsFusionVersion"
            ]
        };
        let objResponse = await Object_Intranet_Task_Task.GetData_Custom(objTaskParams);
        let objPageProperties = objResponse["Object_Intranet_Task_Task;iPageId;" + intPageId]["Data"][0];
        /* develblock:start */
        global.ApplicationLog.Log("GetUpdatedPageProperties: Exiting");
        /* develblock:end */
        return objPageProperties;
    }

    /**
     * @name UpdateLanguageId
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @summary Updates the Editor State's blnIsLanguageIdChanged.
     */
    UpdateLanguageId(objContext) {
        /* develblock:start */
        global.ApplicationLog.Log("UpdateLanguageId: Entered");
        /* develblock:end */
        let blnIsLanguageIdChanged = EditorState.GetProperty("blnIsLanguageIdChanged");
        EditorState.SetProperty("blnIsLanguageIdChanged", !blnIsLanguageIdChanged);
        /* develblock:start */
        global.ApplicationLog.Log("UpdateLanguageId: Exiting");
        /* develblock:end */
    }

    /**
     * @name SetCurrentTask
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {number} intPageId The page Id which is currently active.
     * @summary Update ActiveTaskId on body click to the store.
     */
    async SetCurrentTask(objContext, intPageId) {
        /* develblock:start */
        global.ApplicationLog.Log("SetCurrentTask: Entered");
        /* develblock:end */
        if (objContext.state.ActiveTaskId !== intPageId) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objPageProperties = await objContext.EditorWorkArea_ModuleProcessor.GetUpdatedPageProperties(objContext, intPageId);
            if (objPageProperties) {
                objContext.EditorWorkArea_ModuleProcessor.SetActiveTaskOrder(objContext, intPageId);
            }
            // let objPageJson = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === intPageId)["PageJson"];
            // let intLanguageId = objPageJson["iLanguageId"];
            // objContext.EditorWorkArea_ModuleProcessor.UpdateLanguageId(objContext);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ActiveTaskId": intPageId
                }
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        /* develblock:start */
        global.ApplicationLog.Log("SetCurrentTask: Exiting");
        /* develblock:end */
    }

    /**
     * @name GetPageJsonFromServer
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {number} intPageId PageId for which PageJson needed to be fetched.
     * @param {number} intLanguageId Language id to load page.
     * @param {string} strUserId User id
     * @summary Makes call to get the page json from server.
     * @returns {object} Page json.
     */
    GetPageJsonFromServer(objContext, arrPageIds, intLanguageId, fnCallback) {
        /* develblock:start */
        global.ApplicationLog.Log("GetPageJsonFromServer: Entered");
        /* develblock:end */
        let objParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iPageId": arrPageIds.join()
                        }
                    },
                    {
                        "match": {
                            "iLanguageId": intLanguageId
                        }
                    }
                ]
            },
            "cIsForEditor": "Y"
        };
        Object_Editor_TaskContent_CMSPageContent.GetData(objParams, fnCallback);
        /* develblock:start */
        global.ApplicationLog.Log("GetPageJsonFromServer: Exiting");
        /* develblock:end */
    }

    /**
     * @name GetPageJson
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {number} intPageId PageId for which PageJson needed to be fetched.
     * @param {boolean} blnIsFirstTask If the given page id is the first page in the folder.
     * @param {boolean} blnIsLastTask  If the given page id is the last page in the folder.
     * @param {boolean} blnIsEditorVisible if the editor is there in the dom.
     * @param {boolean} blnIsTaskSwitch if the task switch is calling this method.
     * @param {object} objPageProperties properties of the page.
     * @summary Get Page json from server side and put into local state.
     * @returns {object} page details.
     */
    GetPageJson(objContext, arrCheckPageIds, blnIsFirstTask = false, blnIsLastTask = false, blnIsEditorVisible = true, blnIsTaskSwitch = false, objPageProperties = null, intLanguageId = null) {
        /* develblock:start */
        global.ApplicationLog.Log("GetPageJson: Entered");
        /* develblock:end */
        let arrPageIds = [];
        intLanguageId = intLanguageId === null ? objContext.props.JConfiguration["InterfaceLanguageId"] : intLanguageId;
        let arrPageDetails = [], arrPageJson = [];
        arrCheckPageIds.forEach(intPageId => {
            if (!objContext.state.PageDetails.find(objPage => parseInt(objPage.iPageId) === parseInt(intPageId))) {
                arrPageIds = [...arrPageIds, intPageId];
            }
        });
        arrPageIds.forEach(objItem => {
            InitAppState(objItem);
        });
        const UpdateToState = () => {
            for (let i = 0; i < arrPageIds.length; i++) {
                let intPageId = parseInt(arrPageIds[i]);
                let objProperties = objPageProperties.find(objTemp => parseInt(objTemp.iPageId) === parseInt(arrPageIds[i]));
                let objPageJson = arrPageJson.find(objTemp => parseInt(objTemp.iPageId) === parseInt(arrPageIds[i]));
                if (objPageJson && objPageJson !== null) {
                    let objPageDetails;
                    if (objPageProperties.cIsDataStoragePlaceholder && objPageProperties.cIsDataStoragePlaceholder == "Y") {
                        if (objPageJson.Containers.length === 0) {
                            let objContainerJson = CMSContainer_Editor_MetaData.GetDefaultContainerJson(54);
                            let objTextJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1);
                            objTextJson1 = {
                                ...objTextJson1,
                                "vElementJson": {
                                    ...objTextJson1.vElementJson,
                                    "vText": "1)"
                                }
                            };
                            let objTextJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(2);
                            let objRadioLikertDefaultJson = CMSRadio_Editor_MetaData.GetRadioLikertDrfaultElementJson(3);
                            objContainerJson = {
                                ...objContainerJson,
                                "Elements": [objTextJson1, objTextJson2, objRadioLikertDefaultJson]
                            };
                        }
                        objPageDetails = {
                            "iPageId": intPageId,
                            "PageJson": {
                                ...{
                                    ...objPageJson,
                                    "Containers": [objContainerJson]
                                },
                                "Ref": React.createRef()
                            },
                            "PageProperties": objProperties,
                            "blnIsFirstTask": blnIsFirstTask,
                            "blnIsLastTask": blnIsLastTask,
                        };
                    } else {
                        objPageDetails = {
                            "iPageId": intPageId,
                            "PageJson": {
                                ...objPageJson,
                                "Ref": React.createRef()
                            },
                            "PageProperties": objProperties,
                            "blnIsFirstTask": blnIsFirstTask,
                            "blnIsLastTask": blnIsLastTask,
                        };
                    }
                    arrPageDetails = [...arrPageDetails, objPageDetails];
                }
            }
            if (!blnIsTaskSwitch) {
                let strIsFusionVersion = arrPageJson.find(objTemp => parseInt(objTemp.iPageId) === parseInt(arrPageIds[arrPageIds.length - 1])).cIsFusionVersion;
                objContext.EditorWorkArea_ModuleProcessor.SetActiveTaskOrder(objContext, parseInt(arrPageIds[arrPageIds.length - 1]));
                objContext.dispatch({
                    "type": 'SET_STATE',
                    "payload": {
                        "PageDetails": [
                            ...objContext.state.PageDetails,
                            ...arrPageDetails
                        ],
                        "isLoadComplete": true,
                        "ActiveTaskId": parseInt(arrPageIds[arrPageIds.length - 1]),
                        "cIsFusionVersion": strIsFusionVersion
                    }
                });
                ApplicationState.SetProperty("blnShowAnimation", false);
                if (!blnIsEditorVisible) {
                    return true;
                }
            }
            else {
                return arrPageDetails[0];
            }
        };
        objContext.ActiveTaskOrder_Ref.current = arrCheckPageIds;
        if (objContext.state.PageDetails.length === 0 || arrPageIds.length > 0) {
            objContext.EditorWorkArea_ModuleProcessor.GetPageJsonFromServer(objContext, arrPageIds, intLanguageId, (objResponse) => {
                let arrDbPageJson = objResponse["Object_Editor_TaskContent_CMSPageContent"]["Data"];
                if (!objContext.props.ContentUsageGroupId || objContext.props.ContentUsageGroupId === null || objContext.props.ContentUsageGroupId === "PageContentGroup") {
                      ContainerTemplateSelection_MetaData.GetPageJsonWithDefaultElements(arrDbPageJson, (arrUpdatePageJson) => {
                        arrPageJson = arrUpdatePageJson;
                        UpdateToState();
                    });      
                } else {
                    let objContainerJson = CMSContainer_Editor_MetaData.GetDefaultContainerJson(34);
                    let objTextJson = CMSText_Editor_MetaData.GetDefaultElementJson(1);
                    arrPageJson = arrDbPageJson.map(objTemp => {
                        if (objTemp.Containers.length === 0) {
                            return {
                                ...objTemp,
                                "Containers": [{
                                    ...objContainerJson,
                                    "Elements": [{ ...objTextJson }]
                                }]
                            }
                        } else {
                            return { ...objTemp };
                        }
                    });
                    UpdateToState();
                }             
            });
        }
        else if (arrPageIds.length === 0 && objContext.state.ActiveTaskId && objContext.state.ActiveTaskId != null) {
            objContext.EditorWorkArea_ModuleProcessor.SetActiveTaskOrder(objContext, objContext.state.ActiveTaskId);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ActiveTaskId": objContext.state.ActiveTaskId,
                }
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        else {
            return true;
            // return objContext.state.PageDetails.find(item => item["iPageId"] === intPageId)["PageJson"];
        }
        /* develblock:start */
        global.ApplicationLog.Log("GetPageJson: Exiting");
        /* develblock:end */
    }

    /**
     * @name GetPageJsonForLanguage
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {number} intLanguageId new language id.
     * @summary Gets the page json for given language from server.
     */
    async GetPageJsonForLanguage(objContext, intLanguageId) {
        /* develblock:start */
        global.ApplicationLog.Log("GetPageJsonForLanguage: Entered");
        /* develblock:end */
        let objActivePageJson = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === objContext.state.ActiveTaskId)["PageJson"];
        await objActivePageJson.Ref.current.OpenTaskClosePopup(true);
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.EditorWorkArea_ModuleProcessor.GetPageJsonFromServer(objContext, [objContext.state.ActiveTaskId], intLanguageId, (objResponse) => {
            let arrDbPageJson = objResponse["Object_Editor_TaskContent_CMSPageContent"]["Data"];
            ContainerTemplateSelection_MetaData.GetPageJsonWithDefaultElements(arrDbPageJson, (objNewPageJson) => {
                if (objNewPageJson !== null && objNewPageJson[0] && objNewPageJson[0] != null) {
                    objContext.dispatch({
                        "type": "SET_STATE",
                        "payload": {
                            "PageDetails": objContext.state.PageDetails.map(objTempData => {
                                if (objTempData["iPageId"] === objContext.state.ActiveTaskId) {
                                    return {
                                        ...objTempData,
                                        ["PageJson"]: {
                                            ...objNewPageJson[0],
                                            ["Ref"]: React.createRef()
                                        }
                                    }
                                }
                                else {
                                    return objTempData;
                                }
                            })
                        }
                    });
                    objContext.EditorWorkArea_ModuleProcessor.UpdateLanguageId(objContext);
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    return true;
                }
                else {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    return false;
                }
            });                
        });
        /* develblock:start */
        global.ApplicationLog.Log("GetPageJsonForLanguage: Exiting");
        /* develblock:end */
    }

    /**
     * @name GetActivePageLanguage
     * @param {object} objContext { state, dispatch, props, EditorWorkArea_ModuleProcessor }.
     * @summary Gets active page language id from active page json.
     * @returns {number} Active Page language id.
     */
    GetActivePageLanguage(objContext) {
        /* develblock:start */
        global.ApplicationLog.Log("GetActivePageLanguage: Entered");
        /* develblock:end */
        let intLanguageId = -1;
        if (objContext.state.ActiveTaskId && objContext.state.ActiveTaskId !== -1) {
            let objActivePageJson = objContext.state.PageDetails.find(objTempData => parseInt(objTempData["iPageId"]) === parseInt(objContext.state.ActiveTaskId));
            intLanguageId = objActivePageJson["iLanguageId"];
        }
        /* develblock:start */
        global.ApplicationLog.Log("GetActivePageLanguage: Exiting");
        /* develblock:end */
        return intLanguageId;
    }

    /**
     * @name GetActivePageProperties
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @summary Gets the page properties of active page json.
     * @returns {object} Page properties.
     */
    GetActivePageProperties(objContext) {
        /* develblock:start */
        global.ApplicationLog.Log("GetActivePageProperties: Entered");
        /* develblock:end */
        let objPageProperties = null;
        if (objContext.state.ActiveTaskId && objContext.state.ActiveTaskId !== -1) {
            objPageProperties = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === objContext.state.ActiveTaskId)["PageProperties"];
        }
        /* develblock:start */
        global.ApplicationLog.Log("GetActivePageProperties: Exiting");
        /* develblock:end */
        return objPageProperties;
    }

    /**
     * @name SetActiveTaskOrder
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {number} intPageId PageId whose active order has to be updated.
     * @summary Maintain a queue of which task active order.
     */
    SetActiveTaskOrder(objContext, intPageId) {
        /* develblock:start */
        global.ApplicationLog.Log("SetActiveTaskOrder: Entered");
        /* develblock:end */
        if (objContext.ActiveTaskOrder_Ref.current.length > 0) {
            objContext.ActiveTaskOrder_Ref.current = objContext.ActiveTaskOrder_Ref.current.filter(objTempData => objTempData["iPageId"] !== intPageId);
        }
        objContext.ActiveTaskOrder_Ref.current = [
            intPageId,
            ...objContext.ActiveTaskOrder_Ref.current,
        ];
        /* develblock:start */
        global.ApplicationLog.Log("SetActiveTaskOrder: Exiting");
        /* develblock:end */
    }

    /**
     * @name ShowTaskNotFoundPopup
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {number} intPageId PageId whose data is not found.
     * @summary Opens up an error popup for the page whose details were not found.
     */
    ShowTaskNotFoundPopup(objContext, intPageId) {
        /* develblock:start */
        global.ApplicationLog.Log("ShowTaskNotFoundPopup: Entered");
        /* develblock:end */
        let objTextResource = {
            "ERROR_ErrorText": "No Page found with 'Page Id':" + intPageId,
            "ERROR_OkButtonText": "Ok",
            "ERROR_Title": "Page Not Found",
        };
        editorPopup.ShowErrorPopup({
            "Resource": {
                "Text": objTextResource,
                "TextResourcesKey": "ERROR",
                "Variables": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Meta": {
                "Height": 'auto',
                "Width": '390px',
                "ShowHeader": true,
                "ShowCloseIcon": true,
            },
            "Data": {
                "ModuleName": 'editor-onload-error-popup'
            },
            "Events": {},
            "CallBacks": {}
        });
        /* develblock:start */
        global.ApplicationLog.Log("ShowTaskNotFoundPopup: Exiting");
        /* develblock:end */
    }

    /**
     * @name GetActiveTaskPageJson
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @summary Returns the active task's page json.
     * @returns {object} Active Page json
     */
    GetActiveTaskPageJson(objContext) {
        /* develblock:start */
        global.ApplicationLog.Log("GetActiveTaskPageJson: Entered");
        /* develblock:end */
        let EditorRef = EditorState.GetReference("EditorRef");
        if (EditorRef && EditorRef.current && EditorRef.current.GetActiveTaskId) {
            let intPageId = EditorRef.current.GetActiveTaskId();
            let objPageJson = objContext.state.PageDetails.find(objTempPageJson => objTempPageJson["iPageId"] === intPageId)["PageJson"];
            if (objPageJson) {
                if (objPageJson.Ref.current && objPageJson.Ref.current.GetCurrentPageJson) {
                    return objPageJson.Ref.current.GetCurrentPageJson();
                }
                else {
                    return objPageJson;
                }
            }
            else {
                return null;
            }
        }
        /* develblock:start */
        global.ApplicationLog.Log("GetActiveTaskPageJson: Exiting");
        /* develblock:end */
    }

    /**
     * @name SetPointOverrideStatus
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @summary changes the point override for active task.
     */
    SetPointOverrideStatus(objContext, objPageJson) {
        /* develblock:start */
        global.ApplicationLog.Log("SetPointOverrideStatus: Entered");
        /* develblock:end */
        if (objPageJson["cPointOverride"] === "Y") {
            objContext.EditorWorkArea_ModuleProcessor.ChangePointOverrideStatus(objContext, objPageJson);
        }
        else {
            editorPopup.ShowConfirmationPopup({
                "Data": {},
                "Meta": {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                "Resource": {
                    "Text": {
                        "ConfirmationPopup_CloseButtonText": "Close",
                        "ConfirmationPopup_ConfirmButtonText": "Ok",
                        "ConfirmationPopup_Title": "Title",
                        "ConfirmationPopup_ConfirmText": "Do you want to override points for the task?",
                        "ConfirmationPopup_Subtitle": "Subtitle",
                    },
                    "SkinPath": objContext.props.JConfiguration.IntranetSkinPath,
                    "TextResourcesKey": "ConfirmationPopup"
                },
                "Events": {
                    "ConfirmEvent": (intPopupId) => {
                        objContext.EditorWorkArea_ModuleProcessor.ChangePointOverrideStatus(objContext, objPageJson, intPopupId);
                    }
                },
                "CallBacks": {}
            });
        }
        /* develblock:start */
        global.ApplicationLog.Log("SetPointOverrideStatus: Exiting");
        /* develblock:end */
    }

    /**
     * @name ChangePointOverrideStatus
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {number} intPopupId Popup id
     */
    ChangePointOverrideStatus(objContext, objPageJson, intPopupId) {
        /* develblock:start */
        global.ApplicationLog.Log("ChangePointOverrideStatus: Entered");
        /* develblock:end */
        objPageJson.Ref.current.SetPointOverrideStatus(objPageJson["cPointOverride"] === "Y" ? "N" : "Y")
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "PageDetails": [
                    ...objContext.state.PageDetails.map(item => {
                        if (item["iPageId"] === objPageJson["iPageId"]) {
                            return {
                                ...item,
                                ["PageJson"]: {
                                    ...item["PageJson"],
                                    ["cPointOverride"]: item["PageJson"]["cPointOverride"] === "Y" ? "N" : "Y"
                                }
                            }
                        }
                        else {
                            return {
                                ...item
                            };
                        }
                    })
                ]
            }
        });
        if (intPopupId) {
            editorPopup.ClosePopup(intPopupId);
        }
        /* develblock:start */
        global.ApplicationLog.Log("ChangePointOverrideStatus: Exiting");
        /* develblock:end */
    }

    /**
     * @name AddNewContainer
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}
     * @param {number} intPageId This is to identify the Page json to which the new container needs to be added
     * @param {number} intTemplateId This is the template Id which needs to added.
     * @summary Add Empty Container to PageJson
     */
    AddNewContainer(objContext, intPageId, intTemplateId) {
        /* develblock:start */
        global.ApplicationLog.Log("AddNewContainer: Entered");
        /* develblock:end */
        let objContainerJson = CMSContainer_Editor_MetaData.GetDefaultContainertJson(intTemplateId);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "PageDetails": objContext.state.PageDetails.map(objTempData => {
                    if (objTempData["iPageId"] === intPageId) {
                        return {
                            ...objTempData,
                            ["PageJson"]: {
                                ...objTempData["PageJson"],
                                "Containers": [
                                    ...objTempData["PageJson"].Containers,
                                    {
                                        ...objContainerJson,
                                        "Ref": React.createRef(),
                                        "iOrderId": objTempData["PageJson"].Containers.length
                                    }
                                ]
                            }
                        };
                    }
                    else {
                        return objTempData;
                    }
                })
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("AddNewContainer: Exiting");
        /* develblock:end */
    }

    /**
     * @name Traverse
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}
     * @param {number} intPageId Page id whose previous or next is to be get.
     * @param {string} strTraverseDirection NEXT/PREVIOUS
     * @summary Gets the previous or next task from intranet. Gets the page json for the new page id. Sets the new list of pages and also the active task order.
     */
    async Traverse(objContext, intPageId, strTraverseDirection) {
        /* develblock:start */
        global.ApplicationLog.Log("Traverse: Entered");
        /* develblock:end */

        //----------------------Check Edit Status of current task and Save first if edited------------------------------
        let objPageJson = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === intPageId)["PageJson"];
        if (objPageJson) {
            let blnTaskEdited = await objPageJson.Ref.current.GetTaskEditStatus();
            if (blnTaskEdited) {
                await objPageJson.Ref.current.OpenTaskClosePopup(); //SaveTask();
            }
        }
        //--------------------------------------------------------------------------------------------------------------------
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objEditor = new Editor();
        let objNewPageProperties = objEditor.SwitchTask(intPageId, strTraverseDirection);
        let intLanguageId = objPageJson?.iLanguageId ?? objContext.props.JConfiguration["InterfaceLanguageId"]; //get iLanguageId from Current Task (active)

        //---------Check if the next/prev Task is already opened in Editor
        if (objContext.state.PageDetails.filter(objTempData => objTempData["iPageId"] === objNewPageProperties["iPageId"]).length === 0) {
            let arrPageIds = [parseInt(objNewPageProperties["iPageId"])];
            let intNewPageId = parseInt(objNewPageProperties["iPageId"]);
            InitAppState(objNewPageProperties);
            objContext.ActiveTaskOrder_Ref.current = [parseInt(objNewPageProperties["iPageId"])];
            if (objContext.state.PageDetails.length === 0 || arrPageIds.length > 0) {
                objContext.EditorWorkArea_ModuleProcessor.GetPageJsonFromServer(objContext, arrPageIds, intLanguageId, (objResponse) => {
                    let arrDbPageJson = objResponse["Object_Editor_TaskContent_CMSPageContent"]["Data"];
                    ContainerTemplateSelection_MetaData.GetPageJsonWithDefaultElements(arrDbPageJson, (arrPageJson) => {
                        let objPageJson = arrPageJson.find(objTemp => parseInt(objTemp.iPageId) === intNewPageId);
                        let objNewPageDetails = {};
                        if (objPageJson !== null) {
                            objNewPageDetails = {
                                "iPageId": intNewPageId,
                                "PageJson": {
                                    ...objPageJson,
                                    "Ref": React.createRef()
                                },
                                "PageProperties": objNewPageProperties
                            };
                        }
                        let arrNewPageDetails = objContext.state.PageDetails.map(objTempData => {
                            if (objTempData["iPageId"] !== intPageId)
                                return objTempData
                            else
                                return objNewPageDetails
                        });
                        objContext.dispatch({
                            "type": 'SET_STATE',
                            "payload": {
                                "PageDetails": arrNewPageDetails,
                                "ActiveTaskId": objNewPageProperties["iPageId"]
                            }
                        });
                        objContext.ActiveTaskOrder_Ref.current = objContext.ActiveTaskOrder_Ref.current.filter(intTempPageId => intTempPageId !== intPageId);
                        objContext.EditorWorkArea_ModuleProcessor.SetActiveTaskOrder(objContext, objNewPageProperties["iPageId"]);
                        ApplicationState.SetProperty("blnShowAnimation", false);
                    });  
                });
            }
        }
        else {
            objContext.dispatch({
                "type": 'SET_STATE',
                "payload": {
                    "ActiveTaskId": objNewPageProperties["iPageId"]
                }
            });
            objContext.ActiveTaskOrder_Ref.current = objContext.ActiveTaskOrder_Ref.current.filter(intTempPageId => intTempPageId !== intPageId);
            objContext.EditorWorkArea_ModuleProcessor.SetActiveTaskOrder(objContext, objNewPageProperties["iPageId"]);
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        /* develblock:start */
        global.ApplicationLog.Log("Traverse: Exiting");
        /* develblock:end */
    }

    /**
     * @name SetStateToInitialValuesAndCloseEditor
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}
     * @summary Set editor work area state to its initial values and closes the editor
     */
    SetStateToInitialValuesAndCloseEditor(objContext) {
        /* develblock:start */
        global.ApplicationLog.Log("SetStateToInitialValuesAndCloseEditor: Entered");
        /* develblock:end */
        EditorState.RemoveProperty("blnIsLanguageIdChanged");
        objContext.ActiveTaskOrder_Ref.current = [];
        let objEditor = new Editor();
        objEditor.MinimizeEditor();
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "PageDetails": [],
                "ActiveTaskId": -1,
                "blnCloseEditor": false,
                "blnCloseEditorToggle": false,
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("SetStateToInitialValuesAndCloseEditor: Exiting");
        /* develblock:end */
    }

    /**
     * @name RemoveTasksFromState
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {number} intPageId PageId of task that needs to be removed/ Send undefined to remove all tasks from state.
     * @summary If pageid is sent then that PageJson with that PageId is removed from state else all tasks are removed.
     * @returns {Promise} returns promise.
     */
    async RemoveTasksFromState(objContext, intPageId, blnCloseSingleTask = true) {
        /* develblock:start */
        global.ApplicationLog.Log("RemoveTasksFromState: Entered");
        /* develblock:end */
        if (!intPageId || intPageId === null) {
            intPageId = objContext.state.ActiveTaskId;
        }
        let objPageJson = objContext.state.PageDetails.find(item => item["iPageId"] === intPageId)["PageJson"];
        if (objPageJson) {
            let blnTaskEdited = await objPageJson.Ref.current.GetTaskEditStatus();
            if (blnTaskEdited) {
                await objPageJson.Ref.current.OpenTaskClosePopup(blnCloseSingleTask);
            } else {
                let objUpdatedPageJson = await objPageJson.Ref.current.GetUpdatedPageJson();
                EditorState.SetProperty("EditorClosePageJson", objUpdatedPageJson);
            }
            const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
            fnHideSidebar();
            let arrPages = objContext.state.PageDetails.filter(item => item["iPageId"] !== intPageId);
            if (arrPages.length > 0) {
                objContext.ActiveTaskOrder_Ref.current = objContext.ActiveTaskOrder_Ref.current.filter(intTempPageId => intTempPageId !== intPageId);
                if (objContext.state.ActiveTaskId === intPageId) {
                    intPageId = objContext.ActiveTaskOrder_Ref.current[0];
                    objContext.dispatch({
                        type: "SET_STATE",
                        payload: {
                            "PageDetails": arrPages,
                            "ActiveTaskId": intPageId,
                            "blnCloseEditor": !blnCloseSingleTask,
                            "blnCloseEditorToggle": !objContext.state.blnCloseEditorToggle,
                        }
                    });
                }
                else {
                    objContext.dispatch({
                        type: "SET_STATE",
                        payload: {
                            "PageDetails": arrPages,
                            "blnCloseEditor": !blnCloseSingleTask,
                            "blnCloseEditorToggle": !objContext.state.blnCloseEditorToggle
                        }
                    });
                }
            }
            else {
                objContext.EditorWorkArea_ModuleProcessor.SetStateToInitialValuesAndCloseEditor(objContext);
            }
        }
        else {
            objContext.EditorWorkArea_ModuleProcessor.SetStateToInitialValuesAndCloseEditor(objContext);
        }
        /* develblock:start */
        global.ApplicationLog.Log("RemoveTasksFromState: Exiting");
        /* develblock:end */
    }

    /**
     * @name UpdatePageProperties
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {object} objNewPageProperties Updated page properties.
     * @summary updates the page properties.
     */
    UpdatePageProperties(objContext, objNewPageProperties) {
        /* develblock:start */
        global.ApplicationLog.Log("UpdatePageProperties: Entered");
        /* develblock:end */
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "PageDetails": [
                    ...objContext.state.PageDetails.map(objTempData => {
                        if (objTempData["iPageId"] === objNewPageProperties["iPageId"]) {
                            return {
                                ...objTempData,
                                ["PageProperties"]: objNewPageProperties
                            };
                        }
                        else {
                            return {
                                ...objTempData
                            };
                        }
                    })
                ]
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("UpdatePageProperties: Exiting");
        /* develblock:end */
    }

    /**
     * @name UpdatePageJsonForAudit
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param {object} objNewPageJson 
     * @summary Update the current page json for audit.
     */
    UpdatePageJsonForAudit(objContext, objNewPageJson) {
        /* develblock:start */
        global.ApplicationLog.Log("UpdatePageJsonForAudit: Entered");
        /* develblock:end */
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "PageDetails": objContext.state.PageDetails.map(objTempData => {
                    if (objTempData["iPageId"] === objNewPageJson.iPageId) {
                        return {
                            ...objTempData,
                            ["PageJson"]: {
                                ...objNewPageJson,
                                ["Ref"]: React.createRef()
                            }
                        };
                    }
                    else {
                        return objTempData;
                    }
                })
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("UpdatePageJsonForAudit: Exiting");
        /* develblock:end */
    }

    IsFusionVersion(objContext) {
        /* develblock:start */
        global.ApplicationLog.Log("UpdatePageJsonForAudit: Entered and Exiting");
        /* develblock:end */
        return objContext.state.cIsFusionVersion;
    }

    /**
     * @name GetTaskTypeIcon
     * @param {object} objPageProperties objPageProperties
     *  @param {object} objContext objContext
     * @summary Retuns Icon path for TaskType.
     */
    GetTaskTypeIconPath(objPageProperties, objContext) {
        let objImageMeta = EditorWorkArea_MetaData.GetImageMeta();        

        let strImageSrc = "SpacerImage";
        if (objPageProperties) {
            if (objPageProperties.cIsAdaptiveTask == 'Y') {
                strImageSrc = "HighStakeAdaptiveImage";
            }
            else {
                switch (objPageProperties.iTaskUsageId) {
                    case 1:
                        switch (objPageProperties.iTaskTypeId) {
                            case 1:
                                strImageSrc = "LearningImage";
                                break;
                        }
                        break;
                    case 2:
                        switch (objPageProperties.iTaskTypeId) {
                            case 1:
                                strImageSrc = "LowStakeImage";
                                break;
                        }
                        break;
                    case 3:
                        switch (objPageProperties.iTaskTypeId) {
                            case 1:
                                strImageSrc = "HighStakeImage";
                                break;
                            case 2:
                                strImageSrc = "HighStakeIntroImage";
                                break;
                            case 3:
                                strImageSrc = "HighStakeExampleImage";
                                break;
                            case 4:
                                strImageSrc = "HighStakeSurveyListImage";
                                break;
                            case 5:
                                strImageSrc = "HighStakeBreakImage";
                                break;
                            case 6:
                                strImageSrc = "HighStakeSurveyImage";
                                break;
                        }
                        break;
                    case 5:
                        switch (objPageProperties.iTaskTypeId) {
                            case 1:
                                strImageSrc = "DemoImage";
                                break;
                        }
                        break;
                    case 6:
                        switch (objPageProperties.iTaskTypeId) {
                            case 4:
                                strImageSrc = "SurveyListImage";
                                break;
                            case 6:
                                strImageSrc = "SurveyImage";
                                break;
                        }
                        break;
                    case 7:
                        switch (objPageProperties.iTaskTypeId) {
                            case 2:
                                strImageSrc = "PresentationImage";
                                break;
                        }
                        break;
                    default:
                        strImageSrc = "SpacerImage";
                        break;
                }
            }
        }
        return objImageMeta[strImageSrc];
    }

    /**
     * @name Traverse
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}
     * @param {number} intPageId Page id whose previous or next is to be get.
     * @param {string} strTraverseDirection NEXT/PREVIOUS
     * @summary Gets the previous or next task from intranet. Gets the page json for the new page id. Sets the new list of pages and also the active task order.
     */
    GetAdjacentTaskStatus(objContext, intPageId, strTraverseDirection) {
        let blnAdjacentTaskStatus = false;
        if (ApplicationState.GetProperty("EditorCallback") && ApplicationState.GetProperty("EditorCallback")["GetAdjacentTaskStatus"]) {
            blnAdjacentTaskStatus = ApplicationState.GetProperty("EditorCallback")["GetAdjacentTaskStatus"](intPageId, strTraverseDirection);
        }
        return blnAdjacentTaskStatus;
    }

    /**
     * @name TogglePhoneView
     * @param {object} objContext
     * @summary this switches between phone view and pc view. 
     */
    TogglePhoneView(objContext) {
        let intActiveTaskId = objContext.state.ActiveTaskId;
        let objPageRef = objContext.state.PageDetails.find(objPage => objPage["iPageId"] === intActiveTaskId).PageJson.Ref;
        if (objPageRef && objPageRef.current !== null) {
            objPageRef.current.TogglePhoneView();
        }
    }
}

export default EditorWorkArea_ModuleProcessor;

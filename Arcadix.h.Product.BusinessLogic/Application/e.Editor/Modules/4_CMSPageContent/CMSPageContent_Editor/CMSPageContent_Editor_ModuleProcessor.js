//React imports
import React from 'react';

//Module relates classes/methods
import CMSPageContent_Editor_ContextMenu from '@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_Editor/CMSPageContent_Editor_ContextMenu';
import * as CMSPageContent_Editor_Hooks from '@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_Editor/CMSPageContent_Editor_Hooks';
import AdditionalInformation_ModuleProcessor from '@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_Editor/AdditionalInformation/AdditionalInformation_ModuleProcessor';
import * as ContainerTemplateSelection_MetaData from "@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/ContainerTemplateSelection/ContainerTemplateSelection_BusinessLogic/ContainerTemplateSelection_MetaData";

//Application state Classes
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//Editor state Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Module objects.
import Object_Editor_TaskContent_CMSPageContent from '@shared/Object/e.Editor/TaskContent/1_CMSPageContent/CMSPageContent';

//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//UndoRedo Classes.
import { UndoRedoGetReInitializedState, ReInitAppState } from "@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo";

/**
 * @name CMSPageContent_Editor_ModuleProcessor
 * @summary CMSPageContent's Editor version
 */
class CMSPageContent_Editor_ModuleProcessor extends CMSPageContent_Editor_ContextMenu {

    /**
     * @name InsertContainer
     * @param {object} objParams {objContext: {state, props, dispatch, CMSPageContent_Editor_ModuleProcessor}}.
     * @summary Inserts a new Container.
     */
    InsertContainer(objParams) {
        let { objContext, objContainerJson } = objParams;
        if (objContainerJson === null) {
            /* develblock:start */
            global.ApplicationLog.Log("InsertContainer: Open Insert Container popup", "Insert Container");
            /* develblock:end */
            objContext.CMSPageContent_Editor_ModuleProcessor.ShowContainerTemplateSelectionPopup(objContext, "Insert");
        }
        else {
            /* develblock:start */
            global.ApplicationLog.Log("ReplaceContainer: objContainerJson=" + JSON.stringify(objContainerJson), "Replace Container");
            /* develblock:end */
            objContext.CMSPageContent_Editor_ModuleProcessor.ShowContainerTemplateSelectionPopup(objContext, "Replace", objContainerJson);
        }
    }

    /**
     * @name InsertAbove
     * @param {object} objParams {objContext: {state, props, dispatch, CMSPageContent_Editor_ModuleProcessor}, objContainerJson}.
     * @summary Insert the new container above the given container
     */
    InsertAbove(objParams) {
        let { objContext, objContainerJson } = objParams;
        /* develblock:start */
        global.ApplicationLog.Log("InsertAbove: objContainerJson=" + JSON.stringify(objContainerJson), "Insert Container Above");
        /* develblock:end */
        objContext.CMSPageContent_Editor_ModuleProcessor.ShowContainerTemplateSelectionPopup(objContext, "InsertAbove", objContainerJson);
    }

    /**
     * @name InsertBelow
     * @param {object} objParams {objContext: {state, props, dispatch, CMSPageContent_Editor_ModuleProcessor}, objContainerJson}.
     * @summary Insert the new container below the given container
     */
    InsertBelow(objParams) {
        let { objContext, objContainerJson } = objParams;
        /* develblock:start */
        global.ApplicationLog.Log("InsertBelow: objContainerJson=" + JSON.stringify(objContainerJson), "Insert Container Below");
        /* develblock:end */
        objContext.CMSPageContent_Editor_ModuleProcessor.ShowContainerTemplateSelectionPopup(objContext, "InsertBelow", objContainerJson);
    }

    /**
     * @MoveUp
     * @param {object} objParams {objContext: {state, props, dispatch, CMSPageContent_Editor_ModuleProcessor}, objContainerJson}.
     * @summary Moves the container above the given container
     */
    MoveUp(objParams) {
        let { objContext, objContainerJson } = objParams;
        let intActiveIndex = objContext.state.PageJson["Containers"].findIndex(objTempValue => objTempValue["iContainerId"] === objContainerJson["iContainerId"]);
        /* develblock:start */
        global.ApplicationLog.Log("MoveUp: objContainerJson =" + JSON.stringify(objContainerJson), "Move Container Up");
        /* develblock:end */
        if (intActiveIndex > 0) {
            let objPageJson = {
                ...objContext.state.PageJson,
                ["Containers"]: Helper.UpdateOrder(BaseCMSElement.ImmutableSwap(objContext.state.PageJson["Containers"], intActiveIndex, intActiveIndex - 1))
            };
            /* develblock:start */
            global.ApplicationLog.Log("MoveUp: Container moved up");
            /* develblock:end */
            objContext.CMSPageContent_Editor_ModuleProcessor.UpdateTaskEditStatus();
            objContext.dispatch({ type: "SET_STATE", payload: { "PageJson": objPageJson } });
        }
        /* develblock:start */
        global.ApplicationLog.Log("MoveUp: Exiting");
        /* develblock:end */
    }

    /**
     * @name MoveDown
     * @param {object} objParams {objContext: {state, props, dispatch, CMSPageContent_Editor_ModuleProcessor}, objContainerJson}
     * @summary Moves the container below the given container
     */
    MoveDown(objParams) {
        let { objContext, objContainerJson } = objParams;
        let intActiveIndex = objContext.state.PageJson["Containers"].findIndex(objTempValue => objTempValue["iContainerId"] === objContainerJson["iContainerId"]);
        /* develblock:start */
        global.ApplicationLog.Log("MoveDown: objContainerJson =" + JSON.stringify(objContainerJson), "Move Container Down");
        /* develblock:end */
        if (intActiveIndex < objContext.state.PageJson["Containers"].length - 1) {
            let objPageJson = {
                ...objContext.state.PageJson,
                ["Containers"]: Helper.UpdateOrder(BaseCMSElement.ImmutableSwap(objContext.state.PageJson["Containers"], intActiveIndex, intActiveIndex + 1))
            };
            objContext.CMSPageContent_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            /* develblock:start */
            global.ApplicationLog.Log("MoveDown: Container moved down");
            /* develblock:end */
            objContext.dispatch({ type: "SET_STATE", payload: { "PageJson": objPageJson } });
        }
        /* develblock:start */
        global.ApplicationLog.Log("MoveDown: Exiting");
        /* develblock:end */
    }

    /**
     * @name Remove
     * @param {object} objParams {objContext: {state, props, dispatch, CMSPageContent_Editor_ModuleProcessor}, objContainerJson}
     * @summary Remove the container from the json.
     */
    RemoveContainer(objParams) {
        let { objContext, objContainerJson } = objParams;
        /* develblock:start */
        global.ApplicationLog.Log("RemoveContainer: objContainerJson =" + JSON.stringify(objContainerJson), "Remove Container");
        /* develblock:end */
        let objTextResource = {
            "DELETE_ConfirmText": 'Are you sure you want to delete this container?',
            "DELETE_ConfirmButtonText": "Yes",
            "DELETE_CloseButtonText": "No",
            "DELETE_Title": "Delete Container",
            "DELETE_SubTitle": "Delete Container"
        };
        editorPopup.ShowConfirmationPopup({
            "Resource": {
                "Text": objTextResource,
                "TextResourcesKey": "DELETE",
                "Variables": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Meta": {
                "ShowHeader": true,
                "ShowCloseIcon": true,
                "Height": 'auto',
                "Width": '390px'
            },
            "Data": {},
            "Events": {
                "ConfirmEvent": (strPopupId) => {
                    editorPopup.ClosePopup(strPopupId);
                    let arrNewContainers = [...objContext.state.PageJson["Containers"].filter(objTempValue => objTempValue["iContainerId"] !== objContainerJson["iContainerId"])];
                    let objElementJson = {
                        ...objContext.state.PageJson,
                        ["Containers"]: Helper.UpdateOrder(arrNewContainers)
                    };
                    objContext.CMSPageContent_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    /* develblock:start */
                    global.ApplicationLog.Log("RemoveContainer: Container removed");
                    /* develblock:end */
                    objContext.dispatch({ type: "SET_STATE", payload: { "PageJson": objElementJson } });
                }
            },
            "CallBacks": {}
        });
        /* develblock:start */
        global.ApplicationLog.Log("RemoveContainer: Exiting");
        /* develblock:end */
    }

    /**
     * @name UpdateContainerJson
     * @summary Callback for updating container json container Json.
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}.
     * @param {object} objJson Container Json changes to be updated.
     */
    UpdateContainerJson(objContext, objJson) {
        objContext = objContext.PageContent_HandlerRef.current.GetLatestContext();
        objContext.dispatch({
            type: "SETUPDATEDCONTAINERJSON",
            payload: objJson
        });
    }

    /**
     * @name DeleteElement
     * @summary Remove an element from the json.
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}
     * @param {number} intElementId ElementId To Be deleted.
     * @param {number} intContainerId The Container Id from which the element needs to be deleted.
     */
    DeleteElement(objContext, intElementId, intContainerId) {
        objContext = objContext.PageContent_HandlerRef.current.GetLatestContext();
        /* develblock:start */
        global.ApplicationLog.Log("DeleteElement: intElementId =" + intElementId + ", intContainerId=" + intContainerId, "Delete Element");
        /* develblock:end */
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                ["PageJson"]: {
                    ...objContext.state.PageJson,
                    ["Containers"]: objContext.state.PageJson.Containers.map(objContainer => {
                        if (objContainer.iContainerId !== intContainerId) {
                            return objContainer;
                        }
                        else {
                            let objNewContainer = { ...objContainer, Elements: objContainer.Elements.filter(Element => Element.iElementId !== intElementId) };
                            return objNewContainer;
                        }
                    })
                }
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("DeleteElement: Exiting");
        /* develblock:end */
    }

    /**
     * @name PreserveContainerState
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}.
     * @param {object} objContainer Container state that needs to be preserved.
     * @summary This method preserves changes made in its child components to be used later doing Undo-Redo.
     */
    PreserveContainerState(objContext, objContainer) {
        /* develblock:start */
        global.ApplicationLog.Log("PreserveContainerState: Entered", "Preserve Container State");
        /* develblock:end */
        objContext = objContext.PageContent_HandlerRef.current.GetLatestContext();
        objContext.PageContent_UndoRedoDataRef.current.ContainerState = {
            ...objContext.PageContent_UndoRedoDataRef.current.ContainerState,
            [objContainer.ContainerJson.iContainerId]: objContainer
        };
        /* develblock:start */
        global.ApplicationLog.Log("PreserveContainerState: Preseved");
        /* develblock:end */
        console.log("PageContent preserved state...........>>>>>>>>>>>>", objContext.PageContent_UndoRedoDataRef);
        /* develblock:start */
        global.ApplicationLog.Log("PreserveContainerState: Exiting");
        /* develblock:end */
    }

    /**
     * @name AddContainer
     * @summary add a new container
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}.
     * @param {object} objNewContainerJson New Container Json to be added.
     */
    AddContainer(objContext, objNewContainerJson) {
        /* develblock:start */
        global.ApplicationLog.Log("AddContainer: objNewContainerJson=" + JSON.stringify(objNewContainerJson), "Add Container");
        /* develblock:end */
        objContext = objContext.PageContent_HandlerRef.current.GetLatestContext();
        let objPageJson = {
            ...objContext.state.PageJson,
            ["Containers"]: [
                ...objContext.state.PageJson["Containers"],
                {
                    ...objNewContainerJson,
                    ["iOrder"]: objContext.state.PageJson["Containers"].length + 1,
                    ["Ref"]: React.createRef()
                }
            ],
            ["ActiveContainerId"]: objNewContainerJson.iContainerId
        };
        /* develblock:start */
        global.ApplicationLog.Log("AddContainer: Container Added");
        /* develblock:end */
        /* develblock:start */
        global.ApplicationLog.Log("AddContainer: Exiting");
        /* develblock:end */
        objContext.CMSPageContent_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { ["PageJson"]: objPageJson } });
    }

    /**
     * @name UpdateActiveContainerToStore
     * @param {any} ContainerRef Active container ref
     * @summary update ActiveContainerId to the store.
     */
    UpdateActiveContainer(objContext, intContainerId) {
        /* develblock:start */
        global.ApplicationLog.Log("UpdateActiveContainerToStore: Updating and Exiting", "Update Active Container To Store");
        /* develblock:end */
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "PageJson": {
                    ...objContext.state.PageJson,
                    "ActiveContainerId": intContainerId
                }
            },
            blnUndoRedoUpdate: false
        });
    }

    /**
     * @name GetActiveContainerRef
     * @summary returns the ActiveContainerId from the store.
     * @returns {number} ActiveContainerId
     * */
    GetActiveContainerRef(objContext) {
        /* develblock:start */
        global.ApplicationLog.Log("GetActiveContainerRef: Updating and Exiting", "Get Active Container Ref");
        /* develblock:end */
        let ActiveContainerRef;
        let intActiveContainerId = objContext.state.PageJson.ActiveContainerId;
        ActiveContainerRef = objContext.state.PageJson.Containers.find(objContainer => objContainer["iContainerId"] === intActiveContainerId).Ref;
        return ActiveContainerRef;
    }

    /**
     * @name SetPointOverrideStatus
     * @param {object} objContext {state, props, dispatch, CMSPageContent_Editor_ModuleProcessor}.
     * @param {number} strPointOverrideStatus Y/N
     * @summary Sets the point override for 
     */
    SetPointOverrideStatus(objContext, strPointOverrideStatus) {
        /* develblock:start */
        global.ApplicationLog.Log("SetPointOverrideStatus: Setting strPointOverrideStatus=" + strPointOverrideStatus + ". Exiting now", "Set Point Override Status");
        /* develblock:end */
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "PageJson": {
                    ...objContext.state.PageJson,
                    ["cPointOverride"]: strPointOverrideStatus
                }
            }
        });
    }

    /**
     * @name AddContainerAbove
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}
     * @param {object} objValue Container above which the new container is to be added.
     * @param {object} objNewContainerJson New Container Json to be added.
     * @summary Insert the new container above the given container
     */
    AddContainerAbove(objContext, objValue, objNewContainerJson) {
        /* develblock:start */
        global.ApplicationLog.Log("AddContainerAbove: Adding now");
        /* develblock:end */
        objContext = objContext.PageContent_HandlerRef.current.GetLatestContext();
        let arrContainers = objContext.state.PageJson["Containers"];
        let intInsertIndex = arrContainers.findIndex(objTempContainer => objTempContainer["iContainerId"] === objValue["iContainerId"]) - 1;
        let newContainerRef = React.createRef();
        let arrNewContainers = [
            ...arrContainers.slice(0, intInsertIndex + 1),
            {
                ...objNewContainerJson,
                ["iOrder"]: arrContainers.length + 1,
                ["Ref"]: newContainerRef
            },
            ...arrContainers.slice(intInsertIndex + 1, arrContainers.length)
        ];
        let objPageJson = {
            ...objContext.state.PageJson,
            ["Containers"]: [...Helper.UpdateOrder(arrNewContainers)],
            ["ActiveContainerId"]: objNewContainerJson.iContainerId
        };
        objContext.CMSPageContent_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        /* develblock:start */
        global.ApplicationLog.Log("AddContainerAbove: Added and Exiting");
        /* develblock:end */
        objContext.dispatch({ type: "SET_STATE", payload: { "PageJson": objPageJson } });
    }

    /**
     * @name AddContainerBelow
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}
     * @param {object} objValue Container below which the new container is to be added.
     * @param {object} objNewContainerJson New Container Json to be added.
     * @summary Insert the new container below the given container
     */
    AddContainerBelow(objContext, objValue, objNewContainerJson) {
        /* develblock:start */
        global.ApplicationLog.Log("AddContainerAbove: Adding now");
        /* develblock:end */
        objContext = objContext.PageContent_HandlerRef.current.GetLatestContext();
        let arrContainers = objContext.state.PageJson["Containers"];
        let intInsertIndex = arrContainers.findIndex(objTempContainer => objTempContainer["iContainerId"] === objValue["iContainerId"]);
        let newContainerRef = React.createRef();
        let arrNewContainers = [
            ...arrContainers.slice(0, intInsertIndex + 1),
            {
                ...objNewContainerJson,
                ["iOrder"]: arrContainers.length + 1,
                ["Ref"]: newContainerRef
            },
            ...arrContainers.slice(intInsertIndex + 1, arrContainers.length)
        ];
        let objPageJson = {
            ...objContext.state.PageJson,
            ["Containers"]: [...Helper.UpdateOrder(arrNewContainers)],
            ["ActiveContainerId"]: objNewContainerJson.iContainerId
        };
        /* develblock:start */
        global.ApplicationLog.Log("AddContainerAbove: Added and Exiting");
        /* develblock:end */
        objContext.CMSPageContent_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "PageJson": objPageJson } });
    }

    /**
     * @name ReplaceContainer
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}
     * @param {object} objValue Container below which the new container is to be added.
     * @param {object} objNewContainerJson New Container Json to be added.
     * @summary Replace old container with new container.
     */
    ReplaceContainer(objContext, objValue, objNewContainerJson) {
        /* develblock:start */
        global.ApplicationLog.Log("ReplaceContainer: Replacing now");
        /* develblock:end */
        objContext = objContext.PageContent_HandlerRef.current.GetLatestContext();
        let arrNewContainers = objContext.state.PageJson["Containers"].map(objTemp => {
            if (objTemp["iContainerId"] === objValue["iContainerId"]) {
                return {
                    ...objNewContainerJson,
                    ["iOrder"]: objValue["iOrder"],
                    ["Ref"]: React.createRef()
                };
            } else {
                return objTemp;
            }
        });
        let objPageJson = {
            ...objContext.state.PageJson,
            ["Containers"]: [...arrNewContainers],
            ["ActiveContainerId"]: objNewContainerJson.iContainerId
        };
        objContext.CMSPageContent_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        /* develblock:start */
        global.ApplicationLog.Log("ReplaceContainer: Replaced and Exiting");
        /* develblock:end */
        objContext.dispatch({ type: "SET_STATE", payload: { "PageJson": objPageJson } });
    }

    /**
     * @name GetUpdatedPageJson
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}
     * @param {string} strJsonFor Json for.
     * @summary Collects updated page json / Also called for opening preview mode.
     * @returns {Promise} Updated Page Json within a promise.
     */
    async GetUpdatedPageJson(objContext, strJsonFor) {
        /* develblock:start */
        global.ApplicationLog.Log("GetUpdatedPageJson: Get page json for " + strJsonFor,);
        /* develblock:end */
        if (objContext.PageContent_HandlerRef.current && objContext.PageContent_HandlerRef.current.GetLatestContext) {
            objContext = objContext.PageContent_HandlerRef.current.GetLatestContext();
        }
        let lstContainer = [];
        for (let i = 0; i < objContext.state.PageJson.Containers.length; i++) {
            let objContainerJson = { ...objContext.state.PageJson.Containers[i] };
            if (objContainerJson.Ref && objContainerJson.Ref.current !== null && objContainerJson.Ref.current.GetContainerJson) {
                /* develblock:start */
                global.ApplicationLog.Log("GetUpdatedPageJson: calling GetContainerJson for Container=" + JSON.stringify(objContainerJson));
                /* develblock:end */
                let objNewContainerJson = await objContext.state.PageJson.Containers[i].Ref.current.GetContainerJson(strJsonFor);
                objNewContainerJson = BaseCMSElement.RemoveRefKeyFromJson(objNewContainerJson);
                lstContainer = [
                    ...lstContainer,
                    objNewContainerJson
                ];
            }
        }
        const { StateHistory, ...objRestPageJson } = objContext.state.PageJson;
        let objPageJson = {
            ...objRestPageJson,
            ["Containers"]: lstContainer,
            ["TaskHint"]: objContext.PageContent_InformationDataRef.current.TaskHint.objTaskHint,
            ["AdditionalInformation"]: objContext.PageContent_InformationDataRef.current.AdditionalInformation.objAdditionalInformation
        };
        objPageJson = BaseCMSElement.RemoveRefKeyFromJson(objPageJson);
        console.log("Updated PageJson", JSON.stringify(objPageJson));
        /* develblock:start */
        global.ApplicationLog.Log("GetUpdatedPageJson: Updated page json=" + objPageJson + ". Exiting");
        /* develblock:end */
        return objPageJson;
    }

    /**
    * @name SaveTask
    * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}.
    * @param {boolean} blnIsTaskToBeClosed true if task is to be closed else false.
    * @summary This method is responsible calling the save API method to save it in the back end.
    * @returns {Promise} returns a promise
    */
    async SaveTask(objContext, blnIsTaskToBeClosed = false) {
        /* develblock:start */
        global.ApplicationLog.Log("SaveTask: Save task", "Save Task");
        /* develblock:end */
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objPageJson = await objContext.CMSPageContent_Editor_ModuleProcessor.GetUpdatedPageJson(objContext);
        if (objPageJson !== null) {
            let objParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iPageId": objPageJson["iPageId"]
                            }
                        },
                        {
                            "match": {
                                "iLanguageId": objPageJson["iLanguageId"]
                            }
                        }
                    ]
                },
                "uUserId": objContext.state.PageJson["uUserId"],
                "vEditData": objPageJson,
                "cIsFusionVersion": objContext.state.PageJson["cIsFusionVersion"]
            };
            /* develblock:start */
            global.ApplicationLog.Log("SaveTask: Calling API for save");
            /* develblock:end */
            let arrResponse = await Object_Editor_TaskContent_CMSPageContent.EditData(objParams);
            if (arrResponse && arrResponse !== null && arrResponse["Object_Editor_TaskContent_CMSPageContent"] && arrResponse["Object_Editor_TaskContent_CMSPageContent"]["Data"] != null) {
                let arrDbPageJson  = arrResponse["Object_Editor_TaskContent_CMSPageContent"]["Data"];
                ContainerTemplateSelection_MetaData.GetPageJsonWithDefaultElements(arrDbPageJson, (arrNewPageJson) => {
                    let objSavedPageJson = arrNewPageJson[0];
                    EditorState.SetProperty("EditorClosePageJson", objSavedPageJson);
                    if (!blnIsTaskToBeClosed) {
                        objContext.CMSPageContent_Editor_ModuleProcessor.UpdatePageJsonAfterSave(objContext, objSavedPageJson);
                        ApplicationState.SetProperty("blnShowAnimation", false);
                    }
                    else {
                        ApplicationState.SetProperty("blnShowAnimation", false);
                        return arrResponse[0];
                    }
                    if (ApplicationState.GetProperty("EditorCallback") && ApplicationState.GetProperty("EditorCallback")["TaskSaveCallback"]) {
                        ApplicationState.GetProperty("EditorCallback")["TaskSaveCallback"](objPageJson["iPageId"])
                    }
                });
            }
        }
        else {
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        /* develblock:start */
        global.ApplicationLog.Log("SaveTask: Exiting");
        /* develblock:end */
    }

    /**
     * @name UpdatePageJsonAfterSave
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}.
     * @param {object} objNewPageJson Page Json after save.
     * @summary Sets the states with new page json.
     */
    UpdatePageJsonAfterSave(objContext, objNewPageJson) {
        /* develblock:start */
        global.ApplicationLog.Log("UpdatePageJsonAfterSave: Entered");
        /* develblock:end */
        objNewPageJson = CMSPageContent_Editor_Hooks.GetPageJsonForComponent(objNewPageJson);
        /* develblock:start */
        global.ApplicationLog.Log("UpdatePageJsonAfterSave: updating the preserved state of Containers");
        /* develblock:end */
        objContext.PageContent_UndoRedoDataRef.current.ContainerState = {}; // updating the preserved state of Containers.
        objContext.PageContent_InformationDataRef.current = {
            "TaskHint": {
                "objTaskHint": objNewPageJson["TaskHint"] ? objNewPageJson["TaskHint"] : null,
                "blnTaskHintRemoved": false
            },
            "AdditionalInformation": {
                "objAdditionalInformation": objNewPageJson["AdditionalInformation"] ? objNewPageJson["AdditionalInformation"] : null,
                "blnAdditionalInformationRemoved": false
            }
        };
        /* develblock:start */
        global.ApplicationLog.Log("UpdatePageJsonAfterSave: Setting additional information");
        /* develblock:end */
        ReInitAppState(objNewPageJson["iPageId"]);
        let objNewState = UndoRedoGetReInitializedState(objNewPageJson, objContext.props);
        objContext.PageContent_TaskEditStatusRef.current = false;
        // EditorState.SetProperty("EditorClosePageJson", objNewState);
        /* develblock:start */
        global.ApplicationLog.Log("UpdatePageJsonAfterSave: updating to state");
        /* develblock:end */
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "PageJson": {
                    ...objNewState,
                    ["ActiveContainerId"]: objNewState.Containers[0] ? objNewState.Containers[0].iContainerId : objNewState.Containers[0]
                }
            },
            "blnUndoRedoUpdate": false
        });
        /* develblock:start */
        global.ApplicationLog.Log("UpdatePageJsonAfterSave: timeout for getting updated page json for setting task edit status");
        /* develblock:end */
        setTimeout(async () => {
            objContext.InitialPageJson.current = await objContext.CMSPageContent_Editor_ModuleProcessor.GetUpdatedPageJson(objContext);
        }, 500);
    }

    /**
     * @name SpellCheckUpdate
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}.
     * @param {object} objCMSpageContent contains spell checked PageContent json (if null remove all the markings else mark all the bad word).
     * @summary this method send the spell checked json to all container.
     */
    PageContentSpellCheckUpdate(objContext, objCMSpageContent = null) {
        /* develblock:start */
        global.ApplicationLog.Log("PageContentSpellCheckUpdate: Entered", "Page Content Spell Check Update");
        /* develblock:end */
        objContext.state.PageJson && objContext.state.PageJson.Containers && objContext.state.PageJson.Containers.forEach(objContainer => {
            if (objContainer.Ref && objContainer.Ref.current && objContainer.Ref.current.SpellCheckUpdate) {
                let objCheckedContainerJson = objCMSpageContent !== null ? objCMSpageContent["Containers"].find(objTemp => objTemp["iContainerId"] === objContainer["iContainerId"]) : null;
                objContainer.Ref.current.SpellCheckUpdate(objCheckedContainerJson);
            } else {
                console.log("Container Spell Check is not present", objContainer);
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("PageContentSpellCheckUpdate: Exiting");
        /* develblock:end */
    }

    /**
     * @name OpenAdditionalInformationSidebar
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}
     * @param {string} strSidebar Sidebar Name
     * @summary This method opens the Additional Information Sidebar.
     */
    OpenAdditionalInformationSidebar(objContext, strSidebar) {
        /* develblock:start */
        global.ApplicationLog.Log("OpenAdditionalInformationSidebar: Entered", "Open Additional Information Sidebar");
        /* develblock:end */
        objContext = objContext.PageContent_HandlerRef.current.GetLatestContext();
        let objAdditionalInformationProps = {
            "JConfiguration": objContext.props.JConfiguration,
            "ComponentController": objContext.props.ComponentController,
            "AdditionalInformation_ModuleProcessor": new AdditionalInformation_ModuleProcessor(),
            "Ref": objContext.PageContent_InformationDataRef,
            "PageContent_TaskEditStatusRef": objContext.PageContent_TaskEditStatusRef,
            "ParentRef": objContext.PageContent_HandlerRef,
            "SidebarType": strSidebar,
            "FolderID": objContext.props.iFolderID,
            "ContainerId": null
        };
        objAdditionalInformationProps.AdditionalInformation_ModuleProcessor.AddAdditionalInformation(objAdditionalInformationProps);
        /* develblock:start */
        global.ApplicationLog.Log("OpenAdditionalInformationSidebar: Entered", "Exited");
        /* develblock:end */
    }

    /**
     * @name ShowContainerTemplateSelectionPopup
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}.
     * @param {string} strOperationType Inert/InsertAbove/InsertBelow.
     * @param {object} objContainerJson Container json.
     * @summary Show the Container Template selection Popup.
     */
    ShowContainerTemplateSelectionPopup(objContext, strOperationType, objContainerJson = null) {
        /* develblock:start */
        global.ApplicationLog.Log("ShowContainerTemplateSelectionPopup: Entered", "Show Container Template Selection Popup");
        /* develblock:end */
        editorPopup.ShowPopup({
            "Data": {},
            "Meta": {
                "PopupName": "ContainerTemplateSelection",
                "Height": '578px',
                "Width": '650px',
                "ShowHeader": true,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": false,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "AddContainer": (objNewContainerJson) => {
                    /* develblock:start */
                    global.ApplicationLog.Log("ShowContainerTemplateSelectionPopup: Exiting");
                    /* develblock:end */
                    switch (strOperationType) {
                        case "Insert":
                            objContext.CMSPageContent_Editor_ModuleProcessor.AddContainer(objContext, objNewContainerJson);
                            break;
                        case "Replace":
                            objContext.CMSPageContent_Editor_ModuleProcessor.ReplaceContainer(objContext, objContainerJson, objNewContainerJson);
                            break;
                        case "InsertAbove":
                            objContext.CMSPageContent_Editor_ModuleProcessor.AddContainerAbove(objContext, objContainerJson, objNewContainerJson);
                            break;
                        case "InsertBelow":
                            objContext.CMSPageContent_Editor_ModuleProcessor.AddContainerBelow(objContext, objContainerJson, objNewContainerJson);
                            break;
                        default:
                            "";
                    }
                }
            }
        });
    }

    /**
     * @name OpenTaskClosePopup
     * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}.
     * @param {boolean} blnShowCancelButton true if cancel button is to be shown in the Confirmation Popup.
     * @summary Opens up confirmation popup fro saving the changes to task.
     * @returns {promise} Returns a prmise.
     */
    OpenTaskClosePopup(objContext, blnShowCancelButton = false) {
        /* develblock:start */
        global.ApplicationLog.Log("OpenTaskClosePopup: Entered", "Open Task Close Popup");
        /* develblock:end */
        let objTextResource = {
            "CLOSE_ConfirmText": "Do you want to save the changes made in '" + objContext.props.PageProperties["vPageName"] + "'?",
            "CLOSE_ConfirmButtonText": "Yes",
            "CLOSE_CloseButtonText": "No",
            "CLOSE_CancelButtonText": "Cancel",
            "CLOSE_Title": "Close Task",
            "CLOSE_SubTitle": "Close Task"
        };
        return new Promise((resolve, reject) => {
            editorPopup.ShowConfirmationPopup({
                "Resource": {
                    "Text": objTextResource,
                    "TextResourcesKey": "CLOSE",
                    "Variables": {},
                    "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
                },
                "Meta": {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                    "Height": 'auto',
                    "Width": '390px',
                    "ShowCancelButton": blnShowCancelButton
                },
                "Data": {},
                "Events": {
                    "ConfirmEvent": async (strPopupId) => {
                        editorPopup.ClosePopup(strPopupId);
                        resolve(await objContext.CMSPageContent_Editor_ModuleProcessor.SaveTask(objContext, true));
                        /* develblock:start */
                        global.ApplicationLog.Log("OpenTaskClosePopup: Closed");
                        /* develblock:end */
                    },
                    "CloseEvent": (strPopupId) => {
                        editorPopup.ClosePopup(strPopupId);
                        resolve(true);
                        /* develblock:start */
                        global.ApplicationLog.Log("OpenTaskClosePopup: Canceled");
                        /* develblock:end */
                    }
                },
                "CallBacks": {}
            });
        });
    }

    /**
     * @name UpdateTaskEditStatus
     * @param {any} objContext
     * @summary this changes the PageContent_TaskEditStatusRef to true
     */
    UpdateTaskEditStatus(objContext) {
        objContext.PageContent_TaskEditStatusRef.current = true;
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/Phone/Modules/4_CMSPageContent/CMSPageContentSyles.css",
        ];
    }
}

export default CMSPageContent_Editor_ModuleProcessor;
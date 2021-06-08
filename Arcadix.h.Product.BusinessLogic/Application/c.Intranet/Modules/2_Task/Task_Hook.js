// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Core Imports.
import { GetObjectListForModule } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

//Module related imports.
import * as Task_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task_MetaData';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;iFolderId;0")["Data"] &&
        DataRef(props.Object_Intranet_Task_TaskFolder)["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
        DataRef(props.Object_Cockpit_Language)["Data"] &&
        DataRef(props.Object_Intranet_Task_TaskDifficultyLevel)["Data"] &&
        DataRef(props.Object_Cockpit_Workflow_WorkflowType)["Data"] &&
        DataRef(props.Object_Cockpit_Workflow_Workflow)["Data"] &&
        DataRef(props.Object_Cockpit_Workflow_WorkflowStatus)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", props)
    ) {
        blnIsLoadComplete = true;       
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objTextResource: {},
        arrMainClientlanguageData: [],
        arrLanguageData: [],
        objSelectedRow: {},
        blnToggleToLoadDataFromRedux: true,
        blnActiveWorkFlowStatusesLoaded: false,

        //Grid Data
        arrTaskData: [],
        arrFilterdTaskData: [],
        arrHeaderData: Task_MetaData.GetMetaData(),
        arrCheckedRowIndices: [],
        blnAllRowsSelected: false,
        intSelectedRowIndex: 0,
        arrSelectedRows: [],
        arrActiveWorkFlowStatuses: [],

        //Search
        blnSearchMode: false,
        strSearchText: "",
        intSearchId: -1,
        blnSearchFromSameFolder: true,
        struWorkflowStatusId: -1,
        blnInternalTesting: false,

        //Dropdown Data
        arrSubjectData: [],
        arrcategoryData: [],
        arrcategorycompetencyData: [],
        arrcompetencyrangeData: [],
        arrcompetencylevelData: []
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load the initial data
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
    useSetTreeContextMenuData(objContext);
    useLoadTheSelectedFolder(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.Task_ModuleProcessor.LoadInitialData(objContext);
        ApplicationState.SetProperty('FolderId', 0);        
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            //To set state data after the load is complete
            if (!objContext.state.blnActiveWorkFlowStatusesLoaded) {
                objContext.Task_ModuleProcessor.GetActiveWorkFlowStatuses(objContext);
            }
            ApplicationState.SetProperty("CutCopySource", { "Task": null });
            ApplicationState.SetProperty("blnShowAnimation", false);           
        }

        if (DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;iFolderId;0")["Data"] &&
            DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"] &&
            Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props) &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Language)["Data"] &&           
            DataRef(objContext.props.Object_Intranet_Task_TaskDifficultyLevel)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Workflow_Workflow)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus)["Data"] &&       
            !objContext.state.isLoadComplete

        ) {
            //To set state data after the load is complete
            if (!objContext.state.blnActiveWorkFlowStatusesLoaded) {
                objContext.Task_ModuleProcessor.GetActiveWorkFlowStatuses(objContext);
            }
            else {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
                ApplicationState.SetProperty("CutCopySource", { "Task": null });
                let objRootNode = { iPageFolderId: "0", iPageParentFolderId: "-1", vPageFolderName: "Tasks" };
                let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                if (fnSelectTreeNode) {
                    fnSelectTreeNode(objRootNode);
                }
            }
        }
    }, [
        objContext.props.Object_Intranet_Task_Task,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task"],
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Intranet_Task_TaskDifficultyLevel,
        objContext.props.Object_Cockpit_Workflow_WorkflowStatus,
        objContext.props.Object_Cockpit_Workflow_Workflow,
        objContext.props.Object_Cockpit_Workflow_WorkflowType,
        objContext.state.blnActiveWorkFlowStatusesLoaded
    ]);
}

/**
* @name useSetRibbonData.
* @param {object} objContext takes  objContext.
* @summary To set and update the Ribbon Data when the State changes.
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.Task_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state, objContext.props]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.Task_ModuleProcessor.SetRibbonData(objContext);
    }    
}

/**
 * @name useSetTreeContextMenuData
 * @param {object} objContext context object
 * @summary To set and update the ContextMenu Data when the State changes.
 * @returns null
 */
export function useSetTreeContextMenuData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("GetTreeContextMenuData", (objRowData) => objContext.Task_ModuleProcessor.GetContextMenuData(objRowData, objContext));
            ApplicationState.SetProperty("OnDragDrop", (strDraggedFolderId, strDroppedFolderId) => objContext.Task_ModuleProcessor.OnDragDrop({ Type: "Folder", Id: strDraggedFolderId }, { Type: "Folder", Id: strDroppedFolderId }, objContext));
        }
    }, [objContext.state.isLoadComplete, objContext.props.Object_Intranet_Task_TaskFolder, objContext.props.CutCopySource]);
}

/**
* @name useLoadTheSelectedFolder.
* @param {object} objContext takes  objContext.
* @summary When any folder is selected, To load the folders and Tasks for that Folder.
*  Also it keeps watching the Task and TaskFolder. When add or edit happens, the changes get reflected.
*/
export function useLoadTheSelectedFolder(objContext) {
    const GetTaskData = () => {
        if (objContext.state.isLoadComplete
            && objContext.props.FolderId != 0
            //&& !DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;iFolderId;" + objContext.props.FolderId)
        ) {
            objContext.Task_ModuleProcessor.LoadSelectedFolderTasks(objContext, objContext.props.FolderId);
        }
        if (objContext.state.blnSearchMode)
            objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": false, "strSearchText": "", "blnSearchFromSameFolder": true, "struWorkflowStatusId": -1, "blnInternalTesting": false, "intSearchId": -1 } });
    }
    useEffect(GetTaskData, [objContext.state.isLoadComplete, objContext.props.FolderId]);
}

/**
 * @name useShowPage
 * @param {object} objContext takes objContext
 * @summary Open the editor component by setting the application state.
 */
export const useShowPage = (objContext) => {
    useEffect(() => {
        if (objContext.props.PageList && objContext.props.PageList.length > 0) {
            ApplicationState.SetProperty("RenderEditor", true);
            ApplicationState.SetProperty("ShowEditor", true);
        }
    }, [objContext.props.PageList]);
};
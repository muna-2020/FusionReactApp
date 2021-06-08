// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Core Imports.
import { GetObjectListForModule } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';


/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objPageJson: null        
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
    useResetGridSelection(objContext);
    useSetSubNavigationEvents(objContext);
    //useLoadTheSelecedFolder(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.Module_ModuleProcessor.LoadInitialData(objContext);
        if (JConfiguration.IsPrefetchEnabled) {
            //Prefetch of EditorFrame
            GetObjectListForModule("EditorFrame", objContext, true);
        }
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (//DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module")["Data"] &&
            //DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;uFolderId;" + ApplicationState.GetProperty("ActiveSubNavigationId"))["Data"] &&
            Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", objContext.props) &&
            !objContext.state.isLoadComplete
        ) {
            //To set state data after the load is complete
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") && ApplicationState.GetProperty("ResetGridSelection")["ModuleGrid"] ? ApplicationState.GetProperty("ResetGridSelection")["ModuleGrid"] : null;
            if (fnResetGridSelection) {
                fnResetGridSelection(objReturn[0]);
            }
        }
    }, [
        objContext.props.Object_DevServer_ProductManagement_Module,
        Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", objContext.props)
    ]);
}

/**
* @name useSetRibbonData.
* @param {object} objContext takes  objContext.
* @summary To set and update the Ribbon Data when the State changes.
*/
export function useSetRibbonData(objContext) {

    useEffect(() => {
        objContext.Module_ModuleProcessor.SetRibbonData(objContext);
    }, [objContext.state, objContext.props.FolderId, objContext.props.ActiveSubNavigationId, objContext.props.SelectedRows]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.Module_ModuleProcessor.SetRibbonData(objContext);
    }

}


/**
* @name useLoadTheSelecedFolder.
* @param {object} objContext takes  objContext.
* @summary When any folder is selected, To load the folders and Modules for that Folder.
*  Also it keeps watching the Module and Module folder. When add or edit happens, the changes get reflected.
*/
export function useResetGridSelection(objContext) {
    useEffect(() => {
        let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") && ApplicationState.GetProperty("ResetGridSelection")["ModuleGrid"] ? ApplicationState.GetProperty("ResetGridSelection")["ModuleGrid"] : null;
        if (fnResetGridSelection) {
            fnResetGridSelection();
        }
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, [objContext.props.ActiveSubNavigationId]);
}

/**
* @name usePasteModule.
* @param {object} objContext takes  objContext.
* @summary When any folder is selected, resets the GridRow selection after loading the respective data.
*/
export function useSetSubNavigationEvents(objContext) {
    useEffect(() => {
        ApplicationState.SetProperty("PasteModule", (strFolderId) => { objContext.Module_ModuleProcessor.Paste(objContext, strFolderId, false) });
        ApplicationState.SetProperty("DragDropModule", (strDraggedFolderId, strDroppedFolderId) => objContext.Module_ModuleProcessor.OnDragDrop({ Id: strDraggedFolderId }, { Id: strDroppedFolderId }, objContext));
    }, [objContext.props.Object_DevServer_ProductManagement_Module, objContext.props.Object_DevServer_ProductManagement_Folder, objContext.props.ActiveSubNavigationId]);
}

///**
//* @name useLoadTheSelecedFolder.
//* @param {object} objContext takes  objContext.
//* @summary When any folder is selected, To load the folders and Modules for that Folder.
//*  Also it keeps watching the Module and Module folder. When add or edit happens, the changes get reflected.
//*/
//export function useLoadTheSelecedFolder(objContext) {
//    const GetModuleData = () => {
//        if (objContext.state.isLoadComplete && !DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;uFolderId;" + ApplicationState.GetProperty("ActiveSubNavigationId"))) {
//            objContext.Module_ModuleProcessor.LoadSelectedFolderModules(objContext, ApplicationState.GetProperty("ActiveSubNavigationId"));
//        }
//    }
//    useEffect(GetModuleData, [objContext.state.isLoadComplete, objContext.props.FolderId, objContext.props.Object_DevServer_ProductManagement_Module]);
//}
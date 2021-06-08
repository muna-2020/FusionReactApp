// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

//Core Imports.
import { GetObjectListForModule } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    //if (
    //    DataRef(props.Object_DevServer_ProductManagement_UseCase, "Object_DevServer_ProductManagement_UseCase;uModuleId;" + ApplicationState.GetProperty("ActiveSubNavigationId"))["Data"] &&
    //    Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", props)
    //) {
    //    blnIsLoadComplete = true;
    //}
    return {
        isLoadComplete: blnIsLoadComplete,
        objPageJson: null,
        GridToDisplay: "UseCaseGrid"
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
    useLoadTheSelectedFolder(objContext);
    useSetSubNavigationEvents(objContext);
    useLoadSubModulePrefetchLinks(objContext)
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.UseCase_ModuleProcessor.LoadInitialData(objContext);
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
        //if (objContext.state.isLoadComplete) {
        //    ApplicationState.SetProperty("blnShowAnimation", false);
        //}
        if (
            DataRef(objContext.props.Object_DevServer_ProductManagement_UseCase, "Object_DevServer_ProductManagement_UseCase;uModuleId;" + ApplicationState.GetProperty("ActiveSubNavigationId") + ";cIsDeleted;N")["Data"] &&
            objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props) &&
            !objContext.state.isLoadComplete
        ) {
            //To set state data after the load is complete
            ApplicationState.SetProperty("blnShowAnimation", false);
            ApplicationState.SetProperty("SelectedUseCaseIdforCollapse", []);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        objContext.props.Object_DevServer_ProductManagement_UseCase,
        objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props)
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
            objContext.UseCase_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state, objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep, objContext.props.Object_DevServer_ProductManagement_TestCase, objContext.props.Object_DevServer_ProductManagement_UseCase]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.UseCase_ModuleProcessor.SetRibbonData(objContext);
    }
}

/**
* @name useLoadTheSelecedFolder.
* @param {object} objContext takes  objContext.
* @summary When any folder is selected, To load the folders and UseCases for that Folder.
*  Also it keeps watching the UseCase and UseCasefolder. When add or edit happens, the changes get reflected.
*/
export function useLoadTheSelectedFolder(objContext) {
    const GetUseCaseData = () => {
        if (objContext.state.isLoadComplete
            //&& objContext.props.ActiveSubNavigationId && !DataRef(objContext.props.Object_DevServer_ProductManagement_UseCase, "Object_DevServer_ProductManagement_UseCase;uModuleId;" + ApplicationState.GetProperty("ActiveSubNavigationId") + ";cIsDeleted;N")
        ) {
            objContext.UseCase_ModuleProcessor.LoadSelectedModuleUseCases(objContext, ApplicationState.GetProperty("ActiveSubNavigationId"));
        }
    }
    useEffect(GetUseCaseData, [objContext.props.ActiveSubNavigationId, objContext.props.Object_DevServer_ProductManagement_UseCase]);
}

/**
* @name usePasteModule.
* @param {object} objContext takes  objContext.
* @summary When any folder is selected, resets the GridRow selection after loading the respective data.
*/
export function useSetSubNavigationEvents(objContext) {
    useEffect(() => {
        ApplicationState.SetProperty("PasteUseCase", (strFolderId) => { objContext.UseCase_ModuleProcessor.Paste(objContext, strFolderId, false) });
       //ApplicationState.SetProperty("DragDropUseCase", (strDraggedFolderId, strDroppedFolderId) => objContext.UseCase_ModuleProcessor.OnDragDrop({ Id: strDraggedFolderId }, { Id: strDroppedFolderId }, objContext));
    }, [objContext.props.Object_DevServer_ProductManagement_Module, objContext.props.Object_DevServer_ProductManagement_UseCase, objContext.props.ActiveSubNavigationId]);
}

/**
* @name useLoadSubModulePrefetchLinks.
* @param {object} objContext takes  objContext.
* @summary Loads SubModule Prefetch Links - for TestCase and Implementation step.
*/
export function useLoadSubModulePrefetchLinks(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.UseCase_ModuleProcessor.LoadSubModulePrefetchLinks(objContext);
        }
    }, [objContext.props.ActiveSubNavigationId, objContext.state.isLoadComplete]);
}
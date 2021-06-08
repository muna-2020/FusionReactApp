// React related imports.
import { useEffect, useLayoutEffect } from 'react';


/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        arrImplementationStepLayerTaskType: [],
        uImplementationStepLayerId: -1,
        uImplementationStepLayerTaskTypeId:-1
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.ImplementationStep_ModuleProcessor.LoadInitialData(objContext);
        //ApplicationState.SetProperty("OfficeRibbonData", [{}])
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep", objContext.props) &&
            DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType)["Data"] &&
            DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer)["Data"] &&
            DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep, "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep;uUseCaseId;" + objContext.props.Data.UseCaseId + ";cIsDeleted;N")["Data"]
           // DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep)["Data"] 
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType,
            objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer,
            objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep,
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep"]
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
            objContext.ImplementationStep_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state, objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.ImplementationStep_ModuleProcessor.SetRibbonData(objContext);
    }
}
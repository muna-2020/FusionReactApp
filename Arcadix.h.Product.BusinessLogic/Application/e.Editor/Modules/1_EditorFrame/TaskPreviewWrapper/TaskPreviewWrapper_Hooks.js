// React related impoprts.
import { useLayoutEffect, useEffect } from 'react';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        "LoadSolutionData": null,
        "isLoadComplete": false
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize method call to laod the initial data
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;iPageId;" + objContext.props.TestState.TaskPageProperties.PageJson.iPageId) ||
            !DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)) {
            objContext.TaskPreviewWrapper_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;iPageId;" + objContext.props.TestState.TaskPageProperties.PageJson.iPageId)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"]) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "isLoadComplete": true
                }
            });
        }
    }, [objContext.props.Object_Intranet_Task_Task, objContext.props.Object_Intranet_Taxonomy_Subject]);

    //useEffect(() => {
    //    if (objContext.state.isLoadComplete) {
    //        objContext.Content_ModuleProcessor.GetPageProperties(objContext);
    //        objContext.dispatch({
    //            "type": "SET_STATE",
    //            "payload": {
    //                "isLoadComplete": false
    //            }
    //        });
    //    }
    //}, [objContext.props.TestState.TaskPageProperties.PageJson]);
}

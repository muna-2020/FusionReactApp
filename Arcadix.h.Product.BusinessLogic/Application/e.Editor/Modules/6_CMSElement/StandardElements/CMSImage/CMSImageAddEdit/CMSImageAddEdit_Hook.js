﻿// React related impoprts.
import { useEffect, useLayoutEffect } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name GetInitialState
* @param {object} props Initial state
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        JSONData: props.imageaddedit ? props.imageaddedit.Data[0] : {},
        arrNodes: [],
        SavedFileName: "",
        SavedJSONData: {},
        strSelectedTab: "Local",
        blnShowChooseFile: props.blnShowChooseFile ? props.blnShowChooseFile : true
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
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.CMSImageAddEdit_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props.Editor_TaskContent_CMSImageAddEdit_Module)["Data"]
            && DataRef(objContext.props["Object_Framework_Services_TextResource;Id;de/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageAddEdit"])["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            var arrNodeData = DataRef(objContext.props.Editor_TaskContent_CMSImageAddEdit_Module)["Data"];
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true, "arrNodeData": arrNodeData } });
        }
    }, [
        objContext.props.Editor_TaskContent_CMSImageAddEdit_Module,
            objContext.props.Object_Framework_Services_TextResource,
            objContext.props["Object_Framework_Services_TextResource;Id;de/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageAddEdit"]
    ]);
}

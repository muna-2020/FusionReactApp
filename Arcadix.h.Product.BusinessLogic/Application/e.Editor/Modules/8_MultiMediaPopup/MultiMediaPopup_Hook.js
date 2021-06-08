// React related impoprts.
import React, { useEffect } from 'react';

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
    let strSelectedTab = "Local";
    if ((typeof props.Data.ShowMultiMediaManagement !== "undefined" && props.Data.ShowMultiMediaManagement) || (props.Data.PreSelectNode && parseInt(props.Data.PreSelectNode["iFolderID"]) !== -1 && !props.Data.ShowMultiMediaAddEdit)) {
        strSelectedTab = "Global";
    }
    let blnShowTabs = false;
    if ((typeof props.Data.ShowMultiMediaAddEdit === "undefined" || props.Data.ShowMultiMediaAddEdit) && (typeof props.Data.ShowMultiMediaManagement === "undefined" || props.Data.ShowMultiMediaManagement)) {
        blnShowTabs = true;
    }
    return {
        "isLoadComplete": false,
        "JSONData": props.imageaddedit ? props.imageaddedit.Data[0] : {},
        "arrNodes": [],
        "SavedFileName": "",
        "SavedJSONData": {},
        "strSelectedTab": strSelectedTab,
        "blnShowTabs": blnShowTabs,
        "blnShowMultiMediaAddEdit": typeof props.Data.ShowMultiMediaAddEdit !== "undefined" ? props.Data.ShowMultiMediaAddEdit : true,
        "blnShowMultiMediaManagement": typeof props.Data.ShowMultiMediaManagement !== "undefined" ? props.Data.ShowMultiMediaManagement : false,
        "blnDisplayOnlyFolders": typeof props.Data.DisplayOnlyFolders !== "undefined" ? props.Data.DisplayOnlyFolders : false,
        "blnShowUploadControl": typeof props.Data.ShowUploadControl !== "undefined" ? props.Data.ShowUploadControl : true
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    /**
     * @name useEffect
     * @summary Calls the DataCall method and the InitialDataParams.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete) {
            objContext.MultiMediaPopup_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);

    /**
     * @name useEffect
     * @summary Checks if the data is loaded to props and then set the component state accordingly.
     */
    useEffect(() => {
        var mediaTypeData = DataRef(objContext.props[`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/e.Editor/Modules/6_CMSElement/CMS${objContext.props.Data.MediaType}/CMS${objContext.props.Data.MediaType}AddEdit`])["Data"];
        var useCaseData = DataRef(objContext.props[`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/c.ProductManagement/Modules/3_UseCase/UseCase`])["Data"];
        if (!objContext.state.isLoadComplete && mediaTypeData ||
            (objContext.props.Data.MediaType.toLowerCase() === "usecase" && useCaseData)) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.props.Object_Framework_Services_TextResource,
        objContext.props[`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/e.Editor/Modules/6_CMSElement/CMS${objContext.props.Data.MediaType}/CMS${objContext.props.Data.MediaType}AddEdit`],
        objContext.props[`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/c.ProductManagement/Modules/3_UseCase/UseCase`]
    ]);
}

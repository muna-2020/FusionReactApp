// React related impoprts.
import { useEffect, useLayoutEffect } from 'react';

import * as ContainertemplateSelection_MetaData from "@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/ContainerTemplateSelection/ContainerTemplateSelection_BusinessLogic/ContainerTemplateSelection_MetaData";

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        "isLoadComplete": false,
        "intSelectedTabIndex": null,
        "arrTabDetails": [],
        "intSelectedTemplateId": null
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {

    /**
     * @name useLayoutEffect
     * @summary Calls the DataCall method and the InitialDataParams.
     */
    useLayoutEffect(() => {
        objContext.ContainerTemplateSelection_ModuleProcessor.LoadInitialData(objContext);
    }, []);

    /**
     * @name useEffect
     * @summary Checks if the data is loaded to props and then set the component state accordingly.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete && Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/5_CMSContainer/ContainerTemplateSelection", objContext.props))
        {
            ApplicationState.SetProperty("blnShowAnimation", false);
            var objTabData = ContainertemplateSelection_MetaData.GetTabDataObject();
            var arrTabInfo = objTabData["ContainerTemplateInfo"]["TabInfo"];
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "isLoadComplete": true,
                    "arrTabInfo": arrTabInfo,
                    "intSelectedTabIndex": 0,
                    "intSelectedTemplateId": arrTabInfo[0]["TabContent"][0]["iContainerTemplateId"],
                    "intTabCount": objTabData["ContainerTemplateInfo"]["TabInfo"].length
                }
            });
            objContext.ContainerTemplateSelection_ModuleProcessor.SelectContainer(objContext, arrTabInfo[0]["TabContent"][0]["iContainerTemplateId"]);
        }
    }, [objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/5_CMSContainer/ContainerTemplateSelection"]]);
}

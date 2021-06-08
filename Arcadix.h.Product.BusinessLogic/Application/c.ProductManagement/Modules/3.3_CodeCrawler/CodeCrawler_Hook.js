// React related imports.
import { useEffect, useLayoutEffect } from 'react';


/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        arrCodeCrawlerData:[]
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
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.CodeCrawler_Moduleprocessor.LoadInitialData(objContext);
    }, []);
}

/** @CodeTracerStart ApplicationType_Constuctor_AssignProperties_1 */
/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && objContext.state.arrCodeCrawlerData.length > 0
            && Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.3_CodeCrawler/CodeCrawler", objContext.props) 
            //&& DataRef(objContext.props.Object_Framework_SystemTracking_CodeCrawler, "Object_Framework_SystemTracking_CodeCrawler")["Data"]
           // && DataRef(objContext.props.Object_Framework_SystemTracking_CodeCrawler, "Object_Framework_SystemTracking_CodeCrawler;Id;" + objContext.props.Data.CodeCrawlerUniqueId)["Data"] // props.Data.CodeCrawlerId
            //&& DataRef(objContext.props.Object_Framework_SystemTracking_CodeCrawler)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        //objContext.props.Object_Framework_SystemTracking_CodeCrawler
            objContext.state.arrCodeCrawlerData,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3.3_CodeCrawler/CodeCrawler"]
    ]);
}
/** @CodeTracerEnd ApplicationType_Constuctor_AssignProperties_1 */

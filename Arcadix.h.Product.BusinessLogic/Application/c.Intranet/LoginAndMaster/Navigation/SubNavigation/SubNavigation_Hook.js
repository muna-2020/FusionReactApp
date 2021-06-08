// React related imports.
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnFoldersLoaded = false;
    if (
        DataRef(props.Object_Intranet_Task_TaskFolder)["Data"]
        && DataRef(props.Object_Intranet_Test_TestFolder)["Data"] 
        || (props.JConfiguration.ApplicationTypeId != 4)
        ) {
        blnFoldersLoaded = true;
    }
    return {
        blnFoldersLoaded: blnFoldersLoaded,
        arrNavigationData: [],
        objNodeFields: {}
    };
}

/**
 * @name useLoadNavigationOnRefresh
 * @param {any} objContext
 * @summary Does the routing for the First SubNavigation based on the URL...
 */
export function useLoadNavigationOnRefresh(objContext) {
    useEffect(() => {
        var browserUrl = window.location.pathname;
        var arrBrowserUrl = browserUrl.split("/");
        let strSubNavigationName = arrBrowserUrl[arrBrowserUrl.length - 1];
        if (strSubNavigationName.toLowerCase().includes("navigationcommonpage", 0)) {
            strSubNavigationName = arrBrowserUrl[arrBrowserUrl.length - 2];
        }
        let objNavToSelect = null;
        if (arrBrowserUrl.length > 2) {
            objNavToSelect = objContext.props.NavigationData.filter(x => x.NavigationName == strSubNavigationName)[0];
            let intSubNavigationId;
            if (objNavToSelect) { //In case of Commom Page, objNavToSelect will be undefined
                intSubNavigationId = objNavToSelect["NavigationType"] ? (objNavToSelect["NavigationType"].toLowerCase() == "task" ? -1 : -2) :  objNavToSelect["NavigationId"];
                ApplicationState.SetProperty('ActiveSubNavigationId', intSubNavigationId);
                ApplicationState.SetProperty('BreadCrumbNavigationId', intSubNavigationId);
            }
        }
        else {
            //When we login for first and we dont have any second level, We det ActiveSubNavigationId to 2
            //To take the first SubNavigation from first MainNavigation...
            ApplicationState.SetProperty('ActiveSubNavigationId', 2);
            ApplicationState.SetProperty('BreadCrumbNavigationId', 2);
        }
    }, [])
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useSetTheDefaultFolder();  
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSelectInitialFolder(objContext);
}

/**
 * @name useNavigateOnMainNavigationChange
 * @param {any} objContext
 * @summary When ActiveSubNavigationId changes in Redux(when the MainNavigation is Changed),
 * Selects the First one from the SubNavigation and does the Routing as well(by calling the OnSubNavigationClick)...
 */
export function useNavigateOnMainNavigationChange(objContext) {
    useEffect(() => {    
        if (objContext.props.ActiveSubNavigationId && objContext.props.ActiveSubNavigationId != -1 && objContext.props.ActiveSubNavigationId != -2) {
            var arrChildrenNavigation = objContext.props.NavigationData.filter(x => x.NavigationId == objContext.props.ActiveSubNavigationId);
            objContext.SubNavigation_ModuleProcessor.OnSubNavigationClick(objContext, arrChildrenNavigation[0]);
        }        
    }, [objContext.props.ActiveSubNavigationId]);
}

/**
 * @name useSetTheDefaultFolder
 * @summary To set the Folder Id to 0 for the First time, to load root folder data for Task and test
 */
export function useSetTheDefaultFolder() {
    useEffect(() => {
        ApplicationState.SetProperty('FolderId', '0');
    }, []);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        if (objContext.props.JConfiguration.ApplicationTypeId == 4) {
            objContext.SubNavigation_ModuleProcessor.LoadInitialData(objContext);
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
        if (objContext.state.blnFoldersLoaded) {
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        if ((!objContext.state.blnFoldersLoaded
            && DataRef(objContext.props.Object_Intranet_Task_TaskFolder)["Data"]
            && DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"]) 
            || (objContext.props.JConfiguration.ApplicationTypeId != 4)
    ) {
        ApplicationState.SetProperty("blnShowAnimation", false);
        objContext.dispatch({ type: "SET_STATE", payload: { "blnFoldersLoaded": true } });
        }
    }, [objContext.props.Object_Intranet_Task_TaskFolder, objContext.props.Object_Intranet_Test_TestFolder]);
}


/**
 * @name useSetSelectNodeCallback
 * @param {object} objContext  objContext
 * @summary set the callback into application state
 */
export function useSelectInitialFolder(objContext) {
    useEffect(() => {
        if (objContext.state.blnFoldersLoaded && !QueryString.GetQueryStringValue("SubNavigationId")) {
            let objRootNode;
            if (objContext.props.ActiveMainNavigationId == -1) {
                objRootNode = { iPageFolderId: "0", iPageParentFolderId: "-1", vPageFolderName: "Tasks" };
            }
            else if (objContext.props.ActiveMainNavigationId == -2) {
                objRootNode = { iTestFolderId: "0", iTestParentFolderId: "-1", vTestFolderName: "Tests" };
            }           

            //selects the node
            if (objRootNode) {
                let fnSelectSubNavigation = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                if (fnSelectSubNavigation) {
                    fnSelectSubNavigation(objRootNode);
                }
            }
        }
    }, [objContext.state.blnFoldersLoaded, objContext.props.ActiveMainNavigationId]);
}

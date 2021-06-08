// React related imports.
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"] && 
        DataRef(props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"] && 
        Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
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
        objContext.SubNavigation_ModuleProcessor.LoadNavigationOnRefresh(objContext);
    }, [objContext.state.isLoadComplete, objContext.props.ActiveMainNavigationId])
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
    useSetSelectNodeCallback(objContext);
    //useSelectInitialFolder(objContext);
    useLoadDataForSelectedApplicationType(objContext);
    useLoadNavigationOnRefresh(objContext);
}

/**
 * @name useNavigateOnMainNavigationChange
 * @param {any} objContext
 * @summary When ActiveSubNavigationId changes in Redux(when the MainNavigation is Changed),
 * Selects the First one from the SubNavigation and does the Routing as well(by calling the OnSubNavigationClick)...
 */
export function useNavigateOnMainNavigationChange(objContext) {
    useEffect(() => {    
        if (objContext.state.isLoadComplete && objContext.props.ActiveSubNavigationId) {
            var arrChildrenNavigation = DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]?.filter(x => x.uFolderId == objContext.props.ActiveSubNavigationId);
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
        if (!objContext.state.isLoadComplete && ApplicationState.GetProperty("ActiveMainNavigationId")) { //CHECK
            objContext.SubNavigation_ModuleProcessor.LoadInitialData(objContext);
        }
    }, [objContext.props.ActiveMainNavigationId]);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        if ((!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]
            && DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation", objContext.props)
        )
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_DevServer_ProductManagement_Folder,
            objContext.props.Object_DevServer_ProductManagement_Module,
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation"]
    ]);
}

/**
 * @name useSetSelectNodeCallback
 * @param {object} objContext  objContext
 * @summary set the callback into application state
 */
export function useSetSelectNodeCallback(objContext) {
    useEffect(() => {
        ApplicationState.SetProperty("SelectSubNavigation", (objSelectedNode) => { objContext.SubNavigation_ModuleProcessor.OnSelectNode(objContext, objSelectedNode) } );
    }, [objContext]);
}

/**
 * @name useSetSelectNodeCallback
 * @param {object} objContext  objContext
 * @summary set the callback into application state
 */
export function useSelectInitialFolder(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && !QueryString.GetQueryStringValue("SubNavigationId")) {
            let arrFolderData = [];
            DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"]?.map(obj => {
                if (obj["uApplicationTypeId"] == ApplicationState.GetProperty("ActiveMainNavigationId") && obj.cIsDeleted == "N" && obj["uParentFolderId"] == '00000000-0000-0000-0000-000000000000') {
                    arrFolderData = [...arrFolderData, { ...obj, ["IdField"]: obj.uFolderId, ["ParentIdField"]: obj.uParentFolderId, ["TextField"]: obj.vFolderName, ["ImageType"]: "Folder" }]
                }
            });
            //sorting 
            arrFolderData = arrFolderData.sort((obj1, obj2) => obj1["iOrderId"] - obj2["iOrderId"]);
            //takes the first node
            let objNode = arrFolderData[0] ? arrFolderData[0] : null;

            //selects the node
            if (objNode) {
                let fnSelectSubNavigation = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                if (fnSelectSubNavigation) {
                    fnSelectSubNavigation(objNode);
                }
                //can be added when we need to expand the folders
                //let fnExpandTreeTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["Tree_Master"] ? ApplicationState.GetProperty("ExpandTreeNodes")["Tree_Master"] : null;
                //if (fnExpandTreeTreeNodes) {
                //    fnExpandTreeTreeNodes([objNode]);
                //}
            }
        } 
    }, [objContext.state.isLoadComplete, objContext.props.ActiveMainNavigationId]);
}

/**
* @name useLoadTheSelecedFolder.
* @param {object} objContext takes  objContext.
* @summary When any folder is selected, To load the folders and UseCases for that Folder.
*  Also it keeps watching the UseCase and UseCasefolder. When add or edit happens, the changes get reflected.
*/
export function useLoadDataForSelectedApplicationType(objContext) {
    const GetFolderData = () => {
        if (objContext.state.isLoadComplete) {//if (objContext.state.isLoadComplete && (!DataRef(objContext.props.Object_DevServer_ProductManagement_Folder, "Object_DevServer_ProductManagement_Folder;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId")) || !DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId")))) {
            objContext.SubNavigation_ModuleProcessor.LoadDataForSelectedApplicationType(objContext, ApplicationState.GetProperty("ActiveMainNavigationId"));
        }
    }
    useEffect(GetFolderData, [objContext.props.ActiveMainNavigationId]);
}
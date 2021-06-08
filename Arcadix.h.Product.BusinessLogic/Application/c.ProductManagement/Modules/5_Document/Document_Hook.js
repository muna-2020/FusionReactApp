// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as Document_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/5_Document/Document_OfficeRibbon';
import { DataRef } from '../../../../Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    var strFilter = ";cIsForModule;" + (props.Data && props.Data.IsForModule ? "Y" : "N") + ";cIsForUseCase;" + (props.Data && props.Data.IsForUseCase ? "Y" : "N") + ";cIsForTestCase;" + (props.Data && props.Data.IsForTestCase ? "Y" : "N") + ";cIsForImplementationStep;" + (props.Data && props.Data.IsForImplementationStep) ? "Y" : "N";
    if (
        DataRef(props.Object_DevServer_ProductManagement_ProductDocument, "Object_DevServer_ProductManagement_ProductDocument;cIsDeleted;N;uDocumentFolderId;" + (props.Data && (props.Data.IsForModule || props.Data.IsForUseCase || props.Data.IsForTestCase || props.Data.IsForImplementationStep) ? props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")) + strFilter.toString())["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", props) &&
        DataRef(objContext.props.Object_DevServer_ProductManagement_ProductManagementUser)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        CheckInEvent: "WebDav_CheckIn", //"CheckIn" + "_" + JConfiguration.ClientUserId,
        CheckOutEvent: "WebDav_CheckOut",// "CheckOut" + "_" + JConfiguration.ClientUserId
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
    useLoadTheSelecedFolder(objContext);
    useSetSubNavigationEvents(objContext);
    //useResetGridSelection(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (objContext.props.ActiveSubNavigationId) {
            objContext.Document_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    var strFilter = ";cIsForModule;" + (objContext.props.Data && objContext.props.Data.IsForModule ? "Y" : "N") + ";cIsForUseCase;" + (objContext.props.Data && objContext.props.Data.IsForUseCase ? "Y" : "N") + ";cIsForTestCase;" + (objContext.props.Data && objContext.props.Data.IsForTestCase ? "Y" : "N") + ";cIsForImplementationStep;" + (objContext.props.Data && objContext.props.Data.IsForImplementationStep ? "Y" : "N");
    useEffect(() => {
        //if (objContext.state.isLoadComplete) {
        //    ApplicationState.SetProperty("blnShowAnimation", false);
        //    //WebSocketConnection(objContext);
        //}
        if (
            DataRef(objContext.props.Object_DevServer_ProductManagement_ProductDocument, "Object_DevServer_ProductManagement_ProductDocument;cIsDeleted;N;uDocumentFolderId;" + (objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")) + strFilter.toString())["Data"] &&
            Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objContext.props) &&
            DataRef(objContext.props.Object_DevServer_ProductManagement_ProductManagementUser)["Data"] &&
            !objContext.state.isLoadComplete
        ) {
            //To set state data after the load is complete
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            //WebSocketConnection(objContext);            
        }
    }, [
        objContext.props.Object_DevServer_ProductManagement_ProductDocument,
        objContext.props.Object_DevServer_ProductManagement_ProductManagementUser,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/5_Document/Document"],
    ]);
}

//---------------------------------------Commented out for now as Websocket is not used------------------------------------------
///**
// * @name WebSocketConnection
// */
//export function WebSocketConnection(objContext) {
//    if (!window.SocketSource) {
//        var socketSource = new WebSocket("ws://" + JConfiguration.WebDAVServer.replace("http://", ""));
//        socketSource.addEventListener('message', function (e) {
//            var notifyObject = JSON.parse(e.data);

//            // Checking message type after receiving.
//            if (notifyObject.EventType === "refresh") {
//                objContext.Document_ModuleProcessor.GetLocks(objContext);
//            }
//        }, false);
//        //Adding socketSource to Window variable
//        window.SocketSource = socketSource;
//    }    
//}
//--------------------------------------------------------------------------------------------------------------------------------------------

/**
 * @name useSignalRConnection 
 * @summary Used to establish the connection with the SigalR hub
 */
export function useSignalRConnection(objContext) {
    useEffect(() => {
        objContext.SignalRClass.ConnectToHub(objContext);
        objContext.SignalRClass.EventListener(objContext.state.CheckOutEvent, (objResponseData) => {
            let objCheckedOutDocument = JSON.parse(objResponseData);
            let strActiveFolderId = objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId");
            if (strActiveFolderId == objCheckedOutDocument["uDocumentFolderId"]) {
                objContext.Document_ModuleProcessor.LoadSelectedFolderDocuments(objContext, strActiveFolderId, false);
            }
        });

        objContext.SignalRClass.EventListener(objContext.state.CheckInEvent, (objResponseData) => {
            let objCheckedInDocument = JSON.parse(objResponseData);
            let strActiveFolderId = objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId");
            if (strActiveFolderId == objCheckedInDocument["uDocumentFolderId"]) {
                objContext.Document_ModuleProcessor.LoadSelectedFolderDocuments(objContext, strActiveFolderId, false);
            }
        });
    }, []);
}

/**
* @name useSetRibbonData.
* @param {object} objContext takes  objContext.
* @summary To set and update the Ribbon Data when the State changes.
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["DocumentGrid"] : [];
            let strSelectedFolderId = ApplicationState.GetProperty("ActiveSubNavigationId");
            var objRibbonData = {
                objContext,
                "AddPopup": () => objContext.Document_ModuleProcessor.OpenAddEditDocumentPopup(objContext, false),
                "EditPopup": () => objContext.Document_ModuleProcessor.OpenAddEditDocumentPopup(objContext, true),
                "DeletePopup": () => objContext.Document_ModuleProcessor.OpenDeletePopup(objContext),
                "Cut": () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Document": { "Type": "Cut", "Data": arrSelectedRows } }) },                
                "Paste": () => {
                    objContext.Document_ModuleProcessor.CutPaste(objContext, strSelectedFolderId, false)
                },
            };
            if (objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep)) {
                objContext.props.SetOfficeRibbonData(Document_OfficeRibbon.GetDocumentOfficeRibbonData(objRibbonData));
            }
            else {
                ApplicationState.SetProperty("OfficeRibbonData", Document_OfficeRibbon.GetDocumentOfficeRibbonData(objRibbonData));
            }
        }
    }, [objContext.state, objContext.props.ActiveSubNavigationId]);
}

/**
* @name useLoadTheSelecedFolder.
* @param {object} objContext takes  objContext.
* @summary When any folder is selected, To load the folders and Documents for that Folder.
*  Also it keeps watching the Document and Document folder. When add or edit happens, the changes get reflected.
*/
export function useLoadTheSelecedFolder(objContext) {
    const GetDocumentData = () => {
        if (objContext.state.isLoadComplete
            && objContext.props.ActiveSubNavigationId
            //&& !DataRef(objContext.props.Object_DevServer_ProductManagement_ProductDocument, "Object_DevServer_ProductManagement_ProductDocument;cIsDeleted;N;uDocumentFolderId;" + (objContext.props.Data && objContext.props.Data.IsForModule ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")))
        ) {
            objContext.Document_ModuleProcessor.LoadSelectedFolderDocuments(objContext, (objContext.props.Data && (objContext.props.Data.IsForModule || objContext.props.Data.IsForUseCase || objContext.props.Data.IsForTestCase || objContext.props.Data.IsForImplementationStep) ? objContext.props.Data.DocumentFolderId : ApplicationState.GetProperty("ActiveSubNavigationId")));
        }
    }
    useEffect(GetDocumentData, [objContext.props.ActiveSubNavigationId]);
}

/**
* @name usePasteDocument.
* @param {object} objContext takes  objContext.
* @summary When any folder is selected, resets the GridRow selection after loading the respective data.
*/
export function useSetSubNavigationEvents(objContext) {
    useEffect(() => {
        ApplicationState.SetProperty("PasteDocument", (strFolderId) => { objContext.Document_ModuleProcessor.CutPaste(objContext, strFolderId, true) });
        ApplicationState.SetProperty("DragDropDocument", (strDraggedFolderId, strDroppedFolderId) => objContext.Document_ModuleProcessor.OnDragDrop({ Type: "Folder", Id: strDraggedFolderId }, { Type: "Folder", Id: strDroppedFolderId }, objContext));
    }, [objContext.props.Object_DevServer_ProductManagement_ProductDocument, objContext.props.ActiveSubNavigationId]);    
}
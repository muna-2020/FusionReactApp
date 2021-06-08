
//Common helper file.
import * as AddEditFolder_MetaData from "@shared/Application/c.ProductManagement/Modules/1_Folder/AddEditFolder/AddEditFolder_MetaData";
import Object_DevServer_ProductManagement_Folder from '@shared/Object/c.ProductManagement/Folder/Folder';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name AddEditTaskFolder_ModuleProcessor
 * @summary Class for Add/Edit TaskFolder module.
 */
class AddEditTaskFolder_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/1_Folder/Folder",
        ];
    }

    /**
        * @name LoadInitialData
        * @param {object} objContext passes Context object
        * @summary Calls the Queue and Execute method
        */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];
        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/1_Folder/Folder"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
    * @name GetInitilaData 
    * @param {object} objContext takes objContext
    * @summary Creates Initial data - objAddData for the module
    */
    GetInitilaData(objContext) {
        let objAddData = {
            "uParentFolderId": objContext.props.Data.SelectedNode ? objContext.props.Data.SelectedNode["uFolderId"] : "00000000-0000-0000-0000-000000000000",
            "uApplicationTypeId": ApplicationState.GetProperty("ActiveMainNavigationId")
        }
        return objAddData;
    }

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multilanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }
    
    /**
     * @name SaveData
     * @param {object} objContext takes objContext
     * @param {boolean} blnClose sends true when SaveAndClosed is pressed
     * @summary hits the add/edit api after validation succeeds
     */
    SaveData(objContext, blnClose = false) {
        let objValidationObject = this.Validate(objContext);
        if (!objValidationObject) {
            let objSearchQuery = {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        },
                    },
                    {
                        "match": {
                            "uApplicationTypeId": ApplicationState.GetProperty("ActiveMainNavigationId")
                        }
                    }                    
                ]
            };
            if (objContext.state.objData["uFolderId"] && objContext.state.objData["uFolderId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                let objEditParams = {
                    "SearchQuery": objSearchQuery,
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
                    "vEditData": [objContext.state.objData],
                }
                Object_DevServer_ProductManagement_Folder.EditData(objEditParams, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                let objAddParams = {
                    "SearchQuery": objSearchQuery,
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
                    "vAddData": objContext.state.objData,
                }
                Object_DevServer_ProductManagement_Folder.AddData(objAddParams, (objReturn, blnAdded) => {
                    if (blnAdded) {
                        ApplicationState.SetProperty("blnShowAnimation", false);
                        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                        if (objContext.props.Data.SelectedNode) {
                            let arrExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") && ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"] ? ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"] : [];
                            ApplicationState.SetProperty("ExpandedNodes", { ...ApplicationState.GetProperty("ExpandedNodes"), "Tree_Master": [...arrExpandedNodes, objContext.props.Data.SelectedNode] });
                        }                        
                        //let objSelctedNode = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
                        //ApplicationState.SetProperty("SelectedNode", { ...objSelctedNode, "Tree_Master": { ...objReturn[0], ["IdField"]: objReturn[0]["uFolderId"] } });
                        //ApplicationState.SetProperty("ActiveSubNavigationId", objReturn[0]["uFolderId"]);
                        let fnSelectSubNavigation = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                        if (fnSelectSubNavigation) {
                            let objRow = {
                                ...objReturn[0],
                                ["IdField"]: objReturn[0].uFolderId,
                                ["ParentIdField"]: objReturn[0].uParentFolderId
                            }
                            fnSelectSubNavigation(objRow);
                        }
                        if (blnClose) {
                            Popup.ClosePopup(objContext.props.Id);
                        }
                    }
                 
                });
            }
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
        }
    }
        
    /**
     * @name Validate
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary Validate
     * @returns {object} objNewValidationObject
     */
    Validate(objContext, strColumnName) {
        var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditFolder_MetaData.GetAddEditMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }

    /**
     * @name ValidateFocus
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary hits the add/edit api after validation succeeds
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }
}

export default AddEditTaskFolder_ModuleProcessor;
//Common helper file.
import * as AddEditModule_MetaData from "@shared/Application/c.ProductManagement/Modules/2_Module/AddEditModule/AddEditModule_MetaData";
import Object_DevServer_ProductManagement_Module from '@shared/Object/c.ProductManagement/Module/Module';

/**
 * @name AddEditModule_ModuleProcessor
 * @summary Class for Add/Edit Module module.
 */
class AddEditModule_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/2_Module/Module",
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
        let arrResourceParams = ["/c.ProductManagement/Modules/2_Module/Module"];
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
            //"uUserId": objContext.props.Data.ClientUserDetails.UserId,
            "uFolderId": objContext.props.Data.SelectedNode ? objContext.props.Data.SelectedNode.uFolderId : ApplicationState.GetProperty("ActiveSubNavigationId"),
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

    HandleDocumentChange(strAttributeName, strValue, strId, objContext) {
        //let objDocumentData = {
        //    ...objContext.state.arrDocuments.find((obj) => { return obj.Id == strId }),
        //    [strAttributeName] : strValue
        //}
        //let arrNewDocuments = [
        //    ...objContext.state.arrDocuments.filter((obj) => { return obj.Id != strId }),
        //    objDocumentData
        //]

        let arrNewDocuments = objContext.state.arrDocuments.map(obj => {
            if (obj.Id == strId) {
                obj[strAttributeName] = strValue
            }
            return obj
        })

        objContext.dispatch({ type: "SET_STATE", payload: { arrDocuments: arrNewDocuments } });
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
                        }
                    },
                    {
                        "match": {
                            "uApplicationTypeId": ApplicationState.GetProperty("ActiveMainNavigationId")
                        }
                    }
                ]
            };
            if (objContext.state.objData["uModuleId"] && objContext.state.objData["uModuleId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                let arrAddDocumentData = objContext.state.arrDocuments.filter(objDocumentData => {
                    if (!objDocumentData.uDocumentId)    
                        return objDocumentData
                })                

                let objEditParams = {
                    "SearchQuery": objSearchQuery,
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
                    "vEditData": [objContext.state.objData],
                }

                Object_DevServer_ProductManagement_Module.EditData(objEditParams, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    if (objReturn[0].vAddDocumentResult) {
                        let arrAddDocumentResult = [...objContext.state.arrDocuments.filter(objDocumentData => {
                            if (objDocumentData.uDocumentId)
                                return objDocumentData
                        }), ...objReturn[0].vAddDocumentResult]                 
                        objContext.dispatch({ type: "SET_STATE", payload: { "arrDocuments": arrAddDocumentResult } });
                    }
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ModuleGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                let objAddParams = {
                    "SearchQuery": objSearchQuery,
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
                    "vAddData": objContext.state.objData,
                }

                Object_DevServer_ProductManagement_Module.AddData(objAddParams, (objReturn, cIsNewData) => {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    objContext.dispatch({ type: "SET_STATE", payload: { "arrDocuments": objReturn[0].vAddDocumentResult ? objReturn[0].vAddDocumentResult : [] } });
                    //let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ModuleGrid": null });
                    let fnSelectSubNavigation = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                    if (fnSelectSubNavigation && objContext.props.Data.SelectedNode) {
                        fnSelectSubNavigation(objContext.props.Data.SelectedNode);
                    }
                    let fnExpandTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["Tree_Master"] ? ApplicationState.GetProperty("ExpandTreeNodes")["Tree_Master"] : null;
                    if (fnExpandTreeNodes && objContext.props.Data.SelectedNode) {
                        let arrExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") && ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"] ? ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"] : [];
                        fnExpandTreeNodes([...arrExpandedNodes, objContext.props.Data.SelectedNode] );
                    }
                    let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") && ApplicationState.GetProperty("ResetGridSelection")["ModuleGrid"] ? ApplicationState.GetProperty("ResetGridSelection")["ModuleGrid"] : null;
                    if (fnResetGridSelection) {
                        fnResetGridSelection(objReturn[0]);
                    }
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditModule_MetaData.GetAddEditMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
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

    OnUploadComplete(objFileData, strId, objContext) {
        console.log(objFileData);
        //let objDocumentData = {
        //    ...objContext.state.arrDocuments.find((obj) => { return obj.Id == strId }),
        //    "vFileName": objFileData.OriginalFileName.split('.')[0],
        //    "vDocumentName": objFileData.OriginalFileName.split('.')[0],
        //    "vFileType": objFileData.OriginalFileName.split('.')[1],
        //    "strTemporaryFileId": objFileData.FileName
        //}
        //let arrNewDocuments = [
        //    ...objContext.state.arrDocuments.filter((obj) => { return obj.Id != strId }),
        //    objDocumentData          
        //]

        let arrNewDocuments = objContext.state.arrDocuments.map(obj => {
            if (obj.Id == strId) {
                obj["vFileName"] = objFileData.OriginalFileName.split('.')[0],
                obj["vDocumentName"] = objFileData.OriginalFileName.split('.')[0],
                obj["vFileType"] = objFileData.OriginalFileName.split('.')[1],
                obj["strTemporaryFileId"] = objFileData.FileName
            }
            return obj
        })

           
        
        objContext.dispatch({ type: "SET_STATE", payload: { arrDocuments: arrNewDocuments } });

        //objContext.dispatch({ type: "SET_STATE", payload: { arrDocuments: [...objContext.state.arrDocuments, { objData, "strTemporaryFileId": objFileData.FileName }]} });
    }

    DeleteDocument(strId, objContext) {
        let arrNewDocuments = objContext.state.arrDocuments.filter((obj) => { return obj.Id != strId });
       
        objContext.dispatch({ type: "SET_STATE", payload: { arrDocuments: arrNewDocuments } });
    }
}

export default AddEditModule_ModuleProcessor;
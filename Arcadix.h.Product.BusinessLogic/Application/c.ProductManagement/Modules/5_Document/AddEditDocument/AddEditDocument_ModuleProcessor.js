
//Module related Files
import Object_DevServer_ProductManagement_ProductDocument from '@shared/Object/c.ProductManagement/Document/Document';
import * as AddEditDocument_MetaData from '@shared/Application/c.ProductManagement/Modules/5_Document/AddEditDocument/AddEditDocument_MetaData';

/**
 * @name AddEditDocument_ModuleProcessor
 * @summary Class for Add/Edit Document module.
 */
class AddEditDocument_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
 * @name StoreMapList     
 * @summary Returns list of objects used in the module
 * @return {Array} Array of object list
 */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/5_Document/Document",
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
        let arrResourceParams = ["/c.ProductManagement/Modules/5_Document/Document"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
        return arrDataRequest;
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
            ApplicationState.SetProperty("blnShowAnimation", true);

            let objParams = {}
            var objSearchQuery = {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    },
                    {
                        "match": {
                            "uDocumentFolderId": objContext.props.Data.DocumentFolderId
                        }
                    },
                    {
                        "match": {
                            "cIsForModule": (objContext.props.Data && objContext.props.Data.IsForModule ? "Y" : "N")
                        }
                    },
                    {
                        "match": {
                            "cIsForUseCase": (objContext.props.Data && objContext.props.Data.IsForUseCase ? "Y" : "N")
                        }
                    },
                    {
                        "match": {
                            "cIsForTestCase": (objContext.props.Data && objContext.props.Data.IsForTestCase ? "Y" : "N")
                        }
                    },
                    {
                        "match": {
                            "cIsForImplementationStep": (objContext.props.Data && objContext.props.Data.IsForImplementationStep ? "Y" : "N")
                        }
                    }
                ]
            }
            if (objContext.state.objData["uDocumentId"] && objContext.state.objData["uDocumentId"] != "") {
                objParams = {

                    "SearchQuery": objSearchQuery,
                    "vEditData": [objContext.state.objData],
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId
                };
            }
            else {
                objParams = {

                    "SearchQuery": objSearchQuery,
                    "vAddData": objContext.state.objData,
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
                    "TemporaryFileId": objContext.state.strTemporaryFileId
                };
            }       

            if (objContext.state.objData["uDocumentId"] && objContext.state.objData["uDocumentId"] != "") {                
                Object_DevServer_ProductManagement_ProductDocument.EditData(objParams, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "DocumentGrid": [objReturn[0]] });
                    if (blnClose) {                       
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                Object_DevServer_ProductManagement_ProductDocument.AddData(objParams, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    this.ResetGridSelection("DocumentGrid");                                       
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
     * @name HandleDropDownChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {*} objChangeData selected object of the dropdown
     * @param {*} props takes props
     * @param {*} objContext takes objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    HandleDropDownChange(strAttributeName, objChangeData, props, objContext) {
        let strCellName = props.Meta["ValueColumn"];
        let strValue = objChangeData[strCellName];
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData");
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    /**
     * @param {*} objItem objItem
     * @summary  To filter the dropdown data based on the condition
     * @returns {bool} boolean
     */
    CreateItemEventHandler(objItem) {
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditDocument_MetaData.GetAddEditMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
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

    OnUploadComplete(objFileData, objContext) {
        console.log(objFileData);
        let strFileName = objFileData.OriginalFileName.split('.').length > 1 ? objFileData.OriginalFileName.replace("." + objFileData.OriginalFileName.split('.')[objFileData.OriginalFileName.split('.').length - 1], "") : objFileData.OriginalFileName.split('.')[0];
        let strFileType = objFileData.OriginalFileName.split('.').length > 1 ? objFileData.OriginalFileName.split('.')[objFileData.OriginalFileName.split('.').length - 1] : objFileData.OriginalFileName.split('.')[1];
        let objData = {
            ...objContext.state.objData,
            "vFileName": strFileName,
            "vDocumentName": objContext.state.objData.vDocumentName ? objContext.state.objData.vDocumentName : objFileData.OriginalFileName.split('.')[0],
            "vFileType": strFileType
        }
        objContext.dispatch({ type: "SET_STATE", payload: { objData, "strTemporaryFileId": objFileData.FileName } });
    }
}
export default AddEditDocument_ModuleProcessor;
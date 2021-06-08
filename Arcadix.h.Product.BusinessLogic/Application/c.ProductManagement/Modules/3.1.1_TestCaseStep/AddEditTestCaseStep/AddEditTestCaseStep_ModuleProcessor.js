
//Module related Files
import * as AddEditTestCaseStep_MetaData from '@shared/Application/c.ProductManagement/Modules/3.1.1_TestCaseStep/AddEditTestCaseStep/AddEditTestCaseStep_MetaData';

//Objects required for module.
import Object_DevServer_ProductManagement_TestCaseStep from '@shared/Object/c.ProductManagement/TestCase/TestCaseStep/TestCaseStep';


/**
 * @name AddEditTestCase_ModuleProcessor
 * @summary Class for Add/Edit TestCase module.
 */
class AddEditTestCase_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
   * @name StoreMapList     
   * @summary Returns list of objects used in the module
   * @return {Array} Array of object list
   */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3.1.1.TestCaseStep/TestCaseStep",
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
        let arrResourceParams = ["/c.ProductManagement/Modules/3.1.1.TestCaseStep/TestCaseStep"];
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
            var objSearchQuery = {
                "must": [
                    {
                        "match": {
                            "uTestCaseId": objContext.props.Data.TestCaseId
                        }
                    }
                ]
            }

            if (objContext.state.objData["uTestCaseStepId"] && objContext.state.objData["uTestCaseStepId"] != "") {
                let objParams = objParams = {
                    "SearchQuery": objSearchQuery,
                    "vEditData": [objContext.state.objData],
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId
                };
                Object_DevServer_ProductManagement_TestCaseStep.EditData(objParams, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestCaseGrid": [objReturn[0]] });
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                let objParams = objParams = {
                    "SearchQuery": objSearchQuery,
                    "vAddData": objContext.state.objData,
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId
                };
                Object_DevServer_ProductManagement_TestCaseStep.AddData(objParams, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestCaseGrid": null });
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditTestCaseStep_MetaData.GetAddEditMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
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
export default AddEditTestCase_ModuleProcessor;
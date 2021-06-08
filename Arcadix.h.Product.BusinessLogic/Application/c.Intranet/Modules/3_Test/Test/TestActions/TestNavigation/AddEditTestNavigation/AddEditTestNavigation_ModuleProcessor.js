
//Module related Files
import * as AddEditTestNavigation_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation/AddEditTestNavigation/AddEditTestNavigation_MetaData';

//Objects required for module.
import Object_Intranet_Test_IntranetTestNavigation  from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTestNavigation/IntranetTestNavigation';


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
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation",
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
        let arrResourceParams = ["/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation"];
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
            //ApplicationState.SetProperty("blnShowAnimation", true);
            var objSearchQuery = {
                "must": [
                    {
                        "match": {
                            "uTestCaseId": objContext.props.Data.TestCaseId
                        }
                    }
                ]
            }

            if (objContext.state.objData["uTestNavigationId"] && objContext.state.objData["uTestNavigationId"] != "") {
                let objParams = objParams = {
                    "SearchQuery": objSearchQuery,
                    "vEditData": [objContext.state.objData],
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId
                };
                Object_Intranet_Test_IntranetTestNavigation.EditData(objParams, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestCaseGrid": [objReturn[0]] });
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                let objParams = {
                    //"SearchQuery": objSearchQuery,
                    "vAddData": objContext.state.objData,
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId
                };
                Popup.ClosePopup(objContext.props.Id);
                if (objContext.props.CallBacks && objContext.props.CallBacks.OnSaveTestNavigation) {
                    objContext.props.CallBacks.OnSaveTestNavigation(objContext.state.objData);
                }
                //Object_Intranet_Test_IntranetTestNavigation.AddData(objParams, (objReturn, cIsNewData) => {
                //    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                //    ApplicationState.SetProperty("blnShowAnimation", false);
                //    if (objContext.props.CallBacks && objContext.props.CallBacks.OnSaveTestNavigation) {
                //        objContext.props.CallBacks.OnSaveTestNavigation(objReturn[0]);
                //    }
                //    if (blnClose) {
                //        Popup.ClosePopup(objContext.props.Id);
                //    }
                //});
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
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation", objContext.props);
        var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditTestNavigation_MetaData.GetAddEditMetaData(), objTextResource, objContext.state.objData, strColumnName, true, "ValidationError");
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
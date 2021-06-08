//Objects required for module.
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';


/**
* @name AddEditHierarchy_ModuleProcessor
* @param NA
* @summary Class for Add/Edit Language module.
*/
class AddEditHierarchy_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
        //let objValidationObject = this.Validate(objContext);
       // if (!objValidationObject) {
        let objTestTaskParams = {
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uTestId": objContext.state.objData.uTestId
                        }
                    }
                ]
            },
            "vEditData": [objContext.state.objData],
            "uTestId": objContext.state.objData.uTestId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        ArcadixFetchData.ExecuteSingle("API/Object/Intranet/Test/IntranetTestTask", objTestTaskParams, "Put", (objReturn, blnEdited) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.state.objData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == objContext.state.objData.iTestTaskId)[0], "PageName": objContext.state.objData["PageName"], "PageType": "Test", "SubjectName": objContext.state.objData.SubjectName, "SubSubjectName": objContext.state.objData.SubSubjectName } } });
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "HierarchyGrid": [{ ...objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.state.objData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == objContext.state.objData.iTestTaskId)[0], "PageName": objContext.state.objData["PageName"], "PageType": "Test", "SubjectName": objContext.state.objData.SubjectName, "SubSubjectName": objContext.state.objData.SubSubjectName }] });
            objContext.props.events.oneditcomplete({ ...objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.state.objData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == objContext.state.objData.iTestTaskId)[0], "PageName": objContext.state.objData["PageName"], "PageType": "Test", "SubjectName": objContext.state.objData.SubjectName, "SubSubjectName": objContext.state.objData.SubSubjectName });
            if (blnClose) {
                Popup.ClosePopup(objContext.props.Id);
            }
        });
       
    }

    /**
    * @name Validate
    * @param {object} objContext takes objContext
    * @param {strColumnName} strColumnName strColumnName
    * @summary Validate
    * @returns {object} objNewValidationObject
    */
    Validate(objContext, strColumnName) {
        var objNewValidationObject = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError", "", true);
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }


    /**
    * @name ValidateFocus
    * @param {domValidationMessage} domValidationMessage takes domValidationMessage
    * @param {object} objContext takes objContext
    * @param {strColumnName} strColumnName strColumnName
    * @summary hits the add/edit api after validation succeeds
    */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }
}
export default AddEditHierarchy_ModuleProcessor;
//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';
import Object_Intranet_Task_TaskQuestion from '@shared/Object/c.Intranet/2_Task/Task/LikertData/TaskQuestion/TaskQuestion';
import Object_Intranet_Task_Task from '@shared/Object/c.Intranet/2_Task/Task/Task';

/**
* @name AddEditTaskQuestion_ModuleProcessor
* @param NA
* @summary Class for Add/Edit Language module.
*/
class AddEditTaskQuestion_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
    * @name HandleChange
    * @param {string} strAttributeName consists of the vColumnName
    * @param {string} strValue consists of value of the input
    * @param {object} objContext takes objContext
    * @param {string} strLanguageId consists of LanguageId for multilanguage input if any
    * @summary Handle change method to handle changes in the jsx elements
    */
    HandleChange(strAttributeName, strValue, objContext, objToUpdate, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, objToUpdate, strLanguageId);
        objToUpdate.toString() == "objData" ?
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } }) :
            objContext.dispatch({ type: "SET_STATE", payload: { "objTaskData": objNewData } });
    }

    /**
    * @name SaveData
    * @param {object} objContext takes objContext
    * @param {boolean} blnClose sends true when SaveAndClosed is pressed
    * @summary hits the add/edit api after validation succeeds
    */
    SaveData(objContext, blnClose = false) {
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "iPageId": objContext.state.objData["iPageId"]
                    }
                }
            ]
        }
        //let objValidationObject = this.Validate(objContext);
        //if (!objValidationObject) {
        if (objContext.state.objData["iPageQuestionId"] && objContext.state.objData["iPageQuestionId"] != "") {
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_Intranet_Task_TaskQuestion.EditData({ "SearchQuery": objSearchQuery, "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                ApplicationState.SetProperty("blnShowAnimation", false);
                if (blnClose) {
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskQuestionGrid": [objReturn[0]] });
                    Popup.ClosePopup(objContext.props.Id);
                }
            });
        } else {
            Object_Intranet_Task_TaskQuestion.AddData({ "SearchQuery": objSearchQuery, "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskQuestionGrid": null });
                if (blnClose) {
                    Popup.ClosePopup(objContext.props.Id);
                }
            });
        }
        //}
        //else {
        //    objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
        //}
    }

    /**
   * @name SaveTaskData
   * @param {object} objContext takes objContext
   * @param {boolean} blnClose sends true when SaveAndClosed is pressed
   * @summary hits the add/edit api after validation succeeds
   */
    SaveTaskData(objContext, blnClose = false) {
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "iFolderId": objContext.state.objTaskData["iFolderId"]
                    }
                }
            ]
        }
        //let objValidationObject = this.Validate(objContext);
        //if (!objValidationObject) {
        if (objContext.state.objTaskData["iPageId"] && objContext.state.objTaskData["iPageId"] != "") {
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_Intranet_Task_Task.EditData({ "SearchQuery": objSearchQuery, "vEditData": [objContext.state.objTaskData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                objContext.dispatch({ type: "SET_STATE", payload: { "objTaskData": objReturn[0] } });
                ApplicationState.SetProperty("blnShowAnimation", false);
                if (blnClose) {
                    Popup.ClosePopup(objContext.props.Id);
                }
            });
        }
        //}
        //else {
        //    objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
        //}
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
export default AddEditTaskQuestion_ModuleProcessor;
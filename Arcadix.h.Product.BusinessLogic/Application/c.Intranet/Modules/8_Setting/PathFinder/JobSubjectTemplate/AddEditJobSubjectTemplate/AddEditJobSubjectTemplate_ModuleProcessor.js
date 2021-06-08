//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Module related file.
import * as AddEditJobSubjectTemplate_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate/AddEditJobSubjectTemplate/AddEditJobSubjectTemplate_MetaData';
import Object_Intranet_Setting_PathFinder_JobSubjectTemplate from '@shared/Object/c.Intranet/8_Setting/PathFinder/JobSubjectTemplate/JobSubjectTemplate'
/**
 * @name AddEditJobSubjectTemplate_ModuleProcessor
 * @summary Class for Add/Edit JobSubjectTemplate module.
 */
class AddEditJobSubjectTemplate_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name GetInitialData
     * @summary Returns initial data for Add
     * @returns {object} return initial objData for Add
     */
    GetInitialData(objContext) {
        return {
            "uJobFieldId": objContext.props.Data.SelectedJobFieldId,
            "cHasMinimumValue": "N",
            "cHasFromToValue": "N"            
        }
    }

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multi language input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
        //OnBlur validation for dropdown(on dropdown change)
        if (strAttributeName === "iSubjectId" && objContext.state.blnSaveClicked) {
            FieldValidator.ValidateClientSide(AddEditJobSubjectTemplate_MetaData.GetAddEditMetaData(), objContext.props.Resource.Text, objNewData, strAttributeName, false, "", "", true)
        }
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
            if (objContext.state.objData["uSubjectTemplateId"] && objContext.state.objData["uSubjectTemplateId"] != "") {                
                Object_Intranet_Setting_PathFinder_JobSubjectTemplate.EditData({ "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobSubjectTemplateGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                Object_Intranet_Setting_PathFinder_JobSubjectTemplate.AddData({ "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobSubjectTemplateGrid": null });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            }
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnSaveClicked": true } });
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditJobSubjectTemplate_MetaData.GetAddEditMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }

    /**
     * @name ValidateFocus
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary To show validation message onFocus of Input fields after validation
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }

    /**
     * @name ValidateOnBlur
     * @param {object} objContext takes objContext
     * @param {string} strColumnName strColumnName
     * @summary Validates onBlur event of field after click of Save
     */
    ValidateOnBlur(strColumnName, objContext) {
        if (objContext.state.blnSaveClicked) {
            FieldValidator.ValidateClientSide(AddEditJobSubjectTemplate_MetaData.GetAddEditMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, false, "", "", true)
        }
    }
}
export default AddEditJobSubjectTemplate_ModuleProcessor;
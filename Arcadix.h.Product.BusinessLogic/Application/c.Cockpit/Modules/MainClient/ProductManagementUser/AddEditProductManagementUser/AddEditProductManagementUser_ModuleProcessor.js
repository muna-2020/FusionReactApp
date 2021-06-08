/**
 * @name AddEditProductManagementUser_ModuleProcessor
 * @summary Class for Add/Edit ProductManagementUser module.
 */
class AddEditProductManagementUser_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
            if (objContext.state.objData["uProductManagementUserId"] && objContext.state.objData["uProductManagementUserId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                objContext.props.Data.Object_DevServer_ProductManagement_ProductManagementUser.EditData({ "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ProductManagementUserGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });

            } else {
                objContext.props.Data.Object_DevServer_ProductManagement_ProductManagementUser.AddData({ "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ProductManagementUserGrid": null });
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
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
export default AddEditProductManagementUser_ModuleProcessor;
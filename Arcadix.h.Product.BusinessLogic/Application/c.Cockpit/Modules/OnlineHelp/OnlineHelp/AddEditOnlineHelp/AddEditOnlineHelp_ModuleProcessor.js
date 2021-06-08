//Base classes.
import * as CockpitBase_Form from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Form';
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

/**
 * @name AddEditOnlineHelp_ModuleProcessor
 * @summary Class for Add/Edit OnlineHelp module.
 */
class AddEditOnlineHelp_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multilanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = CockpitBase_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
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
            var objSearchQuery = {
                "must": [
                    {
                        "match": {
                            "iMainClientId": objContext.props.JConfiguration.MainClientId
                        }
                    }
                ]
            }
            if (objContext.state.objData["iHelpId"] && objContext.state.objData["iHelpId"] != "") {
                objContext.props.Data.Object_Cockpit_OnlineHelp.EditData({ "SearchQuery": objSearchQuery, "vEditData": [objContext.state.objData] }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "OnlineHelpGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                objContext.props.Data.Object_Cockpit_OnlineHelp.AddData({ "SearchQuery": objSearchQuery, "vAddData": objContext.state.objData }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") && ApplicationState.GetProperty("ResetGridSelection")["OnlineHelpGrid"] ? ApplicationState.GetProperty("ResetGridSelection")["OnlineHelpGrid"] : null;
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
     * @name HandleDropDownChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {*} objChangeData selected object of the dropdown
     * @param {*} props takes props
     * @param {*} objContext takes objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    HandleDropDownChange(strAttributeName, objChangeData, props, objContext) {
        let objNewData = {};
        switch (strAttributeName) {
            case "iMainClientId":
                objNewData = { ...objContext.state.objData, "iMainClientId": objChangeData["iMainClientId"], "uHelpGroupId": -1 }
                break;
            case "iApplicationTypeId":
                objNewData = { ...objContext.state.objData, "iApplicationTypeId": objChangeData["iApplicationTypeId"], "uHelpGroupId": -1 }
                break;
            case "uHelpGroupId":
                objNewData = { ...objContext.state.objData, "uHelpGroupId": objChangeData["uHelpGroupId"] }
                break;
        }
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError", "", true);
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
export default AddEditOnlineHelp_ModuleProcessor;
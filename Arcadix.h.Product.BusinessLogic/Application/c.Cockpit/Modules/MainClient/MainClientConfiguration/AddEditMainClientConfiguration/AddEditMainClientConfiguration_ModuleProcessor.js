//Base classes.
import * as CockpitBase_Form from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Form';

//Module related imports.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

/**
 * @name AddEditMainClientConfiguration_ModuleProcessor
 * @summary Class for Add/Edit MainClientConfiguration module.
 */
class AddEditMainClientConfiguration_ModuleProcessor extends CockpitBase_ModuleProcessor{
       
    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multilanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = CockpitBase_Form.HandleChange(objContext, strAttributeName, strValue,"objData", strLanguageId);
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
                if (objContext.state.objData["iMainClientConfigurationId"] && objContext.state.objData["iMainClientConfigurationId"] != "") {
                    objContext.props.Data.Object_Cockpit_MainClient_MainClientConfiguration.EditData({ "vEditData": [objContext.state.objData] }, (objReturn, cIsNewData) => {
                        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                        if (blnClose) {
                            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "MainClientConfigurationGrid": [objReturn[0]] });
                            Popup.ClosePopup(objContext.props.Id);
                        }
                    });
                } else {
                    objContext.props.Data.Object_Cockpit_MainClient_MainClientConfiguration.AddData({ "vAddData": objContext.state.objData }, (objReturn, cIsNewData) => {
                        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                        this.ResetGridSelection("MainClientConfigurationGrid");    
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
     * @param {domValidationMessage} domValidationMessage takes domValidationMessage
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary hits the add/edit api after validation succeeds
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }
}
export default AddEditMainClientConfiguration_ModuleProcessor;
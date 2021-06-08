//Base classes.
import * as CockpitBase_Form from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Form';
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

/**
 * @name AddEditClientConfiguration_ModuleProcessor
 * @summary Class for Add/Edit ClientConfiguration module.
 */
class AddEditClientConfiguration_ModuleProcessor extends CockpitBase_ModuleProcessor{

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
            if (objContext.state.objData["iClientConfigurationId"] && objContext.state.objData["iClientConfigurationId"] != "") {
                objContext.props.Data.Object_Cockpit_ClientConfig.EditData({ "vEditData": [objContext.state.objData] }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ClientConfigurationGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            }
            else {
                objContext.props.Data.Object_Cockpit_ClientConfig.AddData({ "vAddData": objContext.state.objData }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    this.ResetGridSelection("ClientConfigurationGrid");    
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
     * @param {*} objChangeData selected object of the dropdown
     * @param {*} props takes props
     * @param {*} objContext takes objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    OnDropDownChange(objChangeData, props, objContext){
        let strCellName = props["ValueColumn"];
        let objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
        objEditData[strCellName] = objChangeData[strCellName];
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objEditData } });
    };

    /**
     * @param {*} objChangeData selected object of the dropdown
     * @param {*} props takes props
     * @param {*} objContext takes objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    OnApplicationTypeDropDownChange(objChangeData, props, objContext){
        let strCellName = props["ValueColumn"];
        let objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
        objEditData["iApplicationTypeId"] = objChangeData[strCellName];
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objEditData } });
    };

    /**
     * @param {*} objItem objItem
     * @summary  To filter the dropdown data based on the condition
     * @returns {bool} boolean
     */
    CreateItemEventHandler(objItem){
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objData, strColumnName, true,"ValidationError");
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
export default AddEditClientConfiguration_ModuleProcessor;
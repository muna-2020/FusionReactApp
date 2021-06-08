
//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Module related file.
import * as AddEditCycle_MetaData from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/AddEditCycle/AddEditCycle_MetaData';

/**
 * @name AddEditCycle_ModuleProcessor
 * @summary Class for Add/Edit Cycle module.
 */
class AddEditCycle_ModuleProcessor extends IntranetBase_ModuleProcessor {


    /**
     * @name GetInitialData
     * @summary Returns initial data for Add
     * @returns {object} return initial objData for Add
     */
    GetInitialData() {
        return {
            "cIsActive": "N",
            "cIsArchiveSchool": "N",
            "cIsArchiveTeacher": "N",
            "iCurrentSchoolYear": -1,
            "cIsExternalAccessAllowed": "N"
        }
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
            if (objContext.state.objData["uCycleId"] && objContext.state.objData["uCycleId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                objContext.props.Data.Object_Intranet_Cycle_Cycle.EditData({ "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "CycleGrid": [objReturn[0]] });
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                objContext.props.Data.Object_Intranet_Cycle_Cycle.AddData({ "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "CycleGrid": null });
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
     * @name CreateItemEventHandler
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditCycle_MetaData.GetAddEditMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }

    /**
     * @name ValidateFocus
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary To show validation message onFocus of Input fileds after validation
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }
}
export default AddEditCycle_ModuleProcessor;
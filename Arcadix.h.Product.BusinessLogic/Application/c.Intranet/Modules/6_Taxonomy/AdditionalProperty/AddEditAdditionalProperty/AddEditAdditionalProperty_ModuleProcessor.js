//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Object required for Module
import Object_Intranet_Task_TaskAdditionalProperty from '@shared/Object/c.Intranet/2_Task/Task/TaskAdditionalProperty/TaskAdditionalProperty';

/**
 * @name AddEditAdditionalProperty_ModuleProcessor
 * @summary Class for Add/Edit tAdditionalProperty module.
 */
class AddEditAdditionalProperty_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
     * @name GetSelectedValuesforDropDown
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multilanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    GetSelectedValuesforDropDown(objContext) {
        let intDefaultDropDownSelectedValue = -1;
        var arrMultiselectDropDownValue = [];
        intDefaultDropDownSelectedValue = objContext.state.objData["iDependencyId"];
        if (objContext.state.objData["t_TestDrive_Task_AdditionalTaskProperty_Subject"]) {
            objContext.state.objData["t_TestDrive_Task_AdditionalTaskProperty_Subject"].map(objAdditionalSubject => {
                objContext.props.Data.SubjectData.map(objSubjectAdditionalData => {
                    if (objSubjectAdditionalData["iSubjectId"] == objAdditionalSubject["iSubjectId"]) {
                        arrMultiselectDropDownValue.push(objSubjectAdditionalData);
                    }
                })
            })
        }
        return { "intDefaultDropDownSelectedValue": intDefaultDropDownSelectedValue, "arrMultiselectDropDownValue": arrMultiselectDropDownValue }
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
            if (objContext.state.objData["iAdditionalTaskPropertyId"] && objContext.state.objData["iAdditionalTaskPropertyId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Intranet_Task_TaskAdditionalProperty.EditData({ "vEditData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "AdditionalPropertyGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                Object_Intranet_Task_TaskAdditionalProperty.AddData({ "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "AdditionalPropertyGrid": null });
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
     * @name HandleMultiSelectDropDownChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {*} objChangeData selected object of the dropdown
     * @param {*} props takes props
     * @param {*} objContext takes objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    HandleMultiSelectDropDownChange(strAttributeName, arrSelectedItem, props, objContext) {
        var arrMultiselectDropDownValue = [];
        arrSelectedItem.map(changedData => {
            arrMultiselectDropDownValue.push({ "iSubjectId": changedData["iSubjectId"] })
        })
        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Task_AdditionalTaskProperty_Subject": arrMultiselectDropDownValue } } });
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

export default AddEditAdditionalProperty_ModuleProcessor;
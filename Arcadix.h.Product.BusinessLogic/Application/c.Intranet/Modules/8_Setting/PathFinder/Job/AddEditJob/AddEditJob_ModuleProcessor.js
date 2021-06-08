
//Objects required for module.
import Object_Intranet_Setting_PathFinder_Job from '@shared/Object/c.Intranet/8_Setting/PathFinder/Job/Job';

//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

/**
* @name AddEditJob_ModuleProcessor
* @param NA
* @summary Class for Add/Edit Language module.
*/
class AddEditJob_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
    * @name HandleChange
    * @param {string} strAttributeName consists of the vColumnName
    * @param {string} strValue consists of value of the input
    * @param {object} objContext takes objContext
    * @param {string} strLanguageId consists of LanguageId for multi language input if any
    * @summary Handle change method to handle changes in the JSX elements
    */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    /**
     * @name HandleMultiSelectDropDownChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {*} objChangeData selected object of the DropDown
     * @param {*} props takes props
     * @param {*} objContext takes objContext
     * @summary   To change the row Data on change of the DropDown value
     */
    HandleMultiSelectDropDownChange(strAttributeName, arrSelectedItem, props, objContext) {
        var arrMultiselectDropDownValue = [];
        arrSelectedItem.map(changedData => {
            arrMultiselectDropDownValue.push({ "uJobFieldId": changedData["uJobFieldId"] })
        })
        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_PathFinder_Job_JobField": arrMultiselectDropDownValue } } });
    }

    /**
   * @name GetSelectedValuesforDropDown
   * @param {string} strAttributeName consists of the vColumnName
   * @param {string} strValue consists of value of the input
   * @param {object} objContext takes objContext
   * @param {string} strLanguageId consists of LanguageId for Multi language input if any
   * @summary Handle change method to handle changes in the JSX elements
   */
    GetSelectedValuesforDropDown(objContext) {
        var arrMultiselectDropDownValue = [];
        if (objContext.state.objData["t_PathFinder_Job_JobField"]) {
            objContext.state.objData["t_PathFinder_Job_JobField"].map(objJobJobField => {
                objContext.props.Data.MultiselectDropdownData["JobField"].map(objJobFieldData => {
                    if (objJobFieldData["uJobFieldId"] == objJobJobField["uJobFieldId"]) {
                        arrMultiselectDropDownValue.push(objJobFieldData);
                    }
                })
            })
        }
        return { "arrMultiselectDropDownValue": arrMultiselectDropDownValue }
    }


    /**
    * @name SaveData
    * @param {object} objContext takes objContext
    * @param {boolean} blnClose sends true when SaveAndClosed is pressed
    * @summary hits the add/edit API after validation succeeds
    */
    SaveData(objContext, blnClose = false) {
        let objValidationObject = this.Validate(objContext);
        if (!objValidationObject) {
            if (objContext.state.objData["uJobId"] && objContext.state.objData["uJobId"] != "") {
                Object_Intranet_Setting_PathFinder_Job.EditData({ "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, blnEdited) => {
                    if (blnEdited) {
                        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                        objContext.props.Events.OnAddEditcomplete(objReturn[0], "Edit");
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobGrid": [objReturn[0]] });
                        if (blnClose)
                            Popup.ClosePopup(objContext.props.Id);
                    }
                },true);
            }
            else {
                Object_Intranet_Setting_PathFinder_Job.AddData({ "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, blnAdded) => {
                    if (blnAdded) {
                        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                        objContext.props.Events.OnAddEditcomplete(objReturn[0], "Add");
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobGrid": null });
                        if (blnClose)
                            Popup.ClosePopup(objContext.props.Id);

                    }
                }, true);
            }
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
        }
    }

    /**
   * @name HandleDropDownChange
   * @param {string} strAttributeName consists of the vColumnName
   * @param {*} objChangeData selected object of the DropDown
   * @param {*} props takes props
   * @param {*} objContext takes objContext
   * @summary   To change the row Data on change of the DropDown value
   */
    HandleDropDownChange(strAttributeName, objChangeData, props, objContext) {
        let strCellName = props.Meta["ValueColumn"];
        let strValue = objChangeData[strCellName];
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData");
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
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
    * @summary hits the add/edit API after validation succeeds
    */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }
}
export default AddEditJob_ModuleProcessor;
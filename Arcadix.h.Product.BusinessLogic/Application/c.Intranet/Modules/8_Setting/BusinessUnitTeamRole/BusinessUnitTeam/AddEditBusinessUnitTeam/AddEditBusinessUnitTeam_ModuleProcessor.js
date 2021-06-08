//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Object Require for module
import Object_Cockpit_BusinessUnitTeam from '@shared/Object/c.Cockpit/AccessControl/BusinessUnitTeam/BusinessUnitTeam';


/**
 * @name AddEditBusinessUnitTeam_ModuleProcessor
 * @summary Class for Add/Edit CompetencyRange module.
 */
class AddEditBusinessUnitTeam_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
        var arrMultiselectDropDownValue = [];
        if (objContext.state.objData["t_Framework_MainClient_Team_UserRole"]) {
            objContext.state.objData["t_Framework_MainClient_Team_UserRole"].map(objTeamUserRole => {
                objContext.props.Data.UserRoleData.map(objUserRoleData => {
                    if (objUserRoleData["uUserRoleId"] == objTeamUserRole["uUserRoleId"]) {
                        arrMultiselectDropDownValue.push(objUserRoleData);
                    }
                })
            })
        }
        return { "arrMultiselectDropDownValue": arrMultiselectDropDownValue }
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
        let arrMultiselectDropDownValue = [];
        //var arrMultiselectDropDownValue = objContext.state.objData["t_Framework_MainClient_Team_UserRole"] ? objContext.state.objData["t_Framework_MainClient_Team_UserRole"] : [];
        //arrSelectedItem.map((objChangeData) => {
        //    let arrselectedData = arrMultiselectDropDownValue.filter(objUserRoleData => objUserRoleData["uUserRoleId"] === objChangeData["uUserRoleId"]);
        //    if (arrselectedData.length == 0) {
        //        arrUserRoleData = arrMultiselectDropDownValue;
        //        arrUserRoleData.push({ "uUserRoleId": objChangeData["uUserRoleId"] });
        //    }
        //    else {
        //        arrMultiselectDropDownValue.map((objMultiselectDropDownValue) => {
        //            if (objChangeData["uUserRoleId"] == objMultiselectDropDownValue["uUserRoleId"]) {
        //                arrUserRoleData.push({ ...objMultiselectDropDownValue, "uUserRoleId": objChangeData["uUserRoleId"] })
        //            }
        //            else {
        //                arrUserRoleData.push(objMultiselectDropDownValue)
        //            }
        //        })
        //    }
        //})

        arrSelectedItem.map(changedData => {
            arrMultiselectDropDownValue.push({ "uUserRoleId": changedData["uUserRoleId"] })
        })
        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_Framework_MainClient_Team_UserRole": arrMultiselectDropDownValue  } } });
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
            let objSearchQuery = {
                "must": [
                    {
                        "match": {
                            "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"
                        }
                    }
                ]
            };
            if (objContext.state.objData["uTeamId"] && objContext.state.objData["uTeamId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Cockpit_BusinessUnitTeam.EditData({ "SearchQuery": objSearchQuery, "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "BusinessUnitTeamGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });

            } else {
                Object_Cockpit_BusinessUnitTeam.AddData({ "SearchQuery": objSearchQuery, "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "BusinessUnitTeamGrid": null });
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
export default AddEditBusinessUnitTeam_ModuleProcessor;
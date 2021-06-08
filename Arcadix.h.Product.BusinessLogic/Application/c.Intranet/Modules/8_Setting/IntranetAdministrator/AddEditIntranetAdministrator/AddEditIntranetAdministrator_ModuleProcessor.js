
//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Object Require for module
import Object_Intranet_Member_IntranetAdministrator from '@shared/Object/c.Intranet/5_Member/IntranetAdministrator/IntranetAdministrator';

/**
 * @name AddEditIntranetAdministrator_ModuleProcessor
 * @summary Class for Add/Edit CompetencyRange module.
 */
class AddEditIntranetAdministrator_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
            if (objContext.state.objData["uMainClientUserId"] && objContext.state.objData["uMainClientUserId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Intranet_Member_IntranetAdministrator.EditData({ "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData":  objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "IntranetAdministratorGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });

            } else {
                Object_Intranet_Member_IntranetAdministrator.AddData({ "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    this.ResetGridSelection("IntranetAdministratorGrid"); 
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
        if (strAttributeName == "uBusinessUnitId") {
            objNewData = {
                ...objNewData,
                ["t_Framework_MainClient_User_Team"]: []
            }
        };
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    /**
     * @name GetSelectedDropdownItems
     * @param {string} strAttributeName consists of the vColumnName
     * @param {object} objContext takes objContext
     * @summary Returns the array of Selected Items for the MultiSelect Dropdown.
     */
    GetSelectedDropdownItems(strAttributeName, objContext) {
        let arrSelectedItems = [];
        switch (strAttributeName) {
            case "BusinessUnitTeam":
                objContext.state.objData["t_Framework_MainClient_User_Team"]?.forEach(objUserTeam => {
                    objContext.props.Data.BusinessUnitTeamData?.forEach(objBusinessUnitTeam => {
                        if (objBusinessUnitTeam["uTeamId"] == objUserTeam["uTeamId"]) {
                            arrSelectedItems = [...arrSelectedItems, objBusinessUnitTeam];
                        }
                    })
                })
                break;
            case "UserRole":
                objContext.state.objData["t_Framework_MainClient_User_UserRole"]?.forEach(objUserRole => {
                    objContext.props.Data.UserRoleData?.forEach(objRole => {
                        if (objRole["uUserRoleId"] == objUserRole["uUserRoleId"]) {
                            arrSelectedItems = [...arrSelectedItems, objRole];
                        }
                    })
                });
                break;
        }
        return arrSelectedItems;
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
        let arrMultiselectDropDownValue = arrSelectedItem.map(objSelectedData => ({ [strAttributeName]: objSelectedData[strAttributeName] }) );
        let objNewData = objContext.state.objData;
        switch (strAttributeName) {
            case "uTeamId":
                objNewData = { ...objNewData, "t_Framework_MainClient_User_Team": arrMultiselectDropDownValue}
                break;
            case "uUserRoleId":
                objNewData = { ...objNewData, "t_Framework_MainClient_User_UserRole": arrMultiselectDropDownValue }              
                break;
        }
       
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData  } });
    }

    /**
     *  @name CreateItemEventHandler
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
export default AddEditIntranetAdministrator_ModuleProcessor;
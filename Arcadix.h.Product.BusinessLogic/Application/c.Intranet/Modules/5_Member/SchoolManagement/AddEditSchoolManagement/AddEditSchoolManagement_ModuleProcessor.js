//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Module Objects
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import * as AddEditSchoolManagement_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/AddEditSchoolManagement/AddEditSchoolManagement_MetaData';


class AddEditSchoolManagment_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
        //let arrParams = [];
        if (!objValidationObject) {
            if (objContext.state.objData["uSchoolId"] && objContext.state.objData["uSchoolId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Extranet_School_School.EditData({ "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    objContext.props.events.OnAddEditcomplete(objReturn[0], "Edit");
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "SchoolManagementGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                        window.dispatchEvent(new Event('resize'));
                    }
                });
            } else {
                Object_Extranet_School_School.AddData({ "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    objContext.props.events.OnAddEditcomplete(objReturn[0], "Add");
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "SchoolManagementGrid": [objReturn[0]] });
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                        window.dispatchEvent(new Event('resize'));
                    }
                });
            }
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnSaveClicked": true } });
            //objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
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
        let strValue = objChangeData[strAttributeName];
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData");
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
        //validation 
        if (objContext.state.blnSaveClicked) {
            FieldValidator.ValidateClientSide(AddEditSchoolManagement_MetaData.GetAddEditSchoolManagmentMetaData(), objContext.props.Resource.Text, { [strAttributeName]: strValue }, strAttributeName, false, "", "", true)
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditSchoolManagement_MetaData.GetAddEditSchoolManagmentMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "");
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

    /**
     * @name ValidateOnBlur
     * @param {object} objContext takes objContext
     * @param {string} strColumnName strColumnName
     * @summary Validates onBlur event of field after click of Save
     */
    ValidateOnBlur(strColumnName, objContext) {
        if (objContext.state.blnSaveClicked) {
            FieldValidator.ValidateClientSide(AddEditSchoolManagement_MetaData.GetAddEditSchoolManagmentMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, false, "", "", true)
        }
    }
}
export default AddEditSchoolManagment_ModuleProcessor;
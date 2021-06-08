//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';
import Base_ModuleObject from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Object Required for module
import Object_Intranet_Member_TeacherManagement_Module from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/TeacherManagement_Module';
import * as AddEditTeacherManagement_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/AddEditTeacherManagement/AddEditTeacherManagement_MetaData';


class AddEditTeacherManagement_ModuleProcessor extends Base_ModuleObject {

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
   * @summary hits the add/edit API after validation succeeds
   */
    SaveData(objContext, blnClose = false) {
        let objValidationObject = this.Validate(objContext);
        if (!objValidationObject) {
            let objFinalData = {
                ...objContext.state.objData,
                "t_TestDrive_Member_Teacher_School": objContext.state.objData.t_TestDrive_Member_Teacher_School?.filter(objTemp => objTemp["uTeacherSchoolId"] || objTemp["cIsDeleted"] == "N")

            };
            if (objContext.state.objData["uTeacherId"] && objContext.state.objData["uTeacherId"] != "") {
                Object_Intranet_Member_TeacherManagement_Module.EditTeacherManagmentData({ "Params": { "vEditData": [objFinalData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId } }, (objReturn) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn["Object_Intranet_Member_TeacherManagement_Module"][0] } });
                    objContext.props.events.OnAddEditcomplete(objReturn["Object_Intranet_Member_TeacherManagement_Module"][0], "Edit");
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TeacherManagementGrid": [objReturn["Object_Intranet_Member_TeacherManagement_Module"][0]] });
                    }
                });
            }
            else {
                Object_Intranet_Member_TeacherManagement_Module.AddTeacherManagmentData({ "Params": { "vAddData": objFinalData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId } }, (objReturn) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn["Object_Intranet_Member_TeacherManagement_Module"][0] } });
                    objContext.props.events.OnAddEditcomplete(objReturn["Object_Intranet_Member_TeacherManagement_Module"][0], "Add");
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    this.ResetGridSelection("TeacherManagementGrid");
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
    * @param {*} objChangeData selected object of the DropDown
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
     * @name HandleSubTableDropDownChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {*} objChangeData selected object of the dropdown
     * @param {*} props takes props
     * @param {*} objContext takes objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    HandleSubTableDropDownChange(strAttributeName, objChangeData, props, objContext) {
        let strCellName = props.Meta["ValueColumn"];
        let strValue = objChangeData[strCellName];
        let objNewData = {};
        if (strCellName == "iStateId") {
            objNewData = [{ ...objContext.state.objData["t_TestDrive_Member_Teacher_School"][0], [strCellName]: strValue, "uSchoolId": -1 }];
        }
        else if (strCellName == "uSchoolId") {
            objNewData = [{ ...objContext.state.objData["t_TestDrive_Member_Teacher_School"][0], [strCellName]: strValue }];
            if (strValue != -1) {
                var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditTeacherManagement_MetaData.GetMetaData(), objContext.props.Resource.Text, objNewData[0], strCellName, false, "", "", true)
                FieldValidator.ValidateFocus("ValidationError", objNewValidationObject, strCellName);
            }
        }
        else {
            objNewData = [{ ...objContext.state.objData["t_TestDrive_Member_Teacher_School"][0], [strCellName]: strValue }];
        }
        let objNewDropDownData = strCellName == "uSchoolId" ? { ...objContext.state.objData, ["t_TestDrive_Member_Teacher_School"]: objNewData, "uSchoolId": strValue } : { ...objContext.state.objData, ["t_TestDrive_Member_Teacher_School"]: objNewData };
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewDropDownData } });
    }

    /**
     * @name HandleStateSchoolChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of Value for Checkbox
     * @param {number} intRowIndex takes RowIndex
     * @param {object} objContext takes objContext
     * @summary Handles CheckBox event for each School/State row.
     */
    HandleStateSchoolChange(strAttributeName, strValue, intRowIndex, objContext) {
        let arrNewt_TestDrive_Member_Teacher_School = objContext.state.objData["t_TestDrive_Member_Teacher_School"]?.map((objTemp, intIndex) => {
            if (intRowIndex == intIndex) {
                if (strAttributeName == "uSchoolId")
                    return { ...objTemp, [strAttributeName]: strValue };
                else
                    return { ...objTemp, [strAttributeName]: strValue, "uSchoolId": -1 };
            }
            else
                return objTemp;
        });
        this.ValidateTeacherSchoolSubTable(objContext, true, strAttributeName, strValue, intRowIndex);
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objContext.state.objData, ["t_TestDrive_Member_Teacher_School"]: arrNewt_TestDrive_Member_Teacher_School } } });
    }

    /**
     * @name AddStateSchoolRow
     * @param {object} objContext takes objContext
     * @summary Handles event to Add a new School/State row.
     */
    AddStateSchoolRow(objContext) {
        //let intInvalidIndex = objContext.state.objData["t_TestDrive_Member_Teacher_School"]?.findIndex(objTeacherSchool => objTeacherSchool["cIsDeleted"] == "N" && (objTeacherSchool["iStateId"] == -1 || objTeacherSchool["uSchoolId"] == -1));
        if (!this.ValidateTeacherSchoolSubTable(objContext)) {
           
        
            //Add a new TeacherSchool entry
            let arrNewt_TestDrive_Member_Teacher_School = [
                ...objContext.state.objData["t_TestDrive_Member_Teacher_School"],
                {
                    "iIndex": (objContext.state.objData["t_TestDrive_Member_Teacher_School"].length),
                    "uSchoolId": -1,
                    "iStateId": -1,
                    "cIsTestSchool": "N",
                    "cIsStellwerk":"N",
                    "cIsDeleted": "N"
                }
            ];
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objContext.state.objData, ["t_TestDrive_Member_Teacher_School"]: arrNewt_TestDrive_Member_Teacher_School } } });
        }
    }

    ValidateTeacherSchoolSubTable(objContext, blnOnChangeValidation, strAttributeName, strValue, intRowIndex) {
        if (!blnOnChangeValidation) {
            let intInvalidIndex = objContext.state.objData["t_TestDrive_Member_Teacher_School"]?.findIndex(objTeacherSchool => objTeacherSchool["iStateId"] == -1 || objTeacherSchool["uSchoolId"] == -1);
            if (intInvalidIndex > -1) {
                let objTeacherSchool = objContext.state.objData["t_TestDrive_Member_Teacher_School"][intInvalidIndex];
                if (objTeacherSchool["iStateId"] == -1) {
                    let domColumn = document.getElementById("iStateId_" + intInvalidIndex);
                    if (domColumn)
                        domColumn.classList.add("error-field");
                }
                if (objTeacherSchool["uSchoolId"] == -1) {
                    let domColumn = document.getElementById("uSchoolId_" + intInvalidIndex);
                    if (domColumn)
                        domColumn.classList.add("error-field");
                }
            }
            return (intInvalidIndex > -1);
        }
        else {
            if (strValue != -1) {
                let domColumn = document.getElementById(strAttributeName + "_" + intRowIndex);
                if (domColumn)
                    domColumn.classList.remove("error-field");
            }            
        }
    }

    /**
     * @name RemoveStateSchoolRow
     * @param {number} intRowIndex RowIndex
     * @param {object} objContext takes objContext
     * @summary Handles event to Remove a new School/State row.
     */
    RemoveStateSchoolRow(intRowIndex, objContext) {
        if (objContext.state.objData["t_TestDrive_Member_Teacher_School"]?.filter(objTeacherSchool => objTeacherSchool["cIsDeleted"] == "N").length > 1) { //&& (objTeacherSchool["iIndex"] != intRowIndex || objTeacherSchool["iStateId"] != -1 || objTeacherSchool["uSchoolId"] != -1)
            let arrNewt_TestDrive_Member_Teacher_School = objContext.state.objData["t_TestDrive_Member_Teacher_School"]?.map((objTemp, intIndex) => { //objTeacherSchool["iIndex"] == intRowIndex &&
                if (intRowIndex == intIndex) {
                    return { ...objTemp, "cIsDeleted": "Y" };
                }
                else
                    return objTemp;
            });
            arrNewt_TestDrive_Member_Teacher_School = arrNewt_TestDrive_Member_Teacher_School?.filter(objTeacherSchool => !((objTeacherSchool["iStateId"] == -1 || objTeacherSchool["uSchoolId"] == -1) && objTeacherSchool["cIsDeleted"] == "Y"));
            //let arrNewt_TestDrive_Member_Teacher_School = objContext.state.objData["t_TestDrive_Member_Teacher_School"]?.filter((_, intIndex) => intRowIndex != intIndex);
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objContext.state.objData, ["t_TestDrive_Member_Teacher_School"]: arrNewt_TestDrive_Member_Teacher_School } } });
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
        let blnTeacherSchoolValidation = this.ValidateTeacherSchoolSubTable(objContext);
        if (blnTeacherSchoolValidation) {
            objNewValidationObject = { ...objNewValidationObject, "uSchoolId" : "Invalid" }
        };
        
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
        //var objNewValidationObject = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
        //FieldValidator.ValidateFocus("ValidationError", objNewValidationObject, strColumnName);
    }

    /**
     * @name ValidateOnBlur
     * @param {object} objContext takes objContext
     * @param {string} strColumnName strColumnName
     * @summary Validates onBlur event of field after click of Save
     */
    ValidateOnBlur(strColumnName, objContext) {
        if (objContext.state.blnSaveClicked) {
            FieldValidator.ValidateClientSide(AddEditTeacherManagement_MetaData.GetMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, false, "", "", true)
        }
    }

    /**
     * @name OnStateDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the State Dropdown Data on change of the state dropdown value
     */
    OnStateDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TeacherManagementGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "strStateId": objChangeData["iStateId"] } });
    };
}
export default AddEditTeacherManagement_ModuleProcessor;
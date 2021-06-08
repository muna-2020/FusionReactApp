import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher'

//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';
import Base_ModuleObject from '@shared/Framework/BaseClass/Base_ModuleProcessor';
import Object_Intranet_Member_ClassManagement_Module from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/ClassManagement_Module';

class AddEditClassManagment_ModuleProcessor extends Base_ModuleObject {

    /**
     * @name LoadSelectedStateSchools
     * @param {object} objContext Context Object
     * @summary To set state data after the load is complete.
     */
    LoadSelectedStateSchools(objContext, strStateId) {
        let objSchoolParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": strStateId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "vSchoolName": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": ["uSchoolId", "vSchoolName", "iStateId", "cIsTestSchool", "cIsDeleted","cIsStellwerk"]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_School_School.GetData(objSchoolParam, (objReturnData) => {
            let arrSchoolData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSchoolData": arrSchoolData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true);
    }

    /**
     * @name LoadSelectedStateSchools
     * @param {object} objContext Context Object
     * @summary To set state data after the load is complete.
     */
    LoadSelectedSchoolTeacher(objContext, uSchoolId) {
        let objTeacherParam = {
            "SearchQuery": {
                "must": [
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Teacher_School",
                            "query": {
                                "bool": {
                                    "must": [{
                                        "match": {
                                            "t_TestDrive_Member_Teacher_School.uSchoolId": uSchoolId
                                        }
                                    },
                                    {
                                        "match": {
                                            "t_TestDrive_Member_Teacher_School.cIsDeleted": "N"
                                        }
                                    }]
                                }
                            }
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "vName": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["uTeacherId", "vName", "uSchoolId", "cIsDeleted"]
        }
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_Teacher_Teacher.GetData(objTeacherParam, (objReturnData) => {
            let arrTeacherData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTeacherData": arrTeacherData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true);
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
        if (strAttributeName == "cIsTestSchool" || strAttributeName == "cIsStellwerk") {
            let objNewDropDownData = { ...objNewData, ["t_TestDrive_Member_Class_Teacher"]: [{ ...objNewData["t_TestDrive_Member_Class_Teacher"][0], "uSchoolId": -1, "uTeacherId": -1 }] }
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewDropDownData } });
        }
        else {
            //let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
        }
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
            //let arrParams = [];
            if (objContext.state.objData["uClassId"] && objContext.state.objData["uClassId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Intranet_Member_ClassManagement_Module.AddClassManagmentData({ "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, "Put", ((objReturn) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn["Object_Intranet_Member_ClassManagement_Module"]["Data"][0] } });
                    objContext.props.events.OnAddEditcomplete(objReturn["Object_Intranet_Member_ClassManagement_Module"]["Data"][0], "Edit");
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ClassManagementGrid": [objReturn["Object_Intranet_Member_ClassManagement_Module"]["Data"][0]] });
                    }
                }));
            } else {

                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Intranet_Member_ClassManagement_Module.AddClassManagmentData({ "vAddData": objContext.state.objData, "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId }, "Post", ((objReturn) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn["Object_Intranet_Member_ClassManagement_Module"]["Data"][0] } });
                    objContext.props.events.OnAddEditcomplete(objReturn["Object_Intranet_Member_ClassManagement_Module"]["Data"][0], "Add");
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ClassManagementGrid": null });
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ClassManagementGrid": objReturn["Object_Intranet_Member_ClassManagement_Module"]["Data"][0] });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    //this.ResetGridSelection("ClassManagementGrid");
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                    }
                }));
            }
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
        }
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
            objNewData = [{ ...objContext.state.objData["t_TestDrive_Member_Class_Teacher"][0], [strCellName]: strValue, "uSchoolId": -1, "uTeacherId": -1 }];
            this.LoadSelectedStateSchools(objContext, strValue);
        }
        else if (strCellName == "uSchoolId") {
            objNewData = [{ ...objContext.state.objData["t_TestDrive_Member_Class_Teacher"][0], [strCellName]: strValue, "uTeacherId": -1 }];
            this.LoadSelectedSchoolTeacher(objContext, strValue);
        }
        else {
            objNewData = [{ ...objContext.state.objData["t_TestDrive_Member_Class_Teacher"][0], [strCellName]: strValue }];
        }
        let objNewDropDownData = { ...objContext.state.objData, ["t_TestDrive_Member_Class_Teacher"]: objNewData }
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewDropDownData } });
    }

    /**
     * @name HandleDropDownChange
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary Validate
     * @returns {object} objNewValidationObject
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
export default AddEditClassManagment_ModuleProcessor;
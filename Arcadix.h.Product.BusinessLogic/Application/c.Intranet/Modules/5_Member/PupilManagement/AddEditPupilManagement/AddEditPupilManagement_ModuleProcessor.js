
class AddEditPupilManagement_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
            let arrParams = [];
            if (objContext.state.objData["uPupilId"] && objContext.state.objData["uPupilId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                arrParams = [...arrParams,
                {
                    "URL": "API/Intranet/Member/PupilManagement",
                    "Params": { "vEditData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId },
                    "MethodType": "Put"
                }
                ];
                ArcadixFetchData.Execute(arrParams, function (objReturn) {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    //objContext.props.events.onAddeditcomplete();
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "PupilManagementGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                ApplicationState.SetProperty("blnShowAnimation", true);
                arrParams = [...arrParams,
                {
                    "URL": "API/Intranet/Member/PupilManagement",
                    "Params": { "vAddData": [objContext.state.objData], "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId },
                    "MethodType": "Post"
                }
                ];
                ArcadixFetchData.Execute(arrParams, function (objReturn) {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "PupilManagementGrid": null });
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
        let objNewData = {}, objNewDropDownData = {};
        if (strCellName == "iStateId") {
            objNewData = [{ ...objContext.state.objData["t_TestDrive_Member_School_Pupil"][0], "iStateId": strValue, "uSchoolId": -1, "uTeacherId": -1, "uClassId": -1 }];
            objNewDropDownData = { ...objContext.state.objData, ["t_TestDrive_Member_School_Pupil"]: objNewData }
        }
        else if (strCellName == "uSchoolId") {
            objNewData = [{ ...objContext.state.objData["t_TestDrive_Member_School_Pupil"][0], "uSchoolId": strValue, "uTeacherId": -1, "uClassId": -1 }];
            objNewDropDownData = { ...objContext.state.objData, ["t_TestDrive_Member_School_Pupil"]: objNewData }
        }
        else if(strCellName == "uTeacherId"){
            objNewData = [{ ...objContext.state.objData["t_TestDrive_Member_Class_Teacher"][0], "uTeacherId": strValue, "uClassId": -1 }];
            objNewDropDownData = { ...objContext.state.objData, ["t_TestDrive_Member_Class_Teacher"]: objNewData }
        }
        else if (strCellName == "uClassId") {
            objNewData = [{ ...objContext.state.objData["t_TestDrive_Member_Class_Teacher"][0], "uClassId": strValue }];
            objNewDropDownData = { ...objContext.state.objData, ["t_TestDrive_Member_Class_Teacher"]: objNewData }
        }

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
export default AddEditPupilManagement_ModuleProcessor;
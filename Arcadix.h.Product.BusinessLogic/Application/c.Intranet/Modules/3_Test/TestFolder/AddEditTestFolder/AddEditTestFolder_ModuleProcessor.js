
//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Objects required for module.
import Object_Intranet_Test_TestFolder from '@shared/Object/c.Intranet/3_Test/TestFolder/TestFolder';

/**
 * @name AddEditTestFolder_ModuleProcessor
 * @summary Class for Add/Edit TestFolder module.
 */
class AddEditTestFolder_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
    * @name GetInitilaData 
    * @param {object} objContext takes objContext
    * @summary Creates Initial data - objAddData for the module
    */
    GetInitilaData(objContext) {
        let objAddData = {
            "uUserId": objContext.props.Data.ClientUserDetails.UserId,
            "iTestParentFolderId": objContext.props.Data.objRowData["iTestFolderId"],
            "cIsForInternalTesting": objContext.props.Data.objRowData.iTestFolderId != 0 ? objContext.props.Data.objRowData.cIsForInternalTesting : "N",
            "t_TestDrive_FileSystem_TestFolder_Language": objContext.props.Data.objRowData.iTestFolderId != 0 ? objContext.props.Data.objRowData.t_TestDrive_FileSystem_TestFolder_Language : []
        }
        return objAddData;
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
    * @name IsLanguageAdded
    * @param {string} strLanguageId consists of value of the LangaugeId
    * @param {object} objContext takes objContext
    * @summary Checks if Langauge is present for checkbox.
    */
    IsLanguageAdded(strLanguageId, objContext) {
        let arrt_TestDrive_FileSystem_TestFolder_Language = objContext.state.objData.t_TestDrive_FileSystem_TestFolder_Language ? objContext.state.objData.t_TestDrive_FileSystem_TestFolder_Language : [];
        let blnLanguageAdded = arrt_TestDrive_FileSystem_TestFolder_Language.filter(objt_TestDrive_FileSystem_TestFolder_Language => { return objt_TestDrive_FileSystem_TestFolder_Language.iLanguageId == strLanguageId }).length > 0;
        return blnLanguageAdded;
    }

    /**
    * @name HandleCheckBoxClick
    * @param {string} strLanguageId consists of value of the LangaugeId
    * @param {object} objContext takes objContext
    * @summary Handels checkbox click of Langauge component.
    */
    HandleCheckBoxClick(strLanguageId, objContext) {
        let arrt_TestDrive_FileSystem_TestFolder_Language = objContext.state.objData.t_TestDrive_FileSystem_TestFolder_Language ? objContext.state.objData.t_TestDrive_FileSystem_TestFolder_Language : [];
        let blnLanguageAdded = arrt_TestDrive_FileSystem_TestFolder_Language.filter(objt_TestDrive_FileSystem_TestFolder_Language => { return objt_TestDrive_FileSystem_TestFolder_Language.iLanguageId == strLanguageId }).length > 0;
        var arr_New_t_TestDrive_FileSystem_TestFolder_Language;
        if (blnLanguageAdded && objContext.state.objData.t_TestDrive_FileSystem_TestFolder_Language.length > 1) {
            arr_New_t_TestDrive_FileSystem_TestFolder_Language = arrt_TestDrive_FileSystem_TestFolder_Language.filter(objt_TestDrive_FileSystem_TestFolder_Language => { return objt_TestDrive_FileSystem_TestFolder_Language.iLanguageId != strLanguageId })
        }
        else if (!blnLanguageAdded) {
            arr_New_t_TestDrive_FileSystem_TestFolder_Language = [...arrt_TestDrive_FileSystem_TestFolder_Language, { ["iLanguageId"]: strLanguageId }]
        }
        if (arr_New_t_TestDrive_FileSystem_TestFolder_Language) {
            let objNewData = { ...objContext.state.objData, ["t_TestDrive_FileSystem_TestFolder_Language"]: arr_New_t_TestDrive_FileSystem_TestFolder_Language };
            objContext.dispatch({ type: "SET_STATE", payload: { objData: objNewData } });
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
            if (objContext.state.objData["iTestFolderId"] && objContext.state.objData["iTestFolderId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Intranet_Test_TestFolder.EditData({ "vEditData": objContext.state.objData }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        ApplicationState.SetProperty("FolderId", objReturn[0].iTestFolderId);
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestGrid": [objReturn[0]] });
                        let objSelectedNode = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
                        ApplicationState.SetProperty("SelectedNode", { ...objSelectedNode, "Tree_Master": objReturn[0] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                Object_Intranet_Test_TestFolder.AddData({ "vAddData": objContext.state.objData }, (objReturn, cIsNewData) => {
                    ApplicationState.SetProperty("FolderId", objReturn[0].iTestFolderId);
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestGrid": null });
                    let objSelectedNode = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
                    ApplicationState.SetProperty("SelectedNode", { ...objSelectedNode, "Tree_Master": objReturn[0] });
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

export default AddEditTestFolder_ModuleProcessor;
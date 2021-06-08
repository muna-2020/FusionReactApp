
//Base classes.
import * as CockpitBase_Form from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Form';
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';


/**
 * @name AddEditTopic_ModuleProcessor
 * @summary Class for Add/Edit Topic module.
 */
class AddEditTopic_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multilanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = CockpitBase_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
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
        let objData = { ...objContext.state.objData, uUserId: "C4169B9B-C177-4BD5-BB6C-3C97B462EEC3" };  //Client user details is coming as an empty object for cockpit which is why user id is hardcoaded
        console.log("objData", objData);
        if (!objValidationObject) {
            let strFilterKey = "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + objContext.props.Data.intSubjectId;
            if (objContext.state.objData["uFeedbackThresholdTopicId"] && objContext.state.objData["uFeedbackThresholdTopicId"] != "") {
                objContext.props.Data.Object_Intranet_Taxonomy_FeedbackThresholdTopic.EditData({
                    "vEditData": [objData],
                    "ForeignKeyFilter": {
                        "iSubjectId": objContext.props.Data.intSubjectId
                    }
                }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TopicGrid": [objReturn[0]] });
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                objContext.props.Data.Object_Intranet_Taxonomy_FeedbackThresholdTopic.AddData({
                    "vAddData": objData,
                    "ForeignKeyFilter": {
                        "iSubjectId": objContext.props.Data.intSubjectId
                    }
                }, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0]} });
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TopicGrid": null });
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
        let objNewData = CockpitBase_Form.HandleChange(objContext, strAttributeName, strValue, "objData");
        //objContext.dispatch({ type: "SET_STATE", payload: { "arrHelpGroup": objContext.props.Data.DropdownData.uHelpGroupId.filter(x => x.iApplicationTypeId == objChangeData["iApplicationTypeId"]) } });
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
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
        var objNewValidationObject = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError", "", true);
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
export default AddEditTopic_ModuleProcessor;
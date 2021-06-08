//Base classes.
import * as CockpitBase_Form from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Form';
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Framework_Services_Tip from '@shared/Object/a.Framework/Services/Tip/Tip';

/**
 * @name AddEditTip_ModuleProcessor
 * @summary Class for Add/Edit Tip module.
 */
class AddEditTip_ModuleProcessor extends CockpitBase_ModuleProcessor {

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
        let objData = { ...objContext.state.objData, uUserId: "4D8E8FEE-5D62-4422-810E-9072FB82689B" };  //Client user details is an empty object for cockpit
        console.log("objData", objData);
        if (!objValidationObject) {
            if (objContext.state.objData["uTipId"] && objContext.state.objData["uTipId"] != "") {
                Object_Framework_Services_Tip.EditData({ "vEditData": objData }, (objReturn, cIsNewData) => {
                    let objEditData = { ...objReturn[0], "dtTipDate": objContext.AddEditTip_ModuleProcessor.GetDateText(objReturn[0].dtTipDate) };
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objEditData } });
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");

                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TipGrid": [objReturn[0]] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                Object_Framework_Services_Tip.AddData({ "vAddData": objData }, (objReturn, cIsNewData) => {
                    let objEditData = { ...objReturn[0], "dtTipDate": objContext.AddEditTip_ModuleProcessor.GetDateText(objReturn[0].dtTipDate) };
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objEditData } });
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");

                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TipGrid": null });
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

    /**
     * @name GetDateText
     * @param {String} strDate Passed date 
     * @summary Formats the passed date in dd.mm.yyyy
     * @returns {String} formated date
     */
    GetDateText(strDate) {
        //let strYear = strDate.split(".")[2];
        //if (strYear && strYear.length == 4) {
        let objDay = new Date(strDate);
        let strDay = objDay.getDate();
        let strMonth = objDay.getMonth() + 1; //January is 0!
        let strYear = objDay.getFullYear();

        strDay = strDay < 10 ? '0' + strDay : strDay;
        strMonth = strMonth < 10 ? '0' + strMonth : strMonth;

        return strDay + '.' + strMonth + '.' + strYear;
        //} else {
        //    return strCellColumnData;
        //}
    }
}
export default AddEditTip_ModuleProcessor;
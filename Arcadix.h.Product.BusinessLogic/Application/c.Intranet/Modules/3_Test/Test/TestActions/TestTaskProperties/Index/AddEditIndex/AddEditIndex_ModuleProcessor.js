//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';


/**
* @name AddEditIndex_ModuleProcessor
* @param NA
* @summary Class for Add/Edit Language module.
*/
class AddEditIndex_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
        let objTestTaskParams = {
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uTestId": objContext.state.objData.uTestId
                        }
                    }
                ]
            },
            "vEditData": [objContext.state.objData],
            "uTestId": objContext.state.objData.uTestId
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        //ArcadixFetchData.ExecuteSingle("API/Object/Intranet/Test/IntranetTestTask", objTestTaskParams, "Put", (objReturn, blnEdited) => {
        ArcadixFetchData.ExecuteSingle("API/Object/Intranet/Test/IntranetTestTask", objTestTaskParams, "Put", (objReturn, blnEdited) => {
            var objTextResource = objContext.props.Resource.Text;
            var vTaskIndexDisplayText = objTextResource["TaskIndexDisplay"].filter(obj => obj["iTaskIndexDisplayId"] == objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.state.objData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == objContext.state.objData.iTestTaskId)[0]["iTaskIndexDisplayId"]);
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.state.objData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == objContext.state.objData.iTestTaskId)[0], "inewOrderId": objContext.state.objData.inewOrderId, "PageName": objContext.state.objData["PageName"], "PageType": "Test", "vTaskIndexDisplayText": vTaskIndexDisplayText.length > 0 ? vTaskIndexDisplayText[0]["vTaskIndexDisplayText"] : "" } } });
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "IndexGrid": [{ ...objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.state.objData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == objContext.state.objData.iTestTaskId)[0], "inewOrderId": objContext.state.objData.inewOrderId, "PageName": objContext.state.objData["PageName"], "PageType": "Test", "vTaskIndexDisplayText": vTaskIndexDisplayText.length > 0 ? vTaskIndexDisplayText[0]["vTaskIndexDisplayText"] : "" }] });
            objContext.props.events.oneditcomplete();
            if (blnClose) {
                    Popup.ClosePopup(objContext.props.Id);
            }
        })

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
     * @name ValidateFocus
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary hits the add/edit api after validation succeeds
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }

   
}
export default AddEditIndex_ModuleProcessor;
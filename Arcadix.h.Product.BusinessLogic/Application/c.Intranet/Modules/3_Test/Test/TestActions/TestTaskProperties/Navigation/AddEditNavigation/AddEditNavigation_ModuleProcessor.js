//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';


/**
* @name AddEditNavigation_ModuleProcessor
* @param NA
* @summary Class for Add/Edit Language module.
*/
class AddEditNavigation_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
        ArcadixFetchData.ExecuteSingle("API/Object/Intranet/Test/IntranetTestTask", objTestTaskParams, "Put", (objReturn, blnEdited) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.state.objData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == objContext.state.objData.iTestTaskId)[0], "inewOrderId": objContext.state.objData.inewOrderId, "PageName": objContext.state.objData["PageName"], "PageType": "Test" } } });
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "NavigationGrid": [{ ...objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.state.objData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == objContext.state.objData.iTestTaskId)[0], "inewOrderId": objContext.state.objData.inewOrderId, "PageName": objContext.state.objData["PageName"], "PageType": "Test" }] });
            objContext.props.events.oneditcomplete();
            if (blnClose) {
                Popup.ClosePopup(objContext.props.Id);
            }
        })

    }


}
export default AddEditNavigation_ModuleProcessor;
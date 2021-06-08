//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';


/**
* @name AddEditTime_ModuleProcessor
* @param NA
* @summary Class for Add/Edit Language module.
*/
class AddEditTime_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
   * @name HandleUnlimitedTimeChange
   * @param {object} props passes props
   * @summary Get initial request params for the component.
   * @returns {object} return objDataCalls
   */
    HandleUnlimitedTimeChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objContext.state.objData, "iTaskTimeLimit": strValue == "Y" ? - 1 : objContext.state.objData["iTaskTimeLimit"] }, "cIsUnlimitedTime": strValue, "cIsDisable": strValue == "Y" ? "disabled" : "" } });
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
    * @name SaveData
    * @param {object} objContext takes objContext
    * @param {boolean} blnClose sends true when SaveAndClosed is pressed
    * @summary hits the add/edit api after validation succeeds
    */
    SaveData(objContext, blnClose = false) {
        let objValidationObject = this.Validate(objContext);
        if (!objValidationObject) {
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
                var objReturnSelectedData = objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.state.objData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == objContext.state.objData.iTestTaskId)[0]
                objContext.dispatch({ type: "SET_STATE", payload: { "objData": { ...objReturnSelectedData, "PageName": objContext.state.objData["PageName"], "PageType": "Test", "cIsUnlimitedTime": objReturnSelectedData["iTaskTimeLimit"] == -1 ? "Y" : "N", "iTaskTimeLimit": objReturnSelectedData["iTaskTimeLimit"] == -1 ? "" : objReturnSelectedData["iTaskTimeLimit"], ["uTestId"]: objContext.state.objData.uTestId } } });
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TimeGrid": [{ ...objReturnSelectedData, "PageName": objContext.state.objData["PageName"], "PageType": "Test", "cIsUnlimitedTime": objReturnSelectedData["iTaskTimeLimit"] == -1 ? "Y" : "N", "iTaskTimeLimit": objReturnSelectedData["iTaskTimeLimit"] == -1 ? "" : objReturnSelectedData["iTaskTimeLimit"], "uTestId": objContext.state.objData.uTestId }] });
                objContext.props.events.oneditcomplete();
                if (blnClose) {
                    Popup.ClosePopup(objContext.props.Id);
                }
            })

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
export default AddEditTime_ModuleProcessor;
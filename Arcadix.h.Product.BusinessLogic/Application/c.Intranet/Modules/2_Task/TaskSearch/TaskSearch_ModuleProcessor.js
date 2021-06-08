
/**
* @name TaskSearch_ModuleProcessor
* @summary Class for Task module display.
*/
class TaskSearch_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return [
            { "StoreKey": "ApplicationState", "DataKey": "FolderId" },
        ];
    }

    GetSearchDropDownData(objContext) {
        let objTextResource = objContext.props.Resource.Text;
        var arrDropDownData = [
            {
                "OptionId": 1,
                "OptionText": objTextResource["This_Folder"]
            },
            {
                "OptionId": 0,
                "OptionText": objTextResource["All_Folder"]
            }
        ]
        return arrDropDownData;
    }

    HandleChange(objContext, objValue, strType) {
        switch (strType) {
            case "SearchInput":
                objContext.dispatch({ type: "SET_STATE", payload: { "strSearchText": objValue, "blnSearchMode": false } });
                break;
            case "SearchOption":
                objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchFromSameFolder": Boolean(Number(objValue["OptionId"])), "blnSearchMode": false } });
                break;
            case "WorkFlowStatus":
                objContext.dispatch({ type: "SET_STATE", payload: { "struWorkflowStatusId": objValue["uWorkflowStatusId"], "blnSearchMode": false } });
                break;
            case "InternalTesting":
                objContext.dispatch({ type: "SET_STATE", payload: { "blnInternalTesting": objValue, "blnSearchMode": false } });
                break;
        }
    }

    Search(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": true } });
        objContext.props.Events.Search(objContext.state);
    }

    SearchCancel(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": false, "strSearchText": "", "blnSearchFromSameFolder": true, "struWorkflowStatusId": -1, "blnInternalTesting": false } });
        objContext.props.Events.SearchCancel();
    }


    /**
   * @name CreateItemEventHandler
   * @param {*} objItem objItem
   * @summary   To filter the dropdown data based on the condition
   * @return {bool} boolean
   */
    CreateItemEventHandler(objItem) {
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
        }
    }
}

export default TaskSearch_ModuleProcessor;
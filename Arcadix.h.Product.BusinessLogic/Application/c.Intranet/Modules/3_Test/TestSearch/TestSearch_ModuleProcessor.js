//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

/**
* @name TestSearch_ModuleProcessor
* @summary Class for Test module display.
*/
class TestSearch_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
    
    /**
     * @name GetSearchDropDownData
     * @param {object} objContext Context Object
     * @summary To get content for Folder type dropdown.
     */
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
        
    /**
     * @name GetTestTypeDropDownData
     * @param {object} objContext Context Object
     * @summary To get content for Test type dropdown.
     */
    GetTestTypeDropDownData(objContext) {
        let objTextResource = objContext.props.Resource.Text;

        var arrDropDownData = [
            {
                "OptionId": 1,
                "OptionText": Localization.TextFormatter(objTextResource, "HighStake")
            },
            {
                "OptionId": 3,
                "OptionText": Localization.TextFormatter(objTextResource, "Learn")

            },
            {
                "OptionId": 2,
                "OptionText": Localization.TextFormatter(objTextResource, "LowStake")
            },
            {
                "OptionId": 4,
                "OptionText": Localization.TextFormatter(objTextResource, "Survey")
            },
            {
                "OptionId": 7,
                "OptionText": Localization.TextFormatter(objTextResource, "Demo")
            },
            {
                "OptionId": 6,
                "OptionText": Localization.TextFormatter(objTextResource, "Presentation")
            },
            {
                "OptionId": 0,
                "OptionText": Localization.TextFormatter(objTextResource, "ShowCase") + " (-NI-)"
            },
            {
                "OptionId": 0,
                "OptionText": Localization.TextFormatter(objTextResource, "PaperPencil") + " (-NI-)"
            },
            {
                "OptionId": 0,
                "OptionText": Localization.TextFormatter(objTextResource, "WrapperTest") + " (-NI-)"
            }
        ]
        return arrDropDownData;
    }

    /**
     * @name HandleChange
     * @param {object} objContext Context Object
     * @param {object} objValue selected value Object
     * @param {string} strType selected strType
     * @summary Handles changes in TestSearch component.
     */
    HandleChange(objContext, objValue, strType) {
        switch (strType) {
            case "SearchInput":
                objContext.dispatch({ type: "SET_STATE", payload: { "strSearchText": objValue, "blnSearchMode": false } });
                break;
            case "SearchOption":
                objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchFromSameFolder": Boolean(Number(objValue["OptionId"])), "blnSearchMode": false } });
                break;
            case "TestType":
                objContext.dispatch({ type: "SET_STATE", payload: { "strTestUsageId": objValue["OptionId"], "blnSearchMode": false } });
                break;
            case "InternalTesting":
                objContext.dispatch({ type: "SET_STATE", payload: { "blnInternalTesting": objValue, "blnSearchMode": false } });
                break;
        }
    }

    /**
     * @name Search
     * @param {object} objContext Context Object
     * @summary Handles Search button click event.
     */
    Search(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": true } });
        objContext.props.Events.Search(objContext.state);
    }
    
    /**
     * @name HandleChange
     * @param {object} objContext Context Object
     * @summary Handles Search Cancel click event
     */
    SearchCancel(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": false, "strSearchText": "", "blnSearchFromSameFolder": true, "strTestUsageId": -1, "blnInternalTesting": false } });
        objContext.props.Events.SearchCancel();
    }
}

export default TestSearch_ModuleProcessor;
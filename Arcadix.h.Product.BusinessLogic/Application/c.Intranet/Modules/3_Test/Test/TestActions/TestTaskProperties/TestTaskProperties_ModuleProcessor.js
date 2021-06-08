
//Objects required for module.
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Task_TaskIndexDisplay from '@shared/Object/c.Intranet/2_Task/Task/TaskIndexDispaly/TaskIndexDispaly';
import Object_Intranet_Test_TestProgressDisplay from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/TestProgressDisplay/TestProgressDisplay';
import Intranet_Test_TestTaskProperties_Module from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/TestTaskProperties_Module';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';



/**
* @name TestTaskProperties_ModuleProcessor
* @param NA
* @summary Class for Test module display.
* @return NA
*/
class TestTaskProperties_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/TestTaskProperties",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Cockpit_Language", "Object_Intranet_Task_TaskIndexDisplay","Object_Intranet_Test_TestProgressDisplay"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        this.GetTestTaskPropeties(objContext);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        // Subject
        Object_Intranet_Taxonomy_Subject.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        Object_Intranet_Task_TaskIndexDisplay.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskIndexDisplay];

        Object_Intranet_Test_TestProgressDisplay.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_TestProgressDisplay];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        
        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/3_Test/TestTaskProperties"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
* @name GetDynamicStlyes
* @param {object} props props
* @returns {object} DynamicStlyes
*/
    GetTestTaskPropeties(objContext) {
        let objTestTaskParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uTestId": objContext.props.Data.TestData.uTestId
                        }
                    }
                ]
            },
            "iSubjectId": objContext.props.Data.TestData.iSubjectId
        };
        ApplicationState.GetProperty("blnShowAnimation", true);
        Intranet_Test_TestTaskProperties_Module.GetAssignTaskToTestData(objTestTaskParams, (objData) => {
            ApplicationState.SetProperty("blnShowAnimation", true);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrtasktotestData": objData["AssignedTasks"].map(obj => { return { ...obj, ["vAction"]: "Edit" } }) } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

/**
 * @name GetGridData
 * @param {object} props passes props
 * @summary Get initial request params for the component.
 * @returns {object} return objDataCalls
 */
    GetDataForGrid(objContext,objReturn) {
        let objTestTaskParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uTestId": objContext.props.Data.TestData.uTestId
                        }
                    }
                ]
            },
            "iSubjectId": objContext.props.Data.TestData.iSubjectId
        };
        Intranet_Test_TestTaskProperties_Module.GetAssignTaskToTestData(objTestTaskParams, (objData) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "arrtasktotestData": objData["AssignedTasks"].map(obj => { return { ...obj, ["vAction"]: "Edit" } }) } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
        
    }

    /**
 * @name GetDynamicStlyes
 * @param {object} props props
 * @returns {object} DynamicStlyes
 */
    GetDynamicStlyes(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css"
        ];
    }

}

export default TestTaskProperties_ModuleProcessor;
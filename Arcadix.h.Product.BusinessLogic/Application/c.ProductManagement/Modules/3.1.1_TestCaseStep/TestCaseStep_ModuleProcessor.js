import Object_DevServer_ProductManagement_TestCaseStep from '@shared/Object/c.ProductManagement/TestCase/TestCaseStep/TestCaseStep';

/**
 * @name TestCase_ModuleProcessor
 * @param NA
 * @summary Class for DevLinkRefresh module display.
 * @return NA
 */
class TestCase_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_DevServer_ProductManagement_TestCaseStep",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3.1.1.TestCaseStep/TestCaseStep"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];   

        let objTestCaseParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uTestCaseId": props.Data.uTestCaseId
                        }
                    }
                ]
            }
        };

        Object_DevServer_ProductManagement_TestCaseStep.Initialize(objTestCaseParams);
        //Object_DevServer_ProductManagement_TestCaseStep.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_TestCaseStep]

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/3.1.1.TestCaseStep/TestCaseStep"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1.1.TestCaseStep/TestCaseStep", objContext.props)
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
     * @name OnClickRow
     * @param {object} objSelectedRow
     * @param {object} objContext
     * @summary Handles the click event of the grid.
     */
    OnClickRow(objSelectedRow, objContext) {
        var BreadCrumbNavigation = ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"][0]["vFolderName"] + ":" + ApplicationState.GetProperty("ActiveModuleName") + ":" + ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0]["vUseCaseName"] + ":" + ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"][0]["vTestCaseName"] + ":" + ApplicationState.GetProperty("SelectedRows")["TestCaseStepGrid"][0]["vTestCaseStepName"];
        ApplicationState.SetProperty("BreadCrumbNavigation", BreadCrumbNavigation);
    }


    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css"
        ]
    }
}

export default TestCase_ModuleProcessor;
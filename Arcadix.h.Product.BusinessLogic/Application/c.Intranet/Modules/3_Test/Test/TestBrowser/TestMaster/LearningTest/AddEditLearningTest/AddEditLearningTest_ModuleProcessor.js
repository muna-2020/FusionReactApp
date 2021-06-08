//Base classes.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
* @name AddEditLearningTest_ModuleProcessor
* @param NA
* @summary Class for Add/Edit Language module.
*/
class AddEditLearningTest_ModuleProcessor extends Base_AddEditTestMaster_ModuleProcessor {

    GetDefaultData(objContext) {
        let objDefaultData = {
            "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
            "iFolderId": ApplicationState.GetProperty("FolderId"),
            "iProviderId": 1,           
            "t_TestDrive_Test_TestProperty": [{
                "iTestUsageId": 3,
                "cIsAdaptiveTest": "N"               
            }]
        }      
        return objDefaultData;
    }   
}
export default AddEditLearningTest_ModuleProcessor;
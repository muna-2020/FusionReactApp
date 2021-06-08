//Base classes.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
* @name AddEditDemoTest_ModuleProcessor
* @param NA
* @summary Class for Add/Edit Language module.
*/
class AddEditDemoTest_ModuleProcessor extends Base_AddEditTestMaster_ModuleProcessor {

    GetDefaultData(objContext) {
        let objDefaultData = {
            "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
            "iFolderId": ApplicationState.GetProperty("FolderId"),            
            "t_TestDrive_Test_TestProperty": [{
                "iTestUsageId": 7,
               
            }]            
        }
        return objDefaultData;
    }       
}

export default AddEditDemoTest_ModuleProcessor;
//Base classes.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
* @name AddEditEssayTest_ModuleProcessor
* @param NA
* @summary Class for Add/Edit Language module.
*/
class AddEditEssayTest_ModuleProcessor extends Base_AddEditTestMaster_ModuleProcessor {

    GetDefaultData(objContext) {
        let objDefaultData = {
            "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
            "iFolderId": ApplicationState.GetProperty("FolderId"),
            "iSubjectId":0,            
            "iProviderId": 1,
            "cUseParentTestProperties": "N",
            "cIsAdaptiveTest": "N",
            "iNumberOfRepetitions": 1,
            "cPunishNegativeAnswers": "Y",          
            "cIsShowLoginPage": "Y",
            "uLoginControlId": "d4368789-95a6-4e23-bc77-a5b9baf0354a",
            "cIsSolutionAfterTask": "N",
            "cIsDemoTestActivityRecorded": "N",
            //---ResultOption
            "iResultPageCertificateProviderId": 1,
            "vCertificateTemplate": "TestTemplate",
            "cShowAdditionalResultStatus": "Y",
            "t_TestDrive_Test_Data": [],
            "t_TestDrive_Test_TestProperty": [{
              "iTestUsageId": 1               
            }],
            "t_TestDrive_Test_Language": [
                {
                    "iLanguageId": parseInt(objContext.props.Resource.JConfiguration.InterfaceLanguageId),
                    "cIsActivatedForTest":"N"
                }
            ],
            "t_TestDrive_Test_AssignedSchoolYear":[]
        }      
        return objDefaultData;
    }   
}
export default AddEditEssayTest_ModuleProcessor;
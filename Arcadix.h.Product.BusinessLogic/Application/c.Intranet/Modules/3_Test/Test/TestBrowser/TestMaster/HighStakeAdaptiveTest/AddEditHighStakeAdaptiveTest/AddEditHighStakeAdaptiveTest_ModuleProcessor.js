//Base classes.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
* @name AddEditHighStakeAdaptiveTest_ModuleProcessor
* @param NA
* @summary Class for Add/Edit Language module.
*/
class AddEditHighStakeAdaptiveTest_ModuleProcessor extends Base_AddEditTestMaster_ModuleProcessor {

    GetDefaultData(objContext) {
        let objDefaultData = {
            "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId,
            "iFolderId": ApplicationState.GetProperty("FolderId"),
            "iProviderId": 1,           
            "t_TestDrive_Test_TestProperty": [{
                "iTestUsageId": 1,
                "cIsAdaptiveTest": "Y"                
            }]
        }
        return objDefaultData;
    }   

    HandleAdaptivePropertyChange(strKey, strValue, objContext) {
        
        if (strKey == "vModel") {
            if (strValue == "Polytomous") {                
                let arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration = objContext.state.objData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.filter(objAdaptiveData => objAdaptiveData["vAttributeKey"] != strKey && objAdaptiveData["vAttributeKey"] != "vModelName");
                let arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration = [...arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration, { "vAttributeKey": strKey, "vValue": strValue }, { "vAttributeKey": "vModelName", "vValue": "GRM"}]
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_AdaptiveAlgorithmConfiguration": arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration } } })
            }
            if (strValue == "Dichotomous") {               
                let arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration = objContext.state.objData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.filter(objAdaptiveData => objAdaptiveData["vAttributeKey"] != strKey && objAdaptiveData["vAttributeKey"] != "vModelName");
                let arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration = [...arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration, { "vAttributeKey": strKey, "vValue": strValue }, { "vAttributeKey": "vModelName", "vValue": "1PL" }]
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_AdaptiveAlgorithmConfiguration": arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration } } })
            }
        }
        else {
            let arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration = objContext.state.objData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.filter(objAdaptiveData => objAdaptiveData["vAttributeKey"] != strKey);
            let arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration = [...arrt_TestDrive_Test_AdaptiveAlgorithmConfiguration, { "vAttributeKey": strKey, "vValue": strValue }]
            objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, "t_TestDrive_Test_AdaptiveAlgorithmConfiguration": arrNewt_TestDrive_Test_AdaptiveAlgorithmConfiguration } } })

        }    
    }

    IsPropertyChecked(strKey, strValue, objContext) {
        
        let objAdaptiveAlgorithmConfiguration = objContext.state.objData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.find(objAdaptiveData => objAdaptiveData["vAttributeKey"] == strKey);
        if (objAdaptiveAlgorithmConfiguration) {
            if (objAdaptiveAlgorithmConfiguration.vValue == strValue)
                return true;
            else
                return false;
        }
        return false;
    }

    GetAdaptivePropertyValue(strKey, objContext) {
        let objAdaptiveAlgorithmConfiguration = objContext.state.objData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.find(objAdaptiveData => objAdaptiveData["vAttributeKey"] == strKey);
        if (objAdaptiveAlgorithmConfiguration) {
            return objAdaptiveAlgorithmConfiguration.vValue;
        }
        return "";
    }
}
export default AddEditHighStakeAdaptiveTest_ModuleProcessor;
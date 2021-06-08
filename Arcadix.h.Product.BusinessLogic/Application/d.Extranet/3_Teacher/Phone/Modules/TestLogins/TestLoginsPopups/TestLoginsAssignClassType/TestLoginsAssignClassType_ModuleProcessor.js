//Base class imports
import TestLoginsAssignClassType_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLoginsPopups/TestLoginsAssignClassType/TestLoginsAssignClassType_ModuleProcessor';

/**
 * @name TestLoginsAssignClassType_ModuleProcessor
 * @summary module processor for Test logins.
 * */
class TestLoginsAssignClassType_ModuleProcessor extends TestLoginsAssignClassType_ModuleProcessor_Browser {

     /**
    * @name GetDynamicStyles
    * @summary Css files specific to this module
    * @param {any} props
    * @returns {Array}
    */
      GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/HighStakeTestLogins/HighStakeTestLoginsPopups/TestLoginsAssignClassType/TestLoginsAssignClassType.css"
        ];
    }
}

export default TestLoginsAssignClassType_ModuleProcessor
//Objects required for module.
import Login_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Login/Login_ModuleProcessor";

/**
 * @name Login_ModuleProcessor
 * @summary Class for Notes module display and manipulate.
 */
class Login_ModuleProcessor extends Login_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/Phone/LoginAndMaster/Login.css"
        ];
    }
}
export default Login_ModuleProcessor;
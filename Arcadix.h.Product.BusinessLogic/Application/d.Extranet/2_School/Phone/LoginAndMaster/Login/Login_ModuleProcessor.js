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
            //props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/LoginAndMaster/Login/Login.css",
            //props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css",
        ];
    }
}
export default Login_ModuleProcessor;
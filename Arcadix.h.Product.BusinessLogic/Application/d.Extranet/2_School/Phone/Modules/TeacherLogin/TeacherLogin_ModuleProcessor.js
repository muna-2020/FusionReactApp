//Base class imports
import TeacherLogin_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/TeacherLogin_ModuleProcessor";

/**
 * @name TeacherLogin_ModuleProcessor_Browser.
 * @summary business layer for teacher login.
 * */
class TeacherLogin_ModuleProcessor extends TeacherLogin_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/TeacherLogin/TeacherLogin.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/TeacherLogin/ErrorPopUp.css",
        ];
    }

}

export default TeacherLogin_ModuleProcessor;
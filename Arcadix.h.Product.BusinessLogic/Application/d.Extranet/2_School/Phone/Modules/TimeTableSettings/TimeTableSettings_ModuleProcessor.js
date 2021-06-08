//Base class imports
import TimeTableSettings_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSettings_ModuleProcessor";

/**
 * @name TeacherLogin_ModuleProcessor_Browser.
 * @summary business layer for teacher login.
 * */
class TimeTableSettings_ModuleProcessor extends TimeTableSettings_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/TimeTableSettings/TimeTableSettings.css"
        ];
    }

}

export default TimeTableSettings_ModuleProcessor;
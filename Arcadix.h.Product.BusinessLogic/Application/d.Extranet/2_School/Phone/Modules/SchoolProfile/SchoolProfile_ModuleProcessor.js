//Base class imports
import SchoolProfile_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/SchoolProfile/SchoolProfile_ModuleProcessor";

/**
 * @name Teacher_ModuleProcessor.
 * @summary business layer for teacher.
 * */
class SchoolProfile_ModuleProcessor extends SchoolProfile_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/SchoolProfile/SchoolProfile.css"
        ];
    }

}

export default SchoolProfile_ModuleProcessor;
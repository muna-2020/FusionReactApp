//Base class imports
import TeacherProfile_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherProfile/TeacherProfile_ModuleProcessor';

/**
* @name TeacherProfile_ModuleProcessor
* @summary Class for TeacherProfile module display and manipulate.
*/
class TeacherProfile_ModuleProcessor extends TeacherProfile_ModuleProcessor_Browser {   

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/TeacherProfile/TeacherProfile.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Blocks/FormGenerator/FormGenerator.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/DropDown/DropDown.css"
        ];
    }

   
}

export default TeacherProfile_ModuleProcessor;
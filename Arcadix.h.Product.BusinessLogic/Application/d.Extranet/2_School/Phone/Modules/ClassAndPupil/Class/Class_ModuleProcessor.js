//Base class imports
import Class_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/Class_ModuleProcessor";

/**
 * @name Class_ModuleProcessor.
 * @summary business layer for Pupil.
 * */
class Class_ModuleProcessor extends Class_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/ClassAndPupil/Class.css"
        ];
    }

}

export default Class_ModuleProcessor;
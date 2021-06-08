//Base class imports
import ClassAndPupil_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/ClassAndPupil_ModuleProcessor";

/**
 * @name ClassAndPupil_ModuleProcessor.
 * @summary business layer for ClassAndPupil.
 * */
class ClassAndPupil_ModuleProcessor extends ClassAndPupil_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/ClassAndPupil/ClassAndPupil.css"
        ];
    }

}

export default ClassAndPupil_ModuleProcessor;
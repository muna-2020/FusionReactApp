//Base class imports
import Pupil_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/Pupil_ModuleProcessor";

/**
 * @name Pupil_ModuleProcessor.
 * @summary business layer for Pupil.
 * */
class Pupil_ModuleProcessor extends Pupil_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/ClassAndPupil/Pupil.css"
        ];
    }

}

export default Pupil_ModuleProcessor;
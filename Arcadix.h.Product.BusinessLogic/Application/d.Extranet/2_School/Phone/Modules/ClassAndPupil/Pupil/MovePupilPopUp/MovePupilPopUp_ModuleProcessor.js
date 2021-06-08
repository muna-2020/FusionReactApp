//Base class imports
import MovePupilPopUp_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp_ModuleProcessor";

/**
 * @name MovePupilPopUp_ModuleProcessor.
 * @summary business layer for MovePupilPopUp.
 * */
class MovePupilPopUp_ModuleProcessor extends MovePupilPopUp_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/ClassAndPupil/MovePupilPopUp/MovePupilPopUp.css"
        ];
    }

}

export default MovePupilPopUp_ModuleProcessor;
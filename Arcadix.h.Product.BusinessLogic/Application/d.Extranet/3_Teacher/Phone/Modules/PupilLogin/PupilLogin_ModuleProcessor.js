//Base class imports
import PupilLogin_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/PupilLogin/PupilLogin_ModuleProcessor';

/**
* @name PupilLogin_ModuleProcessor
* @summary Class for TeacherProfile module display and manipulate.
*/
class PupilLogin_ModuleProcessor extends PupilLogin_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
     GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/PupilLogin/PupilLogin.css",

            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/PupilLogin/PupilLogin.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/ProgressBar/ProgressBar.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/PupilLogin/CreatePdfPopUp.css"
        ];
    }
}

export default PupilLogin_ModuleProcessor;
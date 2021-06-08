//Base class imports
import Master_ModuleProcessor_Browser from "@shared/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Master/Master_ModuleProcessor";

/**
 * @name Master_ModuleProcessor
 * @summary module processor for Master Page.
 * */
class Master_ModuleProcessor extends Master_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/LoginAndMaster/Master/Master.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDown/DropDown.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/Button/Button.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css"
        ];
    }
}

export default Master_ModuleProcessor;
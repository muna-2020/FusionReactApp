//Base class imports
import AssignClassType_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/AssignClassType/AssignClassType_ModuleProcessor';

/**
 * @name AssignClassType_ModuleProcessor
 * @summary Class for AssignClassType module display and manipulate.
 */
class AssignClassType_ModuleProcessor extends AssignClassType_ModuleProcessor_Browser {

    /**
     * @name GetDynamicStyles
     * @param {*} props props
     * @summary Gets dynamic styles for the component.
     * @returns {*} array
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/AssignClassType/AssignClassType.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css"
        ];
    };

}
export default AssignClassType_ModuleProcessor;
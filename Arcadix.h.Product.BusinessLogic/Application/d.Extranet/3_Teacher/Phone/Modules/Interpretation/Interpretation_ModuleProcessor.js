//Base class imports
import Interpretation_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/Interpretation/Interpretation_ModuleProcessor';

/**
 * @name Interpretation_ModuleProcessor
 * @summary Class for Interpretation_ModuleProcessor module display and manipulate.
 */
class Interpretation_ModuleProcessor extends Interpretation_ModuleProcessor_Browser {

    /**
     * @name GetDynamicStyles
     * @param {*} props props
     * @summary Gets dynamic styles for the component.
     * @returns {*} array
     */
     GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/Interpretation/Interpretation.css"
        ];
    };
}

export default Interpretation_ModuleProcessor;


//Base class imports
import Licenses_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/Licenses/Licenses_ModuleProcessor";

/**
 * @name Licenses_ModuleProcessor.
 * @summary business layer for Licenses.
 * */
class Licenses_ModuleProcessor extends Licenses_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/Licenses/Licenses.css"
        ];
    }

}

export default Licenses_ModuleProcessor;
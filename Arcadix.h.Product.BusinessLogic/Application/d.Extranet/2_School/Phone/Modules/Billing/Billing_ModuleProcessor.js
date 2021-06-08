//Base class imports
import Billing_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/Billing/Billing_ModuleProcessor";

/**
 * @name Billing_ModuleProcessor.
 * @summary business layer for Billing.
 * */
class Billing_ModuleProcessor extends Billing_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/Billing/Billing.css"
        ];
    }
}

export default Billing_ModuleProcessor;
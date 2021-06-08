//Base class imports
import Contact_ModuleProcessor_Browser from "@shared/Application/d.Extranet/5_Shared/PC/Modules/Contact/Contact_ModuleProcessor";

/**
 * @name Contact_ModuleProcessor.
 * @summary business layer for Contact.
 * */
class Contact_ModuleProcessor extends Contact_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/Contact/Contact.css"
        ];
    }

}

export default Contact_ModuleProcessor;
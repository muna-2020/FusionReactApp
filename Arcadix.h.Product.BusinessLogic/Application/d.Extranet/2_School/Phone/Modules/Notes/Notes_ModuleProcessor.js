//Base class imports
import Notes_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/Notes/Notes_ModuleProcessor";

/**
 * @name Notes_ModuleProcessor.
 * @summary business layer for teacher.
 * */
class Notes_ModuleProcessor extends Notes_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/Notes/Notes.css"
        ];
    }

}

export default Notes_ModuleProcessor;
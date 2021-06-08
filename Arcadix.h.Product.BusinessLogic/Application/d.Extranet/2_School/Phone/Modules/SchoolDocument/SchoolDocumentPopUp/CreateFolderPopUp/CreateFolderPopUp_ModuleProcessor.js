//Base class imports
import CreateFolderPopUp_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp_ModuleProcessor";

/**
 * @name CreateFolderPopUp_ModuleProcessor.
 * @summary business layer for CreateFolder popup.
 * */
class CreateFolderPopUp_ModuleProcessor extends CreateFolderPopUp_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/SchoolDocument/CreateFolderPopUp.css"
        ];
    }


}

export default CreateFolderPopUp_ModuleProcessor;
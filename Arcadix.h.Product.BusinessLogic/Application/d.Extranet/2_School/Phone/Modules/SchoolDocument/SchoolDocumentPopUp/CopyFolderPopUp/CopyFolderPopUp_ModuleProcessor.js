//Base class imports
import CopyFolderPopUp_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp_ModuleProcessor";

/**
 * @name CopyFolderPopUp_ModuleProcessor.
 * @summary business layer for CopyFolder popup.
 * */
class CopyFolderPopUp_ModuleProcessor extends CopyFolderPopUp_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/SchoolDocument/CopyFolderPopUp.css"
        ];
    }

}

export default CopyFolderPopUp_ModuleProcessor;
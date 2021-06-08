//Base class imports
import UploadFilePopUp_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/UploadFilePopUp/UploadFilePopUp_ModuleProcessor";

/**
 * @name UploadFilePopUp_ModuleProcessor.
 * @summary business layer for UploadFilePopUp.
 * */
class UploadFilePopUp_ModuleProcessor extends UploadFilePopUp_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/SchoolDocument/UploadFilePopUp.css"
        ];
    }


}

export default UploadFilePopUp_ModuleProcessor;
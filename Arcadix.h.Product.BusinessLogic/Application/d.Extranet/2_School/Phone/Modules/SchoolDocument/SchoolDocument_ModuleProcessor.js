//Base class imports
import SchoolDocument_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocument_ModuleProcessor";

/**
 * @name SchoolNews_ModuleProcessor.
 * @summary business layer for schoolnews.
 * */
class SchoolDocument_ModuleProcessor extends SchoolDocument_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/SchoolDocument/SchoolDocument.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/SchoolDocument/CreateFolderPopUp/CreateFolderPopUp.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/SchoolDocument/UploadFilePopup/UploadFilePopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/SchoolDocument/CopyingFolderPopUp/CopyingFolderPopUp.css",



        ];
    }

    /**
     * @name OnSelectFolder
     * @summary sets the selected folder and filtered  documents by folder to state.
     * @param {any} objContext
     * @param {any} objFolder
     */
    OnSelectFolder(objContext, objFolder) {
        let objUpdateFolder = objFolder
        objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedFolder: objUpdateFolder, showDocumentListTab: true } });
    }

}

export default SchoolDocument_ModuleProcessor;
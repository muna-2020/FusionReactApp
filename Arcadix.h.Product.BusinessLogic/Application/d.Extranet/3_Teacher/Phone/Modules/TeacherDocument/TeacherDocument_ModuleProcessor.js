//Base class imports
import TeacherDocument_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocument_ModuleProcessor';

// //Module object imports.
// import Extranet_Teacher_TeacherDocumentFolder_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentFolder_Module';

/**
 * @name TeacherDocument_ModuleProcessor
 * @summary module processor for Teacher Document.
 * */
class TeacherDocument_ModuleProcessor extends TeacherDocument_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
     GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/TeacherDocument/TeacherDocument.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CopyingFolderPopUp.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherDocument/TeacherDocumentPopup/CreateFolderPopUp.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherDocument/TeacherDocumentPopup/ShareFolderPopup.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherDocument/TeacherDocumentPopup/UploadFilePopup.css"
        ];
    }

    /**
     * @name OnSelectFolder
     * @summary updates the state by selected folder and validations for folder
     * @param {any} objContext
     * @param {any} objFolder
     */
     OnSelectFolder(objContext, objFolder) {
        let objValidatedIcons = this.ValidateIcons(objContext, objFolder)
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                objSelectedFolder: objFolder,
                blnDefaultFolder: objValidatedIcons.blnDefaultFolder,
                blnSharedFolder: objValidatedIcons.blnSharedFolder,
                blnParentFolder: objValidatedIcons.blnParentFolder,
                blnOwnerOfFolder: objValidatedIcons.blnOwnerOfFolder,
                showDocumentListTab: true
            }
        })
    }


}

export default TeacherDocument_ModuleProcessor;
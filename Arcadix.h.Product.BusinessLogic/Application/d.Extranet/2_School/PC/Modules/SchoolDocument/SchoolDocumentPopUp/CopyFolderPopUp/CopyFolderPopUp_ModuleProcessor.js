//Base class imports

import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';
/**
 * @name SchoolDocument_ModuleProcessor
 * @summary module processor for School Document.
 * */
class CopyFolderPopUp_ModuleProcessor extends ExtranetBase_ModuleProcessor {
    /**
        * @name LoadInitialData
        * @param {object} objContext passes Context object
        * @summary Calls the Queue and Execute method
        */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {
        return [];
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CopyingFolderPopUp.css"
        ];
    }


    /**
* @name GetPrefetchFiles
* @param {object} props props
* @returns {object} PrefetchFiles
*/
    GetPrefetchFiles(props) {
        return {
            "Components": ["Tree"],
            "Files": [
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/folder_brown_teacher.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/folder_brown_pupil.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/folder_brown_plus.png"
            ]
        }
    }
}
export default CopyFolderPopUp_ModuleProcessor;
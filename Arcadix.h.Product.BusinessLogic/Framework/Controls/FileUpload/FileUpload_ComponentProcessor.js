//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name FileUpload_ComponentProcessor
* @summary Class for FileUpload.
*/
class FileUpload_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name GetDownloadIconUrl
     * @summary returns the download icon url.
     * @param {any} objContext
     */
    GetDownloadIconUrl(objContext) {
        if (objContext.props.Resource.ImagePath) {
            return objContext.props.Resource.ImagePath.DownloadIcon ? objContext.props.Resource.ImagePath.DownloadIcon : objContext.props.Resource.SkinPath + "/Images/Common/Icons/download.svg";
        } else
            return objContext.props.Resource.SkinPath + "/Images/Common/Icons/download.svg";
    }

    /**
    * @name GetDeleteIconUrl
    * @summary returns the delete icon url.
    * @param {any} objContext
    */
    GetDeleteIconUrl(objContext) {
        if (objContext.props.Resource.ImagePath) {
            return objContext.props.Resource.ImagePath.DeleteIcon ? objContext.props.Resource.ImagePath.DeleteIcon : objContext.props.Resource.SkinPath + "/Images/Common/Icons/delete.svg";
        } else
            return objContext.props.Resource.SkinPath + "/Images/Common/Icons/delete.svg";
    }

    /**
    * @name GetUploadIconUrl
    * @summary returns the upload icon url.
    * @param {any} objContext
    */
    GetUploadIconUrl(objContext) {
        if (objContext.props.Resource.ImagePath) {
            return objContext.props.Resource.ImagePath.UploadIcon ? objContext.props.Resource.ImagePath.UploadIcon : objContext.props.Resource.SkinPath + "/Images/Common/Icons/plus.svg";
        } else
            return objContext.props.Resource.SkinPath + "/Images/Common/Icons/plus.svg";
    }


    /**
    * @name GetUploadIconUrl
    * @summary returns the upload icon url.
    * @param {any} objContext
    */
    GetDropFilesIconUrl(objContext) {
        if (objContext.props.Resource.ImagePath) {
            return objContext.props.Resource.ImagePath.DropFilesIcon ? objContext.props.Resource.ImagePath.DropFilesIcon : objContext.props.Resource.SkinPath + "/Images/Common/Icons/dropfiles.svg";
        } else
            return objContext.props.Resource.SkinPath + "/Images/Common/Icons/dropfiles.svg";
    }

    GetFileDetails(objFileData) {
        let arrFilePath = objFileData.FileOrigin.split("/");
        let strFolder="";
        for (var intPathLenth = 1; intPathLenth < arrFilePath.length - 1; intPathLenth++) {
            strFolder = strFolder + (strFolder != "" ? "/" : "")  + arrFilePath[intPathLenth];
        }
        return {
            ...objFileData,
            ["Type"]: arrFilePath[0],
            ["Folder"]: strFolder,
            ["FileName"]: arrFilePath[arrFilePath.length - 1],
            ["OriginalFileName"]: arrFilePath[arrFilePath.length - 1]
        };
    }

}

export default FileUpload_ComponentProcessor;
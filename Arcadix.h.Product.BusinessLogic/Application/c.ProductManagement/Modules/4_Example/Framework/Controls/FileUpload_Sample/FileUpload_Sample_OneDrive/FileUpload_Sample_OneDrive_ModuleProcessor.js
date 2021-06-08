//Component Specific  imports
import * as FileUpload_Sample_OneDrive_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_OneDrive/FileUpload_Sample_OneDrive_MetaData';
import * as FileUpload_Sample_OneDrive_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_OneDrive/FileUpload_Sample_OneDrive_ResourceData';
import * as FileUpload_Sample_OneDrive_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_OneDrive/FileUpload_Sample_OneDrive_Data';
import Framework_FileUpload_Sample_OneDrive_Module from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_OneDrive/FileUpload_Sample_OneDrive_Module';
/**
* @name FileUpload_Sample_OneDrive_ModuleProcessor
* @summary Class for FileUpload_Sample_OneDriveFile module display.
*/
class FileUpload_Sample_OneDrive_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Meta"]: FileUpload_Sample_OneDrive_MetaData.GetMetaData(),
                ["Data"]: FileUpload_Sample_OneDrive_Data.GetData(),
                ["Resource"]: FileUpload_Sample_OneDrive_ResourceData.GetResourceData()
            };
        };
    }

    SaveToOneDrive(objContext) {
        let objParams = {
            ["Params"]: {
                ["vAttachmentFileName"]: objContext.state.FileName,
                ["vFileType"]: objContext.state.OriginalFileName.split('.')[1],
                ["vFileId"]: objContext.state.UploadUid
            }            
        };
        Framework_FileUpload_Sample_OneDrive_Module.SaveFileToOneDrive(objParams, (objReturnData) => {
            console.log("Onedrive File: ", objReturnData["FileId"]);
        })
    }
}

export default FileUpload_Sample_OneDrive_ModuleProcessor;
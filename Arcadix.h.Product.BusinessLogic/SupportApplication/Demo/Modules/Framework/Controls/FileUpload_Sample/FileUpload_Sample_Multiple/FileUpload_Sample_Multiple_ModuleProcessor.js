//Common imports
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Component Specific  imports
import * as FileUpload_Sample_Multiple_MetaData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Multiple/FileUpload_Sample_Multiple_MetaData';
import * as FileUpload_Sample_Multiple_ResourceData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Multiple/FileUpload_Sample_Multiple_ResourceData';
import * as FileUpload_Sample_Multiple_Data from '@shared/SupportApplication/Demo/Modules/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Multiple/FileUpload_Sample_Multiple_Data';

/**
* @name FileUpload_Sample_Multiple_ModuleProcessor
* @summary Class for FileUpload_Sample_MultipleFile module display.
*/
class FileUpload_Sample_Multiple_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Meta"]: FileUpload_Sample_Multiple_MetaData.GetMetaData(),
                ["Data"]: FileUpload_Sample_Multiple_Data.GetData(),
                ["Resource"]: FileUpload_Sample_Multiple_ResourceData.GetResourceData()
            };
        };
    }
}

export default FileUpload_Sample_Multiple_ModuleProcessor;
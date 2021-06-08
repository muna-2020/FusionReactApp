//Component Specific  imports
import * as FileUpload_Sample_Single_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Single/FileUpload_Sample_Single_MetaData';
import * as FileUpload_Sample_Single_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Single/FileUpload_Sample_Single_ResourceData';
import * as FileUpload_Sample_Single_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Single/FileUpload_Sample_Single_Data';

/**
* @name FileUpload_Sample_Single_ModuleProcessor
* @summary Class for FileUpload_Sample module display.
*/
class FileUpload_Sample_Single_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Meta"]: FileUpload_Sample_Single_MetaData.GetMetaData(),
                ["Data"]: FileUpload_Sample_Single_Data.GetData(),
                ["Resource"]: FileUpload_Sample_Single_ResourceData.GetResourceData()
            }
        };
    }
}

export default FileUpload_Sample_Single_ModuleProcessor;
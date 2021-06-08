import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';
import * as Form_Sample_MetaData from '@shared/SupportApplication/Demo/Modules/Framework/Blocks/Form_Sample/Form_Sample/Form_Sample_MetaData';
import * as Form_Sample_ResourceData from '@shared/SupportApplication/Demo/Modules/Framework/Blocks/Form_Sample/Form_Sample/Form_Sample_ResourceData';
import * as Form_Sample_Data from '@shared/SupportApplication/Demo/Modules/Framework/Blocks/Form_Sample/Form_Sample/Form_Sample_Data';

/**
* @name Form_Sample_ModuleProcessor.
* @summary Class for ApplicationType module display.
*/
class Form_Sample_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: Form_Sample_Data.GetData(),
                ["Text"]: Form_Sample_ResourceData.GetResourceData()
            }
        };
    };

    /**
     * @name GetMeta
     * @summary Returns Meta Data
     * @return {Array} Array of Meta objects.
     */
    GetMeta() {
        return Form_Sample_MetaData.GetMetaData();
    };

    /**
    * @name SaveMethod
    * @summary Checks if the form data is valid and performs save operation in the DB
    * @return {Array} Array of Meta objects.
    */
    SaveMethod(objContext, refForm) {
        var blnIsFormValid = refForm.current.IsValid(); //Method to check if the form data is valid.
        if (blnIsFormValid) {
            var objsaveData = refForm.current.GetSaveData(); //Method to get the form data.
            //Call the API to save 
        }
        else {
            //Do nothing
            //Validation taken care by the Form and Validation divs gets the messages
        }
    };

    /**
    * @name GetResource
    * @summary Returns Resource object.
    * @return {Object}.
    */
    GetResource(objContext) {
        return {
            Text: objContext.props.Text, //Has all the fields corresponding to the Header (Metadata). These values are going to get displayed in the HTML. It is a mandatory props.
            SkinPath: JConfiguration.ExtranetSkinPath//The SkinPath of the images.
        }
    }

}

export default Form_Sample_ModuleProcessor;
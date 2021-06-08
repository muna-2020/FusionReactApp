//Base class imports
import ImportData_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/Teacher/ImportData/ImportData_ModuleProcessor";

/**
 * @name ImportData_ModuleProcessor.
 * @summary business layer for teacher import data.
 * */
class ImportData_ModuleProcessor extends ImportData_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/Teacher/ImportData/ImportData.css"
        ];
    }

}

export default ImportData_ModuleProcessor;
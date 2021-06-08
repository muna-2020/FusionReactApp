//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name Form_ComponentProcessor.
* @summary Class for Row.
*/
class Node_CompontProcessor extends Base_ModuleProcessor {

    /**
    * @name GetMultiLanguagetext
    * @param {*} objNodeData
    * @param {*} objNodeFields
    * @summary gets the language text based on main client language id.
    * @returns {string}
    */
    GetMultiLanguagetext(objNodeData, objNodeFields){
        let objLanguageData = objNodeData[objNodeFields.DependingTableName].find(obj => obj["iLanguageId"] == JConfiguration.InterfaceLanguageId);
        return objLanguageData ? objLanguageData[objNodeFields.TextField] : "";
    }

}

export default Node_CompontProcessor;
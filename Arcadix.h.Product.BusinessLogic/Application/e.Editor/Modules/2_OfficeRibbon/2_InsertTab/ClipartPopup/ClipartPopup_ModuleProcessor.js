//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//object related imports
import Object_Editor_OfficeRibbon_Clipart from "@shared/Object/e.Editor/TaskContent/2_OfficeRibbon/InsertTab/Clipart/Clipart";

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
* @name ClipartPopup_ModuleProcessor
* @param NA
* @summary Class for Clipart module display.
* @return NA
*/
class ClipartPopup_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module.
     * @return {Array} Array of object list.
     */
    static StoreMapList() {
        return ["Object_Editor_OfficeRibbon_Clipart"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];
        // Clipart
        Object_Editor_OfficeRibbon_Clipart.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Editor_OfficeRibbon_Clipart];
        return arrDataRequest;
    }

    /**
     * @name OnFolderChange
     * @param {object} objContext
     * @param {string} strFolderName
     * @summary this handle folder change event.
     */
    OnFolderChange(objContext, strFolderName) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ActiveFolder": strFolderName,
                "ActiveFolderIndex": objContext.state.Folders.findIndex(objTempFolder => objTempFolder.FolderName === strFolderName)
            }
        })
    }

    /**
     * @name ChangeSelectedImage
     * @param {object} objContext
     * @param {string} strClipart
     * @summary this changes the selected image.
     */
    ChangeSelectedImage(objContext, strClipart) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "SelectedImage": strClipart
            }
        })
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props
     * @summary returns the styles.
     * @returns {Array} Array of style list.
     */
    GetDynamicStyles(props) { 
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/2_OfficeRibbon/2_Insert/ClipartPopup/ClipartPopupStyles.css"];
    }; 
      
} 
 
export default ClipartPopup_ModuleProcessor; 
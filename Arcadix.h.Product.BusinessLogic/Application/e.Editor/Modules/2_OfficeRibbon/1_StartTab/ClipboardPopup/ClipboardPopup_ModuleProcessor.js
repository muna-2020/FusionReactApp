//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name ClipboardPopup_ModuleProcessor
 * @summary Contains the ClipboardPopup module specific methods.
 * */
class ClipboardPopup_ModuleProcessor extends EditorBase_ModuleProcessor {

   /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {any} Array of object list
    */
    static StoreMapList() {
        return [{ "StoreKey": "EditorState", "DataKey": "ClipboardData" }];
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/2_OfficeRibbon/1_Start/ClipboardPopup/ClipboardPopup.css"];
    }
}

export default ClipboardPopup_ModuleProcessor;
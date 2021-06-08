//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name SearchPopup_ModuleProcessor
 * @summary Contains the SearchReplaceSidebar_ModuleProcessor module specific methods.
 * */
class SearchPopup_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/2_OfficeRibbon/SearchReplace/SearchPopup/SearchPopup.css"];
    }

}

export default SearchPopup_ModuleProcessor;
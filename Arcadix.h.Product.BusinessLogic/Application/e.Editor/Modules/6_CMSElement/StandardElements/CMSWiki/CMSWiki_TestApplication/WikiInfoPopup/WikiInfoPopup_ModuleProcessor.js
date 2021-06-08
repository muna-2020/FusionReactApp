//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name WikiInfoPopup_ModuleProcessor
 * @summary Contains the WikiInfoPopup_ModuleProcessor's module specific methods.
 */
class WikiInfoPopup_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSWiki/WikiInfoPopup/WikiInfoPopupStyles.css"
        ];
    }
}

export default WikiInfoPopup_ModuleProcessor;

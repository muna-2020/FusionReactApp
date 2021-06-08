//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name WikiDeletePopup_ModuleProcessor
 * @summary Contains the WikiDeleteConfiramtionPopup's module specific methods.
 */
class WikiDeletePopup_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSWiki/WikiSidebar/WikiDeleteConfirmationPopup/WikiDeleteConfirmationPopupStyles.css"
        ];
    }
}

export default WikiDeletePopup_ModuleProcessor;

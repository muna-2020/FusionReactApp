//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name LinkInfoPopup_ModuleProcessor
 * @summary Contains the LinkInfoPopup_ModuleProcessor's module specific methods.
 */
class LinkInfoPopup_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSLink/LinkPopup/LinkPopup.css"
        ];
    }
}

export default LinkInfoPopup_ModuleProcessor;

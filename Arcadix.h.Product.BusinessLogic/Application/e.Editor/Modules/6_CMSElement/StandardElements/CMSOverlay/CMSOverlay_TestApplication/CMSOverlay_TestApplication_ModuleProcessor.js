//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSOverlay_TestApplication_ModuleProcessor
 * @summary Contains the Overlay's test application version module specific methods.
 * */
class CMSOverlay_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSOverlay/CMSOverlayStyles.css"];

    }
}

export default CMSOverlay_TestApplication_ModuleProcessor;

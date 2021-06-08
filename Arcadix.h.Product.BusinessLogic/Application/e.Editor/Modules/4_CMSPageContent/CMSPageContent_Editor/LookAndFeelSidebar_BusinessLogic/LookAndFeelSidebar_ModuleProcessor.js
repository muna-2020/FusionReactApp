//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name LookAndFeelSidebar_ModuleProcessor
 * @summary Contains the LookAndFeelSidebar's module specific methods.
 */
class LookAndFeelSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/4_CMSPageContent/LookAndFeelSidebar/LookAndFeelSidebarStyles.css"
        ];
    }
}

export default LookAndFeelSidebar_ModuleProcessor;

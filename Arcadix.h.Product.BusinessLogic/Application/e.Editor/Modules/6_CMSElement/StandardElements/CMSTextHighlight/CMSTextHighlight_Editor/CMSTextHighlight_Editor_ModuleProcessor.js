//Module related files
import CMSTextHighlight_Editor_ContextMenu from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_Editor/CMSTextHighlight_Editor_ContextMenu';

/**
 * @name CMSTextHighlight_Editor_ModuleProcessor
 * @summary Contains the texthighlight's editor version module specific methods.
 * */
class CMSTextHighlight_Editor_ModuleProcessor extends CMSTextHighlight_Editor_ContextMenu {

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSTextHighlight/CMSTextHighlightStyles.css"
        ];
    }

}

export default CMSTextHighlight_Editor_ModuleProcessor;
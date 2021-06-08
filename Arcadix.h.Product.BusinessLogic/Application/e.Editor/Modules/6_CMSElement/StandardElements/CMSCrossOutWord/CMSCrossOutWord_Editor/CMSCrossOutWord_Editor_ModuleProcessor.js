//Module related files
import CMSLineCrossOutWord_Editor_ContextMenu from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_Editor/CMSCrossOutWord_Editor_ContextMenu'; 

/**
 * @name CMSCrossOutWord_Editor_ModuleProcessor
 * @summary Contains the CrossOutWord's editor version module specific methods.
 * */
class CMSCrossOutWord_Editor_ModuleProcessor extends CMSLineCrossOutWord_Editor_ContextMenu {

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSCrossOutWord/CMSCrossOutWordStyles.css"
        ];
    }

}

export default CMSCrossOutWord_Editor_ModuleProcessor;
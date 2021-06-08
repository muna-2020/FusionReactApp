//Base classes.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSPageContent_Editor_ModuleProcessor
 * @summary CMSPageContent's Editor version
 */
class CMSPageContent_Editor_ModuleProcessor extends EditorBase_ModuleProcessor {

        /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [            
            props.JConfiguration.EditorSkinPath + "Css/Application/ReactJs/Phone/Modules/4_CMSPageContent/CMSPageContentSyles.css",
        ];
    }
}

export default CMSPageContent_Editor_ModuleProcessor;
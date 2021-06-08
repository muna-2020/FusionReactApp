//Base classes/hooks
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSTextMark_TestApplication_ModuleProcessor
 * @summary Contains the text mark's test application version module specific methods.
 * */
class CMSTextMark_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSTextMark/CMSTextMarkStyles.css"
        ];
    }
}

export default CMSTextMark_TestApplication_ModuleProcessor;

import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

class CMSColorFillWrapper_Common_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
    * @name GetDynamicStyles
    * @param {object} props component props.
    * @summary this returns the styles for the SSR.
    */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSColorFillWrapper/CMSColorFillWrapperStyles.css"]
    };
}

export default CMSColorFillWrapper_Common_ModuleProcessor;
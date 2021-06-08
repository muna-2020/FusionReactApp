import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

class CMSCrossOutWord_Common_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
    * @name GetDynamicStyles
    * @param {object} props component props.
    * @summary this returns the styles for the SSR.
    */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSCrossOutWord/CMSCrossOutWordStyles.css"]
    };
}

export default CMSCrossOutWord_Common_ModuleProcessor;
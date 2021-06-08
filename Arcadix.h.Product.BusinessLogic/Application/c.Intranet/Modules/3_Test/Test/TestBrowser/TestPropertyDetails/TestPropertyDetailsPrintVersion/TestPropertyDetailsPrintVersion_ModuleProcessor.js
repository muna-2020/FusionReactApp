//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

/**
 * @name TestPropertyDetailsPrintVersion_ModuleProcessor
 * @summary API is getting called for TestState and to set CurrentComponent
 */
class TestPropertyDetailsPrintVersion_ModuleProcessor extends IntranetBase_ModuleProcessor {
    
    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/3_Test/Test/IntranetTest/TestPropertyDetailsPrintVersion/TestPropertyDetailsPrintVersion.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Common/ReactJs/PC/Font.css"
        ];
    }
}

export default TestPropertyDetailsPrintVersion_ModuleProcessor;

//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

/**
 * @name TaskContentPrintVersion_ModuleProcessor
 * @summary API is getting called for TestState and to set CurrentComponent
 */
class TaskContentPrintVersion_ModuleProcessor extends IntranetBase_ModuleProcessor{

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [           
            props.JConfiguration.TestApplicationSkinPath + "/Css/Application/ReactJs/PC/Modules/5_Task/TaskContentPrintVersion/TaskContentPrintVersion.css",            
        ];
    }
}

export default TaskContentPrintVersion_ModuleProcessor;

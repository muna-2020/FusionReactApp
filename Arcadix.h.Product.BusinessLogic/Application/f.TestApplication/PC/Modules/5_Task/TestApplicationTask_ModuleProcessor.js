import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';
global.TimeTakenByTask = 0;

/**
 * @name TestApplicationTask_ModuleProcessor
 * @summary Handling Next Task Button Click
 */
class TestApplicationTask_ModuleProcessor extends Base_ModuleProcessor{

     /**
      * @name StoreMapList     
      * @summary Returns list of objects used in the module
      * @return {Array} Array of object list
      */
    static StoreMapList() {
        return [{ StoreKey: "ApplicationState", DataKey: "TestState" }];
    }

    /**
     * @name GetTimeTakenforTask
     * @summary Set the time
     */
    GetTimeTakenforTask() {
        TimeTakenByTask = 0;
        global.objsetInterval = setInterval(() => {
            TimeTakenByTask += 1
        }, 1000);
    }

    /**
     * @name ClearTimeTakenforTask
     * @summary clear the time and set to object state
     */
    ClearTimeTakenforTask(objContext) {
        objContext.TestState = { ...objContext.TestState, "TimeTakenByTask": TimeTakenByTask };
        clearInterval(objsetInterval);
        TimeTakenByTask = 0;
    }

     /**
     * @name TestApplicationTask.GetDynamicStyles
     * @summary returns styles required for the module
     * @param {object} props parent props.
     * @returns {Array} Dynamic Styles
     */
    GetDynamicStyles(props){
        return [
            props.JConfiguration.TestApplicationSkinPath + "/Css/Framework/ReactJs/" + props.JConfiguration.DeviceType + "/Controls/ProgressBar/ProgressBar.css",
            props.JConfiguration.TestApplicationSkinPath + "/Css/Application/ReactJs/" + props.JConfiguration.DeviceType + "/Modules/5_Task/TestApplicationTask.css",
            props.JConfiguration.TestApplicationSkinPath + "/Css/Application/ReactJs/" + props.JConfiguration.DeviceType + "/Modules/6_Result/TestApplicationResult.css",
        ];
    };
}

export default TestApplicationTask_ModuleProcessor

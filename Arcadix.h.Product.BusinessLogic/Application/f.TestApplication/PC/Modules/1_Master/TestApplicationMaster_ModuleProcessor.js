import Base_ModuleProcessor from "@shared/Framework/BaseClass/Base_ModuleProcessor";
import  TestApplicationBase_ModuleProcessor from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_ModuleProcessor';

//Test Application Module for API call
import TestApplicationMaster_Module from '@shared/Application/f.TestApplication/PC/Modules/1_Master/TestApplicationMaster_Module';


//Global declaration of the base files.
global.Base_ModuleProcessor = Base_ModuleProcessor;
global.TestApplicationBase_ModuleProcessor =TestApplicationBase_ModuleProcessor;

/**
 * @name TestApplicationMaster_ModuleProcessor
 * @summary Common methods for Introduction component
 */
class TestApplicationMaster_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [{ StoreKey: "ApplicationState", DataKey: "CurrentRoute" }, { StoreKey: "ApplicationState", DataKey: "iReloadCount" }];
    }


    /**
     * @name InitializeTestApplication
     * @param {object} objContext passes Context object
     * @summary Calls GetData Method, Returns TestState and set currentComponent in Application State from TestState.CurrentRoute 
     * @returns {object} null
     */
    InitializeTestApplication(objContext) {
        TestApplicationMaster_Module.GetData(objContext, (objReturn) => {
            var TestState = ApplicationState.GetProperty('TestState');
            if (TestState !== undefined) {
                objContext.dispatch({ type: "SET_STATE", payload: { "blnIsLoadComplete": true } });
            }         
            TestState.ReactNativeCSS ? ApplicationState.SetProperty("TestApplicationReactNativeCSS", TestState.ReactNativeCSS) : "";
            TestState.SSRData != undefined ? ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute,"SSRData": TestState.SSRData }) : ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute });
        });
    }

    /**
    * @summary returns styles required for the module
    * @param {object} props component props
    * @returns {React.Component} react component
    */
    GetDynamicStyles(props) {
        let arrDynamicStyles = [
            props.JConfiguration.TestApplicationSkinPath + "/Css/Application/ReactJs/" + props.JConfiguration.DeviceType + "/Modules/1_Master/TestApplicationMaster.css",
            props.JConfiguration.TestApplicationSkinPath + "/Css/Common/ReactJs/" + props.JConfiguration.DeviceType + "/Font.css",
            props.JConfiguration.TestApplicationSkinPath + "/Css/Framework/ReactJs/" + props.JConfiguration.DeviceType + "/Blocks/Popup/Popup/Popup.css",
            props.JConfiguration.TestApplicationSkinPath + "/Css/Framework/ReactJs/" + props.JConfiguration.DeviceType + "/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css",
            props.JConfiguration.TestApplicationSkinPath + "/Css/Framework/ReactJs/" + props.JConfiguration.DeviceType + "/Blocks/Popup/ErrorPopup/ErrorPopup.css", 
            props.JConfiguration.TestApplicationSkinPath + "/Css/Framework/ReactJs/" + props.JConfiguration.DeviceType + "/Controls/ProgressBar/ProgressBar.css",
        ];

        if (JConfiguration.Performance) {
            arrDynamicStyles = [...arrDynamicStyles,
            props.JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css"];
        }
        return arrDynamicStyles;
    };
}

export default TestApplicationMaster_ModuleProcessor;
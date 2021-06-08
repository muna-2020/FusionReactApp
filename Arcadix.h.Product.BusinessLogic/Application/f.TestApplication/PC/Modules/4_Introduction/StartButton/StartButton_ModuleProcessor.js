
//TestApplicationLogin_Module for validate login and initialize test API Calls
import TestApplicationIntroduction_Module from '@shared/Application/f.TestApplication/PC/Modules/4_Introduction/TestApplicationIntroduction_Module';
 
 
/**
 *@name StartButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class StartButton_ModuleProcessor {

    /**
     * @name HandleStartButtonClick
     * @param {object} objContext  component context
     * @summary calls module object method for API call
     * */
    HandleStartButtonClick(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        TestApplicationIntroduction_Module.GetData(objContext, (objReturn) => {
            if (objReturn.Success) {
                var TestState = ApplicationState.GetProperty('TestState');
                ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
            }
        });
    };
}

export default StartButton_ModuleProcessor;
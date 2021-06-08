//TestEndButton_Module for NextClick method
import TestEndButton_Module from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/TestEndButton/TestEndButton_Module';


/**
 *@name TestEndButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class TestEndButton_ModuleProcessor {

    /**
     * @name TestEndClick
     * @summary Onclick of next task button it will execute 
     * @param {any} props
     */
    TestEndClick(objContext) {
        TestEndButton_Module.GetData(objContext, (objResponse) => {
            if (objResponse.Success) {
                TestApplicationPopup.ShowConfirmationPopup({
                    "Resource": {
                        "Text": objContext.TextResources,
                        "TextResourcesKey": "CONFIRM",
                        "Variables": {},
                        "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
                    },
                    "Meta": {
                        "ShowHeader": true,
                        "ShowCloseIcon": true,
                        "Height": 'auto',
                        "Width": '390px',
                    },
                    "Data": {},
                    "Events": {
                        "ConfirmEvent": (strPopupId) => {
                            TestApplicationPopup.ClosePopup(strPopupId);
                            var TestState = ApplicationState.GetProperty('TestState');
                            ApplicationState.SetProperty('CurrentRoute', TestState.CurrentRoute);
                        }
                    },
                    CallBacks: {}
                });
            }
        });
    }
}

export default TestEndButton_ModuleProcessor;

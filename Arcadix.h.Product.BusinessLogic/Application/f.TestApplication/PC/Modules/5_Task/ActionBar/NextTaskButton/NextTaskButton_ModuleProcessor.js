//TestApplicationTask_Module for NextClick method
import TestApplicationTask_Module from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_Module';

//Module Import
import DirectLogin_Module from '@shared/Application/f.TestApplication/PC/InlineStart/DirectLogin/DirectLogin_Module';

/**
 *@name NextTaskButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class NextTaskButton_ModuleProcessor {

    /**
     * @name NextTaskClick
     * @summary On click of next task button it will execute 
     * @param {any} props
     */
    NextTaskClick(objContext, objParams) {
        var objTestApplicationTask_Module = new TestApplicationTask_Module();
        objTestApplicationTask_Module.NextTaskButtonClick(objContext, objParams, (objResponse) => {
            if (objResponse.Success) {
                var TestState = ApplicationState.GetProperty('TestState');
                ApplicationState.SetProperty('IsShowHint', false);
                ApplicationState.SetProperty('IsShowAdditionalInformation', false);
                if (TestState.IsDirectLogin === "Y") {
                    ApplicationState.SetProperty('IsDirectLoginResponse', true);
                    ApplicationState.SetProperty('iTaskStatusId', TestState.iTaskStatusId);
                    ApplicationState.SetProperty('ShowTryAgainButton', true);
                    ApplicationState.SetProperty('ShowLoadSolutiontButton', true);
                }
                if (TestState.CurrentRoute === "Result") {
                    ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
                }
            }
        });
    }

    /**
     * @name Remove
     * @param {object} objParams {objContext: {state, props, dispatch,NextTaskButton_ModuleProcessor}}
     * @summary Pop for Task Confirmation.
     */
    ShowTaskConfirmationPopup(objContext, objParams) {
        TestApplicationPopup.ShowErrorPopup({
            "Resource": {
                "Text": objContext.props.TextResources,
                "TextResourcesKey": "ERROR",
                "Variables": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Meta": {
                "Height": 'auto',
                "Width": '390px',
                "ShowHeader": true,
                "ShowCloseIcon": true,
            },
            "Data": {},
            "Events": {

            },
            "CallBacks": {}
        });
    };

    /**
     * @name NextTaskClickS
     * @summary On click of next task button it will execute 
     * @param {any} props
     */
    NextTaskClickDirectLogin(objContext, objParams) {
        DirectLogin_Module.GetData1(objContext, objParams, (objReturn) => {
            if (objReturn.Success) {
                ApplicationState.SetProperty('iTaskStatusId', null);
                ApplicationState.RemoveProperty('IsDirectLoginResponse');
                ApplicationState.SetProperty('ShowTryAgainButton', false);
                ApplicationState.SetProperty('ShowLoadSolutiontButton', false);
                var TestState = ApplicationState.GetProperty('TestState');
                if (TestState.CurrentRoute === "Result") {
                    ApplicationState.SetProperty('CurrentRoute', { "RouteName": TestState.CurrentRoute, "SSRData": TestState.SSRData });
                }

            }
        });
    }

    /**
     * @name ShowTaskConfirmationPopup
     * @param {object} objParams {objContext: {state, props, dispatch,SaveAndCloseButton_ModuleProcessor}}
     * @summary Pop for Task Confirmation.
     */
    ShowTaskConfirmationAutoLoginPopup(objContext, objParams) {
        TestApplicationPopup.ShowConfirmationPopup({
            "Resource": {
                "Text": objContext.props.TestState.TaskPageProperties.TextResources,
                "TextResourcesKey": "MANDATORY",
                "Variables": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Meta": {
                "ShowHeader": true,
                "ShowCloseIcon": true,
                "Height": 'auto',
                "Width": '450px',
                "HasImage": "Y",
                "HasHeaderText": "Y",
                "CssClassName": "test-app-confirmation-popup"
            },
            "Data": {},
            "Events": {
                "ConfirmEvent": (strPopupId) => {
                    TestApplicationPopup.ClosePopup(strPopupId);
                },
                "CloseEvent": (strPopupId) => {
                    TestApplicationPopup.ClosePopup(strPopupId);
                    ApplicationState.SetProperty("blnShowAnimation", true);
                    objContext.NextTaskButton_ModuleProcessor.NextTaskClick(objContext, objParams);
                }
            },
            "CallBacks": {}
        });
    };

}

export default NextTaskButton_ModuleProcessor;

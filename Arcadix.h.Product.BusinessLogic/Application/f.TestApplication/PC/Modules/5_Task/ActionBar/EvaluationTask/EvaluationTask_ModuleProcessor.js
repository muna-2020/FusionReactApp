//EvaluationTask_Module for EvaluationTaskButtonClick method
import EvaluationTask_Module from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/EvaluationTask/EvaluationTask_Module';

/**
 *@name EvaluationButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class EvaluationTask_ModuleProcessor {

    /**
     * @name EvaluationClick
     * @param {object} objContext Context Object
     * @param {objContext} objParams Call params
     * @summary Onclick of Button Get Data Method will called
     */
    EvaluationClick(objContext, objParams) {
        ApplicationState.SetProperty('IsShowAdditionalInformation', false);
        EvaluationTask_Module.GetData(objContext, objParams, (objReturn) => {
            if (objReturn.Success) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                let ConfirmationPopupCSS = ApplicationState.GetProperty("TestApplicationReactNativeCSS")?ApplicationState.GetProperty("TestApplicationReactNativeCSS")["Css/Framework/ReactNative/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup"]:"";
                let strResultMessage = objReturn["json"]["TaskEvaluation"]["iTaskPoint"];
                let strMessage = objContext.props.TestState.TaskPageProperties.TextResources.RESULT_ConfirmText;
                strMessage = strMessage.split(":");
                objContext.props.TestState.TaskPageProperties.TextResources.RESULT_ConfirmText = strMessage[0] + ":";
                objContext.props.TestState.TaskPageProperties.TextResources.RESULT_ConfirmText = objContext.props.TestState.TaskPageProperties.TextResources.RESULT_ConfirmText + " " + strResultMessage + "";
                TestApplicationPopup.ShowConfirmationPopup({
                    "Data": {
                    },
                    "Meta": {
                        "ShowHeader": true,
                        "ShowCloseIcon": true,
                        "Height": 'auto',
                        "Width": '450px',
                        "HasHeaderText": "Y",
                        "HasImage": "Y",
                        "CssClassName": "test-app-confirmation-popup",
                        "ShowConfirmButton": "N"
                    },
                    "Resource": {
                        "Text": objContext.props.TestState.TaskPageProperties.TextResources,
                        "TextResourcesKey": "RESULT",
                        "Variables": {},
                        "CSS":ConfirmationPopupCSS
                    },
                    "Events": {
                        "CloseEvent": (strPopupId) => {
                            TestApplicationPopup.ClosePopup(strPopupId);
                        }
                    },
                    "CallBacks": {}
                });
            }
        });
       
    }
}

export default EvaluationTask_ModuleProcessor;


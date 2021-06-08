//TestApplicationTask_Module for NextClick method
import TestApplicationTask_Module from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_Module';

//EvaluationTask_Module for EvaluationTaskButtonClick method
import EvaluationTask_Module from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/EvaluationTask/EvaluationTask_Module';


/**
 *@name SaveAndCloseButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class SaveAndCloseButton_ModuleProcessor {

    /**
     * @name NextTaskClick
     * @summary Onclick of SaveAndClose button it will execute 
     * @param {any} props
     */
    NextTaskClick(objContext, objParams) {
        var objTestApplicationTask_Module = new TestApplicationTask_Module();
        objTestApplicationTask_Module.NextTaskButtonClick(objContext, objParams, (objResponse) => {
            if (objResponse.Success) {
                ApplicationState.SetProperty("PupilLearningTestPopupClose",true)
            }
        });
    }

    /**
     * @name ShowTaskConfirmationPopup
     * @param {object} objParams {objContext: {state, props, dispatch,SaveAndCloseButton_ModuleProcessor}}
     * @summary Pop for Task Confirmation.
     */
    ShowTaskConfirmationPopup(objContext, objParams) {
        TestApplicationPopup.ShowConfirmationPopup({
            "Resource": {
                "Text": objContext.props.TestState.TaskPageProperties.TextResources,
                "TextResourcesKey": "CONTINUE",
                "Variables": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Meta": {
                "ShowHeader": true,
                "ShowCloseIcon": true,
                "Height": 'auto',
                "Width": '450px',
                "HasHeaderText": "Y",
                "HasImage": "Y"
            },
            "Data": {},
            "Events": {
                "ConfirmEvent": (strPopupId) => {
                    TestApplicationPopup.ClosePopup(strPopupId);
                },
                "CloseEvent": (strPopupId) => {
                    TestApplicationPopup.ClosePopup(strPopupId);
                    objContext.SaveAndCloseButton_ModuleProcessor.NextTaskClick(objContext, objParams);
                }
            },
            "CallBacks": {}
        });
    };

    /**
    * @name Evaluation
    * @param {object} objContext Context Object
    * @param {objContext} objParams Call params
    * @summary Onclick of Button Get Data Method will called
    */
    async Evaluation(objContext, objParams) {
        let objReturn = await EvaluationTask_Module.EvaluateTask(objParams);
        ApplicationState.SetProperty('IsDirectLoginResponse', false);
        ApplicationState.SetProperty('ShowTryAgainButton', true);
        ApplicationState.SetProperty('ShowLoadSolutiontButton', true);
        ApplicationState.SetProperty('iTaskStatusId', objReturn["iTaskStatusId"]);
    }
}

export default SaveAndCloseButton_ModuleProcessor;

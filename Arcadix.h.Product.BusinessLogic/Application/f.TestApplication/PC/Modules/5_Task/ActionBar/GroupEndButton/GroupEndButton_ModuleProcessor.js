/**
 * @name GroupEndConfirmationPopUp_ModuleProcessor
 * @summary Handling Button Click
 */
class GroupEndButton_ModuleProcessor {

    /**
     * @name GroupEndConfirmationPopup
     * @summary Button Click Method
     */
    GroupEndConfirmationPopup(objContext) {
        if (true) {
            TestApplicationPopup.ShowConfirmationPopup({
                "Resource": {
                    "Text": objContext.props.TextResources,
                    "TextResourcesKey": "CONFIRM",
                    "Variables": {},
                    "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
                },
                "Meta": {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                    "Height": 'auto',
                    "Width": '390px',
                    "PopupName": "yousty-confirmation-popup"
                },
                "Data": {},
                "Events": {
                    "ConfirmEvent": (strPopupId) => {
                        TestApplicationPopup.ClosePopup(strPopupId);
                        objContext.objTestApplicationTask_ModuleProcessor.ClearTimeTakenforTask(objContext);
                        let ProgressComponent = objContext.props.TestState.TaskPageProperties ? objContext.props.TestState.TaskPageProperties.ProgressComponent ? objContext.props.TestState.TaskPageProperties.ProgressComponent : "" : ""
                        if (ProgressComponent === "GroupTime") {
                            clearInterval(objInterval);
                        }
                        ApplicationState.SetProperty("blnShowAnimation", true);
                        let AnswerJson = objContext.props.TaskLayoutRef.current.GetUserResponse();
                        var objParams = {
                            "AnswerJson": AnswerJson["Containers"],
                            "PageJson": objContext.props.TestState.TaskPageProperties.PageJson,
                            "SaveAndClose": false,
                            "NextTaskIndex": objContext.props.TestState.LinearTestProperties.GroupEndIndex + 1
                        };
                        objContext.NextTaskButton_ModuleProcessor.NextTaskClick(objContext, objParams);
                    }
                },
                CallBacks: {}
            });
        }
    }
}

export default GroupEndButton_ModuleProcessor;

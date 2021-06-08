
/**
 * @name GroupTimeCountDownDisplay_ModuleProcessor
 * @summary setInterval for Group Time and call pop up after time completion 
 * @returns {object} CompletionPercent
 */
class GroupTimeCountDownDisplay_ModuleProcessor {

    /**
     * @summary setInterval for Group Time and call pop up after time completion
     * @param {any} objContext
     */
    SetGroupTimeCountDownDisplay(objContext) {
        if (objContext.props.TestState.LinearTestProperties) {
            var timeleft = objContext.props.TestState.LinearTestProperties.TaskTimeLimit - objContext.props.TestState.LinearTestProperties.TaskTimeElapsed;
            global.objInterval = setInterval(function () {
                if (timeleft <= 0) {
                    TestApplicationPopup.ShowPopup({
                        Data: {
                            HeaderTitle: "Confirmation"
                        },
                        Meta: {
                            PopupName: "GroupEndConfirmationPopUp",
                            Type: "Display",
                            ShowHeader: false,
                            ShowCloseIcon: true,
                            ShowToggleMaximizeIcon : true,
                            Height: "auto",
                            Width: "auto"
                        },
                        Resource: {
                            Text: objContext.props.TextResource,
                            SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                        },
                        Events: {
                            NextTask: (strPopId) => {
                                objContext.GroupTimeCountDownDisplay_ModuleProcessor.NextTask(objContext)
                                TestApplicationPopup.ClosePopup(strPopId)
                            }
                        },
                        CallBacks: {}
                    });

                } else {
                    document.getElementById("countdown").innerHTML = "Gruppenzeit : " + timeleft;
                }
                timeleft -= 1;
            }, 1000);
        }
    }

    /**
     * @summary NextTask task will load 
     * @param {any} objContext
     */
    NextTask(objContext) {
        clearInterval(objInterval);
        objContext.objTestApplicationTask_ModuleProcessor.ClearTimeTakenforTask(objContext);
        let AnswerJson = objContext.props.TaskLayoutRef.current.GetUserResponse();
        var objParams = {
            "AnswerJson": AnswerJson["Containers"],
            "PageJson": objContext.props.TestState.TaskPageProperties.PageJson,
            "SaveAndClose": false,
            "NextTaskIndex": objContext.props.TestState.LinearTestProperties.GroupEndIndex + 1
        };
        objContext.NextTaskButton_ModuleProcessor.NextTaskClick(objContext, objParams);
    }
}

export default GroupTimeCountDownDisplay_ModuleProcessor;

import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSLineAssign_TestApplication_ModuleProcessor
 * @summary Contains the lineassign's test application version module specific methods.
 * */
class CMSLineAssign_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSLineAssign_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @param {object} ElementEvaluationResult Evaluation result
     * @summary Make the values uncheked for the test application version
     * @returns {object} Element Json modified according to test application viewing
     */
    GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) {
        let objElementJson;
        if (objLoadSolutionType["ViewSolution"])//Show Original Solution
        {
            if (UserAnswerJson !== null) {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: ElementJsonWithAnswer.vElementJson["Values"]
                    }
                };
            }
            else {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: ElementJsonWithAnswer.vElementJson["Values"]
                    }
                };
            }
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"])//Load User Response and User response Comparison
        {
            var arrUserValue = [...ElementEvaluationResult["UserAnswerJson"]];
            var arrActualValue = [...ElementEvaluationResult.ElementJson.vElementJson.Values];
            for (var i = 0; i < arrActualValue.length; i++) {
                var objActualValue = arrActualValue[i];
                var blnNotFound = true;
                var objValue = null;
                for (var j = 0; j < arrUserValue.length; j++) {
                    objValue = arrUserValue[j];
                    if (objValue.iElementAnswerId === objActualValue.iElementAnswerId && objValue.iElementQuestionId === objActualValue.iElementQuestionId) {
                        blnNotFound = false;
                        break;
                    }
                }
                if (blnNotFound) {
                    arrUserValue = [...arrUserValue, { ...objActualValue, "cIsCorrectValue": "Y", "cIsUserAnswered": "N" }];
                }
            }
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: arrUserValue
                }
            };
        }
        else//Normal Execution
        {
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: []
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSLineAssign_TestApplication_ModuleProcessor}
     * @summary Resets the user response
     */
    ResetAnswer(objContext) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: []
                    }
                },
                "ViewComparison": false,
                "ViewSolution": false,
                "LoadUserResponse": false,
                "ElementJsonWithAnswer": null,
                "UserAnswerJson": null,
                "ElementStatus": null,
                "blnDisableLineHighlight": true,
                "Questions": objContext.state.ElementJson.vElementJson.Questions.map((q) => { return false }),
                "Answers": objContext.state.ElementJson.vElementJson.Answers.map((a) => { return true }),
                "blnShowCorrect": objContext.props.ElementJson.vElementJson.Answers.map((q) => { return null }),
                "blnRerender": true,
                "arrBlnShowQuestionBorder": objContext.state.ElementJson.vElementJson.Questions.map((q) => { return false }),
            }
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSLineAssign/CMSLineAssignStyles.css"]
    };
}

export default CMSLineAssign_TestApplication_ModuleProcessor;

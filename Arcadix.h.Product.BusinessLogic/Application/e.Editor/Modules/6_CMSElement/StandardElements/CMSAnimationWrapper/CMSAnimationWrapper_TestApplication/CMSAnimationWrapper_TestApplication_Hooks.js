/**
 * @name GetInitialState
 * @param {object} props props from parent
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props, objModuleProcessor, fnGetAnimationTestState) => {
    let objLoadSolutionType = objModuleProcessor.GetLoadSolutionType(null, props);
    let blnIsDirectLoadSolution = false;
    if (objLoadSolutionType["ViewSolution"] || objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"]) {
        blnIsDirectLoadSolution = true;
    }
    let objElementJsonWithAnswer = props.ElementJsonWithAnswer ? props.ElementJsonWithAnswer : null;
    let objUserAnswerJson = props.UserAnswerJson ? props.UserAnswerJson : null;
    let objElementJson = objModuleProcessor.GetElementJsonForComponent(null, objLoadSolutionType, objElementJsonWithAnswer, objUserAnswerJson, props);
    let objState = fnGetAnimationTestState(objElementJson);
    return {
        "ElementJson": objState["ElementJson"],
        "cIsIframelessAnimation": objState["cIsIframelessAnimation"],
        "blnIsDirectLoadSolution": blnIsDirectLoadSolution,
        "ElementJsonWithAnswer": objElementJsonWithAnswer,
        "UserAnswerJson": objUserAnswerJson,
        "ElementStatus": props.ElementEvaluationResult ? props.ElementEvaluationResult["iElementStatus"] : null,
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "blnIsResetAnswer": false,
        "PageId": props.PageId,
        "isLoadComplete": props.IsForServerRenderHtml ? false : true,
        "ComponentKey": props.ComponentKey,
        "ToggleLoadSolution": false,
        "blnLoadInitializeIFrameLess": false,
        "blnLoadInitializeIFrameLessSolution": false
    };
};

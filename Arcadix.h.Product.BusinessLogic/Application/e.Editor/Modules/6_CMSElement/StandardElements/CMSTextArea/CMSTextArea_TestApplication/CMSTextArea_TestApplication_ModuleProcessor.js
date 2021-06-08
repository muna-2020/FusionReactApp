//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSTextArea_TestApplication_ModuleProcessor
 * @summary Contains the TextArea's editor version module specific methods.
* */
class CMSTextArea_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSTextArea_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @summary Make the values uncheked for the test application version
     * @returns {object} Element Json modified according to test application viewing
     */
    GetElementJsonForComponent(objContext = null, objLoadSolutionType = null, ElementJsonWithAnswer = null, UserAnswerJson = null, props = null) {
        if (objContext === null) {
            objContext = {
                "props": props
            };
        }
        let objElementJson;
        if (objLoadSolutionType["ViewSolution"])//Show Original Solution
        {
            if (UserAnswerJson !== null) {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["tDictationValue"]: UserAnswerJson ? UserAnswerJson["Answers"][0]["tDictationValue"] : ""
                    }
                };
            }
            else {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["tDictationValue"]: ""
                    }
                };
            }
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"])//Load User Response and User response Comparison
        {
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["tDictationValue"]: UserAnswerJson ? UserAnswerJson["Answers"][0]["tDictationValue"] : ""
                }
            };
        }
        else {
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["tDictationValue"]: ""
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name HandleTextAreaOnChange
     * @param {objContext} objContext {props, state, dispatch, CMSTextArea_TestApplication_ModuleProcessor}
     * @param {string} strDictationValue Value
     * @summary This method will be called when textarea is changed.
     */
    HandleTextAreaOnChange(objContext, strDictationValue) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["tDictationValue"]: strDictationValue
                    }
                },
                "ViewComparison": false,
                "ViewSolution": false,
                "LoadUserResponse": false
            }
        });
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSTextArea_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ViewSolution": false,
                "ViewComparison": false,
                "LoadUserResponse": false,
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["tDictationValue"]: ""
                    }
                }
            }
        });
    }
}

export default CMSTextArea_TestApplication_ModuleProcessor;
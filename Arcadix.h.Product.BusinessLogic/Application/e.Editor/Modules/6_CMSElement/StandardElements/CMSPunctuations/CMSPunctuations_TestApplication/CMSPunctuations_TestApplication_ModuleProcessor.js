import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSPunctuation_TestApplication_ModuleProcessor
 * @summary Contains the Punctuations's test application version module specific methods.
 * */
class CMSPunctuations_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
    * @name GetElementJsonForComponent
    * @param {object} objContext {state, props, dispatch, CMSPunctuations_TestApplication_ModuleProcessor}
    * @param {object} objLoadSolutionType Load Solution Type
    * @param {object} ElementJsonWithAnswer Original Element Json
    * @param {object} UserAnswerJson User answer response
    * @summary Make the values uncheked for the test application version
    * @returns {object} Element Json modified according to test application viewing
    */
    GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer = null, UserAnswerJson = null) {
        let objElementJson;
        var strSentence;
        if (objLoadSolutionType["ViewSolution"])//Show Original Solution, Load User Response and User response Comparison
        {
            if (UserAnswerJson !== null) {
                strSentence = ElementJsonWithAnswer.vElementJson.vSentence;
                objElementJson = {
                    ...objContext.props.ElementJson,
                    "vElementJson": {
                        ...objContext.props.ElementJson["vElementJson"],
                        "vSentence": objContext.CMSPunctuations_Common_ModuleProcessor.RemoveEscapeCharacter(UserAnswerJson["Answers"]),
                        "vText": objContext.CMSPunctuations_Common_ModuleProcessor.RemoveEscapeCharacter(strSentence)
                    }
                };
            }
            else {
                strSentence = ElementJsonWithAnswer.vElementJson.vSentence;
                objElementJson = {
                    ...objContext.props.ElementJson,
                    "vElementJson": {
                        ...objContext.props.ElementJson.vElementJson,
                        "vSentence": "",
                        "vText": objContext.CMSPunctuations_Common_ModuleProcessor.RemoveEscapeCharacter(strSentence)
                    }
                };
            }
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"]) {
            strSentence = ElementJsonWithAnswer.vElementJson.vSentence;
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    "vSentence": objContext.CMSPunctuations_Common_ModuleProcessor.RemoveEscapeCharacter(UserAnswerJson["Answers"]),
                    "vText": objContext.CMSPunctuations_Common_ModuleProcessor.RemoveEscapeCharacter(strSentence)
                }
            };
        }
        else//Normal Execution
        {
            objElementJson = {
                ...objContext.props.ElementJson,
                "vElementJson": {
                    ...objContext.props.ElementJson.vElementJson,
                    "vSentence": "",
                    "vText": objContext.CMSPunctuations_Common_ModuleProcessor.RemoveEscapeCharacter(objContext.props.ElementJson.vElementJson.vSentence)
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name HandlePunctuationClear
     * @param {any} objContext {state, props, dispatch}
     * @summary clears punctuation sentence
     */
    HandlePunctuationClear(objContext) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson":
                {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson.vElementJson,
                        "vSentence": ""
                    }
                },
                "arrLastSentences": []
            }
        });
    }

    /**
    * @name HandlePunctuationBackButton
    * @summary clear last entered value
    * */
    HandlePunctuationBackButton(objContext) {
        var sentence = objContext.state.arrLastSentences[objContext.state.arrLastSentences.length - 1];
        if (sentence === undefined || sentence === null) {
            sentence = "";
        }
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson":
                {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson.vElementJson,
                        "vSentence": sentence
                    }
                },
                "arrLastSentences": objContext.state.arrLastSentences.slice(0, objContext.state.arrLastSentences.length - 1)
            }
        });
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSPunctuations_TestApplication_ModuleProcessor}
     * @summary Resets the user response
     */
    ResetAnswer(objContext) {
        //objContext.TextAreaRef.current.value = "";
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["vSentence"]: ""
                    }
                },
                "ViewComparison": false,
                "ViewSolution": false,
                "LoadUserResponse": false,
                "ElementJsonWithAnswer": null,
                "UserAnswerJson": null,
                "ElementStatus": null
            }
        });
    }
}

export default CMSPunctuations_TestApplication_ModuleProcessor;
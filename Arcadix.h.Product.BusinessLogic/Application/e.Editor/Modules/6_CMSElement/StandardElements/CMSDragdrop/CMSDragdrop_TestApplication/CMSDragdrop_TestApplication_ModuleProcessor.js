//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSDragdrop_TestApplication_ModuleProcessor
 * @summary Contains the Dragdrop's test application version module specific methods.
 * */
class CMSDragdrop_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSDragdrop_TestApplication_ModuleProcessor}
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
                        ["Answers"]: UserAnswerJson["Answers"][0]["Answers"],
                        ["Values"]: UserAnswerJson["Answers"][0]["Values"]
                    }
                };
            }
            else {
                let arrAnswers = objContext.props.ElementJson["vElementJson"]["Answers"].filter(objTempData => objTempData["cIsHidden"] === "N");
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Answers"]: BaseCMSElement.ShuffleArray(arrAnswers),
                        ["Values"]: []
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
                    ["Answers"]: UserAnswerJson["Answers"][0]["Answers"],
                    ["Values"]: UserAnswerJson["Answers"][0]["Values"]
                }
            };
        }
        else//Normal Execution
        {
            let arrAnswers = objContext.props.ElementJson["vElementJson"]["Answers"].filter(objTempData => objTempData["cIsHidden"] === "N");
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Answers"]: BaseCMSElement.ShuffleArray(arrAnswers),
                    ["Values"]: []
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSDragdrop_TestApplication_ModuleProcessor}
     * @summary Resets the user response
     */
    ResetAnswer(objContext) {
        objContext.CMSDragdrop_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
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
                "arrDragdropAnswered": [],
                "ViewComparison": false,
                "ViewSolution": false,
                "LoadUserResponse": false,
                "ElementJsonWithAnswer": null,
                "UserAnswerJson": null,
                "ElementStatus": null
            }
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSDragdrop/CMSDragdropStyles.css"
        ];
    }
}

export default CMSDragdrop_TestApplication_ModuleProcessor;

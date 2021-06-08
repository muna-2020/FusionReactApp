//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSDragdropSort_TestApplication_ModuleProcessor
 * @summary Contains the DragdropSort's test application version module specific methods.
 * */
class CMSDragdropSort_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSDragdropSort_TestApplication_ModuleProcessor}
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
        let objElementJson, arrValues;
        if (objLoadSolutionType["ViewSolution"])//Show Original Solution
        {
            if (UserAnswerJson !== null) {
                arrValues = UserAnswerJson["Answers"].map((objTempValue, intIndex) => {
                    return {
                        ...objTempValue,
                        ["iTempDisplayOrder"]: intIndex + 1,
                    };
                });
            }
            else {
                arrValues = BaseCMSElement.ShuffleArray(objContext.props.ElementJson["vElementJson"]["Values"]);
                arrValues = arrValues.map((objTempValue, intIndex) => {
                    return {
                        ...objTempValue,
                        ["iTempDisplayOrder"]: intIndex + 1,
                        ["iDisplayOrder"]: -1
                    };
                });
            }
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"])//Load User Response and User response Comparison
        {
            arrValues = UserAnswerJson["Answers"].map((objTempValue, intIndex) => {
                return {
                    ...objTempValue,
                    ["iTempDisplayOrder"]: intIndex + 1,
                };
            });
        }
        else//Normal Execution
        {
            arrValues = BaseCMSElement.ShuffleArray(objContext.props.ElementJson["vElementJson"]["Values"]);
            arrValues = arrValues.map((objTempValue, intIndex) => {
                return {
                    ...objTempValue,
                    ["iTempDisplayOrder"]: intIndex + 1,
                    ["iDisplayOrder"]: -1
                };
            });
        }
        objElementJson = {
            ...objContext.props.ElementJson,
            ["vElementJson"]: {
                ...objContext.props.ElementJson["vElementJson"],
                ["Values"]: arrValues
            }
        };
        return objElementJson;
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSDragdropSort_TestApplication_ModuleProcessor}
     * @summary Resets user response.
     */
    ResetAnswer(objContext) {
        objContext.CMSDragdropSort_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            return {
                ...objTempValue,
                ["iDisplayOrder"]: -1
            };
        });
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrValues
                    }
                },
                "arrDragdropSortAnswered": [],
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSDragdropSort/CMSDragdropSortStyles.css"
        ];
    }
}

export default CMSDragdropSort_TestApplication_ModuleProcessor;

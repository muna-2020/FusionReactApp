//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSCheckbox_TestApplication_ModuleProcessor
 * @summary Contains the checkbox's test application version module specific methods.
 * */
class CMSCheckbox_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSCheckbox_TestApplication_ModuleProcessor}
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
        if (objLoadSolutionType["ViewSolution"])//Show Original Solution, Load User Response and User response Comparison
        {
            if (UserAnswerJson !== null) {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: UserAnswerJson["Answers"]
                    }
                };
            }
            else {
                let arrValues = objContext.props.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    return {
                        ...objTempValue,
                        ["cIsCorrectValue"]: "N"
                    };
                });
                if (objContext.props.ElementJson["vElementJson"]["cIsRandomDisplay"] === "Y") {
                    arrValues = BaseCMSElement.ShuffleArray(arrValues);
                }
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: arrValues
                    }
                };
            }
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"]) {
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: UserAnswerJson["Answers"]
                }
            };
        }
        else//Normal Execution
        {
            let arrValues = objContext.props.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: "N"
                };
            });
            if (objContext.props.ElementJson["vElementJson"]["cIsRandomDisplay"] === "Y") {
                arrValues = BaseCMSElement.ShuffleArray(arrValues);
            }
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: arrValues
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name OnCheckChange
     * @param {object} objContext {state, props, dispatch, CMSCheckbox_TestApplication_ModuleProcessor}
     * @param {object} objValue checkbox value object
     * @summary Trigerred when the Checkbox is checked/unchecked
     */
    OnCheckChange(objContext, objValue) {
        let arrValues = [...objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            if (objTempValue["iElementCheckBoxValueId"] === objValue["iElementCheckBoxValueId"]) {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: objTempValue["cIsCorrectValue"] === "N" ? "Y" : "N"
                };
            }
            else {
                return { ...objTempValue };
            }
        })];
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrValues
                    }
                },
                // "ViewComparison": false,
                // "ViewSolution": false,
                // "LoadUserResponse": false,
                // "ElementJsonWithAnswer": null,
                // "UserAnswerJson": null,
                // "ElementStatus": null
            }
        });
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSCheckbox_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.CMSCheckbox_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            return {
                ...objTempValue,
                ["cIsCorrectValue"]: "N"
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
                "arrCheckboxAnswered": [],
                "ViewSolution": false,
                "ViewComparison": false,
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSCheckbox/CMSCheckboxStyles.css"
        ];
    }
}

export default CMSCheckbox_TestApplication_ModuleProcessor;

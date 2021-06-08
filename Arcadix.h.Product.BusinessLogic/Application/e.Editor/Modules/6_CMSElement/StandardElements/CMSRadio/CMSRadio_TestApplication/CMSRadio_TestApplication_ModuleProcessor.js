//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSRadio_TestApplication_ModuleProcessor
 * @summary Contains the checkbox's test application version module specific methods.
 * */
class CMSRadio_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {props, state, dispatch, CMSRadio_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @summary Returns the element json in the form it is used by the component.
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
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"])//Load User Response and User response Comparison
        {
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
     * @name ChangeSelection
     * @param {object} objContext {props, state, dispatch, CMSRadio_TestApplication_ModuleProcessor}
     * @param {object} objValue radio value
     * @summary This method will be called when selection is changed.
     */
    ChangeSelection(objContext, objValue) {
        let arrValues = [...objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            if (objTempValue["iElementRadioValueId"] === objValue["iElementRadioValueId"]) {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: "Y"
                };
            }
            else {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: "N"
                };
            }
        })];
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
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
     * @param {object} objContext {state, props, dispatch, CMSRadio_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.CMSRadio_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
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
                "arrRadioAnswered": [],
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSRadio/CMSRadioStyles.css",
        ];
    }
}

export default CMSRadio_TestApplication_ModuleProcessor;
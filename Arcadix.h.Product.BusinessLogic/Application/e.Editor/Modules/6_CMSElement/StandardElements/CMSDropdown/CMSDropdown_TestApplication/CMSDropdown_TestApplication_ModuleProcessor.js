//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSDropdown_TestApplication_ModuleProcessor
 * @summary Contains the Dropdown's test application version module specific methods.
 * */
class CMSDropdown_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSDropdown_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @summary Returns the required elementJson for the test application version of dropdown.
     * @returns {object} ElementJson
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
                let arrValues = [...objContext.props.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    return {
                        ...objTempValue,
                        ["cIsCorrectValue"]: "N"
                    };
                })];
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: objContext.props.ElementJson["vElementJson"]["cIsRandomizedDisplay"] === "Y" ? BaseCMSElement.ShuffleArray(arrValues) : arrValues
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
            let arrValues = [...objContext.props.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: "N"
                };
            })];
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: objContext.props.ElementJson["vElementJson"]["cIsRandomizedDisplay"] === "Y" ? BaseCMSElement.ShuffleArray(arrValues) : arrValues
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name OnSelectionChange
     * @param {object} objContext {state, props, dispatch, CMSDropdown_TestApplication_ModuleProcessor}
     * @param {number} intValue value of the selected object
     * @summary Sets the selected object to the state.
     */
    OnSelectionChange(objContext, intValue) {
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            if (objTempValue["iElementDropdownValueId"] === intValue) {
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
        });
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
     * @param {object} objContext {state, props, dispatch, CMSDropdown_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSDropdown/CMSDropdownStyles.css"
        ];
    }
}

export default CMSDropdown_TestApplication_ModuleProcessor;

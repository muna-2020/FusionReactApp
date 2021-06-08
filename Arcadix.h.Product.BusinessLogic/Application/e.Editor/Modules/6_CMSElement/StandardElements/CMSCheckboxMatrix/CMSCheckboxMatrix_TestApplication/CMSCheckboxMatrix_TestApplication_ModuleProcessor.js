//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSCheckboxMatrix_TestApplication_ModuleProcessor
 * @summary Contains the checkboxMatrix's test application version module specific methods.
 * */
class CMSCheckboxMatrix_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_TestApplication_ModuleProcessor}
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
                        ["MatrixColumn"]: UserAnswerJson["Answers"][0]["MatrixColumn"],
                        ["MatrixRow"]: UserAnswerJson["Answers"][0]["MatrixRow"],
                        ["Values"]: UserAnswerJson["Answers"][0]["Values"]
                    }
                };
            }
            else {
                let arrValues = objContext.props.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    return {
                        ["iElementCheckBoxMatrixColumnId"]: objTempValue["iElementCheckBoxMatrixColumnId"],
                        ["iElementCheckBoxMatrixRowId"]: objTempValue["iElementCheckBoxMatrixRowId"],
                        ["cIsCorrectValue"]: "N"
                    }
                });
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["MatrixColumn"]: objContext.props.ElementJson["vElementJson"]["cIsRandomizedColumnDisplay"] === "Y" ? BaseCMSElement.ShuffleArray(objContext.props.ElementJson["vElementJson"]["MatrixColumn"]) : objContext.props.ElementJson["vElementJson"]["MatrixColumn"],
                        ["MatrixRow"]: objContext.props.ElementJson["vElementJson"]["cIsRandomizedRowDisplay"] === "Y" ? BaseCMSElement.ShuffleArray(objContext.props.ElementJson["vElementJson"]["MatrixRow"]) : objContext.props.ElementJson["vElementJson"]["MatrixRow"],
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
                    ["MatrixColumn"]: UserAnswerJson["Answers"][0]["MatrixColumn"],
                    ["MatrixRow"]: UserAnswerJson["Answers"][0]["MatrixRow"],
                    ["Values"]: UserAnswerJson["Answers"][0]["Values"]
                }
            };
        }
        else//Normal Execution
        {
            let arrValues = objContext.props.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                return {
                    ["iElementCheckBoxMatrixColumnId"]: objTempValue["iElementCheckBoxMatrixColumnId"],
                    ["iElementCheckBoxMatrixRowId"]: objTempValue["iElementCheckBoxMatrixRowId"],
                    ["cIsCorrectValue"]: "N"
                }
            });
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["MatrixColumn"]: objContext.props.ElementJson["vElementJson"]["cIsRandomizedColumnDisplay"] === "Y" ? BaseCMSElement.ShuffleArray(objContext.props.ElementJson["vElementJson"]["MatrixColumn"]) : objContext.props.ElementJson["vElementJson"]["MatrixColumn"],
                    ["MatrixRow"]: objContext.props.ElementJson["vElementJson"]["cIsRandomizedRowDisplay"] === "Y" ? BaseCMSElement.ShuffleArray(objContext.props.ElementJson["vElementJson"]["MatrixRow"]) : objContext.props.ElementJson["vElementJson"]["MatrixRow"],
                    ["Values"]: arrValues
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name OnCheckChange
     * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_TestApplication_ModuleProcessor}
     * @param {object} objRowItem checkboxmatrix row value object
     * @param {object} objColumnItem checkboxmatrix column value object
     * @summary Triggered when the Checkbox is checked/unchecked
     */
    OnCheckChange(objContext, objRowItem, objColumnItem) {
        let arrNewValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            if (objTempValue["iElementCheckBoxMatrixRowId"] === objRowItem["iElementCheckBoxMatrixRowId"] && objTempValue["iElementCheckBoxMatrixColumnId"] === objColumnItem["iElementCheckBoxMatrixColumnId"]) {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: objTempValue.cIsCorrectValue === "Y" ? "N" : "Y"
                }
            }
            else {
                return objTempValue
            }
        });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrNewValues
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
     * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.CMSCheckboxMatrix_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            return {
                ["iElementCheckBoxMatrixColumnId"]: objTempValue["iElementCheckBoxMatrixColumnId"],
                ["iElementCheckBoxMatrixRowId"]: objTempValue["iElementCheckBoxMatrixRowId"],
                ["cIsCorrectValue"]: "N"
            }
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
                "arrCheckboxMatrixAnswered": [],
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSCheckboxMatrix/CMSCheckboxMatrixStyles.css"
        ];
    }
}

export default CMSCheckboxMatrix_TestApplication_ModuleProcessor;

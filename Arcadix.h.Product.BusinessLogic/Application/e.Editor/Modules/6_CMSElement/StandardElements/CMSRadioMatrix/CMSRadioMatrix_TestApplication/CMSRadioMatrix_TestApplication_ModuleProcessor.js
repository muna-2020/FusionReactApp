//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSRadioMatrix_TestApplication_ModuleProcessor
 * @summary Contains the RadioMatrix's test application version module specific methods.
 * */
class CMSRadioMatrix_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_TestApplication_ModuleProcessor}
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
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["MatrixColumn"]: objContext.props.ElementJson["vElementJson"]["cIsRandomizedColumnDisplay"] === "Y" ? BaseCMSElement.ShuffleArray(objContext.props.ElementJson["vElementJson"]["MatrixColumn"]) : objContext.props.ElementJson["vElementJson"]["MatrixColumn"],
                        ["MatrixRow"]: objContext.props.ElementJson["vElementJson"]["cIsRandomizedRowDisplay"] === "Y" ? BaseCMSElement.ShuffleArray(objContext.props.ElementJson["vElementJson"]["MatrixRow"]) : objContext.props.ElementJson["vElementJson"]["MatrixRow"],
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
                    ["MatrixColumn"]: UserAnswerJson["Answers"][0]["MatrixColumn"],
                    ["MatrixRow"]: UserAnswerJson["Answers"][0]["MatrixRow"],
                    ["Values"]: UserAnswerJson["Answers"][0]["Values"]
                }
            };
        }
        else//Normal Execution
        {
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["MatrixColumn"]: objContext.props.ElementJson["vElementJson"]["cIsRandomizedColumnDisplay"] === "Y" ? BaseCMSElement.ShuffleArray(objContext.props.ElementJson["vElementJson"]["MatrixColumn"]) : objContext.props.ElementJson["vElementJson"]["MatrixColumn"],
                    ["MatrixRow"]: objContext.props.ElementJson["vElementJson"]["cIsRandomizedRowDisplay"] === "Y" ? BaseCMSElement.ShuffleArray(objContext.props.ElementJson["vElementJson"]["MatrixRow"]) : objContext.props.ElementJson["vElementJson"]["MatrixRow"],
                    ["Values"]: []
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name ChangeSelection
     * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_TestApplication_ModuleProcessor}
     * @param {object} objRowValue radio matrix row value object
     * @param {object} objMatrixColumn radio matrix column value object
     * @summary Trigerred when the Radio is checked/unchecked
     */
    ChangeSelection(objContext, objRowValue, objMatrixColumn) {
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iElementRadioMatrixRowId"] !== objRowValue["iElementRadioMatrixRowId"]);
        arrValues = [
            ...arrValues,
            {
                "iElementRadioMatrixId": objContext.state.ElementJson["iElementId"],
                "iElementRadioMatrixRowId": objRowValue["iElementRadioMatrixRowId"],
                "iElementRadioMatrixColumnId": objMatrixColumn["iElementRadioMatrixColumnId"]
            }
        ];
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrValues
                    }
                }
            }
        });
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.CMSRadioMatrix_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
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
                "arrRadioMatrixAnswered": [],
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSRadioMatrix/CMSRadioMatrixStyles.css"
        ];
    }
}

export default CMSRadioMatrix_TestApplication_ModuleProcessor;

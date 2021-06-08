//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSPairingElement_TestApplication_ModuleProcessor
 * @summary Contains the PairingElement's test application version module specific methods.
 * */
class CMSPairingElement_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @param {object} ElementEvaluationResult Evaluation result
     * @summary Make the values uncheked for the test application version
     * @returns {object} Element Json modified according to test application viewing
     */
    GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) {
        let objElementJson;
        var arrValues = [];
        if (ElementJsonWithAnswer &&
            ElementJsonWithAnswer["vElementJson"] &&
            ElementJsonWithAnswer["vElementJson"]["Values"] &&
            ElementJsonWithAnswer["vElementJson"]["Values"].length > 0) {
            arrValues = ElementJsonWithAnswer["vElementJson"]["Values"];
        }
        if (objLoadSolutionType["ViewSolution"])//Show Original Solution
        {
            if (UserAnswerJson !== null) {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: arrValues
                    }
                };
            }
            else {
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
            let arrNewValues = [];
            let arrResultValues = [...ElementEvaluationResult["UserAnswerJson"]];
            for (let i = 0; i < arrValues.length; i++) {
                let blnFound = false;
                for (let j = 0; j < arrResultValues.length; j++) {
                    if ((arrResultValues[j]["iStartPairingId"] === arrValues[i]["iStartPairingId"] && arrResultValues[j]["iEndPairingId"] === arrValues[i]["iEndPairingId"]) ||
                        (arrResultValues[j]["iStartPairingId"] === arrValues[i]["iEndPairingId"] && arrResultValues[j]["iEndPairingId"] === arrValues[i]["iStartPairingId"])
                    ) {
                        blnFound = true;
                        break;
                    }
                }
                if (!blnFound) {
                    arrNewValues = [...arrNewValues, { ...arrValues[i], "cIsCorrectValue": "Y", "cIsUserAnswered": "N" }];
                }
            }
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: [...arrResultValues, ...arrNewValues]
                }
            };
        }
        else//Normal Execution
        {
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: []
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name GetMappedElementProps
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
     * @param {object} objElementJson Element json of mapped element.
     * @summary Returns props for mapped element.
     */
    GetMappedElementProps(objContext, objElementJson) {
        let objElementProps = {
            ...(objContext.props.IsForServerRenderHtml ? objContext.props : {}),
            "Mode": objContext.props.Mode,
            "ContainerId": objContext.props.ContainerId,
            "ParentRef": objContext.props.ElementRef,
            "PageId": objContext.props.PageId,
            "ElementRef": objElementJson.Ref,
            "ComponentController": objContext.props.ComponentController,
            "ElementJson": objElementJson,
            "JConfiguration": objContext.props.JConfiguration,
            // "PreservedState": Container_UndoRedoDataRef.current[ElementJson["iElementId"]]
        };
        return objElementProps;
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSPairingElement/CMSPairingElementStyles.css"
        ];
    }
}

export default CMSPairingElement_TestApplication_ModuleProcessor;

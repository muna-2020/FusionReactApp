//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSCheckbox_TestApplication_ModuleProcessor
 * @summary Contains the checkbox's test application version module specific methods.
 * */
class CMSDragdropAssign_Editor_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @summary Gets the ElementJson for the Component.
     * @returns {object} Element json
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
            if (UserAnswerJson) {
                let arrValues = UserAnswerJson["Answers"].map(objTempValue => {
                    return {
                        ...objContext.props.ElementJson["vElementJson"]["Values"].find(objTempData => objTempData["iElementDragDropAssignValueId"] === objTempValue["iElementDragDropAssignValueId"]),
                        ["iBlockId"]: objTempValue["iBlockId"],
                        ["iDisplayOrder"]: 0
                    };
                });
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: arrValues
                    }
                };
            }
            else {
                let arrValues = [];
                objContext.props.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                    if (!objTempValue["cIsTemporary"]) {
                        arrValues = [
                            ...arrValues,
                            {
                                ...objTempValue,
                                ["iBlockId"]: 2,
                                ["iDisplayOrder"]: 0
                            }
                        ];
                    }
                });
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: BaseCMSElement.ShuffleArray(arrValues)
                    }
                };
            }
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"])//Load User Response and User response Comparison
        {
            let arrValues = UserAnswerJson["Answers"].map(objTempValue => {
                return {
                    ...objContext.props.ElementJson["vElementJson"]["Values"].find(objTempData => objTempData["iElementDragDropAssignValueId"] === objTempValue["iElementDragDropAssignValueId"]),
                    ["iBlockId"]: objTempValue["iBlockId"],
                    ["iDisplayOrder"]: 0
                };
            });
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: arrValues
                }
            };
        }
        else//Normal Execution
        {
            let arrValues = [];
            objContext.props.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                if (!objTempValue["cIsTemporary"]) {
                    arrValues = [
                        ...arrValues,
                        {
                            ...objTempValue,
                            ["iBlockId"]: 2,
                            ["iDisplayOrder"]: 0
                        }
                    ];
                }
            });
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: BaseCMSElement.ShuffleArray(arrValues)
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.CMSDragdropAssign_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
        objContext.IsItemDropped.current = false;
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: [
                            ...objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                                return {
                                    ...objTempValue,
                                    ["iBlockId"]: 2,
                                    ["iDisplayOrder"]: 0
                                };
                            })
                        ]
                    }
                },
                "arrDragdropAssignAnswered": [],
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSDragdropAssign/CMSDragdropAssignStyles.css"
        ];
    }
}

export default CMSDragdropAssign_Editor_ModuleProcessor;

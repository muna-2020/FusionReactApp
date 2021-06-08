// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDragdrop/CMSDragdrop_Common/CMSDragdrop_Common';
import * as CMSDragdrop_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdrop/CMSDragdrop_TestApplication/CMSDragdrop_TestApplication_Hooks';
import CMSDragdrop_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdrop/CMSDragdrop_TestApplication/CMSDragdrop_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSDragdrop_TestApplication
 * @param {object} props component props
 * @param {any} ref componet ref
 * @summary CMSDragdrop's test application version.
 * @returns {any} CMSDragdrop_TestApplication
 */
const CMSDragdrop_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSDragdrop_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSDragdrop_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ModuleName": "CMSDragDrop_TestApplication_" + props.ElementJson.iElementId,
        "CMSDragdrop_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSDragdrop_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSDragdrop_TestApplication_ModuleProcessor);

    /**
     * @name CMSDragdrop_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSDragdrop_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSDragdrop_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name OnDrop
     * @param {element} objDraggedElement The Element being dragged and dropped.
     * @param {element} objDropArea The drop area where the dragged element is dropped.
     * @param {element} objSourceArea The source area from which the drag is happened.
     * @param {object} objDragdropData This is the data sent to drag component. It is returned as it is from there.
     * @summary Handler for the Mouse up/Touch end event.
     */
    const OnDrop = (objDraggedElement, objDropArea, objSourceArea, objDragdropData) => {
        if (objDropArea && objDropArea !== null && objDropArea.closest("div[ielementid='" + objDragdropData["iElementId"] + "']") && objDropArea.getAttribute("type") === "AnswerArea") {
            let arrValues = state.ElementJson["vElementJson"]["Values"];
            let intOptionId = parseInt(objDraggedElement.id);
            let intQuestionId = parseInt(objDropArea.id);
            if (objDropArea.children.length > 0) {
                if (objSourceArea.getAttribute("type") === "AnswerArea") {
                    let objValue1 = arrValues.find(objTempValue => objTempValue["iElementDragDropQuestionId"] === intQuestionId);
                    let objValue2 = arrValues.find(objTempValue => objTempValue["iElementDragDropAnswerId"] === intOptionId);
                    arrValues = arrValues.filter(objTempValue => objTempValue["iElementDragDropQuestionId"] !== intQuestionId);
                    arrValues = arrValues.filter(objTempValue => objTempValue["iElementDragDropAnswerId"] !== intOptionId);
                    arrValues = [
                        ...arrValues,
                        {
                            "iElementDragDropQuestionId": objValue1["iElementDragDropQuestionId"],
                            "iElementDragDropAnswerId": objValue2["iElementDragDropAnswerId"],
                        }
                    ];
                }
                else {
                    arrValues = arrValues.map(objTempValue => {
                        if (objTempValue["iElementDragDropQuestionId"] === intQuestionId) {
                            return {
                                "iElementDragDropQuestionId": intQuestionId,
                                "iElementDragDropAnswerId": intOptionId,
                            };
                        }
                        else {
                            return objTempValue;
                        }
                    });
                }
            }
            else {
                if (objSourceArea.getAttribute("type") === "AnswerArea") {
                    arrValues = arrValues.map(objTempValue => {
                        if (objTempValue["iElementDragDropAnswerId"] === intOptionId) {
                            return {
                                "iElementDragDropQuestionId": intQuestionId,
                                "iElementDragDropAnswerId": intOptionId,
                            };
                        }
                        else {
                            return objTempValue;
                        }
                    });
                }
                else {
                    arrValues = [
                        ...arrValues,
                        {
                            "iElementDragDropQuestionId": intQuestionId,
                            "iElementDragDropAnswerId": intOptionId,
                        }
                    ];
                }
            }
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
                    "arrDragdropAnswered": objContext.state.arrDragdropAnswered.filter(x => x["iElementDragDropAnswerId"] !== intOptionId),
                    // "ViewComparison": false,
                    // "ViewSolution": false,
                    // "LoadUserResponse": false,
                    // "ElementJsonWithAnswer": null,
                    // "UserAnswerJson": null,
                    // "ElementStatus": null
                }
            });
        }
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OnDrop": OnDrop
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSDragdrop_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return (
            <Common {...objCommonProps} />
        );
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     * */
    return GetContent();
};

export default CMSDragdrop_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSDragdrop_TestApplication_ModuleProcessor; 
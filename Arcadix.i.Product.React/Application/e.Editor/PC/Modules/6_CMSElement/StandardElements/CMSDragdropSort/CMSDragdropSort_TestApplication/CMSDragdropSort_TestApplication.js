// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDragdropSort/CMSDragdropSort_Common/CMSDragdropSort_Common';
import * as CMSDragdropSort_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropSort/CMSDragdropSort_TestApplication/CMSDragdropSort_TestApplication_Hooks';
import CMSDragdropSort_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropSort/CMSDragdropSort_TestApplication/CMSDragdropSort_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSDragdropSort_TestApplication
 * @param {object} props component props
 * @param {ref} ref componet ref
 * @summary CMSDragdropSort's test application version.
 * @returns {any} CMSDragdropSort_TestApplication
 */
const CMSDragdropSort_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSDragdropSort_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSDragdropSort_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSDragDropSort_TestApplication_" + props.ElementJson.iElementId,
        "CMSDragdropSort_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSDragdropSort_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSDragdropSort_TestApplication_ModuleProcessor);

    /**
     * @name CMSDragdropSort_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSDragdropSort_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSDragdropSort_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name OnDrop
     * @param {element} objDraggedElement The Element being dragged and dropped.
     * @param {element} objDropArea The drop area where the dragged element is dropped.
     * @param {element} objSourceArea The source area from which the drag is happened.
     * @param {object} objDragdropData This is the data sent to drag component. It is returned as it is from there.
     * @summary Handler for the Mouse up/Touch end event.
     */
    const OnDrop = (objDraggedElement, objDropArea, objSourceArea, objDragdropData) => {
        if (objDropArea && objDropArea !== null && objDropArea.closest("div[ielementid='" + objDragdropData["iElementId"] + "']")) {
            let arrValues = state.ElementJson["vElementJson"]["Values"];
            let intOptionId = parseInt(objDraggedElement.id);
            let objDragValue = arrValues.find(objTempValue => objTempValue["iElementDragDropSortValueId"] === intOptionId);
            let arrDragdropSortAnswered = objContext.state.arrDragdropSortAnswered.filter(x => x["iElementDragDropSortValueId"] !== intOptionId);
            if (objDropArea.getAttribute("type") === "AnswerArea") {
                let intDisplayOrder = parseInt(objDropArea.getAttribute("idisplayorder"));
                if (objSourceArea.getAttribute("type") === "AnswerArea") {
                    let objElementToShift = objDropArea.querySelector("div[type='AnswerOption']");
                    if (!objElementToShift || objElementToShift === null) {
                        arrValues = arrValues.map(objTempValue => {
                            if (objTempValue["iElementDragDropSortValueId"] === intOptionId) {
                                return {
                                    ...objTempValue,
                                    ["iDisplayOrder"]: intDisplayOrder
                                }
                            }
                            else {
                                return objTempValue;
                            }
                        });
                    }
                    else {
                        arrDragdropSortAnswered = arrDragdropSortAnswered.filter(x => x["iElementDragDropSortValueId"] !== parseInt(objElementToShift.id));
                        arrValues = arrValues.map(objTempValue => {
                            if (objTempValue["iElementDragDropSortValueId"] === intOptionId) {
                                return {
                                    ...objTempValue,
                                    ["iDisplayOrder"]: intDisplayOrder
                                };
                            }
                            else if (objTempValue["iElementDragDropSortValueId"] === parseInt(objElementToShift.id)) {
                                return {
                                    ...objTempValue,
                                    ["iDisplayOrder"]: parseInt(objSourceArea.getAttribute("idisplayorder"))
                                };
                            }
                            else {
                                return objTempValue;
                            }
                        });
                    }
                }
                else {
                    let objElementToShift = objDropArea.querySelector("div[type='AnswerOption']");
                    if (!objElementToShift || objElementToShift === null) {
                        arrValues = arrValues.map(objTempValue => {
                            if (objTempValue["iElementDragDropSortValueId"] === intOptionId) {
                                return {
                                    ...objTempValue,
                                    ["iDisplayOrder"]: intDisplayOrder
                                }
                            }
                            else {
                                return objTempValue;
                            }
                        });
                    }
                    else {
                        let objElementToShiftValue = arrValues.find(objTempValue => objTempValue["iElementDragDropSortValueId"] === parseInt(objElementToShift.id));
                        arrDragdropSortAnswered = arrDragdropSortAnswered.filter(x => x["iElementDragDropSortValueId"] !== parseInt(objElementToShift.id));
                        arrValues = arrValues.map(objTempValue => {
                            if (objTempValue["iElementDragDropSortValueId"] === intOptionId) {
                                return {
                                    ...objTempValue,
                                    ["iTempDisplayOrder"]: objElementToShiftValue["iTempDisplayOrder"],
                                    ["iDisplayOrder"]: intDisplayOrder
                                };
                            }
                            else if (objTempValue["iElementDragDropSortValueId"] === parseInt(objElementToShift.id)) {
                                return {
                                    ...objTempValue,
                                    ["iTempDisplayOrder"]: objDragValue["iTempDisplayOrder"],
                                    ["iDisplayOrder"]: -1
                                };
                            }
                            else {
                                return objTempValue;
                            }
                        });
                    }
                }
            }
            // else if (objDropArea.getAttribute("type") === "OptionArea" && objDropArea.children.length === 0) {
            //     arrValues = arrValues.map(objTempValue => {
            //         if (objTempValue["iElementDragDropSortValueId"] === intOptionId && objTempValue["iDisplayOrder"] === -1) {
            //             return {
            //                 ...objTempValue,
            //                 ["iDisplayOrder"]: -1
            //             };
            //         }
            //         else {
            //             return objTempValue;
            //         }
            //     });
            // }
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
                    "arrDragdropSortAnswered": arrDragdropSortAnswered,
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
                "OnDrop": OnDrop,
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSDragdropSort_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     */
    return state.isLoadComplete ? GetContent() : "";
};

export default CMSDragdropSort_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSDragdropSort_TestApplication_ModuleProcessor; 
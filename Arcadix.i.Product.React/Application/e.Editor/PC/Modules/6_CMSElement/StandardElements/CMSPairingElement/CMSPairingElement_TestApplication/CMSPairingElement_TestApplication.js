// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSPairingElement/CMSPairingElement_Common/CMSPairingElement_Common';
import * as CMSPairingElement_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPairingElement/CMSPairingElement_TestApplication/CMSPairingElement_TestApplication_Hooks';
import CMSPairingElement_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPairingElement/CMSPairingElement_TestApplication/CMSPairingElement_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name CMSPairingElement_TestApplication
 * @param {object} props props from parent.
 * @param {ref} ref ref to component.
 * @summary CMSPairingElement_TestApplication's testapplication version.
 * @returns {component} CMSPairingElement_TestApplication.
 */
const CMSPairingElement_TestApplication = (props, ref) => {

    /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSPairingElement_TestApplication_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        Element_UndoRedoDataRef,
        "ModuleName": "CMSPairingElement_TestApplication_" + props.ElementJson.iElementId,
        "IsItemDropped": useRef(false),
        "AddSubElementRef": useRef(null),
        "HolderArea": useRef(null),
        "PairingElementRef": useRef(null),
        "CMSPairingElement_TestApplication_ModuleProcessor": new CMSPairingElement_TestApplication_ModuleProcessor(),
        "Adjustment": { top: 10, left: 20 }
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSPairingElement_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSPairingElement_TestApplication_ModuleProcessor);

    /**
     * @name CMSPairingElement_TestApplication_Hook.Initialize
     * @summary Initialize method call in CMSPairingElement_TestApplication_Hook, that contains all the custom hooks.
     */
    CMSPairingElement_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "HandlePairingCircleClick": (iParingElementCircleId, ref) => {

                    if (objContext.state.iSelectedPairingElement && iParingElementCircleId !== objContext.state.iSelectedPairingElement) {
                        let length = objContext.state.ElementJson.vElementJson.Values.length;
                        let blnDrawPolyline = true;
                        for (let intCount = 0; intCount < length; intCount++) {
                            const { iStartPairingId, iEndPairingId } = objContext.state.ElementJson.vElementJson.Values[intCount];
                            if ((iParingElementCircleId === iStartPairingId && objContext.state.iSelectedPairingElement === iEndPairingId) ||
                                (objContext.state.iSelectedPairingElement === iStartPairingId && iParingElementCircleId === iEndPairingId)
                            ) {
                                blnDrawPolyline = false;
                            }
                        }
                        if (blnDrawPolyline) {
                            objContext.dispatch({
                                "type": "SET_STATE", "payload": {
                                    "ElementJson": {
                                        ...objContext.state.ElementJson,
                                        "vElementJson": {
                                            ...objContext.state.ElementJson.vElementJson,
                                            "Values": [
                                                ...objContext.state.ElementJson.vElementJson.Values,
                                                {
                                                    iPolylineId: UniqueId.GetUniqueId(),
                                                    iStartPairingId: objContext.state.iSelectedPairingElement,
                                                    iEndPairingId: iParingElementCircleId,
                                                    cIsUserAnswered: "Y"
                                                }
                                            ]
                                        }
                                    },
                                    "iSelectedPairingElement": null
                                }
                            });
                        }
                    }
                    else {
                        objContext.dispatch({ "type": "SET_STATE", "payload": { "iSelectedPairingElement": iParingElementCircleId } });
                    }
                },
                "HandlePolylineClick": (iPolylineId) => {
                    objContext.dispatch({
                        "type": "SET_STATE", "payload": {
                            "iSelectedPairingElement": iPolylineId
                        }
                    });
                },
                "ResetPairingElementValues": () => {
                    objContext.dispatch({
                        "type": "SET_STATE", "payload": {
                            "ElementJson": {
                                ...objContext.state.ElementJson,
                                "vElementJson": {
                                    ...objContext.state.ElementJson.vElementJson,
                                    "Values": []
                                }
                            },
                            "iSelectedPairingElement": null
                        }
                    })
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSPairingElement_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                },
                "GetMappedElementProps": (objMappedElementJson) => {
                    return {
                        ...objContext.CMSPairingElement_TestApplication_ModuleProcessor.GetMappedElementProps(objContext, objMappedElementJson),
                    };
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     */
    return GetContent();
};

export default CMSPairingElement_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSPairingElement_TestApplication_ModuleProcessor; 
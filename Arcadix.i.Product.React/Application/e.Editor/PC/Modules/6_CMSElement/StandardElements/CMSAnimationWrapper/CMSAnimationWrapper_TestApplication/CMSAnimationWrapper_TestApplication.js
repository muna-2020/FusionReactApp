// React related imports.
import React, { useReducer, useRef, useImperativeHandle } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Common/CMSAnimationWrapper_Common';
import * as CMSAnimationWrapper_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_TestApplication/CMSAnimationWrapper_TestApplication_Hooks';
import CMSAnimationWrapper_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_TestApplication/CMSAnimationWrapper_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

//StringFormatter imports
import { RestoreStringForXML } from "@shared/Framework/Services/DataFormatter/StringFormatter/StringFormatter";

/**
 * @name CMSAnimationWrapper_TestApplication
 * @param {object} props component props
 * @param {any} ref componet ref
 * @summary CMSAnimationWrapper's test application version.
 * @returns {any} CMSAnimationWrapper_TestApplication
 */
const CMSAnimationWrapper_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSAnimationWrapper_TestApplication_ModuleProcessor();

    /**
     * @name GetAnimationTestState
     * @param {object} objContext {state, props, dispatch}.
     * @param {object} objLoadSolutionType
     * @param {object} objAnimationElementJson
     * @param {object} objElementJsonWithAnswer
     * @param {object} objUserAnswerJson
     * @summary this update the test application state.
     */
    const GetAnimationTestState = (objElementJson) => {
        let strIframelessAnimation = objElementJson["vAnimationElementJson"]["vElementJson"]["cIsIframelessAnimation"] && objElementJson["vAnimationElementJson"]["vElementJson"]["cIsIframelessAnimation"] == "Y" ? "Y" : "N";
        let strHtmlDoc = RestoreStringForXML(objElementJson["vAnimationElementJson"]["WrapperContents"]["HtmlDoc"]);
        let strNewHtmlDoc = RestoreStringForXML(objElementJson["vAnimationElementJson"]["WrapperContents"]["HtmlDoc"]);
        let strNewHtmlDocSolution = RestoreStringForXML(objElementJson["vAnimationElementJson"]["WrapperContents"]["HtmlDoc"]);
        let intElementId = objElementJson.iElementId;
        if (strIframelessAnimation == "Y" && document && document !== null) {
            let objTempDiv = document.createElement("div");
            objTempDiv.innerHTML = strHtmlDoc;
            let arrIdNodes = objTempDiv.querySelectorAll('[id]');
            arrIdNodes.forEach(objIdNode => {
                let strNewId = objIdNode.id + "_" + intElementId + "_" + "TestApplication";
                objIdNode.id = strNewId;
            });

            let objTempDivSolution = document.createElement("div");
            objTempDivSolution.innerHTML = strHtmlDoc;
            let arrIdNodesSolution = objTempDivSolution.querySelectorAll('[id]');
            arrIdNodesSolution.forEach(objIdNode => {
                let strNewId = objIdNode.id + "_" + intElementId + "_" + "Solution";
                objIdNode.id = strNewId;
            });

            strNewHtmlDoc = objTempDiv.innerHTML;
            strNewHtmlDocSolution = objTempDivSolution.innerHTML;

            objElementJson = {
                ...objElementJson,
                "vAnimationElementJson": {
                    ...objElementJson.vAnimationElementJson,
                    "WrapperContents": {
                        ...objElementJson.vAnimationElementJson.WrapperContents,
                        "HtmlDoc": strNewHtmlDoc,
                        "HtmlDocSolution": strNewHtmlDocSolution
                    }
                }
            };
        }
        return {
            "ElementJson": objElementJson,
            "cIsIframelessAnimation": strIframelessAnimation,
        };
    };

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSAnimationWrapper_TestApplication_Hooks.GetInitialState(props, objModuleProcessor, GetAnimationTestState));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ComponentAnimationRef_Main": useRef(null),
        "ComponentAnimationRef_Solution": useRef(null),
        "ResetAnswer_Ref": useRef(false),
        "ModuleName": "CMSAnimationWapper_TestApplication_" + props.ElementJson.iElementId,
        "iFrameRef": useRef(null),
        "iFrameRef_Solution": useRef(null),
        "iFrameContainerDivRef": useRef(null),
        "CMSAnimationWrapper_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor);

    /**
     * @name useImperativeHandle
     * */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsLogic"] === "Y") {
                objContext.ResetAnswer_Ref.current = false;
                if (objContext.state.cIsIframelessAnimation && objContext.state.cIsIframelessAnimation.toLowerCase() === "y") {
                    return objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor.GetIframelessUserResponse(objContext);
                }
                else {
                    return objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor.GetIFrameUserResponse(objContext);
                }
            }
            else {
                return [];
            }
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            if (ElementJsonWithAnswer["vAnimationElementJson"]["vElementJson"]["cIsLogic"] === "Y") {
                objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
                let objLoadSolutionType = objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
                let objElementJson = objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
                let objNewElementJson = GetAnimationTestState(objElementJson).ElementJson;
                objContext.dispatch({
                    "type": "SET_STATE",
                    "payload": {
                        ...objLoadSolutionType,
                        "ElementJson": { ...objNewElementJson },
                        "blnIsDirectLoadSolution": false,
                        "ElementJsonWithAnswer": ElementJsonWithAnswer,
                        "UserAnswerJson": UserAnswerJson,
                        "ElementStatus": ElementEvaluationResult["iElementStatus"],
                        "blnIsResetAnswer": false,
                        "ToggleLoadSolution": !objContext.state.ToggleLoadSolution
                    }
                });
            }
        },
        "ResetAnswer": () => {
            objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {},
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
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
     */
    return GetContent();
};

export default CMSAnimationWrapper_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSAnimationWrapper_TestApplication_ModuleProcessor; 
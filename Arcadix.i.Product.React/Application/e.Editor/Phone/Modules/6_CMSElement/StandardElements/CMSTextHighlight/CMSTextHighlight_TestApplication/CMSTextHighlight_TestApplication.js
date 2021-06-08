//React Imports
import React, { useReducer, useImperativeHandle, useEffect, useRef, useState, createRef } from 'react';

//Base classes/hooks
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module Related Imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_Common/CMSTextHighlight_Common';
import * as CMSTextHighlight_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_TestApplication/CMSTextHighlight_TestApplication_Hooks';
import CMSTextHighlight_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_TestApplication/CMSTextHighlight_TestApplication_ModuleProcessor';
import CMSTextHighlight_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_Common/CMSTextHighlight_Common_ModuleProcessor';

//Components used.
import Text_TestApplication from "@root/Application/e.Editor/PC/Modules/7_Text/Text_TestApplication/Text_TestApplication";

// wrapping text editor with memo to prevent re-render when local state changes.
const TextElement = React.memo(Text_TestApplication);

/**
 * @name CMSHighlight_TestApplication
 * @param {object} props props from parent
 * @summary CMSHighlight's TestApplication version
 * @returns {any} CMSHighlight_TestApplication
 */
const CMSTextHighlight_TestApplication = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSTextHighlight_TestApplication_Hooks.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSTextHighlight_TestApplication_" + props.ElementJson.iElementId,
        "CMSTextHighlight_Common_ModuleProcessor": new CMSTextHighlight_Common_ModuleProcessor,
        "CMSTextHighlight_TestApplication_ModuleProcessor": new CMSTextHighlight_TestApplication_ModuleProcessor(),
        "SelectedColorDataRef": useRef(null),
        "arrUserAnswerJson": useRef([]),
        "ElementCurrentRef": useRef(null),
    };

    /**
     * @name useDataLoader
     * @param {object} objContext {state, props, dispatch, CMSTextHighlight_TestApplication_ModuleProcessor}
     * @summary this is used to load the state with data when the props are loaded.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            let objLoadSolutionType = objContext.CMSTextHighlight_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    ...objLoadSolutionType,
                    "isLoadComplete": true,
                    "ElementJson": GetElementJsonForComponent(objContext, objLoadSolutionType, objContext.state.ElementJsonWithAnswer, objContext.state.UserAnswerJson)
                }
            });
        }
    }, [objContext.props.ElementJson]);

    /**
    * @name useImperativeMethods
    * @param {object} objContext {state, props, dispatch, CMSTextHighlight_TestApplication_ModuleProcessor}
    * @summary Use to get user response for evaluating.
    */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            let arrResponse = [];
            arrResponse = [
                {
                    ["iElementId"]: objContext.props.ElementJson["iElementId"],
                    ["vElementTypeName"]: objContext.props.ElementJson["vElementTypeName"],
                    ["Answers"]: objContext.arrUserAnswerJson.current,
                    ["SubElements"]: objContext.state.ElementJson.TextRef.current.GetUserResponse(),
                    ["cIsAnswered"]: objContext.arrUserAnswerJson.current.length > 0 ? "Y" : "N"
                }
            ];
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSTextHighlight_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSTextHighlight_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
            //let objDomAppArea = document.getElementById("activeworkarea_" + objContext.props.Mode + "_" + objContext.props.PageId);
            //let objTextHighlightDiv = objDomAppArea.querySelector('[texteditorid="' + objContext.state.ElementJson["iElementId"] + '"]');
            let objTextHighlightElement = objContext.ElementCurrentRef.current.querySelector(`[id = "texteditor_test_${objContext.state.ElementJson.iElementId}"]`)
            objTextHighlightElement.innerHTML = objElementJson["vElementJson"]["vText"];
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult["iElementStatus"]
                }
            });
        },
        "ResetAnswer": () => {
            ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);

    /** @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.CMSTextHighlight_Common_ModuleProcessor.Initialize(objContext, objContext.CMSTextHighlight_Common_ModuleProcessor);

    /**
     * @name useEffect
     * @summary Adds the mouse click event.
     */
    useEffect(() => {
        document.addEventListener("click", HandleClickOnColor);
        return () => {
            console.log("Mouse event removed");
            document.addEventListener("click", HandleClickOnColor);
        }
    }, [])

    /**
    * @name GetElementJsonForComponent
    * @param {object} objContext {state, props, dispatch}
    * @param {object} objLoadSolutionType Load Solution Type
    * @param {object} ElementJsonWithAnswer Original Element Json
    * @param {object} UserAnswerJson User answer response
    * @summary Make the values uncheked for the test application version
    * @returns {object} Element Json modified according to test application viewing
    */
    const GetElementJsonForComponent = (objContext, objLoadSolutionType, ElementJsonWithAnswer = null, UserAnswerJson = null) => {
        let objElementJson;
        let strInnerHtml = objContext.props.ElementJson.vElementJson.vText;
        let objElement = document.createElement('div');
        objElement.innerHTML = strInnerHtml;
        let arrNodes = objElement.querySelectorAll('[actualtype="TextHighlight"]');
        arrNodes.forEach(objTempNode => {
            var anchorElement = document.createElement("span");
            anchorElement.id = objTempNode.id;
            anchorElement.innerHTML = objTempNode.innerHTML;
            anchorElement.style.cursor = "pointer";
            anchorElement.style.textDecoration = "underline";
            anchorElement.setAttribute("actualtype", `TextHighlight${objContext.state.ElementJson.iElementId}`);
            if (objLoadSolutionType["ViewSolution"]) {
                anchorElement.style.backgroundColor = ElementJsonWithAnswer.vElementJson.Values.filter(e => e.iElementTextHighlightValueId.toString() === objTempNode.id.toString())[0]["iElementTextHighlightValueColor"]
            }
            if (objLoadSolutionType["ViewComparison"]) {
                var arrFilteredValues = UserAnswerJson.Answers.filter(e => e.iElementTextHighlightValueId.toString() === objTempNode.id.toString());
                var arrActualFilteredValues = ElementJsonWithAnswer.vElementJson.Values.filter(e => e.iElementTextHighlightValueId.toString() === objTempNode.id.toString());
                var actualSelectedColor = arrActualFilteredValues[0]["iElementTextHighlightValueColor"];
                if (arrFilteredValues.length > 0) {
                    var userSelectedColor = arrFilteredValues[0]["iElementTextHighlightValueColor"];
                    if (actualSelectedColor === userSelectedColor) {
                        // correctly answered
                        anchorElement.classList.add('texthighlight-correct-answer');
                        anchorElement.style.backgroundColor = actualSelectedColor;
                    }
                    else {
                        // wrongly answered 
                        anchorElement.classList.add('texthighlight-wrong-answer');
                        anchorElement.style.backgroundColor = actualSelectedColor;
                    }
                }
                else {
                    // not answered
                    anchorElement.classList.add('texthighlight-correct-answer');
                    anchorElement.style.backgroundColor = actualSelectedColor
                }
            }
            objTempNode.replaceWith(anchorElement);
        });

        if (objLoadSolutionType["ViewSolution"]) //Show Original Solution
        {
            objContext.arrUserAnswerJson.current = UserAnswerJson["Answers"];
            if (UserAnswerJson !== null) {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: UserAnswerJson["Answers"],
                        ["vText"]: objElement.innerHTML
                    }
                };
            }
            else {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["Values"]: [],
                        ["vText"]: objElement.innerHTML
                    }
                };
            }
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"])//Load User Response and User response Comparison
        {
            objContext.arrUserAnswerJson.current = UserAnswerJson["Answers"];
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: UserAnswerJson["Answers"],
                    ["vText"]: objElement.innerHTML
                }
            };
        }
        else//Normal Execution
        {
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["Values"]: [],
                    ["vText"]: objElement.innerHTML
                }
            };
        }
        return {
            ...objElementJson,
            ["TextRef"]: createRef()
        };
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch}
     * @summary Resets the user response
     */
    const ResetAnswer = (objContext) => {
        //let objDomAppArea = document.getElementById("activeworkarea_" + objContext.props.Mode + "_" + objContext.props.PageId);
        //let objTextHighlightElement = objDomAppArea.querySelector(`[ielementid="${objContext.state.ElementJson.iElementId}"]`);
        let objTextHighlightElement = objContext.ElementCurrentRef.current.querySelector(`[id = "texteditor_test_${objContext.state.ElementJson.iElementId}"]`)
        let arrNodes = objTextHighlightElement.querySelectorAll(`[actualtype="TextHighlight${objContext.state.ElementJson.iElementId}"]`);
        arrNodes.forEach((objNode) => {
            objNode.removeAttribute("style");
            objNode.style.textDecoration = "underline";
            objNode.classList.remove('texthighlight-wrong-answer');
            objNode.classList.remove('texthighlight-correct-answer');
        });
        objContext.arrUserAnswerJson.current = [];
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
     * @name HandleClickOnColor
     * @param {object} event object
     * @summary Updates user selected values to ref
     */
    const HandleClickOnColor = (e) => {
        var elementType = e.target.getAttribute("actualtype");
        var elementID = e.target.id;
        if (elementType === `TextHighlight${props.ElementJson.iElementId}`) {
            if (objContext.SelectedColorDataRef.current !== null && elementID) {
                e.target.style.backgroundColor = objContext.SelectedColorDataRef.current;
                e.target.classList.remove('texthighlight-wrong-answer');
                e.target.classList.remove('texthighlight-correct-answer');
                objContext.arrUserAnswerJson.current = objContext.arrUserAnswerJson.current.filter(e => e.iElementTextHighlightValueId.toString() !== elementID.toString());
                objContext.arrUserAnswerJson.current = [
                    ...objContext.arrUserAnswerJson.current,
                    {
                        "iElementTextHighlightValueId": e.target.id,
                        "iElementTextHighlightValueColor": objContext.SelectedColorDataRef.current
                    }
                ];
            }
        }
    }

    /**
     * @name GetContent
     * @summary Calls the RenderBody() from the Common with passed events.
     * @returns {any} JSX recieved from Common.RenderBody
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {},
            "Callbacks": {
                "ChangeTextSelectionColor": (color) => {
                    objContext.SelectedColorDataRef.current = color;
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedColor": color } })
                },
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSTextHighlight_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId)
                    };
                },
            },
            "TextElement": TextElement,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    }

    /**
    * @summary Checks if the state is fully loaded and then call the GetContent().
    * @returns {any} JSX
    * */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : null;
}

export default CMSTextHighlight_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSTextHighlight_TestApplication_ModuleProcessor; 
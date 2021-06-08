//React Imports
import React, { useReducer, useEffect, useLayoutEffect, useRef, useImperativeHandle } from 'react';

//Base classes/hooks
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module Related Imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTextMark/CMSTextMark_Common/CMSTextMark_Common';
import CMSTextMark_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextMark/CMSTextMark_TestApplication/CMSTextMark_TestApplication_ModuleProcessor';
import * as CMSTextMark_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextMark/CMSTextMark_TestApplication/CMSTextMark_TestApplication_Hooks';

//Components used.
import Text_TestApplication from "@root/Application/e.Editor/PC/Modules/7_Text/Text_TestApplication/Text_TestApplication";

/**
 * @name CMSTextMark_TestApplication
 * @param {object} props props from parent
 * @summary CMSTextMark's TestApplication version
 * @returns {any} CMSTextMark_TestApplication
 */
const CMSTextMark_TestApplication = (props) => {

    let objInitalElementJson = props.IsForServerRenderHtml ? { ...props.ElementJson } : null;

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, {
        "ElementJson": objInitalElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": props.IsForServerRenderHtml ? true : false
    });

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "TextMarkRef": useRef(null),
        "ModuleName": "CMSTextMark_TestApplication_" + props.ElementJson.iElementId,
        "arrAnswerJson": useRef([]),
        "CMSTextMark_TestApplication_ModuleProcessor": new CMSTextMark_TestApplication_ModuleProcessor()
    };

    /**
     * @name useImperativeHandle
     * @summary Use to get user response for evaluating.
     */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            let objSubElementResponse = objContext.state.ElementJson.TextRef.current.GetUserResponse();
            let cIsAnswered = "Y";
            if (objSubElementResponse["cIsAnswered"] === "N") {
                cIsAnswered = "N";
            }
            else {
                cIsAnswered = "N";
                if (objContext.arrAnswerJson.current.filter(objTempData => objTempData["cIsCorrectValue"] === "Y").length > 0) {
                    cIsAnswered = "Y"
                }
            }
            let arrResponses = [
                {
                    "iElementId": objContext.state.ElementJson["iElementId"],
                    "vElementTypeName": objContext.state.ElementJson["vElementTypeName"],
                    "Answers": objContext.arrAnswerJson.current,
                    "SubElements": objSubElementResponse["Response"],
                    "cIsAnswered": cIsAnswered
                }
            ];
            return arrResponses;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.state.ElementJson.TextRef.current.LoadSolution(ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSTextMark_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            RemoveComparison();
            RemoveSolution()
            GetModifiedHtml(objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson, true);
        },
        "ResetAnswer": () => {
            objContext.state.ElementJson.TextRef.current.ResetAnswer();
            RemoveComparison();
            RemoveSolution()
            let objTextMarkElement = objContext.TextMarkRef.current;
            objContext.arrAnswerJson.current = objContext.arrAnswerJson.current.map(objTempData => {
                let objElement = objTextMarkElement.querySelector('[id="' + objTempData["iElementTextMarkValueId"] + '"]');
                if (objContext.props.ElementJson["vElementJson"]["cIsCollapsable"] === "Y") {
                    objElement.childNodes[1].setAttribute("class", "textmark-hide");
                    objElement.childNodes[0].setAttribute("class", "textmark-show");
                }
                objElement.childNodes[0].setAttribute("class", "textmark-test-application");
                return {
                    ...objTempData,
                    ["cIsCorrectValue"]: "N"
                };
            });
        }
    }), [objContext.state, objContext.props]);

    /**
     * @name useEffect
     * @summary Adds the event to the node.
     */
    useEffect(() => {
        if (state.isLoadComplete) {
            AttachEvent();
        }
    }, [state.isLoadComplete, state.ElementJson]);

    /**
     * @name useLayoutEffect
     * @summary this is used to load the state with data when the props are loaded.
     */
    useLayoutEffect(() => {
        if (props.ElementJson) {
            let objLoadSolutionType = objContext.CMSTextMark_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext);
            dispatch({
                type: "SET_STATE",
                payload: {
                    ...objLoadSolutionType,
                    "ElementJson": GetElementJsonForComponent(objLoadSolutionType, state.ElementJsonWithAnswer, state.UserAnswerJson),
                    "isLoadComplete": true
                }
            });
        }
    }, [props.ElementJson]);

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSTextMark_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSTextMark_TestApplication_ModuleProcessor);

    const AttachEvent = () => {
        props.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            let objTextMarkDiv = objContext.TextMarkRef.current;
            objTextMarkDiv.querySelector('[id="' + objTempValue["iElementTextMarkValueId"] + '"]').addEventListener("click", (event) => {
                MarkAnswer(parseInt(objTempValue["iElementTextMarkValueId"]));
            });
        });
    };

    /**
     * @name GetElementJsonForComponent
     * @param {object} objLoadSolutionType Load Solution Type
     * @summary Returns the element json object in the form it is used by componnet.
     * @returns {object} ElementJson
     */
    const GetElementJsonForComponent = (objLoadSolutionType, ElementJsonWithAnswer = null, UserAnswerJson = null) => {
        let objElementJson = {
            ...props.ElementJson,
            ["vElementJson"]: {
                ...props.ElementJson["vElementJson"],
                ["Values"]: [],
                ["vText"]: GetModifiedHtml(objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson)
            }
        };
        if (objLoadSolutionType["ViewSolution"])//Show Original Solution
        {
            if (UserAnswerJson !== null) {
                objContext.arrAnswerJson.current = UserAnswerJson["Answers"];
            }
            else {
                objContext.arrAnswerJson.current = props.ElementJson["vElementJson"]["Values"]
            }
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"])//Load User Response and User response Comparison
        {
            objContext.arrAnswerJson.current = UserAnswerJson["Answers"];
        }
        else//Normal Execution
        {
            objContext.arrAnswerJson.current = props.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: "N"
                };
            });
        }
        return {
            ...objElementJson,
            ["TextRef"]: React.createRef()
        };
    };

    /**
     * @name GetModifiedHtml
     * @param {object} objLoadSolutionType Load Solution Type
     * @summary Wraps the answers to an objTempElement tag with an event.
     * @returns {any} Inner Html
     */
    const GetModifiedHtml = (objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson, blnTakeHtmlFromTextEditor = false) => {
        let objDoc = null;
        if (props.IsForServerRenderHtml) {
            if (jsdom) {
                const { JSDOM } = jsdom;
                objDoc = (new JSDOM('')).window.document;
            }
        }
        else {
            objDoc = document;
        }
        if (objDoc && objDoc !== null) {
            let objElement = null;
            if (blnTakeHtmlFromTextEditor) {
                objElement = objContext.TextMarkRef.current;
            }
            else {
                objElement = objDoc.createElement('div');
                objElement.innerHTML = props.ElementJson["vElementJson"]["vText"];
            }
            let arrNodes = objElement.querySelectorAll('[actualtype="TextMark"]');
            arrNodes.forEach(objTempNode => {
                let node, objTempElement, objTempElementParent;
                if (objTempNode.tagName.toLowerCase() === "div") {
                    objTempElementParent = objDoc.createElement('div');
                }
                else {
                    objTempElementParent = objDoc.createElement('span');
                }
                objTempElement = objDoc.createElement('span');
                node = objDoc.createElement("span");
                node.innerHTML = objTempNode.innerHTML;
                if (objLoadSolutionType["ViewSolution"]) {
                    objTempElement.setAttribute("actualtype", "TextMark");
                    objTempElement.setAttribute("id", objTempNode.id);
                    if (objContext.props.ElementJson["vElementJson"]["cIsCollapsable"] === "Y") {
                        objTempElement.setAttribute("class", "textmark-test-application SolutionTextBGColor");
                        let objCollapseImageElement = objDoc.createElement('img');
                        objCollapseImageElement.src = objContext.props.JConfiguration.EditorSkinPath + "/Images/Common/Collapse.png";
                        objCollapseImageElement.setAttribute("class", "textmark-hide");
                        node.setAttribute("class", "textmark-show");
                        objTempElement.appendChild(node);
                        objTempElement.appendChild(objCollapseImageElement);
                    }
                    else {
                        objTempElement.setAttribute("class", "textmark-test-application");
                        objTempElement.appendChild(node);
                    }
                    objTempElementParent.appendChild(objTempElement);
                    objTempNode.replaceWith(objTempElementParent);
                }
                else if (objLoadSolutionType["ViewComparison"]) {
                    let objActualValue = ElementJsonWithAnswer["vElementJson"]["Values"].find(objTempData => objTempData["iElementTextMarkValueId"].toString() === objTempNode.id.toString());
                    let objResponse = UserAnswerJson["Answers"].find(objTempData => objTempData["iElementTextMarkValueId"].toString() === objTempNode.id.toString());
                    let objTickCrossImage = null;
                    if (objResponse["cIsCorrectValue"].toUpperCase() === "Y") {
                        if (objActualValue["cIsCorrectValue"].toUpperCase() === "Y") {
                            objTempNode.setAttribute("class", "textmark-test-application CorrectTextBGColor_TestApplication");
                        }
                        else {
                            objTempNode.setAttribute("class", "textmark-test-application WrongTextBGColor");
                        }
                    }
                    else {
                        if (objActualValue["cIsCorrectValue"].toUpperCase() === "Y") {
                            objTempNode.setAttribute("class", "textmark-test-application SolutionTextBGColor");
                        }
                        else {
                            objTempNode.setAttribute("class", "textmark-test-application");
                        }
                    }
                    if (objContext.props.ElementJson["vElementJson"]["cIsCollapsable"] === "Y") {
                        if (objResponse["cIsCorrectValue"].toUpperCase() === "Y") {
                            objTempNode.childNodes[0].setAttribute("class", "textmark-hide");
                            objTempNode.childNodes[1].setAttribute("class", "textmark-show");
                            objTickCrossImage = objDoc.createElement('img');
                            objTickCrossImage.id = objTempNode.id + "_tick";
                            if (objActualValue["cIsCorrectValue"].toUpperCase() === "Y") {
                                objTickCrossImage.src = objContext.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif";
                            }
                            else {
                                objTickCrossImage.src = objContext.props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.gif";
                            }
                        }
                        else {
                            objTempNode.childNodes[0].setAttribute("class", "textmark-show");
                            objTempNode.childNodes[1].setAttribute("class", "textmark-hide");
                        }
                    }
                    else {
                        if (objResponse["cIsCorrectValue"].toUpperCase() === "Y") {
                            objTickCrossImage = objDoc.createElement('img');
                            objTickCrossImage.id = objTempNode.id + "_tick";
                            if (objActualValue["cIsCorrectValue"].toUpperCase() === "Y") {
                                objTickCrossImage.src = objContext.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif";
                            }
                            else {
                                objTickCrossImage.src = objContext.props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.gif";
                            }
                        }
                    }
                    if (objTickCrossImage !== null) {
                        objTempNode.parentElement.appendChild(objTickCrossImage);
                    }
                }
                else if (objLoadSolutionType["LoadUserResponse"]) {
                    objTempElement.setAttribute("actualtype", "TextMark");
                    objTempElement.setAttribute("id", objTempNode.id);
                    let objResponse = UserAnswerJson["Answers"].find(objTempData => objTempData["iElementTextMarkValueId"].toString() === objTempNode.id.toString());
                    if (objContext.props.ElementJson["vElementJson"]["cIsCollapsable"] === "Y") {
                        let objCollapseImageElement = objDoc.createElement('img');
                        objCollapseImageElement.src = objContext.props.JConfiguration.EditorSkinPath + "/Images/Common/Collapse.png";
                        if (objResponse["cIsCorrectValue"].toUpperCase() === "Y") {
                            objCollapseImageElement.setAttribute("class", "textmark-show");
                            node.setAttribute("class", "textmark-hide");
                            objTempElement.setAttribute("class", "textmark-test-application CorrectTextBGColor_TestApplication");
                        }
                        else {
                            objCollapseImageElement.setAttribute("class", "textmark-hide");
                            node.setAttribute("class", "textmark-show");
                            objTempElement.setAttribute("class", "textmark-test-application");
                        }
                        objTempElement.appendChild(node);
                        objTempElement.appendChild(objCollapseImageElement);
                    }
                    else {
                        if (objResponse["cIsCorrectValue"].toUpperCase() === "Y") {
                            objTempElement.setAttribute("class", "textmark-test-application CorrectTextBGColor_TestApplication");
                        }
                        else {
                            objTempElement.setAttribute("class", "textmark-test-application");
                        }
                        objTempElement.appendChild(node);
                    }
                    objTempElementParent.appendChild(objTempElement);
                    objTempNode.replaceWith(objTempElementParent);
                }
                else {
                    objTempElement.setAttribute("actualtype", "TextMark");
                    objTempElement.setAttribute("id", objTempNode.id);
                    if (objContext.props.ElementJson["vElementJson"]["cIsCollapsable"] === "Y") {
                        objTempElement.setAttribute("class", "textmark-test-application");
                        let objCollapseImageElement = objDoc.createElement('img');
                        let objCollapseImageWrapper = objDoc.createElement('span');
                        objCollapseImageElement.src = objContext.props.JConfiguration.EditorSkinPath + "/Images/Common/Collapse.png";
                        objCollapseImageWrapper.appendChild(objCollapseImageElement);
                        objCollapseImageWrapper.setAttribute("class", "textmark-hide");
                        node.setAttribute("class", "textmark-show");
                        objTempElement.appendChild(node);
                        objTempElement.appendChild(objCollapseImageWrapper);
                    }
                    else {
                        objTempElement.setAttribute("class", "textmark-test-application");
                        objTempElement.appendChild(node);
                    }
                    objTempElementParent.appendChild(objTempElement);
                    objTempNode.replaceWith(objTempElementParent);
                }
            });
            return objElement.innerHTML;
        }
        else {
            return props.ElementJson["vElementJson"]["vText"];
        }
    };

    /**
     * @name MarkAnswer
     * @param {any} event dom event
     * @summary Invoked when the answer links are clicked. Add/Remove the answers from the answer json.
     */
    const MarkAnswer = (intElementTextMarkValueId) => {
        let objTextMarkElement = objContext.TextMarkRef.current;
        objContext.arrAnswerJson.current = objContext.arrAnswerJson.current.map(objTempData => {
            if (objTempData["iElementTextMarkValueId"] === intElementTextMarkValueId) {
                let objElement = objTextMarkElement.querySelector('[id="' + intElementTextMarkValueId + '"]');
                if (objTempData["cIsCorrectValue"] === "Y") {
                    if (objContext.props.ElementJson["vElementJson"]["cIsCollapsable"] === "Y") {
                        objElement.childNodes[1].setAttribute("class", "textmark-hide");
                        objElement.childNodes[0].setAttribute("class", "textmark-show");
                    }
                    objElement.setAttribute("class", "textmark-test-application");
                    return {
                        ...objTempData,
                        ["cIsCorrectValue"]: "N"
                    };
                }
                else {
                    if (objContext.props.ElementJson["vElementJson"]["cIsCollapsable"] === "Y") {
                        objElement.childNodes[0].setAttribute("class", "textmark-hide");
                        objElement.childNodes[1].setAttribute("class", "textmark-show");
                    }
                    objElement.setAttribute("class", "textmark-test-application CorrectTextBGColor_TestApplication");
                    return {
                        ...objTempData,
                        ["cIsCorrectValue"]: "Y"
                    };
                }
            }
            else {
                return {
                    ...objTempData
                };
            }
        });
    };

    /**
     * @name RemoveComparison
     * @summary Removes the coparison ticks.
     */
    const RemoveComparison = () => {
        let objTextMarkElement = objContext.TextMarkRef.current;
        props.ElementJson["vElementJson"]["Values"].map(objTempData => {
            let objTick = objTextMarkElement.querySelector('[id="' + objTempData["iElementTextMarkValueId"] + "_tick" + '"]');
            if (objTick && objTick !== null) {
                objTick.remove();
            }
        });
    };

    /**
     * @name RemoveSolution
     * @summary Removes the solution highlight.
     */
    const RemoveSolution = () => {
        let objTextMarkElement = objContext.TextMarkRef.current;
        props.ElementJson["vElementJson"]["Values"].map(objTempData => {
            objTextMarkElement.querySelector('[id="' + objTempData["iElementTextMarkValueId"] + '"]').setAttribute("class", "textmark-test-application");
        });
    }

    /**
     * @name GetContent
     * @summary Calls the RenderBody() from the Common with passed events.
     * @returns {any} JSX recieved from Common.RenderkBody
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {},
            "Callbacks": {},
            "TextElement": Text_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     * @returns {any} JSX
     */
    return state.isLoadComplete ? GetContent() : "";
};

export default CMSTextMark_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSTextMark_TestApplication_ModuleProcessor; 
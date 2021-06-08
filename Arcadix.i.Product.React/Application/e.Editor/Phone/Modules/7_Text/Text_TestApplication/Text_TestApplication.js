//React related imports.
import React, { useReducer, useLayoutEffect, useRef, useImperativeHandle } from "react";
import ReactDom from "react-dom";

//Module related imports.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as Text_TestApplication_Hook from '@shared/Application/e.Editor/Modules/7_Text/Text_TestApplication/Text_TestApplication_Hook';
import Text_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/7_Text/Text_TestApplication/Text_TestApplication_ModuleProcessor';

//Store related imports.
import { Provider } from "react-redux";
import store from "@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store";

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

import * as Helper from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper";

/**
 * @name TextEditor
 * @param {object} props Component Props
 * @param {object} ref Component ref
 * @summary This component handle text manipulation and addding , removing and updating sub element to parent element.
 * @returns {Component} Text_TestApplication.
 */
const Text_TestApplication = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, Text_TestApplication_Hook.GetInitialState(props));

    /**
     * @name TextDomRef
     * @summary a dom ref used to attach evens to content editable
     */
    const TextDomRef = useRef(null); // texteditor ref

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        props,
        dispatch,
        TextDomRef,
        ["Text_TestApplication_ModuleProcessor"]: new Text_TestApplication_ModuleProcessor()
    };

    /**
     * @name useLayoutEffect
     * @summary this Layout effect hydrate sub element first time.
     */
    useLayoutEffect(() => {
        console.log("text_testapplication context", objContext);
        if (objContext.state.TextJson && objContext.state.TextJson["vElementJson"]["SubElements"]) {
            HydrateSubElements({ arrSubElements: objContext.state.TextJson["vElementJson"]["SubElements"], intIndex: 0 });
        }
    }, [objContext.props.TextJson]);

    /**
     * @name useImperativeHandle
     * @summary used to get the user response.
     */
    useImperativeHandle(objContext.props.TextJson.TextRef, () => ({
        "GetUserResponse": () => {
            let arrResponse = [];
            let cIsAnswered = "Y";
            objContext.state.TextJson["vElementJson"]["SubElements"].map(objTempSubElement => {
                if (objTempSubElement.Ref.current !== null && objTempSubElement.Ref.current.GetUserResponse) {
                    let arrUserResponse = objTempSubElement.Ref.current.GetUserResponse();
                    if (arrUserResponse.length > 0 && arrUserResponse[0]["cIsAnswered"] === "N") {
                        cIsAnswered = "N";
                    }
                    arrResponse = [
                        ...arrResponse,
                        ...arrUserResponse
                    ];
                }
            });
            return {
                "Response": arrResponse,
                "cIsAnswered": cIsAnswered
            };
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, TextElementEvaluationResult = null) => {
            objContext.state.TextJson["vElementJson"]["SubElements"].map(objSubElementJson => {
                let objElementJsonWithAnswer, objUserAnswerJson, objSubElementEvaluationResult;
                if (ElementJsonWithAnswer) {
                    objElementJsonWithAnswer = ElementJsonWithAnswer["vElementJson"]["SubElements"].find(objTempData => objTempData["iElementId"] === objSubElementJson["iElementId"]);
                }
                if (UserAnswerJson) {
                    objUserAnswerJson = UserAnswerJson["SubElements"].find(objTempData => objTempData["iElementId"] === objSubElementJson["iElementId"]);
                }
                if (TextElementEvaluationResult) {
                    objSubElementEvaluationResult = TextElementEvaluationResult["SubElements"].find(objTempData => objTempData["iElementId"] === objSubElementJson["iElementId"]);
                }
                if (objSubElementJson.Ref.current && objSubElementJson.Ref.current.LoadSolution) {
                    objSubElementJson.Ref.current.LoadSolution(objElementJsonWithAnswer, objUserAnswerJson, objSubElementEvaluationResult);
                }
            });
        },
        "ResetAnswer": () => {
            objContext.state.TextJson["vElementJson"]["SubElements"].map((objTempSubElement) => {
                if (objTempSubElement.Ref && objTempSubElement.Ref.current && objTempSubElement.Ref.current.ResetAnswer) {
                    objTempSubElement.Ref.current.ResetAnswer();
                }
            });
        },
        "GetInnerHtml": () => {
            return GetInnerHtml();
        }
    }), [objContext.props, objContext.state]);

    /**
     * @name GetInnerHtml
     * @summary remove all subElement wrappers and returns the TextEdtitor html.
     * @returns {any} Innder HTML
     * */
    const GetInnerHtml = () => {
        if (TextDomRef.current.querySelector('.temp-subelement-wrap') !== null) {
            let objWrapSpan = TextDomRef.current.querySelector('.temp-subelement-wrap');
            let objFragment = document.createDocumentFragment();
            while (objWrapSpan.firstChild) {
                objFragment.appendChild(objWrapSpan.firstChild);
            }
            objWrapSpan.parentNode.replaceChild(objFragment, objWrapSpan);
            GetInnerHtml();
        }
        return TextDomRef.current.innerHTML;
    };

    /**
     * @name UnWrap
     * @summary this remove wrapper 
     * */
    const UnWrap = (objWrapSpan) => {
        let objFragment = document.createDocumentFragment();
        while (objWrapSpan.firstChild) {
            objFragment.appendChild(objWrapSpan.firstChild);
        }
        objWrapSpan.parentNode.replaceChild(objFragment, objWrapSpan);
    }

    /**
     * @name RemoveById
     * @param {any} strId
     * @summary this remove all the elements with strId (if more than one present). 
     */
    const UnWrapById = (strId) => {
        if (objContext.TextDomRef.current.querySelector("#" + strId) !== null) {
            UnWrap(objContext.TextDomRef.current.querySelector("#" + strId));
            UnWrapById(strId)
        }
    }

    /**
     * @name GetWrapper
     * @param {any} objElementJson sub element json.
     * @summary create and return a span with id and required attributes for a sub-element wrap and this will be removed later.
     * @returns {any} Wrapper span
     */
    const GetWrapper = (objSubElementJson) => {
        let objWrapperSpan = document.createElement('span');
        objWrapperSpan.id = "subelement_" + objSubElementJson["iElementId"];
        objWrapperSpan.className = "temp-subelement-wrap";
        objWrapperSpan.setAttribute("type", objSubElementJson["vElementTypeName"].toLowerCase() + "div");
        return objWrapperSpan;
    };

    /**
     * @name AttachSubElement 
     * @param {object} objSubElementJson sub element json.
     * @summary Call HydrateSubElement and add PageId and Wrapper div id.
     */
    // const AttachSubElement = (objSubElementJson) => {
    //     let objSpanToWrap = GetWrapper(objSubElementJson);
    //     let objElementToWrap = TextDomRef.current.querySelector('[ielementid="' + objSubElementJson["iElementId"] + '"]');
    //     if (objElementToWrap === null) {
    //         objElementToWrap = TextDomRef.current.querySelector('[ielementaccessid="' + objSubElementJson["iElementId"] + '"]');
    //     }
    //     if (objElementToWrap !== null) {
    //         objElementToWrap.parentNode.insertBefore(objSpanToWrap, objElementToWrap);
    //         objSpanToWrap.appendChild(objElementToWrap);
    //     }
    //     HydrateSubElement(objSubElementJson);
    // };

    /**
     * @name HydrateSubElement
     * @param {*} objSubElementJson sub element json.
     * @summary this create a wrapper span at cursor position and render sub element to that position and update the sub element to store.
     */
    // const HydrateSubElement = (objSubElementJson) => {
    //     if (objSubElementJson && objSubElementJson !== null) {
    //         let strDivId = "subelement_" + objSubElementJson["iElementId"];
    //         /**
    //          * if wrapper span is not present on the dom
    //          * 1.create the wrapper span
    //          * 2.append the created wrapper dom to the cursor position inside the content editable
    //          */
    //         if (objContext.TextDomRef.current && objContext.TextDomRef.current.querySelector("[id='" + strDivId + "']") === null) {
    //             let range = Selection.CreateRangeFromActiveSelection();
    //             if (range && range !== null) {
    //                 let objWrapper = GetWrapper(objSubElementJson); // creating a wrapper span to wrap around element
    //                 range.deleteContents(); // delete all selected text from the selection 
    //                 range.insertNode(objWrapper); // insert the wrapper span to the selection position
    //             }
    //             else {
    //                 return;
    //             }
    //         }
    //         let Element = props.ComponentController.GetElement(objSubElementJson["vElementTypeName"]);
    //         let objElementJsonWithAnswer, objUserAnswerJson, objSubElementEvaluationResult;
    //         if (props.ElementJsonWithAnswer) {
    //             objElementJsonWithAnswer = props.ElementJsonWithAnswer["vElementJson"]["SubElements"].find(objTempData => objTempData["iElementId"] === objSubElementJson["iElementId"]);
    //         }
    //         if (props.UserAnswerJson) {
    //             objUserAnswerJson = props.UserAnswerJson["SubElements"].find(objTempData => objTempData["iElementId"] === objSubElementJson["iElementId"]);
    //         }
    //         if (props.TextElementEvaluationResult) {
    //             objSubElementEvaluationResult = props.TextElementEvaluationResult["SubElements"].find(objTempData => objTempData["iElementId"] === objSubElementJson["iElementId"]);
    //         }
    //         let objWrapperDiv = TextDomRef.current.querySelector("#" + strDivId);
    //         let objNewSubElementJson = {
    //             ...props,
    //             "objValue": state.TextJson,
    //             "ParentRef": objContext.props.TextJson.TextRef,
    //             "ElementJson": objSubElementJson,
    //             "PageId": props.PageId,
    //             "Mode": props.Mode,
    //             "DivId": strDivId,
    //             "ElementRef": objSubElementJson["Ref"],
    //             "JConfiguration": props.JConfiguration,
    //             "ComponentController": props.ComponentController,
    //             "ElementJsonWithAnswer": objElementJsonWithAnswer,
    //             "UserAnswerJson": objUserAnswerJson,
    //             "ElementEvaluationResult": objSubElementEvaluationResult,
    //             "IsSubElement": "Y",
    //         };
    //         ReactDom.render(
    //             <Provider store={store}>
    //                 <PerformanceProfiler ComponentName={"CMS" + objSubElementJson.vElementTypeName + "_TestApplication_" + objSubElementJson.iElementId} JConfiguration={props.JConfiguration}>
    //                     <Element {...objNewSubElementJson} />
    //                 </PerformanceProfiler>
    //             </Provider>,
    //             objWrapperDiv
    //         );
    //     }
    // };

    const HydrateSubElements = ({ arrSubElements, intIndex = 0 }) => {
        if (objContext.props.ComponentController) {
            if (arrSubElements.length <= intIndex) {
                return false;
            } else if (arrSubElements[intIndex] && arrSubElements[intIndex] !== null) {
                let objSubElementJson = arrSubElements[intIndex], objElementJsonWithAnswer, objUserAnswerJson, objSubElementEvaluationResult;
                if (objContext.props.ElementJsonWithAnswer) {
                    objElementJsonWithAnswer = objContext.props.ElementJsonWithAnswer["vElementJson"]["SubElements"].find(objTempData => objTempData["iElementId"] === objSubElementJson["iElementId"]);
                }
                if (objContext.props.UserAnswerJson) {
                    objUserAnswerJson = objContext.props.UserAnswerJson["SubElements"].find(objTempData => objTempData["iElementId"] === objSubElementJson["iElementId"]);
                }
                if (objContext.props.TextElementEvaluationResult) {
                    objSubElementEvaluationResult = objContext.props.TextElementEvaluationResult["SubElements"].find(objTempData => objTempData["iElementId"] === objSubElementJson["iElementId"]);
                }
                UnWrapById("subelement_" + objSubElementJson["iElementId"]);
                let objSpanToWrap = GetWrapper(objSubElementJson);
                let objElementToWrap = null;
                if (objContext.TextDomRef.current.querySelector('[ielementid="' + objSubElementJson["iElementId"] + '"]') !== null) {
                    objElementToWrap = objContext.TextDomRef.current.querySelector('[ielementid="' + objSubElementJson["iElementId"] + '"]');
                } else {
                    objElementToWrap = objContext.TextDomRef.current.querySelector('[ielementaccessid="' + objSubElementJson["iElementId"] + '"]');
                }
                if (objElementToWrap !== null) {
                    objElementToWrap.parentNode.insertBefore(objSpanToWrap, objElementToWrap);
                    objSpanToWrap.appendChild(objElementToWrap);
                }

                if (objSubElementJson && objSubElementJson !== null) {
                    let strDivId = "subelement_" + objSubElementJson["iElementId"];
                    let objWrapperDiv = TextDomRef.current.querySelector("#" + strDivId);
                    if (objWrapperDiv !== null) {
                        let objNewSubElementJson = {
                            ...props,
                            "objValue": objContext.state.TextJson,
                            "ParentRef": objContext.props.TextJson.TextRef,
                            "ElementJson": objSubElementJson,
                            "PageId": objContext.props.PageId,
                            "Mode": objContext.props.Mode,
                            "DivId": strDivId,
                            "ElementRef": objSubElementJson["Ref"],
                            "JConfiguration": objContext.props.JConfiguration,
                            "ComponentController": objContext.props.ComponentController,
                            "ElementJsonWithAnswer": objElementJsonWithAnswer,
                            "UserAnswerJson": objUserAnswerJson,
                            "ElementEvaluationResult": objSubElementEvaluationResult,
                            "IsSubElement": "Y",
                        };
                        let Element = objContext.props.ComponentController.GetElement(objSubElementJson["vElementTypeName"]);
                        ReactDom.render(
                            <Provider store={store}>
                                <PerformanceProfiler ComponentName={"CMS" + objSubElementJson.vElementTypeName + "_TestApplication_" + objSubElementJson.iElementId} JConfiguration={props.JConfiguration}>
                                    <Element {...objNewSubElementJson} />
                                </PerformanceProfiler>
                            </Provider>,
                            objWrapperDiv,
                            () => {
                                HydrateSubElements({ arrSubElements, intIndex: intIndex + 1 });
                            }
                        );
                    }
                }
            }
        }
    }

    /**
     * @name ProcessVText 
     * @param {string} strVText
     * @summary this process the vtext for test application. 
     */
    const ProcessVText = (strVText) => {
        let objTempDiv = document.createElement("div");
        objTempDiv.innerHTML = strVText;
        let arrEditables = objTempDiv.querySelectorAll("[contenteditable]");
        if (arrEditables.length > 0) {
            arrEditables.forEach(objEditable => objEditable.removeAttribute("contenteditable"));
        }
        return objTempDiv.innerHTML.toString();
    };

    const GetContent = () => {
        const strClassNames = objContext.props.ClassNames || objContext.props.classNames;
        const strRootClassName = "text-editor-main ";
        var vText = objContext.props.IsForServerRenderHtml ? Helper.GetTextElementJson(objContext.props)["vElementJson"]["vText"] : ProcessVText(objContext.props.TextJson["vElementJson"]["vText"]);
        return (
            <div
                className={strClassNames ? strRootClassName + strClassNames : strRootClassName}
                texteditorid={objContext.props.TextJson.iElementId}
                suppressContentEditableWarning
                type={objContext.props.Type}
                style={{ widht: "100%", height: "100%" }}
                ref={TextDomRef}
                id={objContext.state.TextState.TextEditorId}
                dangerouslySetInnerHTML={{ __html: vText }} />
        );
    };

    return GetContent();
};

export default Text_TestApplication;

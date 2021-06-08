//React Imports
import React, { useReducer, useImperativeHandle, useEffect, useRef, createRef } from 'react';

//Base classes/hooks
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module Related Imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_Common/CMSCrossOutWord_Common';
import * as CMSCrossOutWord_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_TestApplication/CMSCrossOutWord_TestApplication_Hooks';
import CMSCrossOutWord_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_TestApplication/CMSCrossOutWord_TestApplication_ModuleProcessor';
import CMSCrossOutWord_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_Common/CMSCrossOutWord_Common_ModuleProcessor';

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
const CMSCrossOutWord_TestApplication = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSCrossOutWord_TestApplication_Hooks.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSCrossOutWord_TestApplication_" + props.ElementJson.iElementId,
        "CMSCrossOutWord_Common_ModuleProcessor": new CMSCrossOutWord_Common_ModuleProcessor(),
        "CMSCrossOutWord_TestApplication_ModuleProcessor": new CMSCrossOutWord_TestApplication_ModuleProcessor(),
        "SelectedColorDataRef": useRef(null),
        "iClickCount": useRef(0),
        "arrUserAnswerJson": useRef([]),
        "ElementSelectedRef": useRef(null)
    };

    /**
     * @name useDataLoader
     * @param {object} objContext {state, props, dispatch, CMSCrossOutWord_TestApplication_ModuleProcessor}
     * @summary this is used to load the state with data when the props are loaded.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            let objLoadSolutionType = objContext.CMSCrossOutWord_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext);
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
    * @param {object} objContext {state, props, dispatch, CMSCrossOutWord_TestApplication_ModuleProcessor}
    * @summary Use to get user response for evaluating.
    */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            let arrResponse = [];
            if (objContext.arrUserAnswerJson.current.length > 0) {
                arrResponse = [
                    {
                        ["iElementId"]: objContext.props.ElementJson["iElementId"],
                        ["vElementTypeName"]: objContext.props.ElementJson["vElementTypeName"],
                        ["Answers"]: objContext.arrUserAnswerJson.current,
                        ["SubElements"]: objContext.state.ElementJson.TextRef.current.GetUserResponse(),
                        ["cIsAnswered"]: objContext.arrUserAnswerJson.current.length > 0 ? "Y" : "N"
                    }
                ];
            }
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSCrossOutWord_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSCrossOutWord_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objCrossOutWordTextEditor = objContext.ElementSelectedRef.current.querySelector(`[id = "texteditor_test_${objContext.state.ElementJson.iElementId}"]`)
            objCrossOutWordTextEditor.innerHTML = objElementJson["vElementJson"]["vText"];
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult ? ElementEvaluationResult["iElementStatus"] : null
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
    objContext.CMSCrossOutWord_Common_ModuleProcessor.Initialize(objContext, objContext.CMSCrossOutWord_Common_ModuleProcessor);

    /**
     * @name useEffect
     * @summary Adds the mouse click event.
     */
    useEffect(() => {
        document.addEventListener("click", HandleClickOnColor);
        return () => {
            console.log("Mouse event removed");
            document.removeEventListener("click", HandleClickOnColor);
        }
    }, [])

    /**
    * @name GetElementJsonForComponent
    * @param {object} objContext {state, props, dispatch}
    * @param {object} objLoadSolutionType Load Solution Type
    * @param {object} ElementJsonWithAnswer Original Element Json
    * @param {object} UserAnswerJson User answer response
    * @param {object} ElementEvaluationResult Evaluation result json
    * @summary Make the values uncheked for the test application version
    * @returns {object} Element Json modified according to test application viewing
    */
    const GetElementJsonForComponent = (objContext, objLoadSolutionType, ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
        let objElementJson;
        let strInnerHtml = objContext.props.ElementJson.vElementJson.vText;
        let objElement = document.createElement('div');
        objElement.innerHTML = strInnerHtml;
        let arrNodes = objElement.querySelectorAll('[actualtype="CrossOutWord"]');
        arrNodes.forEach(objTempNode => {
            var anchorElement = document.createElement("span");
            anchorElement.id = objTempNode.id;
            anchorElement.innerHTML = objTempNode.innerHTML;
            anchorElement.style.cursor = "pointer";
            //anchorElement.style.textDecoration = "underline";
            anchorElement.setAttribute("actualtype", `CrossOutWord${objContext.state.ElementJson.iElementId}`);
            objTempNode.replaceWith(anchorElement);
        });

        if (objLoadSolutionType["ViewSolution"]) //Show Original Solution
        {
            var arrUserAnswers = [...ElementJsonWithAnswer.vElementJson["Values"]];
            for (let i = 0; i < arrUserAnswers.length; i++) {
                var objUserAnswer = arrUserAnswers[i];
                var answer = objElement.querySelector(`[id='${objUserAnswer["iElementCrossOutWordValueId"]}']`);
                if (answer) {
                    answer.style.backgroundColor = "green";
                    answer.style.color = "#fff";
                }
            }
            if (UserAnswerJson !== null) {
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
            var arrValue = [...ElementEvaluationResult.ElementJson.vElementJson.Values];
            var arrUserAnswers = [...ElementEvaluationResult["UserAnswerJson"]];
            for (let i = 0; i < arrUserAnswers.length; i++) {
                var objUserAnswer = arrUserAnswers[i];
                var answer = objElement.querySelector(`[id='${objUserAnswer["iElementCrossOutWordValueId"]}']`);
                arrValue = arrValue.filter(e => e["iElementCrossOutWordValueId"] !== objUserAnswer["iElementCrossOutWordValueId"]);
                if (answer) {
                    var fragment = document.createDocumentFragment();
                    var img = document.createElement('img');
                    img.id = answer.id + "_tick";
                    img.setAttribute("type", "tick");
                    if (objUserAnswer["cIsCorrectValue"].toLowerCase() === "y") {
                        var clone = answer.cloneNode(true);
                        clone.style.backgroundColor = "green";
                        clone.style.color = "#fff";
                        img.src = props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif";
                        fragment.appendChild(clone);
                        fragment.appendChild(img);
                        answer.replaceWith(fragment);
                    }
                    else {
                        var clone = answer.cloneNode(true);
                        clone.style.backgroundColor = "red";
                        clone.style.color = "#fff";
                        img.src = props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.gif";
                        fragment.appendChild(clone);
                        fragment.appendChild(img);
                        console.log(fragment);
                        answer.replaceWith(fragment);
                    }
                }
            }
            // showing solution for not answered values
            arrValue.forEach((ele) => {
                var answer = objElement.querySelector(`[id='${ele["iElementCrossOutWordValueId"]}']`);
                if (answer) {
                    answer.style.backgroundColor = "green";
                    answer.style.color = "#fff";
                }
            });
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
        let objCrossOutWordElement = objContext.ElementSelectedRef.current.querySelector(`[id = "texteditor_test_${objContext.state.ElementJson.iElementId}"]`)
        objCrossOutWordElement.querySelectorAll('[type="tick"]').forEach(e => e.parentNode.removeChild(e));
        let arrNodes = objCrossOutWordElement.querySelectorAll(`[actualtype="CrossOutWord${objContext.state.ElementJson.iElementId}"]`);
        arrNodes.forEach((objNode) => {
            objNode.removeAttribute("style");
            //objNode.style.textDecoration = "underline";
            objNode.classList.remove("cross-out-word-text-decoration");
        })
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

    const clearSelection = () => {
        if (document.selection && document.selection.empty) {
            document.selection.empty();
        } else if (window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }

    /**
     * @name HandleClickOnColor
     * @param {object} event object
     * @summary Updates user selected values to ref
     */
    const HandleClickOnColor = (e) => {
        e.target.removeAttribute('style');
        var blnStrikeThrough = true;
        var nextSibling = e.target.nextSibling;
        if (nextSibling && nextSibling.tagName === "IMG" && nextSibling.getAttribute("type") === "tick") {
            e.target.parentNode.removeChild(nextSibling);
            blnStrikeThrough = false;
        }
        var elementType = e.target.getAttribute("actualtype");
        var cIsStrikeThrough = e.target.getAttribute("cIsStrikeThrough");
        var cIsStrikeThroughCorrectValue = "Y";
        var elementID = e.target.id;
        clearSelection();
        if (elementType === `CrossOutWord${props.ElementJson.iElementId}` && blnStrikeThrough) {
            if (cIsStrikeThrough === "Y") {
                cIsStrikeThroughCorrectValue = "N";
                e.target.classList.remove('cross-out-word-text-decoration');
                objContext.arrUserAnswerJson.current = objContext.arrUserAnswerJson.current.filter(e => e.iElementCrossOutWordValueId.toString() !== elementID.toString());
                objContext.iClickCount.current -= 1;
                e.target.setAttribute("cIsStrikeThrough", cIsStrikeThroughCorrectValue);
            }
            else {
                //if (objContext.iClickCount.current < props.ElementJson.vElementJson.iAnswerCount) {
                e.target.classList.add('cross-out-word-text-decoration');
                objContext.arrUserAnswerJson.current = [...objContext.arrUserAnswerJson.current, { "iElementCrossOutWordValueId": e.target.id, "cIsCorrectValue": "N" }];
                objContext.iClickCount.current += 1;
                e.target.setAttribute("cIsStrikeThrough", cIsStrikeThroughCorrectValue);
                //}
            }
        }
        if (!blnStrikeThrough) {
            e.target.classList.remove('cross-out-word-text-decoration');
            objContext.arrUserAnswerJson.current = objContext.arrUserAnswerJson.current.filter(e => e.iElementCrossOutWordValueId.toString() !== elementID.toString());
            objContext.iClickCount.current -= 1;
            e.target.setAttribute("cIsStrikeThrough", "N");
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
                        ...objContext.CMSCrossOutWord_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId)
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
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />
}

export default CMSCrossOutWord_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSCrossOutWord_TestApplication_ModuleProcessor; 
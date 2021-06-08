//React related imports.
import React, { useLayoutEffect, useRef, useImperativeHandle, forwardRef, useReducer, useEffect } from "react";
import ReactDom from "react-dom";

//Module related imports.
import * as EditorBase_Hook from "@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook";
import * as Text_Editor_Hook from '@shared/Application/e.Editor/Modules/7_Text/Text_Editor/Text_Editor_Hook';
import Text_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/7_Text/Text_Editor/Text_Editor_ModuleProcessor';

//Store related imports.
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";
import { Provider } from "react-redux";
import store from "@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store";

//UndoRedo imports.
import { UndoRedo, UndoRedoAction } from "@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo";

//Selection related imports.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

//Common CMSElement functions.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//Image meta data file
import * as CMSImage_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_MetaData";

import * as Helper from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper";

/**
 * @name TextEditor
 * @param {object} props Component Props.
 * @param {object} ref component ref.
 * @summary this component handle text manipulation and adding, removing and updating sub element to parent element.
 * @returns {JSX} Text_Editor Component.
 */
const Text_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, Text_Editor_Hook.GetInitialState(props));

    /**
     * @name TextDomRef
     * @summary a dom ref used to attach evens to content editable.
     */
    const TextDomRef = useRef(null); // text-editor ref

    const SelectionRef = useRef({}); // to store selected selection and range. 

    /**
     * @name Element_UndoRedoDataRef
     * @summary this holds the preserved states of all the sub-elements added.
     */
    const Element_UndoRedoDataRef = useRef(props.PreservedState && props.PreservedState.SubElementState ? props.PreservedState.SubElementState : {});

    const DataRef = useRef({ KeyPressCount: 0 });

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { state, props, SelectionRef, dispatch, "Element_UndoRedoDataRef": Element_UndoRedoDataRef, TextDomRef, ["Text_Editor_ModuleProcessor"]: new Text_Editor_ModuleProcessor() };

    /**
     * @name Text_Editor_Hook.Initialize
     * @summary Initialize method call in CMSCheckbox_Editor_Hook, that contains all the custom hooks.
     */
    Text_Editor_Hook.Initialize(objContext);

    /**
     * @name OnInputDiv
     * @param {HTML_Event} objEvt input event.
     * @summary on input event.
     */
    const OnInputDiv = () => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnInputDiv: Entered");
        /* develblock:end */
        SaveSelectionAndUpdateRefToStore();
        RemoveSubElements();
        objContext.Text_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        dispatch({
            type: "SET_STATE",
            payload: {
                ["TextState"]: {
                    ...state.TextState,
                    ["status"]: "input_started"
                }
            },
            blnUndoRedoUpdate: false
        });
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnInputDiv: Exited");
        /* develblock:end */
    };

    /**
     * @name RemoveSubElementsFromDom
     * @param {any} objContext { state, props, SelectionRef, dispatch, Ref: SubElementState, TextDomRef, ["Text_Editor_ModuleProcessor"]}.
     * @summary remove the sub-elements from the dom which are not present in SubElements[].
     */
    const RemoveSubElementsFromDom = (objContext) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.RemoveSubElementsFromDom: Entered");
        /* develblock:end */
        let objTextEditor = objContext.TextDomRef.current;
        if (objTextEditor && objTextEditor !== null) {
            let arrDomSubElements = objTextEditor.querySelectorAll('[ielementtypeid][ielementid]');
            arrDomSubElements.forEach(objDomSubElement => {
                let strSubElementId = objDomSubElement.getAttribute('ielementid');
                if (!state.TextJson["vElementJson"].SubElements.find(objSubElementTemp => String(objSubElementTemp["iElementId"]) === strSubElementId)) {
                    objDomSubElement.parentElement.remove();
                }
            });
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.RemoveSubElementsFromDom: Exited");
        /* develblock:end */
    };

    /**
     * @name useLayoutEffect
     * @summary   This is responsible for attaching the events to the current active ref.
     */
    useLayoutEffect(() => {
        RemoveSubElementsFromDom(objContext);
    }, [objContext.state.TextJson["vElementJson"]["SubElements"], objContext.props]);

    /**
     * @name useLayoutEffect
     * @summary this Layout effect hydrate sub element first time.
     */
    useLayoutEffect(() => {
        HydrateAllSubElements(objContext, true);
    }, []);

    /**
     * @name useLayoutEffect
     * @summary this uselayourEffect is responsible for hydrating the sub element doing undo, redo operation.
     */
    useLayoutEffect(() => {
        if (state.Action && (state.Action.toLowerCase() === 'redo' || state.Action.toLowerCase() === 'undo')) {
            HydrateSubElements({
                arrSubElements: objContext.state.TextJson.vElementJson.SubElements,
                isHtmlLoaded: true,
                isReverse: true,
                isUndoRedo : true
            });
        }
    }, [objContext.state.StateHistory]);

    /**
     * @name useLayoutEffect
     * @summary   This useLayoutEffect attaches events to the text-editor.
     */
    useLayoutEffect(() => {
        /**
         * @name MakeOtherTableInvisible
         * @param {any} objActiveTable
         * @summary this make other table as invisible.
         */
        const MakeOtherTableInvisible = (objActiveTable = null) => {
            if (objContext.TextDomRef.current != null) {
                let arrDomTables = objContext.TextDomRef.current.querySelectorAll("table[type='texttable']");
                arrDomTables.forEach(domTable => {
                    if (objActiveTable !== null && domTable.getAttribute("isinvisibletable") === "Y" && !domTable.isSameNode(objActiveTable)) {
                        domTable.border = 0;
                    } else if (objActiveTable === null && domTable.getAttribute("isinvisibletable") === "Y") {
                        domTable.border = 0;
                    }
                });
            }
        };

        /**
         * @name ToggleVisibleTable
         * @param {object} objEvt
         * @summary make table visible
         */
        const ToggleVisibleTable = (objEvt) => {
            let objTarget = objEvt.target;
            if (objTarget.closest(".workarea") != null) {
                if (objEvt.target.closest("table") !== null && objEvt.target.closest("table").getAttribute("type") === "texttable") {
                    let objActiveClickedElement = {
                        "Type": "TextTable",
                        "Data": {
                            "Table": objEvt.target.closest('Table[type="texttable"]'),
                            "RowIndex": objEvt.target.parentElement.rowIndex,
                            "CellIndex": objEvt.target.cellIndex
                        }
                    };
                    EditorState.SetProperty("ActiveClickElement", objActiveClickedElement);
                    if (objEvt.target.closest("table").getAttribute("isinvisibletable") === "Y") {
                        objEvt.target.closest("table").border = 1;
                    }
                    MakeOtherTableInvisible(objEvt.target.closest("table"))
                } else {
                    MakeOtherTableInvisible()
                }
            }
        };

        /**
         * @name makeTableVisible
         * @param {any} objEvt
         * @summary make table visible
         */
        const MakeTableInvisible = (objEvt) => {
            if (objEvt.currentTarget.getAttribute("isinvisibletable") === "Y") {
                objEvt.currentTarget.border = 0;
            }
        };

        /**
         * @name SetCursorPosition
         * @param {object} objEvent
         * @summary this update the cursor position. 
         */
        const SetCursorPosition = (objEvent) => {
            if ((objEvent.target.hasAttribute("ielementid") && objEvent.target.closest("span[wrap-type=subelement]") !== null)
                && objEvent.target.closest("[ielementid]") !== null) {
                let objNewRange = new Range(), objElement, intElementTypeId, arrInputTypeSubElements = [26, 6];
                if (objEvent.target.hasAttribute("ielementid")) {
                    objElement = objEvent.target.hasAttribute("ielementid") ? objEvent.target : objEvent.target.closest("[ielementid]");
                }
                intElementTypeId = parseInt(objElement.getAttribute('ielementtypeid'));
                if (!arrInputTypeSubElements.includes(intElementTypeId)) {
                    objNewRange.setStartAfter(objElement);
                    objNewRange.setEndAfter(objElement);
                    objNewRange.collapse(false);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(objNewRange);
                    Selection.UpdateSelection(objNewRange, objContext.props.TextJson.TextRef);
                }
            }
        };

        /**
         * @name MouseDownEvent`
         * @param {object} objEvent
         * @summary this is muousedown event. 
         */
        const MouseDownEvent = (objEvent) => {
            ToggleVisibleTable(objEvent);
            SetCursorPosition(objEvent);
        }
        document.addEventListener("mousedown", MouseDownEvent);
        return () => {
            document.removeEventListener("mousedown", MouseDownEvent);
        };
    }, [props, objContext.TextDomRef, objContext.state.TextJson.vElementJson.vText]);

    /**
     * @name useLayoutEffect
     * @sumary this re-hydrate sub-elements when vText changes.
     * */
    useLayoutEffect(() => {
        (async () => {
            let arrSubElements = [];
            for (let intCount = 0; intCount < state.TextJson["vElementJson"]["SubElements"].length; intCount++) {
                let objSubElement = state.TextJson["vElementJson"]["SubElements"][intCount];
                if (objSubElement.Ref && objSubElement.Ref.current && objSubElement.Ref.current !== null) {
                    let objLatestJson = await objSubElement.Ref.current.GetElementJson(objContext.TextDomRef)
                    arrSubElements = [...arrSubElements, objLatestJson];
                }
            }
            HydrateSubElements({
                arrSubElements: arrSubElements,
                isHtmlLoaded: true
            });
        })();
    }, [objContext.state.TextJson.vElementJson.vText]);

    /**
     * @name UpdateTextToState
     * @summary this update the html to state.
     * */
    const UpdateTextToState = () => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.UpdateTextToState: Entered");
        /* develblock:end */
        if (state.TextJson.vElementJson.vText !== objContext.TextDomRef.current.innerHTML) {
            objContext.Text_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    ["UndoRedo_vText"]: objContext.TextDomRef.current.innerHTML,
                    // ["TextJson"]: {
                    //     ...state.TextJson,
                    //     ["vElementJson"]: {
                    //         ...state.TextJson.vElementJson,
                    //         ["vText"]: objContext.TextDomRef.current.innerHTML
                    //     }
                    // }
                }
            });
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.UpdateTextToState: Exited");
        /* develblock:end */
    }

    /**
     * @name UpdateSelectionAndUpdateRefToStore
     * @summary this update the selection of the text and update the active text ref to store.
     * */
    const SaveSelectionAndUpdateRefToStore = () => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.SaveSelectionAndUpdateRefToStore: Entered");
        /* develblock:end */
        SaveSelection();
        UpdateTextRefToStore();
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.SaveSelectionAndUpdateRefToStore: Exited");
        /* develblock:end */
    }

    /**
     * @name OnKeyPress
     * @param {object} objContext { state, props, SelectionRef, dispatch, Ref: SubElementState, TextDomRef, ["Text_Editor_ModuleProcessor"]}.
     * @param {HTML_Event} objEvt key press events.
     * @summary this update the state on every 5 key press.
     */
    const OnKeyPress = (objContext, objEvt) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnKeyPress: Entered");
        /* develblock:end */
        if (objEvt.target.getAttribute("contenteditable") === "true") {
            if (DataRef.current.KeyPressCount >= 5) {
                DataRef.current.KeyPressCount = 0;
                objContext = objContext.props.TextJson.TextRef.current.GetLatestContext();
                objContext.Text_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                objContext.dispatch({
                    type: "SET_STATE",
                    payload: {
                        ["UndoRedo_vText"]: objContext.TextDomRef.current.innerHTML
                    }
                });
            } else {
                DataRef.current.KeyPressCount = DataRef.current.KeyPressCount + 1;
            }
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnKeyPress: Exited");
        /* develblock:end */
    };

    /**
     * @name GetWrapper
     * @param {object} objElementJson sub element json.
     * @summary create and return a span with id and required attributes for a sub-element wrap and this will be removed later.
     * @return {HTML_object} Wrapper span.
     **/
    const GetWrapper = (objElementJson) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.GetWrapper: Entered");
        /* develblock:end */
        let objWrapperSpan = document.createElement('span');
        objWrapperSpan.id = "subelement_" + objElementJson["iElementId"];
        objWrapperSpan.setAttribute("wrap-type", "subelement");
        objWrapperSpan.setAttribute("type", objElementJson["vElementTypeName"].toLowerCase() + "div");
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.GetWrapper: Exited");
        /* develblock:end */
        return objWrapperSpan;
    };

    /**
     * @name AttachSubElement 
     * @param {object} objSubElementJson sub element json.
     * @param {boolean} isHtmlLoaded true/false. true in case the sub-element Html is already present in Text_Editor div.
     * @summary Call HydrateSubElement and add PageId and Wrapper div id.
     */
    const AttachSubElement = (objSubElementJson, isHtmlLoaded) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.AttachSubElement: Entered");
        /* develblock:end */
        HydrateSubElements({ arrSubElements: [objSubElementJson], isHtmlLoaded });
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.AttachSubElement: Exited");
        /* develblock:end */
    };

    /**
     * @name HydrateSubElement
     * @param {object} objSubElementJson sub element json.
     * @param {boolean} isHtmlLoaded true/false.
     * @summary This create a wrapper span at cursor position and render sub element to that position and update the sub element to store.
     */
    const HydrateSubElements = ({ arrSubElements, isHtmlLoaded, intIndex = 0 , isUndoRedo = false}) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.HydrateSubElements: Entered");
        /* develblock:end */
        if (props.ComponentController) { // add sub-element when ComponentController present.
            if (arrSubElements.length <= intIndex) {
                return;
            } else if (arrSubElements[intIndex] && arrSubElements[intIndex] !== null) {                
                let objSubElementJson = !arrSubElements[intIndex].Ref ? { ...arrSubElements[intIndex], "Ref": React.createRef() } : arrSubElements[intIndex];
                if (isHtmlLoaded) {
                    let objSpanToWrap = null, objElementToWrap = null;
                    if(isUndoRedo){
                        if(objContext.TextDomRef.current && objContext.TextDomRef.current !== null){
                            objSpanToWrap = objContext.TextDomRef.current.querySelector(`#subelement_${objSubElementJson["iElementId"]}`);
                            if(objSpanToWrap !== null)
                            objSpanToWrap.innerHTML = "";
                        }
                    }else{
                        UnWrapById("subelement_" + objSubElementJson["iElementId"]);
                    }
                    if(objSpanToWrap === null){
                        objSpanToWrap = GetWrapper(objSubElementJson);
                    }                 
                    if(objSubElementJson.iElementTypeId === 50){ // in case of wiki

                        let strWikiText = objSubElementJson.vElementJson.Values[0].vWikiKeyword;
                        let arrDomSubElements = objContext.TextDomRef.current.querySelectorAll('[ielementid="' + objSubElementJson["iElementId"] + '"]');
                         for(let i=0; i<arrDomSubElements.length; i++){
                            if(arrDomSubElements[i].innerText.trim() === strWikiText){
                                objElementToWrap = arrDomSubElements[i];
                                break;
                            }
                         }

                         if(objElementToWrap === null){ // if ielementid not found check for ielementaccessid
                            let arrAccessDomSubElements = objContext.TextDomRef.current.querySelectorAll('[ielementaccessid="' + objSubElementJson["iElementId"] + '"]');
                            for(let i=0; i<arrAccessDomSubElements.length; i++){
                               if(arrAccessDomSubElements[i].innerText.trim() === strWikiText){
                                   objElementToWrap = arrAccessDomSubElements[i];
                                   break;
                               }
                            }
                         }

                    }else{
                        if (objContext.TextDomRef.current.querySelector('[ielementid="' + objSubElementJson["iElementId"] + '"]') !== null) {
                            objElementToWrap = objContext.TextDomRef.current.querySelector('[ielementid="' + objSubElementJson["iElementId"] + '"]');
                        } else {
                            objElementToWrap = objContext.TextDomRef.current.querySelector('[ielementaccessid="' + objSubElementJson["iElementId"] + '"]');
                        }
                    }                 
                    if (objElementToWrap !== null) {
                        objElementToWrap.parentNode.insertBefore(objSpanToWrap, objElementToWrap);
                        objSpanToWrap.appendChild(objElementToWrap);
                    }
                }
                if (objSubElementJson && objSubElementJson !== null) {
                    let strDivId = "subelement_" + objSubElementJson["iElementId"];
                    /**
                     * if wrapper span is not present on the dom.
                     * 1.create the wrapper span.
                     * 2.append the created wrapper dom to the cursor position inside the content editable.
                     */
                    if (objContext.TextDomRef.current && objContext.TextDomRef.current.querySelector("[id='" + strDivId + "']") === null) {
                        let objSelection = Selection.GetSelection(objContext.props.TextJson.TextRef);
                        let range = null;
                        if (objSelection) {
                            range = objSelection.Range;
                        }
                        if (range && range !== null) {
                            let objWrapper = GetWrapper(objSubElementJson); // creating a wrapper span to wrap around element.
                            range.deleteContents(); // delete all selected text from the selection.
                            range.insertNode(objWrapper); // insert the wrapper span to the selection position.
                        }
                        else {
                            return;
                        }
                    }
                    let Element = UndoRedo(props.ComponentController.GetElement(objSubElementJson.vElementTypeName));
                    let objWrapperDiv = objContext.TextDomRef.current.querySelector("#" + strDivId);
                    let objNewSubElementJson = {
                        "objValue": state.TextJson,
                        "ElementJson": objSubElementJson,
                        "ParentRef": objContext.props.TextJson.TextRef,
                        "PageId": props.PageId,
                        "Mode": props.Mode,
                        "DivId": strDivId,
                        "TextEditorId": props.TextJson.iElementId,
                        "elementRef": objSubElementJson["Ref"],
                        "JConfiguration": props.JConfiguration,
                        "ComponentController": props.ComponentController,
                        "PreservedState": Element_UndoRedoDataRef.current[objSubElementJson["iElementId"]],
                        "IsSubElement": "Y",
                        "RenderCallback": () => {
                            if (!isHtmlLoaded) {
                                Selection.SetCursorToEnd(objSubElementJson.iElementId, objContext.TextDomRef, objContext.props.TextJson.TextRef);
                            }
                        }
                    };
                    ReactDom.hydrate(
                        <Provider store={store}>
                            <PerformanceProfiler ComponentName={"CMS" + objSubElementJson.vElementTypeName + "_Editor_" + objSubElementJson.iElementId} JConfiguration={JConfiguration}>
                                <Element {...objNewSubElementJson} ref={objSubElementJson["Ref"]} />
                            </PerformanceProfiler>
                        </Provider>,
                        objWrapperDiv,
                        () => {
                            if (!isHtmlLoaded) {
                                objContext.Text_Editor_ModuleProcessor.AddSubElement(objContext, objSubElementJson, objContext.TextDomRef.current.innerHTML);
                            }
                            HydrateSubElements({ arrSubElements, isHtmlLoaded, intIndex: intIndex + 1 });
                        });
                }
            }
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.HydrateSubElements: Exited");
        /* develblock:end */
    };

    /**
     * @name RemoveSubElements
     * @summary   this method remove sub elements from the state which is not present in the text-editor.
     */
    const RemoveSubElements = () => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.RemoveSubElements: Entered");
        /* develblock:end */
        let textEditor = objContext.TextDomRef.current;
        let arrElementsToRemove = [];
        state.TextJson["vElementJson"]["SubElements"].forEach(objTempSubElementJson => {
            if (objTempSubElementJson !== null) {
                if (textEditor.querySelector('[ielementid="' + objTempSubElementJson["iElementId"] + '"]') === null) {
                    arrElementsToRemove = [...arrElementsToRemove, objTempSubElementJson];
                }
            }
        });
        if (arrElementsToRemove.length > 0) {
            objContext.Text_Editor_ModuleProcessor.RemoveSubElement(objContext, arrElementsToRemove);
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.RemoveSubElements: Exited");
        /* develblock:end */
    };

    /**
     * @name ResetActiveObjects
     * @param {HTML_Event} objEvt HTml event.
     * @summary this removes the sub element active objects/ methods attached to the store when clicked or changes made in TextEditor.
     * */
    const ResetActiveObjects = (objEvt) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.ResetActiveObjects: Entered");
        /* develblock:end */
        if (EditorState.GetProperty("AddSubFormula") && objEvt && objEvt.target) {
            let objFormulaTarget = objEvt.target;
            if (!objFormulaTarget || objFormulaTarget === null || objFormulaTarget.closest('span[type="JFormulaEditorPlaceholder"]') === null) {
                EditorState.RemoveProperty("AddSubFormula");
            }
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.ResetActiveObjects: Exited");
        /* develblock:end */
    };

    /**
     * @name SaveSelection
     * @param {HTML_Event} objEvt Event
     * @summary save active selection to store.
     */
    const SaveSelection = (objEvt) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.SaveSelection: Entered");
        /* develblock:end */
        UpdateTextRefToStore();
        if (objEvt && objEvt.target && objEvt.target.getAttribute('vElementTypeName') && objEvt.target.getAttribute('vElementTypeName').toLowerCase() === 'overlay' || objEvt && objEvt.updateSelection) {
            //
        }
        else {
            Selection.ChangeActiveSelection_New(objContext.TextDomRef, objContext.SelectionRef);
        }
        ResetActiveObjects(objEvt);
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.SaveSelection: Exited");
        /* develblock:end */
    };

    /**
     * @name OnHtmlPaste
     * @param {HTML_Event} objEvt Paste Event.
     * @summary this method convert pasted html to the plain text and paste.
     */
    const OnHtmlPaste = (objEvt) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnHtmlPaste: Entered");
        /* develblock:end */
        objEvt.preventDefault();
        objEvt.stopPropagation();
        let strCopied = objEvt.clipboardData.getData("text");
        let objSelection = Selection.GetSelection(ref);
        if (objSelection.SourceElement && objSelection.SourceElement !== null) {
            if (objSelection.SourceElement.closest("[contenteditable='true']") !== null) {
                let objTempSpan = document.createElement("span");
                objTempSpan.setAttribute("type", "SELECTIONSPAN");
                objTempSpan.innerHTML = strCopied;
                document.execCommand("insertHTML", false, objTempSpan.outerHTML);
            }
        }

        // screenshot paste
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        // find pasted image among pasted items
        var blob = null;
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") === 0) {
                blob = items[i].getAsFile();
            }
        }
        // load image if there is a pasted image
        if (blob !== null) {
            var reader = new FileReader();
            reader.onload = function (event) {
                //  console.log(event.target.result); // data url!
                AttachSubElement({
                    ...CMSImage_Editor_MetaData.GetDefaultElementJson(),
                    "cIsFusionVersion": EditorState.GetReference("EditorRef").current.IsFusionVersion(),
                    "blnScreenShotPaste": true,
                    "blob": blob,
                    "dataURL": event.target.result
                }, false);
            };
            reader.readAsDataURL(blob);
        }

        UpdateTextRefToStore();
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnHtmlPaste: Exited");
        /* develblock:end */
    };

    /**
     * @name OnElmentDragOver
     * @param {HTML_Event} objEvt drag over event.
     * @summary   this stop the element drag over event over the TextEditor.
     */
    const OnElmentDragOver = (objEvt) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnElmentDragOver: Entered");
        /* develblock:end */
        objEvt.preventDefault();
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnElmentDragOver: Exited");
        /* develblock:end */
    };

    /**
     * @name OnClick
     * @param {HTML_Event} objEvent html click event.
     * @summary text editor click event.
     */
    const OnClick = (objEvent) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnClick: Entered");
        /* develblock:end */
        let objMouseDownElement = objEvent.target;
        objContext.SelectionRef.current = {
            ...objContext.SelectionRef.current,
            MouseDownObject: objMouseDownElement
        };
        setTimeout(() => {
            let objStartTabRef = EditorState.GetReference("StartTabRef");
            if (objStartTabRef && objStartTabRef.current !== null) {
                objStartTabRef.current.Text_EditorClick();
            }
        }, 10);
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnClick: Exited");
        /* develblock:end */
    };

    /**
     * @name UnWrap
     * @summary this remove wrapper 
     * */
    const UnWrap = (objWrapSpan) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.UnWrap: Entered");
        /* develblock:end */
        let objFragment = document.createDocumentFragment();
        while (objWrapSpan.firstChild) {
            objFragment.appendChild(objWrapSpan.firstChild);
        }
        objWrapSpan.parentNode.replaceChild(objFragment, objWrapSpan);
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.UnWrap: Exited");
        /* develblock:end */
    }

    /**
     * @name RemoveWrappers
     * @summary this remove all the wrapper element and replace it with child elements.
     * @param {string} strSelector querySelector selector.
     */
    const RemoveWrappers = (strSelector) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.RemoveWrappers: Entered");
        /* develblock:end */
        if (objContext.TextDomRef.current.querySelector(strSelector) !== null) { // removing sub-element wrappers.
            let objWrapSpan = objContext.TextDomRef.current.querySelector(strSelector);
            UnWrap(objWrapSpan);
            RemoveWrappers(strSelector);
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.RemoveWrappers: Exited");
        /* develblock:end */
    };

    /**
     * @name ReplaceSubElementHtmlWithImg
     * @summary this replaces sub-element with one image tag
     * @returns {string} inner html.
     * */
    const ReplaceSubElementHtmlWithImg = (objElementJson, strInnerHtml) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.ReplaceSubElementHtmlWithImg: Entered");
        /* develblock:end */
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = strInnerHtml;
        objElementJson.vElementJson.SubElements.forEach(objSubElement => {
            if (objSubElement.vElementTypeName.toLowerCase() === 'image') {
                let objDomImage = document.createElement("img");
                let objImageDiv = tempDiv.querySelector('[ielementid="' + objSubElement["iElementId"] + '"]');
                objDomImage.src = objSubElement.iElementId + "_Image_" + objSubElement.vElementJson.iImageFileVersion + "." + objSubElement.vElementJson.vImageType;
                objDomImage.id = objImageDiv.id;
                objDomImage.setAttribute("ielementid", objImageDiv.id);
                objDomImage.setAttribute("ielementaccessid", objImageDiv.id);
                objDomImage.setAttribute("ielementtypeid", objSubElement.iElementTypeId);
                objDomImage.setAttribute("type", "Image_Text");
                objImageDiv.replaceWith(objDomImage);
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.ReplaceSubElementHtmlWithImg: Exited");
        /* develblock:end */
        return tempDiv.innerHTML;
    }

    /**
     * @name UpdateInvisibleTable
     * */
    const UpdateInvisibleTables = () => {
        let arrDomTables = objContext.TextDomRef.current.querySelectorAll("table[type='texttable']");
        arrDomTables.forEach(domTable => {
            if (domTable.getAttribute("isinvisibletable") === "Y") {
                domTable.border = 0;
            }
        });
    }

    /**
     * @name GetInnerHtml
     * @summary remove all subElement wrappers and returns the TextEdtitor html.
     * @returns {string} Text Editor Inner HTML.
     * */
    const GetInnerHtml = (objElementJson) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.GetInnerHtml: Entered");
        /* develblock:end */
        RemoveWrappers('[wrap-type="subelement"]'); // Remove sub-element wrappers.
        RemoveWrappers('.BadWord'); // Remove bad-word wrappers.
        UpdateInvisibleTables();
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.GetInnerHtml: Exited");
        /* develblock:end */
        return ReplaceSubElementHtmlWithImg(objElementJson, objContext.TextDomRef.current.innerHTML);
    };

    /**
     * @name RemoveById
     * @param {any} strId
     * @summary this remove all the elements with strId (if more than one present). 
     */
    const UnWrapById = (strId) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.UnWrapById: Entered");
        /* develblock:end */
        if (objContext.TextDomRef.current.querySelector("#" + strId) !== null) {
            UnWrap(objContext.TextDomRef.current.querySelector("#" + strId));
            UnWrapById(strId)
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.UnWrapById: Exited");
        /* develblock:end */
    }

    /**
     * @name HydrateAllSubElements
     * @param {object} objContext Context object
     * @param {bool} isHtmlLoaded If the HTML is loaded or not.
     * @summary calls the AttacheSubelement method.
     */
    const HydrateAllSubElements = (objContext, isHtmlLoaded) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.HydrateAllSubElements: Entered");
        /* develblock:end */
        if (objContext.state.TextJson && objContext.state.TextJson["vElementJson"]["SubElements"]) {
            objContext.state.TextJson["vElementJson"]["SubElements"].map(objSubElementJson => {
                AttachSubElement(objSubElementJson, isHtmlLoaded);
            });
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.HydrateAllSubElements: Exited");
        /* develblock:end */
    };

    /**
     * @name OnContextMenu
     * @param {HTML_Event} objEvt context-menu Event.
     * @summmary this event handler is responsible for displaying the context-menu.
     */
    const OpenContextMenu = (objEvt) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OpenContextMenu: Entered");
        /* develblock:end */
        SaveSelectionAndUpdateRefToStore();
        objEvt.preventDefault();
        objEvt.stopPropagation();
        UpdateTextToState();
        if (objEvt.target && objEvt.target !== null && objEvt.target.classList.contains("BadWord")) {
            objContext.SelectionRef.current = { ...objContext.SelectionRef.current, ["BadWord"]: objEvt.target.innerText };
        } else {
            objContext.SelectionRef.current = { ...objContext.SelectionRef.current, ["BadWord"]: "" };
        }
        let blnShowTableContextMenu = false;
        if (objEvt.target.closest("table[type='texttable']") !== null) {
            blnShowTableContextMenu = true;
        }
        objContext.Text_Editor_ModuleProcessor.OpenContextMenu({
            objContext,
            objClientXY: { ["clientX"]: objEvt.clientX, ["clientY"]: objEvt.clientY },
            blnShowTableContextMenu: blnShowTableContextMenu
        });
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OpenContextMenu: Exited");
        /* develblock:end */
    };

    /**
     * @name ReplaceBadWord
     * @param {string} strRightWord Right word.
     * @summary this method replaces the selected bad word with right word.
     */
    const ReplaceBadWord = (strRightWord) => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.ReplaceBadWord: Entered");
        /* develblock:end */
        Selection.PreserveSelection();
        if (window.getSelection().rangeCount > 0) {
            let objBadWordNode = window.getSelection().anchorNode.parentNode;
            if (objBadWordNode.classList.contains("BadWord")) {
                objBadWordNode.parentNode.replaceChild(document.createTextNode(strRightWord), objBadWordNode);
            }
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.ReplaceBadWord: Exited");
        /* develblock:end */
    };

    /**
     * @name OnFocus
     * @summary this changes the Text editor background color when focused.
     */
    const OnFocus = () => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnFocus: Entered");
        /* develblock:end */
        let objCMSTextContext = objContext.props.ParentRef.current.GetLatestContext();
        if (!objCMSTextContext.state.ElementJson.vElementJson.cIsWithBorder || objCMSTextContext.state.ElementJson.vElementJson.cIsWithBorder === "N") {
            TextDomRef.current.style.backgroundColor = "oldlace";
        }
        UpdateTextRefToStore();
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnFocus: Exited");
        /* develblock:end */
    };

    /**
     * @name OnBlur
     * @summary changes the Text editor background color when focus is lost.
     */
    const OnBlur = () => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnBlur: Entered");
        /* develblock:end */
        if (TextDomRef.current.style.getPropertyValue("background-color")) {
            TextDomRef.current.style.removeProperty("background-color");
        }
        if (objContext.props.OnBlur) {
            objContext.props.OnBlur();
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.OnBlur: Exited");
        /* develblock:end */
    };

    /**
     * @name IgnoreBadWord
     * @summary this remove Selected BadWord Marking.
     * */
    const IgnoreBadWord = () => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.IgnoreBadWord: Entered");
        /* develblock:end */
        Selection.PreserveSelection();
        if (window.getSelection().rangeCount > 0) {
            let objBadWordNode = window.getSelection().anchorNode.parentNode;
            if (objBadWordNode.classList.contains("BadWord")) {
                objBadWordNode.parentNode.replaceChild(document.createTextNode(objBadWordNode.innerText), objBadWordNode);
            }
        }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.IgnoreBadWord: Exited");
        /* develblock:end */
    };

    /**
     * @name UpdateTextRefToStore
     * @summary this add the active text ref to the store.
     * */
    const UpdateTextRefToStore = () => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.UpdateTextRefToStore: Entered");
        /* develblock:end */
        if (objContext.props.Type && objContext.props.Type !== null) { // special case text_editor ref(such as wiki/overlay sidebar).
            switch (props.Type.toLowerCase()) {
                case 'overlay':
                    EditorState.SetReference('ActiveOverlaySidebar', objContext.props.TextJson.TextRef);
                    break;
                case 'textmark':
                    EditorState.SetReference('ActiveTextMark', objContext.props.TextJson.TextRef);
                    break;
                case "wiki":
                    EditorState.SetReference('ActiveWiki', objContext.props.TextJson.TextRef);
                    break;
            }
        }
        //else { // update the normal text_editor active ref to store.
            EditorState.SetReference("CurrentTextRef", objContext.props.TextJson.TextRef);
       // }
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.UpdateTextRefToStore: Exited");
        /* develblock:end */
    };

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    const CloseSidebar = () => {
        /* develblock:start */
        global.ApplicationLog.Log("CloseSidebar: Entered");
        /* develblock:end */
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
        /* develblock:start */
        global.ApplicationLog.Log("CloseSidebar: Exiting");
        /* develblock:end */
    };

    /**
     * @name useImperativeHandle
     * @summary used to get the text editor state from TextEditor(this ref is used by the parent component to get latest element json and internally for dom manipulation).
     */
    useImperativeHandle(objContext.props.TextJson.TextRef, () => ({
        "GetElementJson": async (blnRemoveRef, strSaveActionType) => {
            let arrSubElements = [];
            for (let intCount = 0; intCount < state.TextJson["vElementJson"]["SubElements"].length; intCount++) {
                var objSubElementJson = state.TextJson["vElementJson"]["SubElements"][intCount];
                if (objSubElementJson.Ref && objSubElementJson.Ref.current && objSubElementJson.Ref.current.GetElementJson) {
                    objSubElementJson = await objSubElementJson.Ref.current.GetElementJson(blnRemoveRef, strSaveActionType, objContext.TextDomRef);
                }
                arrSubElements = [
                    ...arrSubElements,
                    objSubElementJson
                ];
            }
            let objElementJson = {
                ...state.TextJson,
                ["vElementJson"]: {
                    ...state.TextJson["vElementJson"],
                    ["SubElements"]: arrSubElements
                }
            };
            objElementJson = {
                ...objElementJson, ["vElementJson"]: { ...objElementJson["vElementJson"], ["vText"]: GetInnerHtml(objElementJson) },
            };
            return objElementJson;
        },
        "UpdateTaskEditStatus": () => {
            objContext.Text_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        },
        "GetElementJsonForCopy": async () => {
            let arrSubElements = [];
            for (let intCount = 0; intCount < state.TextJson["vElementJson"]["SubElements"].length; intCount++) {
                var objSubElementJson = state.TextJson["vElementJson"]["SubElements"][intCount];
                if (objSubElementJson.Ref && objSubElementJson.Ref.current && objSubElementJson.Ref.current.GetElementJsonForCopy) {
                    objSubElementJson = await state.TextJson["vElementJson"]["SubElements"][intCount].Ref.current.GetElementJsonForCopy(objContext.TextDomRef);
                }
                arrSubElements = [
                    ...arrSubElements,
                    objSubElementJson
                ];
            }
            let objElementJson = {
                ...state.TextJson,
                ["vElementJson"]: {
                    ...state.TextJson["vElementJson"],
                    ["SubElements"]: arrSubElements
                }
            };
            objElementJson = {
                ...objElementJson, ["vElementJson"]: { ...objElementJson["vElementJson"], ["vText"]: GetInnerHtml(objElementJson) },
            };
            return objElementJson;
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "GetLatestState": () => {
            var objElementjson = {
                ...state.TextJson,
                ["PreservedState"]: objContext.Ref.current,
                ["vElementJson"]: {
                    ...state.TextJson["vElementJson"],
                    ["SubElements"]: state.TextJson["vElementJson"]["SubElements"].map(objSubElment => {
                        let objSubElementJson = BaseCMSElement.RemoveRefKeyFromJson(objSubElment.Ref.current.GetElementJson(objContext.TextDomRef));
                        return {
                            ...objSubElementJson
                        };
                    })
                }
            };
            return { ...objElementJson, ["vElementJson"]: { ...objElementJson["vElementJson"], ["vText"]: GetInnerHtml(objElementJson) } };
        },
        "GetInnerHtml": () => {
            return objContext.TextDomRef.current.innerHTML;
        },
        "HydrateAllSubElements": () => {
            HydrateAllSubElements(objContext, true);
        },
        "SpellCheckUpdate": (strvText) => {
            if (strvText !== null) {
                objContext.Text_Editor_ModuleProcessor.SpellCheckUpdate(objContext, strvText);
            } else {
                RemoveWrappers(".BadWord");
            }
        },
        "ResetText": (strText) => {
            objContext.Text_Editor_ModuleProcessor.ResetText(objContext, strText, () => {
                objContext.TextDomRef.current.innerHTML = strText;
            });
        },
        "ReplaceBadWord": ReplaceBadWord,
        "IgnoreBadWord": IgnoreBadWord,
        "DeleteElement": (iElementId) => {
            CloseSidebar();
            objContext.Text_Editor_ModuleProcessor.RemoveSubElement(objContext, [{ "iElementId": iElementId }]);
        },
        "PreserveSubElementState": (iElementId, State) => {
            objContext.Text_Editor_ModuleProcessor.PreserveSubElementState(objContext, iElementId, State);
        },
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch, objContext.Text_Editor_ModuleProcessor.UndoRedoActionCallback);
        },
        // action ref.
        "RemoveElement": (iElementId) => {
            objContext.Text_Editor_ModuleProcessor.RemoveSubElement(objContext, [{ "iElementId": iElementId }]);
        },
        "AddFormula": (objFormula) => {
            AttachSubElement(objFormula);
        },
        "RenderImage": (objImage) => {
            AttachSubElement(objImage);
        },
        "RenderOverlay": (objOverlay) => {
            AttachSubElement(objOverlay);
        },
        "AddSubElement": (objSubElementJson) => {
            if (!objContext.props.isSubElementsNotAllowed || objContext.props.isSubElementsNotAllowed !== "Y") {
                CloseSidebar();
                const arrTextTypes = ["overlay", "wiki"];
                if(!props.Type || props.Type === null){
                    AttachSubElement(objSubElementJson);
                }else if(!arrTextTypes.includes(props.Type.toLowerCase())){
                    AttachSubElement(objSubElementJson);
                }           
            }
        },
        "RenderClipboardData": (objClipboardData) => {
            RenderClipboardData(objClipboardData);
        },
        "updateSelection": () => {
            SaveSelection({ updateSelection: 'update' });
        },
        "UpdateSubElement": () => { },
        "EditorProps": {
            "Type": props.Type,
            "TextEditorId": props.TextJson.iElementId
        },
        "GetSelection": () => {
            return objContext.SelectionRef.current;
        },
        "GetSelectionRef": () => {
            return objContext.SelectionRef;
        },
        "GetContextMenuOptions": () => {
            return [];
        },
        "UpdateTaskEditStatus": () => {
            objContext.Text_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        },
        "RemoveAllRange": () => {
            delete objContext.SelectionRef.current.Range;
        }
    }), [objContext.props, objContext.state, objContext.SelectionRef]);

    /**
     * @name GetContent
     * @summary contains JSX for CMSContainer Editor version
     * @return {any} JSX
     * */
    const GetContent = () => {
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.GetContent: Entered");
        /* develblock:end */
        const strClassNames = props.ClassNames || props.classNames;
        const strRootClassName = "text-editor-main ";
        /* develblock:start */
        global.ApplicationLog.Log("Text_Editor.GetContent: Exited");
        /* develblock:end */
        var vText = objContext.props.IsForServerRenderHtml && objContext.state.TextJson["vElementJson"]["SubElements"].length > 0 ? Helper.GetTextElementJson(props)["vElementJson"]["vText"] : objContext.state.TextJson["vElementJson"]["vText"];
        return (
            <div
                texteditorid={props.TextJson.iElementId}
                contentEditable={props.cIsNotContentEditable && props.cIsNotContentEditable === "Y" ? false : true}
                suppressContentEditableWarning
                className={strClassNames ? strRootClassName + strClassNames : strRootClassName} //classname to be used while dom traversing and can be used to check the text-editor root reached.
                key={state.Key}
                type={props.Type}
                style={{ width: "100%" }}
                ref={objContext.TextDomRef}
                id={props.TextJson.iElementId}
                onKeyPress={objEvt => OnKeyPress(objContext, objEvt)}
                onInput={objevt => OnInputDiv(objevt)}
                onSelect={objEvent => SaveSelection(objEvent)}
                onClick={objEvent => OnClick(objEvent)}
                onPaste={objEvt => OnHtmlPaste(objEvt)}
                onContextMenu={objEvt => OpenContextMenu(objEvt)}
                onFocus={objEvent => OnFocus(objEvent)}
                onBlur={objEvent => OnBlur(objEvent)}
                onDragOver={objEvt => OnElmentDragOver(objEvt)}
                dangerouslySetInnerHTML={{ __html: vText }} />
        );
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

/**
 * @summary This forward ref wrapping is done so that while calling undo-redo functions from editor frame component.
 * we will have access to the UnoRedo Methods of the Component.
 */
let WrappedText_Editor = (props) => {
    /**
     * @name Container_HandlerRef
     * @summary this ref used for undo-redo operation.
     * */
    let Text_HandlerRef = props.TextRef;
    /**
     * @name ComponentKey
     * @summary This uniquely identifies the instance  Component.
     * */
    let ComponentKey = "texteditor_" + props.TextJson.iElementId;

    /**
     * @name useEffect
     * @summary this update the undo-redo ref to the store.
     * */
    useEffect(() => {
        EditorState.SetReference(ComponentKey, Text_HandlerRef);
    }, [props]);

    /**
     * @name WrappedComponent
     * @summary The Text_Editor wrapped in forwardRef HOC.
     * */
    let WrappedComponent = forwardRef(Text_Editor);

    return <WrappedComponent ref={Text_HandlerRef} {...props} ComponentKey={ComponentKey} />;
};

export default WrappedText_Editor;
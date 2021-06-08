//React imports
import React, { useEffect, useReducer, useRef, forwardRef, useImperativeHandle } from 'react';

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import * as Formula_Hooks from '@shared/Application/e.Editor/Modules/9_Formula/Formula_Hooks';
import Formula_ModuleProcessor from '@shared/Application/e.Editor/Modules/9_Formula/Formula_ModuleProcessor';

//Application state Classes/methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//Modules used.
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

//Formula Cursor imports.
import * as Cursor from '@root/Application/e.Editor/PC/Modules/9_Formula/Cursor/Cursor';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name Formula
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary common Formula Component for editor and testapplication.
 * @returns {any} Formula
 */
const Formula = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, Formula_Hooks.GetInitialState(props));


    /**
     * @name objFormulaRef
     * @summary this is a dom ref which hold the Formula Component root dom.
     * */
    let objFormulaRef = useRef(null);

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, objFormulaRef, ["Formula_ModuleProcessor"]: new Formula_ModuleProcessor() };

    /**
     * @name Formula_Hooks.Initialize
     * @summary Initialize method call in CMSOverlay_Editor_Hook, that contains all the custom hooks.
     */
    Formula_Hooks.Initialize(objContext);

    /**
     * @name StopEvent.
     * @param {object} objEvt 
     * @summary stop event propagarion and bubbling.
     */
    const StopEvent = (objEvt) => {
        if (objEvt.preventDefault) {
            objEvt.preventDefault();
            objEvt.stopImmediatePropagation();
        } else {
            objEvt.returnValue = false;
            objEvt.cancelBubble = true;
        }
    };

    /**
     * @name GetHtmlElment
     * @param {string} strHtml 
     * @summary returns html element from a html string.
     * @returns {HTML}
     */
    const GetHtmlElment = (strHtml) => {
        if (strHtml != null && strHtml != "") {
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = strHtml;
            return tempDiv.children[0];
        }
        return null;
    };

    /**
     * @name MathMlComplete
     * @param {number} intFormulaSelectedNodeIdNew iElementId of formula.
     * @summary callback method called after successfull converting MathMl to Html by MathJax.
     */
    const MathMlComplete = (intFormulaSelectedNodeIdNew) => {
        window.setTimeout(function () {
            let objFormulaRootDomNode = Cursor.GetActiveFormulaDomNode();
            objFormulaRootDomNode.parentElement.scrollLeft = objFormulaRootDomNode.querySelector('[id="' + intFormulaSelectedNodeIdNew + '"]').offsetLeft - objFormulaRootDomNode.parentElement.offsetLeft;
            let objToFocus = objFormulaRootDomNode.querySelector('[id="' + intFormulaSelectedNodeIdNew + '"]');
            if (Cursor.GetHiddenMathMl('divFormula_', objContext).querySelector('[id="' + intFormulaSelectedNodeIdNew + '"]').getAttribute("jump") == "true") {
                Cursor.SetFormulaSelectedNodeId(intFormulaSelectedNodeIdNew);
                Cursor.MoveCursor(true, objContext);
            }
            else {
                Cursor.SetCursor(objToFocus, Cursor.GetFormulaEditorCursorPosition(), objContext);
            }
        }, 300);
    };

    /**
     * @name MathHTMlComplete
     * @param {number} intJFormulaEditorPlaceholderId iElementId of formula.
     * @param {number} intFormulaSelectedNodeIdNew selected formula node id.
     * @summary method called after running the MathJax.Hub with HTML-css.
     */
    const MathHTMlComplete = (intJFormulaEditorPlaceholderId, intFormulaSelectedNodeIdNew) => {
        Cursor.GetHiddenMathMl('spnFormulasvg', objContext).innerHTML = Cursor.GetHiddenMathMl('divFormula_', objContext).innerHTML;
        MathJax.Hub.Queue(["setRenderer", MathJax.Hub, "SVG"], ["Typeset", MathJax.Hub, "spnFormulasvg" + intJFormulaEditorPlaceholderId], [MathMlComplete, intFormulaSelectedNodeIdNew]);
        Cursor.GetHiddenMathMl('spnFormulasvg', objContext).style.display = 'none';
    };

    /**
     * @name JFormulaEditorRenderHtml
     * @param {object} objContext { props, state, dispatch, objFormulaRef }.
     * @param {number} intFormulatPlaceholderId iElementId of formula.
     * @param {number} intFormulaSelectedNodeId selected formula node id.
     */
    const JFormulaEditorRenderHtml = (intFormulatPlaceholderId, intFormulaSelectedNodeId) => {
        let objFormulaRootDom = Cursor.GetActiveFormulaDomNode();
        if (objFormulaRootDom && objFormulaRootDom != null && objFormulaRootDom != "") {
            let objFormulaEditorPlaceholder = objFormulaRootDom.querySelector("[id='" + intFormulatPlaceholderId + "']")
            MathJax.Hub.Queue(["setRenderer", MathJax.Hub, "HTML-CSS"], ["Typeset", MathJax.Hub, objFormulaEditorPlaceholder], [MathHTMlComplete, intFormulatPlaceholderId, intFormulaSelectedNodeId]);
            window.setTimeout(() => {
                if (objFormulaEditorPlaceholder && objFormulaEditorPlaceholder.children[0] != null) {
                    if (objFormulaEditorPlaceholder.children[0].tagName != undefined && objFormulaEditorPlaceholder.children[0].tagName != "" && objFormulaEditorPlaceholder.children[0].tagName == "MATH") {
                        MathJax.Hub.queue.running = 0;
                        JFormulaEditorRenderHTML(intFormulatPlaceholderId, intFormulaSelectedNodeId);
                    }
                }
            }, 200)
        }
    };

    /**
     * @name UpdateEditorFormula  
     * @param {number} intFormulatPlaceholderId iElementId of formula.
     * @param {number} objHtmlToReplace selected formula node id.
     * @summary Update the TextEditor formula span with the 'objHtmlToReplace'.
     */
    const UpdateEditorFormula = (intFormulatPlaceholderId, objHtmlToReplace) => {
        let objFormulaRootDomNode = Cursor.GetActiveFormulaDomNode().querySelector("[id='" + intFormulatPlaceholderId + "']");
        objFormulaRootDomNode.innerHTML = "";
        objFormulaRootDomNode.appendChild(objHtmlToReplace);
    };

    const UpdateNewMathMl = (isUserAdd) => {
        if (props.UpdateNewMathMl && isUserAdd) {
            let objHiddenFormulaDiv = Cursor.GetHiddenMathMl('divFormula_', objContext);
            let strMathMl = objHiddenFormulaDiv.querySelector("math").innerHTML;
            props.UpdateNewMathMl(Cursor.ReplaceIdWithHolder(strMathMl)); // this add the new mathMl to the parent component state for Undo/Redo.
        }
    };

    /**
     * @name GetRootFormulaDiv
     * @summary returns root formula div.
     * */
    const GetRootFormulaDiv = () => {
        return document.querySelector('span[ielementid="' + objContext.props.ElementJson.iElementId + '"][ielementtypeid="' + objContext.props.ElementJson.iElementTypeId + '"]');
    };

    /**
      * @name AddMathMl
      * @param {HTML object} objMathMl mathMl html element.
      * @param {number} intFormulaSelectedNodeIdNew selected formula node id.
      * @summary this method add a new mathMl or add sub mathMl to the existing mathMl.
      */
    const AddMathMl = (objMathMl, intFormulaSelectedNodeIdNew, isUserAdd) => {
        let intFormulatPlaceholderId = Cursor.GetFormulaEditorPlaceholderId();
        if (intFormulatPlaceholderId === null || intFormulatPlaceholderId == "" || intFormulatPlaceholderId == undefined) {
            AddFormulaHolder(objMathMl, intFormulaSelectedNodeIdNew, isUserAdd)
        } else {
            let intFormulaSelectedNodeId = Cursor.GetFormulaSelectedNodeId();
            if (intFormulaSelectedNodeId && intFormulaSelectedNodeId != "" && Cursor.GetHiddenMathMl('divFormula_', objContext) != null) {
                if (Cursor.GetFormulaEditorCursorPosition() == "After") {
                    let objFormulaSelectedNode = Cursor.GetHiddenMathMl('divFormula_', objContext).querySelector('[id="' + intFormulaSelectedNodeId + '"]');
                    objFormulaSelectedNode.parentNode.insertBefore(objMathMl, objFormulaSelectedNode.nextSibling);
                } else if (Cursor.GetFormulaEditorCursorPosition() == "Before") {
                    let objHiddenField = Cursor.GetHiddenMathMl('divFormula_', objContext);
                    let objFormulaSelectedNode = objHiddenField.querySelector('[id="' + intFormulaSelectedNodeId + '"]');
                    objFormulaSelectedNode.parentNode.insertBefore(objMathMl, objFormulaSelectedNode);
                }
                if (Cursor.GetHiddenMathMl('divFormula_', objContext).querySelector('[id="' + intFormulaSelectedNodeId + '"]').getAttribute('type') === 'FormulaEmpty')
                    Cursor.GetHiddenMathMl('divFormula_', objContext).querySelector('[id="' + intFormulaSelectedNodeId + '"]').remove();
                    UpdateNewMathMl(isUserAdd);
                Cursor.SetFormulaEditorCursorPosition("After");
                UpdateEditorFormula(intFormulatPlaceholderId, GetHtmlElment(Cursor.GetHiddenMathMl('divFormula_', objContext).innerHTML));
                JFormulaEditorRenderHtml(intFormulatPlaceholderId, intFormulaSelectedNodeIdNew);
                EditorState.SetProperty("AddSubFormula", AddSubFormula);
            }
        }
    };

    /**
     * @name ReplacePlaceholder
     * @param {string} strMathMl mathMl string.
     * @summary this method remove all Idholders with unique ids and call AddMathMl or FormMathMlSpans based on Idholder (call FormMathSpan if ids are already generated else call generate and call AddMathMl).
     */
    const ReplacePlaceholder = (strMathMl, isUserAdd) => {
        let strNewMathMl = strMathMl;
        let objWrapDiv;
        if (strMathMl.indexOf('{Idholder}') <= 0) {
            FormMathMlSpans(strMathMl); // since mathMl string has ids assigned already then it is saved MathMl. 
            return;
        } else {
            while ((strNewMathMl.indexOf('{Idholder}') > 0)) {
                strNewMathMl = strNewMathMl.replace('{Idholder}', "id='" + UniqueId.GetUniqueId() + "' ");
            }
            objWrapDiv = document.createElement('div');
            objWrapDiv.innerHTML = strNewMathMl;
        }
        let intFormulaSelectedNodeIdNew = objWrapDiv.querySelector('mn') != null && objWrapDiv.querySelector('mn').id;
        if (intFormulaSelectedNodeIdNew == undefined || intFormulaSelectedNodeIdNew == null || intFormulaSelectedNodeIdNew == "") {
            intFormulaSelectedNodeIdNew = objWrapDiv.querySelector('mi') != null && objWrapDiv.querySelector('mi').id;
        };
        if (intFormulaSelectedNodeIdNew == undefined || intFormulaSelectedNodeIdNew == null || intFormulaSelectedNodeIdNew == "") {
            intFormulaSelectedNodeIdNew = objWrapDiv.querySelector('mo') != null && objWrapDiv.querySelector('mo').id;
        };
        AddMathMl(objWrapDiv.children[0], intFormulaSelectedNodeIdNew, isUserAdd);
    };

    /**
     * @name AddFormulaHolder
     * @param {object} objContext { props, state, dispatch, objFormulaRef }.
     * @param {HTML} objMathMl mathMl html. 
     * @param {number} intFormulaSelectedNodeIdNew selected formula node id.
     */
    const AddFormulaHolder = (objMathMl, intFormulaSelectedNodeIdNew, isUserAdd) => {
        let intFormulaEditorPlaceholderId = objContext.props.ElementJson.iElementId;
        let intFormulaSelectedNodeId = UniqueId.GetUniqueId();
        Cursor.SetFormulaEditorPlaceholderId(intFormulaEditorPlaceholderId);
        Cursor.SetFormulaSelectedNodeId(intFormulaSelectedNodeId);
        let strInitialMathMl = "<math xmlns='http://www.w3.org/1998/Math/MathML'><mrow><mn style='font-family:inherit;font-style:inherit;' id='" + intFormulaSelectedNodeId + "' type='FormulaEmpty'>□</mn></mrow></math>";
        let divFormula = document.createElement('div');  // formula div which holds mathMl formula.
        divFormula.id = 'divFormula_' + intFormulaEditorPlaceholderId;
        divFormula.style.display = 'none';
        divFormula.setAttribute('type', 'JFormulaEditorMathMlHolder');
        divFormula.innerHTML = strInitialMathMl;
        let textEditorFormula = document.createElement('span');
        textEditorFormula.id = intFormulaEditorPlaceholderId;
        textEditorFormula.cssText = 'display:inline-block;padding:0px;margin:0px;border:1px solid transparent';
        textEditorFormula.setAttribute("valign", 'middle');
        textEditorFormula.setAttribute('contenteditable', 'false');
        textEditorFormula.setAttribute('type', 'JFormulaEditorPlaceholder');
        textEditorFormula.className = "FormulaFont";
        textEditorFormula.innerHtml = strInitialMathMl;
        let spanFormulaSvg = document.createElement('span');
        spanFormulaSvg.id = 'spnFormulasvg' + intFormulaEditorPlaceholderId;
        spanFormulaSvg.cssText = 'display:inline-block;padding:0px;margin:0px;border:1px solid transparent';
        spanFormulaSvg.className = 'FormulaFont';
        spanFormulaSvg.setAttribute("contenteditable", 'false');
        spanFormulaSvg.setAttribute("valign", 'middle');
        spanFormulaSvg.setAttribute("Type", 'CONTENTSVG');
        AddHiddenMathMl(divFormula, objContext)  //document.body.appendChild(divFormula);
        AddHiddenMathMl(spanFormulaSvg, objContext) //document.body.appendChild(spanFormulaSvg);
        objContext.objFormulaRef.current.innerHTML = '';
        objContext.objFormulaRef.current.appendChild(textEditorFormula);
        Cursor.SetFormulaEditorCursorPosition("After");
        AddMathMl(objMathMl, intFormulaSelectedNodeIdNew, isUserAdd);
    };

    /**
     * @name GetKeyCode
     * @param {any} objEvt
     * @summary returns key code for the keyboard.
     */
    const GetKeyCode = (objEvt) => {
        if (objEvt.which != undefined) return objEvt.which;
        else if (objEvt != undefined && objEvt.keyCode != undefined) return objEvt.keyCode;
    };

    /**
     * @name GetFirstParentWithId
     * @param {HTML object} objNode html object
     * @summary returns first parent which has id.
     * @returns {HTML object}
     */
    const GetFirstParentWithId = (objNode) => {
        let objParent = objNode.closest('span[type="JFormulaEditorPlaceholder"]');
        let objNextParent = objNode.parentElement;
        let objList = [];
        if(objParent != null){
            while (!objNextParent.isSameNode(objParent)) {
                objList = [...objList, objNextParent];
                objNextParent = objNextParent.parentElement;
            }
        }
        objList = objList.filter(objTemp => {
            if (objTemp && objTemp.id && !objTemp.id.startsWith("M") && !objTemp.id.startsWith("m"))
                return true
            else
                return false
        });
        if (objList.length <= 0) {
                let arrDivFormulaNodes = Cursor.GetHiddenMathMl("divFormula_", objContext).querySelectorAll('[id]:not([id^="M"]):not([id^="m"])');
                let strLastNodeId = arrDivFormulaNodes[arrDivFormulaNodes.length - 1].getAttribute('id');
                objList = objParent.querySelectorAll('[id="' + strLastNodeId + '"]')[objParent.querySelectorAll('[id="' + strLastNodeId + '"]').length - 1];
        }
        return objList[0];
    };

    /**
     * @name OnFormulaMouseDown
     * @param {any} objEvt
     * @summary formula click event to place the cursor to the clicked position and add formula operations like zoom-in, zoom-out to the store.
     */
    const OnFormulaMouseDown = (objEvt) => {
        // ====adding formula operation to the store ===
        EditorState.SetProperty("ZoomInFormula", ZoomInFormula);  //ZoomInFormula
        EditorState.SetProperty("ZoomOutFormula", ZoomOutFormula); //ZoomOutFormula
        EditorState.SetProperty("PartialZoomInFormula", PartialZoomInFormula); //PartialZoomInFormula
        EditorState.SetProperty("PartialZoomOutFormula", PartialZoomOutFormula);//PartialZoomOutFormula
        EditorState.SetProperty("DeleteFormula", DeleteFormula);
        // ====adding formula operation to the store ===end
        if (objEvt.button == 2) {
            StopEvent(objEvt);
        }
        let objTarget = objEvt.target == undefined ? objEvt.srcElement : objEvt.target;
        if (objTarget.closest('span[type="JFormulaEditorPlaceholder"]') != null) {
            let PlaceholderDom = objTarget.closest('span[type="JFormulaEditorPlaceholder"]');
            let objFirstParentWithId = GetFirstParentWithId(objTarget);
            if (objFirstParentWithId != null) {
                Cursor.SetCursor(objFirstParentWithId, "After", objContext);
                let intFormulaEditorPlaceholderId = PlaceholderDom.id;
                let intFormulaSelectedNodeId = (objTarget.id == null || objTarget.id == "") ? objFirstParentWithId.id : objTarget.parentElement.id;
                if (intFormulaEditorPlaceholderId != "" && intFormulaSelectedNodeId != "") {
                    Cursor.SetFormulaEditorPlaceholderId(intFormulaEditorPlaceholderId);
                    Cursor.SetFormulaSelectedNodeId(intFormulaSelectedNodeId);
                    if (objTarget.getAttribute("cisformularoot") !== null && objTarget.getAttribute("cisformularoot").toLowerCaase() == "Y") { // if clicked element is formula span
                        Cursor.SetActiveFormulaDomNode(objTarget);
                    } else if (objTarget.closest("span[cisformularoot=Y]") != null) { // check closest span for formula span
                        Cursor.SetActiveFormulaDomNode(objTarget.closest("span[cisformularoot=Y]"));
                    }
                    EditorState.SetProperty("AddSubFormula", AddSubFormula);
                }
                return false;
            } else {
                StopEvent(objEvt);
            }
        }
    };

    /**
     * @name DeletePress
     * @summary remove the pressed item from the mathMl.
     */
    const DeletePress = () => {
        let intJFormulaEditorPlaceholderId = Cursor.GetFormulaEditorPlaceholderId();
        if (intJFormulaEditorPlaceholderId != "") {
            objContext.Formula_ModuleProcessor.UpdateTaskEditStatus(objContext);
            let intFormulaSelectedNodeId = Cursor.GetFormulaSelectedNodeId();
            if (intFormulaSelectedNodeId != "") {
                let intNewNodeId = intFormulaSelectedNodeId;
                let objFormulaElement = Cursor.GetHiddenMathMl("divFormula_", objContext).querySelector('[id="' + intFormulaSelectedNodeId + '"]');
                if (objFormulaElement != null) {
                    objFormulaElement = Cursor.GetHiddenMathMl("divFixedFormula_", objContext).querySelector('[id="' + intFormulaSelectedNodeId + '"]');
                }
                if (Cursor.GetFormulaEditorCursorPosition() == "After") {
                    // objFormulaElement = objFormulaElement.next('[id]').not("[id^='M'],[id^='m']");
                }
                else {
                    Cursor.SetFormulaEditorCursorPosition('After');
                }
                if (objFormulaElement != null) {
                    SetFormulaSelectedNodeId(objFormulaElement.getAttribute('id'));
                    RemoveMathMl();
                }
            }
        }
    };

    /***
     * @name PartialZoomInFormula
     * @summary this method zoom-in selected partial selected formula.
     * */
    const PartialZoomInFormula = () => {
        let objSourceElement = null;
        let objFormulaSelectedNode = Cursor.GetFormulaSelectedNodeDom();
        if (objFormulaSelectedNode && objFormulaSelectedNode != null) {
            objSourceElement = objFormulaSelectedNode.children[0];
        }
        var objFormulaSpanRow = objSourceElement.closest(".mi[id],.mn[id]").closest(".mrow");
        var strId = objSourceElement.closest(".mi[id],.mn[id]").getAttribute("id");
        var intZoom = 0.05;
        if (objFormulaSpanRow != null) {
            if (objFormulaSpanRow.style.transform == "") {
                var intX = 1;
                var intY = 1;
                intX = intX + intZoom;
                intY = intY + intZoom;
                objFormulaSpanRow.style.transform = "scale(" + intX + "," + intY + ")";
                objFormulaSpanRow.setAttribute("x", intX);
                objFormulaSpanRow.setAttribute("y", intY);

                window.setTimeout(function () {
                    let intWidth = Math.round(objFormulaSpanRow.getBoundingClientRect().width);
                    let intHeight = Math.round(objFormulaSpanRow.getBoundingClientRect().height);
                    objFormulaSpanRow.style.width = intWidth + "px";
                    objFormulaSpanRow.style.height = intHeight + "px";
                }, 100);
            }
            else {
                let intX = objFormulaSpanRow.getAttribute("x");
                let intY = objFormulaSpanRow.getAttribute("y");
                intX = parseFloat(intX) + intZoom;
                intY = parseFloat(intY) + intZoom;
                objFormulaSpanRow.style.transform = "scale(" + intX + "," + intY + ")";
                objFormulaSpanRow.removeAttribute("x");
                objFormulaSpanRow.removeAttribute("y");
                objFormulaSpanRow.setAttribute("x", intX);
                objFormulaSpanRow.setAttribute("y", intY)
                window.setTimeout(function () {
                    objFormulaSpanRow.style.width = "auto";
                    objFormulaSpanRow.style.height = "auto";
                    objFormulaSpanRow.style.display = "inline-block";
                    if (objFormulaSpanRow.tagName.toLowerCaase() == "span") {
                        if (objFormulaSpanRow.style.display == "inline-block") {
                            objFormulaSpanRow.style.width = "auto";
                            objFormulaSpanRow.style.height = "auto";
                            objFormulaSpanRow.style.display = "inline-block";
                        }
                    }
                }, 100);
            }
            var strParentHeight = "";
            var strParentWidth = "";
            if (objFormulaSpanRow.style.width != "") {
                strParentHeight = objFormulaSpanRow.style.height.split("px")[0];
                strParentWidth = objFormulaSpanRow.style.width.split("px")[0];
            }
            let arrMaths = document.querySelectorAll('math');
            arrMaths.forEach((objMath, intIndex) => {
                if (objMath.querySelectorAll("mn[id='" + strId + "']").length > 0) {
                    var objSpan = objMath.querySelectorAll("mn[id='" + strId + "']");
                    objSpan.closest("mrow").removeAttribute("x");
                    objSpan.closest("mrow").removeAttribute("y");
                    objSpan.closest("mrow").setAttribute("x", objFormulaSpanRow.getAttribute("x"));
                    objSpan.closest("mrow").setAttribute("y", objFormulaSpanRow.getAttribute("y"));
                    objSpan.closest("mrow").setAttribute("Width", strParentWidth);
                    objSpan.closest("mrow").setAttribute("Height", strParentHeight);
                }
            });
        }
    }

    /**
     * @name PartialZoomOutFormula
     * @summary this method zoom-out selected partial selected formula.
     * */
    const PartialZoomOutFormula = () => {
        let objSourceElement = null;
        let objFormulaSelectedNode = Cursor.GetFormulaSelectedNodeDom();
        if (objFormulaSelectedNode && objFormulaSelectedNode != null) {
            objSourceElement = objFormulaSelectedNode.children[0];
        }
        let objFormulaSpanRow = objSourceElement.closest(".mi[id],.mn[id]").closest(".mrow");
        let strId = objSourceElement.closest(".mi[id],.mn[id]").getAttribute("id");
        let intZoom = 0.05;
        if (objFormulaSpanRow != null) {
            if (objFormulaSpanRow.style.transform == "") {
                let intX = 1;
                let intY = 1;
                intX = parseFloat(intX) + intZoom;
                intY = parseFloat(intY) + intZoom;
                if (intX < 1 && intY < 1) {
                    intY = 1;
                    intX = 1;
                }
                objFormulaSpanRow.style.transform = "scale(" + intX + "," + intY + ")";
                objFormulaSpanRow.removeAttribute("x");
                objFormulaSpanRow.removeAttribute("y");
                objFormulaSpanRow.setAttribute("x", intX);
                objFormulaSpanRow.setAttribute("y", intY);
                window.setTimeout(function () {
                    objFormulaSpanRow.style.width = "auto";
                    objFormulaSpanRow.style.height = "auto";
                }, 100);
            }
            else {
                let intX = objFormulaSpanRow.getAttribute("x");
                let intY = objFormulaSpanRow.getAttribute("y");
                intX = parseFloat(intX) - intZoom;
                intY = parseFloat(intY) - intZoom;
                objFormulaSpanRow.style.transform = "scale(" + intX + "," + intY + ")";
                objFormulaSpanRow.removeAttribute("x");
                objFormulaSpanRow.removeAttribute("y");
                objFormulaSpanRow.setAttribute("x", intX);
                objFormulaSpanRow.setAttribute("y", intY);
                window.setTimeout(function () {
                    objFormulaSpanRow.style.width = "auto";
                    objFormulaSpanRow.style.height = "auto";
                    objFormulaSpanRow.style.display = "inline-block";
                    if (objFormulaSpanRow.tagName.toLocaleLowerCase() == "span") {
                        if (objFormulaSpanRow.style.display = "inline-block") {
                            objFormulaSpanRow.style.width = "auto";
                            objFormulaSpanRow.style.height = "auto";
                            objFormulaSpanRow.style.display = "inline-block";
                        }
                    }
                }, 100);
            }

            var strParentHeight = "";
            var strParentWidth = "";
            if (objFormulaSpanRow.style.width != "") {
                strParentHeight = objFormulaSpanRow.style.height.split("px")[0];
                strParentWidth = objFormulaSpanRow.style.width.split("px")[0];
            }

            $.each($("math"), function (intIndex, objMath) {
                if ($(objMath).find("mn[id='" + strId + "']").length > 0) {
                    var objSpan = $(objMath).find("mn[id='" + strId + "']");
                    $(objSpan).closest("mrow").removeAttr("x");
                    $(objSpan).closest("mrow").removeAttr("y");
                    $(objSpan).closest("mrow").attr({
                        "x": $(objFormulaSpanRow).attr("x"), "y": $(objFormulaSpanRow).attr("y"), "Width": strParentWidth, "Height": strParentHeight
                    });
                }
            });
            let arrMaths = document.querySelectorAll('math');
            arrMaths.forEach((objMath, intIndex) => {
                if (objMath.querySelectorAll("mn[id='" + strId + "']").length > 0) {
                    var objSpan = objMath.querySelectorAll("mn[id='" + strId + "']");
                    objSpan.closest("mrow").removeAttribute("x");
                    objSpan.closest("mrow").removeAttribute("y");
                    objSpan.closest('mrow').setAttribute("x", objFormulaSpanRow.getAttribute("x"));
                    objSpan.closest('mrow').setAttribute("y", objFormulaSpanRow.getAttribute("y"));
                    objSpan.closest('mrow').setAttribute("Width", strParentWidth);
                    objSpan.closest('mrow').setAttribute("Height", strParentHeight);
                }

            });
        }
    }

    /**
     * @name DeleteFormula
     * @summary this method delete cmsformula from TextEditor (only for CMSFormula).
     * */
    const DeleteFormula = () => {
        let iElementId = Cursor.GetFormulaEditorPlaceholderId();
        let CurrentTextRef = EditorState.GetReference("CurrentTextRef");
        if (CurrentTextRef && CurrentTextRef.current && CurrentTextRef.current.RemoveElement) {
            CurrentTextRef.current.RemoveElement(Number(iElementId));
        }
    };

    /**
     * @name RemoveMathMl
     * @summary remove selected mathMl from the Formula MathMl.
     */
    const RemoveMathMl = () => {
        let intJFormulaEditorPlaceholderId = Cursor.GetFormulaEditorPlaceholderId();
        if (intJFormulaEditorPlaceholderId != "") {
            let intFormulaSelectedNodeId = Cursor.GetFormulaSelectedNodeId();
            let objDiv = null;
            if (Cursor.GetFormulaPlaceholderDom() != null && Cursor.GetHiddenMathMl("divFormula_", objContext) != null) {
                objDiv = Cursor.GetHiddenMathMl("divFormula_", objContext);
            }
            else {
                objDiv = Cursor.GetHiddenMathMl("divFixedFormula_", objContext);
            }
            if (intFormulaSelectedNodeId != "" && objDiv != null && objDiv != undefined) {
                if (objDiv.getAttribute("jump") != 'true') {
                    let objFormulaElement = objDiv.querySelector("[id='" + intFormulaSelectedNodeId + "']");
                    let blnContinue = true;
                    if (Cursor.GetFormulaEditorCursorPosition() == "Before") {
                        blnContinue = false;
                        objFormulaElement = objFormulaElement.prevNode("[id]");
                        if (objFormulaElement != null) {
                            intFormulaSelectedNodeId = objFormulaElement.getAttribute("id");
                            if (intFormulaSelectedNodeId != "") {
                                blnContinue = true
                            }
                        }
                    }
                    if (blnContinue) {
                        let objNextElement = objFormulaElement.prevNode('[id]');
                        if (objNextElement == null || objNextElement.getAttribute('id') == null || objNextElement.getAttribute('id').startsWith("M") || objNextElement.getAttribute('id').startsWith("m"))
                            objNextElement = null;
                        if (objNextElement != null) {
                            Cursor.SetFormulaEditorCursorPosition("After");
                            intFormulaSelectedNodeId = objNextElement.getAttribute('id');
                        } else {
                            objNextElement = objFormulaElement.nextNode('[id]');
                            if (objNextElement == null || objNextElement.getAttribute('id') == null || objNextElement.getAttribute('id').startsWith("M") || objNextElement.getAttribute('id').startsWith("m"))
                                objNextElement = null;
                            if (objNextElement != null) {
                                Cursor.SetFormulaEditorCursorPosition("Before");
                                intFormulaSelectedNodeId = objNextElement.getAttribute('id');
                            } else {
                                Cursor.SetFormulaEditorCursorPosition("After");
                                intFormulaSelectedNodeId = UniqueId.GetUniqueId();
                                if (objFormulaElement.parentElement.parentElement.tagName.toLowerCase() === "math" && Cursor.GetFormulaPlaceholderDom().querySelector(Cursor.GetFormulaSelectedNodeId()).closest('#tdJFormulaEditorPlacHolder') != null) {
                                    objFormulaElement.parentElement.insertBefore(GetHtmlElment("<mn style='font-family:inherit;font-style:inherit;'  id='" + intFormulaSelectedNodeId + "' type='FormulaEmpty'>&#8201;</mn>"), objFormulaElement)
                                } else {
                                    objFormulaElement.parentElement.insertBefore(GetHtmlElment("<mn style='font-family:inherit;font-style:inherit;' id='" + intFormulaSelectedNodeId + "' Type='FormulaEmpty'>□</mn>"), objFormulaElement);
                                }
                            }
                        }
                        objFormulaElement.remove();
                        Cursor.GetFormulaPlaceholderDom().innerHTML = objDiv.innerHTML;
                        MathJax.Hub.Queue(["setRenderer", MathJax.Hub, "HTML-CSS"], ["Typeset", MathJax.Hub, Cursor.GetFormulaPlaceholderDom()], [MathMlComplete, intFormulaSelectedNodeId]);
                    }
                }
            }
        }
    }

    /**
     * @name ZoomInFormula
     * @summary zoom-in selected formula.
     * */
    const ZoomInFormula = () => {
        let objSourceElement = null;
        let objFormulaSelectedNode = Cursor.GetFormulaSelectedNodeDom();
        //if(objFormulaSelectedNode.closest('[]'))
        if (objFormulaSelectedNode && objFormulaSelectedNode != null) {
            objSourceElement = objFormulaSelectedNode;
        }
        let objFormulaSpan = objSourceElement.closest("[Type='JFormulaEditorPlaceholder']");
        if (!objFormulaSpan || objFormulaSpan == null) {
        }
        if (objFormulaSpan != null) {
            let intZoom = 0.05;
            if (objFormulaSpan.style.transform == "") {
                let intX = 1;
                let intY = 1;
                intX = intX + intZoom;
                intY = intY + intZoom;
                objFormulaSpan.style.transform = "scale(" + intX + "," + intY + ")";
                objFormulaSpan.setAttribute("X", intX);
                objFormulaSpan.setAttribute("Y", intY);
                window.setTimeout(function () {
                    let intWidth = Math.round(objFormulaSpan.getBoundingClientRect().width);
                    let intHeight = Math.round(objFormulaSpan.getBoundingClientRect().height);
                    let objParentSpan = objFormulaSpan.parentElement;
                    objParentSpan.style.width = intWidth + "px";
                    objParentSpan.style.height = intHeight + "px";
                }, 100);
            }
            else {
                let intX = objFormulaSpan.getAttribute("X");
                let intY = objFormulaSpan.getAttribute("Y");
                intX = parseFloat(intX) + intZoom;
                intY = parseFloat(intY) + intZoom;
                objFormulaSpan.style.transform = "scale(" + intX + "," + intY + ")";
                objFormulaSpan.removeAttribute("X");
                objFormulaSpan.removeAttribute("Y");
                objFormulaSpan.setAttribute("X", intX);
                objFormulaSpan.setAttribute("Y", intY);
                window.setTimeout(function () {
                    let intWidth = Math.round(objFormulaSpan.getBoundingClientRect().width);
                    let intHeight = Math.round(objFormulaSpan.getBoundingClientRect().height);
                    let objParentSpan = objFormulaSpan.parentElement;
                    objParentSpan.style.width = intWidth + "px";
                    objParentSpan.style.height = intHeight + "px";
                    objParentSpan.style.display = "inline-flex";
                    objParentSpan.style.alignItems = "center";
                    objParentSpan.style.justifyContent = "center";
                }, 100);
            }
        }
    }

    /***
     * @name ZoomOutFormula
     * @summary zoom-out selected formula.
     * */
    const ZoomOutFormula = () => {
        let objSourceElement = null;
        let objFormulaSelectedNode = Cursor.GetFormulaSelectedNodeDom()
        if (objFormulaSelectedNode && objFormulaSelectedNode != null) {
            objSourceElement = objFormulaSelectedNode;
        }
        let objFormulaSpan = objSourceElement.closest("[Type='JFormulaEditorPlaceholder']");
        if (!objFormulaSpan || objFormulaSpan == null) {
        }
        if (objFormulaSpan != null) {
            let intZoom = 0.05;
            if (objFormulaSpan.style.transform == "") {
                let intX = 1;
                let intY = 1;
                intX = intX + intZoom;
                intY = intY + intZoom;
                objFormulaSpan.style.transform = "scale(" + intX + "," + intY + ")";
                objFormulaSpan.setAttribute("X", intX);
                objFormulaSpan.setAttribute("Y", intY);
                window.setTimeout(function () {
                    let intWidth = Math.round(objFormulaSpan.getBoundingClientRect().width);
                    let intHeight = Math.round(objFormulaSpan.getBoundingClientRect().height);
                    let objParentSpan = objFormulaSpan.parentElement;
                    objParentSpan.style.width = intWidth + "px";
                    objParentSpan.style.height = intHeight + "px";
                }, 100);
            }
            else {
                let intX = objFormulaSpan.getAttribute("X");
                let intY = objFormulaSpan.getAttribute("Y");
                intX = parseFloat(intX) - intZoom;
                intY = parseFloat(intY) - intZoom;
                if (intX < 1 && intY < 1) {
                    intY = 1;
                    intX = 1;
                }
                objFormulaSpan.style.transform = "scale(" + intX + "," + intY + ")";
                objFormulaSpan.removeAttribute("X");
                objFormulaSpan.removeAttribute("Y");
                objFormulaSpan.setAttribute("X", intX);
                objFormulaSpan.setAttribute("Y", intY);

                window.setTimeout(function () {
                    let intWidth = Math.round(objFormulaSpan.getBoundingClientRect().width);
                    let intHeight = Math.round(objFormulaSpan.getBoundingClientRect().height);
                    let objParentSpan = objFormulaSpan.parentElement;
                    objParentSpan.style.width = intWidth + "px";
                    objParentSpan.style.height = intHeight + "px";
                }, 100);

            }
        }
    };

    /**
     * @param {string} strFormulaType type of formula  cmsformula or cmsinputformula.
     * @param {object} objElementJson formula ElementJson (CMSFormula,CMSInputFormula).
     * @param {string} strSubFormula  sub-formula string.
     * @summary this method add sub-formula to the formula mathml.
     */
    const AddSubFormula = (strFormulaType, objElementJson, strSubFormula) => {
        let objFormulaPlaceholder = Cursor.GetFormulaPlaceholderDom();
        if (objFormulaPlaceholder != null) {
            if (strFormulaType == "cmsformula" && objFormulaPlaceholder.closest('[ciscmsformularoot=Y]') != null) {
                ReplacePlaceholder(strSubFormula, true);
            } else if (strFormulaType == "cmsinputformula" && objFormulaPlaceholder.closest("[ciscmsinputformularoot=Y]") != null) {
                let intFormulaPlaceholderId = Cursor.GetFormulaEditorPlaceholderId();
                if (intFormulaPlaceholderId == objElementJson.iElementId) {
                    ReplacePlaceholder(strSubFormula, true);
                }
            }
        }
    };

    /**
     * @name AddTxtFormulaEditor
     * @summary this method create a input and add it to the body to attach input events for formula.
     * */
    const AddTxtFormulaEditor = () => {
        if (document.getElementById("txtJFormulaEditor") == null) {
            let objInput = document.createElement('input');
            objInput.style.cssText = 'font-size:0px;height:1px;width:1px;position:absolute;top:0px;left:0px;border-color:transparent;background-color:transparent; outline: none;';
            objInput.setAttribute('type', "text");
            objInput.id = "txtJFormulaEditor";
            document.body.appendChild(objInput);
        }
    };

    /**
     * @name OnTextFormulaKeyPress
     * @summary this method add keypress events to the txtJFormulaEditor input.
     * */
    const OnTextFormulaKeyPress = (e) => {
        //////Key press event to add numbers
        let strKeyCode = GetKeyCode(e);
        //console.log(strKeyCode);
        if ((strKeyCode > 39 && strKeyCode < 60) || (strKeyCode > 64 && strKeyCode < 91) || (strKeyCode > 96 && strKeyCode < 123) || (strKeyCode >= 60 && strKeyCode <= 62) || (strKeyCode == 91 || strKeyCode == 93 || strKeyCode == 123 || strKeyCode == 125 || strKeyCode == 16 || strKeyCode == 191 || strKeyCode == 18 || strKeyCode == 63 || strKeyCode == 33 || strKeyCode == 64 || strKeyCode == 35 || strKeyCode == 36 || strKeyCode == 37 || strKeyCode == 94 || strKeyCode == 38 || strKeyCode == 95 || strKeyCode == 124 || strKeyCode == 126 || strKeyCode == 92 || strKeyCode == 96 || strKeyCode == 34 || strKeyCode == 39)) {
            let intFormulaSelectedNodeIdNew = UniqueId.GetUniqueId();
            let strValue = String.fromCharCode(strKeyCode);
            if ((strKeyCode > 39 && strKeyCode < 48) || (strKeyCode >= 60 && strKeyCode <= 62) || (strKeyCode == 91 || strKeyCode == 93 || strKeyCode == 123 || strKeyCode == 125)) {
                if (strValue == "/") strValue = "&#247;";
                if (strValue == "*") strValue = "&#215;";
                AddMathMl(GetHtmlElment("<mo style='font-family:inherit;font-style:inherit;'  id='" + intFormulaSelectedNodeIdNew + "' >" + strValue + "</mo>"), intFormulaSelectedNodeIdNew, true);
            } else {
                if (isNaN(strValue)) AddMathMl(GetHtmlElment("<mi style='font-family:inherit;font-style:inherit;'  id='" + intFormulaSelectedNodeIdNew + "' >" + strValue + "</mi>"), intFormulaSelectedNodeIdNew, true);
                else AddMathMl(GetHtmlElment("<mn style='font-family:inherit;font-style:inherit;'  id='" + intFormulaSelectedNodeIdNew + "' >" + strValue + "</mn>"), intFormulaSelectedNodeIdNew, true);
            }
            document.getElementById("txtJFormulaEditor").blur();
        } else if (strKeyCode == 32 && Cursor.GetFormulaSelectedNodeDom().closest('#tdJFormulaEditorPlacHolder') != null) {
            let intFormulaSelectedNodeIdNew = UniqueId.GetUniqueId();
            AddMathMl(GetHtmlElment("<mtext id='" + intFormulaSelectedNodeIdNew + "'>&#8201;</mtext>"), intFormulaSelectedNodeIdNew, true);
        }
        StopEvent(e);
    };

    /**
     * @name OnTextFormulaBlur
     * @summary this method hide the caret when input focus is removed.
     * */
    const OnTextFormulaBlur = () => {
        document.getElementById("txtJFormulaEditor").style.display = "none";
        Cursor.GetCursorImage(objContext).style.display = "none";
    };

    /**
     * @name OnTextFormulaFocus
     * @summary this method display the caret when input is focused.
     * */
    const OnTextFormulaFocus = () => {
        Cursor.GetCursorImage(objContext).style.display = "block";
    };

    /**
     * @name OnTextFormulaKeydown
     * @param {any} objEvt evnt.
     * @summary event on Text formula keydown.
     */
    const OnTextFormulaKeydown = (objEvt) => {
        objContext.Formula_ModuleProcessor.UpdateTaskEditStatus(objContext);
        let strKeyCode = GetKeyCode(objEvt);
        if (strKeyCode == 46) {
            StopEvent(objEvt);
            DeletePress();
            return false;
        } else if (strKeyCode == 8) {
            StopEvent(objEvt);
            RemoveMathMl();
            return false;
        } else if (strKeyCode == 37) {
            StopEvent(objEvt);
            Cursor.MoveCursor(false, objContext);
        } else if (strKeyCode == 39) {
            StopEvent(objEvt);
            Cursor.MoveCursor(true, objContext);
        } else if (strKeyCode == 9) {
            StopEvent(objEvt);
            FormulaBlur(true, Cursor.GetFormulaPlaceHolderId());
            return false;
        }
    }

    /**
     * @name AssignIdtoMathML
     * @param {string} strMathML
     * @summary update nodes with new ids.
     * @returns {HTML object}
     */
    const AssignIdtoMathML = (strMathML) => {
        let objNode = document.createElement('div');
        objNode.innerHTML = strMathML;
        let arrNodes = objNode.querySelectorAll("mo,mn,mfrac,msup,msqrt,mroot,msubsup,mi,msup,msub,msubsup,mmultiscripts,munder,mover,munderover,mfrac,msqrt,mroot,mtable,menclose");
        arrNodes.forEach((objTemp) => {
            if (objTemp.getAttribute('noid') != 'true') {
                objTemp.id = Helper.GetUniqueId();
            } else {
                objTemp.removeAttribute('id');
            }
        });
        arrNodes = objNode.querySelectorAll("mo,mn,mi");
        arrNodes.forEach(objTemp => {
            objTemp.cssText = 'font-family:inherit;font-style:inherit;';
        });
        return objNode.children[0];
    };

    const AssignEditableInputAttributes = () => {

    }

    /**
     * @name LoadSvgFromMathml
     * @summary load the svg from the mathml (for saved formula).
     * */
    const LoadSvgFromMathml = () => {
        if (Cursor.GetHiddenMathMl("divFormula_", objContext) != null) {
            var intJFormulaEditorPlaceholderId = objContext.props.ElementJson.iElementId;
            Cursor.GetHiddenMathMl("spnFormulasvg", objContext).innerHTML = Cursor.GetHiddenMathMl("divFormula_", objContext).innerHTML;
            MathJax.Hub.Queue(["setRenderer", MathJax.Hub, "SVG"], ["Typeset", MathJax.Hub, "spnFormulasvg" + intJFormulaEditorPlaceholderId], [AssignEditableInputAttributes]);
            Cursor.GetHiddenMathMl("spnFormulasvg", objContext).style.display = "none";
        }
        return;
    };

    /**
     * @name LoadHtmlFromMathml
     * @summary loads the html from MathMl (for saved formula).
     * */
    const LoadHtmlFromMathml = () => {
        if (Cursor.GetHiddenMathMl("divFormula_", objContext) != null) {
            let intJFormulaEditorPlaceholderId = objContext.props.ElementJson.iElementId;
            objFormulaRef.current.querySelector("span[id='" + intJFormulaEditorPlaceholderId + "']").innerHTML = Cursor.GetHiddenMathMl("divFormula_", objContext).innerHTML;
            MathJax.Hub.Queue(["setRenderer", MathJax.Hub, "HTML-CSS"], ["Typeset", MathJax.Hub, objFormulaRef.current.querySelector("span[id='" + intJFormulaEditorPlaceholderId + "']")], [LoadSvgFromMathml]);
        }
    };

    /**
     * @name FormMathMlSpans
     * @summary creates hidden placeholder for saved formula (for saved formula).
     * */
    const FormMathMlSpans = (strMathMl) => {
        let intJFormulaEditorPlaceholderId = props.ElementJson.iElementId;
        let objMathML = AssignIdtoMathML(strMathMl);
        let objFormulaSpan = document.createElement("span");
        objFormulaSpan.id = intJFormulaEditorPlaceholderId;
        objFormulaSpan.style.cssText = 'display:inline-block;padding:0px;margin:0px;border:1px solid transparent;';
        objFormulaSpan.setAttribute("valign", 'middle');
        objFormulaSpan.setAttribute('contenteditable', 'false');
        objFormulaSpan.setAttribute("type", 'JFormulaEditorPlaceholder');
        objFormulaSpan.className = 'FormulaFont';
        objFormulaRef.current.innerHtml = "";
        if (objFormulaRef.current.querySelector("[id='" + intJFormulaEditorPlaceholderId + "']") != null) {
            objFormulaRef.current.querySelector("[id='" + intJFormulaEditorPlaceholderId + "']").remove();
        }
        objFormulaRef.current.appendChild(objFormulaSpan);
        let objDivFormula = document.createElement("div");  // div Formula.
        objDivFormula.id = "divFormula_" + intJFormulaEditorPlaceholderId;
        objDivFormula.style.display = "none";
        objDivFormula.setAttribute("type", "JFormulaEditorMathMlHolder");
        objDivFormula.appendChild(objMathML);
        let objSpanFormula = document.createElement("span"); // span Formula.
        objSpanFormula.setAttribute("contenteditable", "false");
        objSpanFormula.innerHTML = "<span id='spnFormulasvg" + intJFormulaEditorPlaceholderId + "'  style='display:inline-block;padding:0px;margin:0px;border:1px solid transparent' valign='middle' contenteditable='false' Type='CONTENTSVG' class='FormulaFont'></span>";
        AddHiddenMathMl(objDivFormula, objContext);//document.body.appendChild(objDivFormula);
        AddHiddenMathMl(objSpanFormula, objContext); //document.body.appendChild(objSpanFormula);
        LoadHtmlFromMathml();
    };

    /**
     * @param {object} objFormula span with mathml.
     * @param {object} objContext { props, state, dispatch, objFormulaRef }.
     * @summary Add formula hidden fields to the root span of formula.
     */
    const AddHiddenMathMl = (objFormula, objContext) => {
        let iElementId = objContext.props.ElementJson.iElementId;
        let objFormulaParent = objFormulaRef.current.closest("span[ielementid='" + iElementId + "']");
        if (objFormula.id != null && objFormula.id != "") { // remove hidden field if already present.
            if (objFormulaParent.querySelector("[id='" + objFormula.id + "']") != null) {
                objFormulaParent.querySelector("[id='" + objFormula.id + "']").remove();
            }
        }
        objFormulaParent.appendChild(objFormula);
    };

    /**
     * @name AddTxtFormulaEditorEvents
     * @summary this method add keypress, blur, focus and keydown events to the created input.
     * */
    const AddTxtFormulaEditorEvents = () => {
        if (document.getElementById("txtJFormulaEditor") != null) {
            document.getElementById("txtJFormulaEditor").addEventListener("keypress", OnTextFormulaKeyPress);
            document.getElementById("txtJFormulaEditor").addEventListener("blur", OnTextFormulaBlur);
            document.getElementById("txtJFormulaEditor").addEventListener('focus', OnTextFormulaFocus);
            document.getElementById("txtJFormulaEditor").addEventListener("keydown", OnTextFormulaKeydown);
        }
    };

    /**
     * @name RemoveTxtFormulaEditorEvents
     * @summary this method remove keypress, blur, focus and keydown events to the created input.
     * */
    const RemoveTxtFormulaEditorEvents = () => {
        if (document.getElementById("txtJFormulaEditor") != null) {
            document.getElementById("txtJFormulaEditor").removeEventListener("keypress", OnTextFormulaKeyPress);
            document.getElementById("txtJFormulaEditor").removeEventListener("blur", OnTextFormulaBlur);
            document.getElementById("txtJFormulaEditor").removeEventListener('focus', OnTextFormulaFocus);
            document.getElementById("txtJFormulaEditor").removeEventListener("keydown", OnTextFormulaKeydown);
        }
    };

    /**
     * @name ResetFormula
     * @summary reset the existing formula to default formula.
     * */
    const ResetFormula = () => {
        Cursor.SetFormulaEditorPlaceholderId(""); // reset placeholderid.
        Cursor.SetFormulaSelectedNodeId(""); // reset formula selected node id.
        Cursor.SetActiveFormulaDomNode("");
        Cursor.SetFormulaEditorCursorPosition(""); // reset formula cursor position.
        ReplacePlaceholder(objContext.props.ElementJson.vElementJson.Values[0].vDefalutMathMl, true); // updating existing mathMl with default mathMl
    };

    /**
     * @name AddFormulaEvents
     * @summary creates and attach events to the input text box.
     */
    useEffect(() => {
        AddTxtFormulaEditor();
    }, []);

    /**
     * @name useEffect
     * */
    useEffect(() => {
        Cursor.GetCursorImage(objContext); // add cursor.
        AddTxtFormulaEditorEvents();
        return () => {
            RemoveTxtFormulaEditorEvents();
        };
    }, [props, state]);

    /**
     * @name useEffect
     * @summary adds the initial Cursor detail and formula detail to the Editor state.
     * */
    useEffect(() => {
        EditorState.SetProperty("Cursor", {
            FormulaEditorPlaceholderId: "",
            FormulaSelectedNodeId: "",
            FormulaEditorCursorPosition: "",
            FormulaSelectedDomNode: ""
        });
    }, [props]);

    /**
     * @name useEffect
     * */
    useEffect(() => {
        if (GetRootFormulaDiv() != null) {
            if (objContext.props.ElementJson.vElementJson["vNewFormula"] && objContext.props.ElementJson.vElementJson["vNewFormula"].toLowerCase() == "y") {
                console.log("running new formula objContext", objContext);
                Cursor.SetActiveFormulaDomNode(objFormulaRef.current);
                ReplacePlaceholder(objContext.props.ElementJson.vElementJson.Values[0].mathMl);
            } else {
                console.log("running saved formula objContext", objContext);
                let strNewMathMl = Cursor.ReplaceHolderWithId(objContext.props.ElementJson.vElementJson.Values[0].mathMl);
                ReplacePlaceholder(strNewMathMl);
            }
        }
    }, [props]);

    /**
     * @name useImperativeHandle
     * @summary this usImperativeHandle has methods which can be called by the parent component (CMSFormula,CMSInputFormula) for formula manipulation.
     * */
    useImperativeHandle(props.FormulaRef, () => ({
        RemoveMathMl: RemoveMathMl,
        MoveCursorLeft: () => Cursor.MoveCursor(false, objContext),
        MoveCursorRight: () => Cursor.MoveCursor(true, objContext),
        ResetFormula: ResetFormula
    }), [state, props]);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        return (<span cisformularoot="Y" contenteditable={false} onMouseDown={OnFormulaMouseDown} ref={objFormulaRef}> </span>);
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

/**
 * @name ForwardedFormula
 * @summary this wrap the Formula componet inside forwardRef, FormulaRef can be used by the parent Component to call Formula Component methods.
 */
const ForwardedFormula = forwardRef(Formula);

/**
 * @name React.memo
 * @summary this memo avoid the unnecessary rendering of component and when parent state changes, only re-render when mathMl changes.
 */
export default React.memo((props) => {
    return <ForwardedFormula {...props} />
}, (prevProps, newProps) => {
    return prevProps.ElementJson.iElementId === newProps.ElementJson.iElementId &&
        prevProps.ElementJson.vElementJson.Values[0].mathMl === newProps.ElementJson.vElementJson.Values[0].mathMl
});

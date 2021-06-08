//Editor State related imports.
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//Text Tables related Actions.
import * as Common from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/11_Common/Common";

export const GetActiveSelection = () => {
    return EditorState.GetProperty('objActiveSelection');
};

export const GetActiveSelection_New = (SelectionRef) => {
    return SelectionRef.current;
};

/**
 * @param {Ref} objRef Text_Editor Ref undefined in case of Text_Editor , in case of TextMark , overlay it is the respective Component Ref.
 * @summary preserve the selection from the text-editor saved selection and return the new Selection object.
 * @returns {object} objReturn {Range, Selection, SourceElement, GetParent(), GetDirection()}.
 */
export const GetSelection = (objRef) => {
    console.log("GetSelection called");
    let CurrentTextRef = objRef ? objRef : EditorState.GetProperty("CurrentTextRef");
    if (CurrentTextRef && CurrentTextRef !== null && CurrentTextRef.current && CurrentTextRef.current !== null) {
        let objRange = CurrentTextRef.current.GetSelection().Range;
        let objMouseDownObject = CurrentTextRef.current.GetSelection().MouseDownObject ? CurrentTextRef.current.GetSelection().MouseDownObject : undefined;
        let objReturn = {
            IsSourceTextEditor: false
        };
        if (objMouseDownObject) {
            objReturn.MouseDownObject = objMouseDownObject;
        }
        objReturn.Selection = window.getSelection(); // Set Selection.
        if (objRange && objRange !== null) { // range is present.
            objReturn.Selection.removeAllRanges();
            objReturn.Range = objRange; // Set Range
            objReturn.Selection.addRange(objReturn.Range);
            objReturn.Range = window.getSelection().getRangeAt(0);
            if (objReturn.Range.commonAncestorContainer.nodeType === 1 && // if the node is an element instead of text and ancestor is root text editor.
                objReturn.Range.commonAncestorContainer.classList.contains("text-editor-main")) {
                objReturn.SourceElement = objReturn.Range.commonAncestorContainer;
                objReturn.IsSourceTextEditor = true;
            } else {
                objReturn.SourceElement = objReturn.Range.commonAncestorContainer.parentNode;
            }
        } else {
            if (objReturn.Selection && objReturn.Selection.rangeCount > 0 && objReturn.Selection.getRangeAt) {
                objReturn.Range = objReturn.Selection.getRangeAt(0).cloneRange();
                objReturn.Selection.removeAllRanges();
                objReturn.Selection.addRange(objReturn.Range);
                objReturn.Range = window.getSelection().getRangeAt(0);
                if (objReturn.Range.commonAncestorContainer.nodeType === 1 &&  // if the node is an element instead of text and ancestor is root text editor.
                    objReturn.Range.commonAncestorContainer.classList.contains("text-editor-main")) {
                    objReturn.SourceElement = objReturn.Range.commonAncestorContainer;
                    objReturn.IsSourceTextEditor = true;
                } else {
                    objReturn.SourceElement = objReturn.Range.commonAncestorContainer.parentNode;
                }
            }
        }
        objReturn.GetParent = () => { // returns the selection parent node.
            return objReturn.IsSourceTextEditor ? objReturn.SourceElement : objReturn.SourceElement.parentElement;
        };
        objReturn.GetDirection = () => { // returns the direction of selection.
            let blnBackward = false;
            let blnIsCollapsed = objReturn.Selection.isCollapsed;
            if (!blnIsCollapsed) {
                let intPosition = objReturn.Selection.anchorNode.compareDocumentPosition(objReturn.Selection.focusNode);
                // position == 0 if nodes are the same
                if (!intPosition && objReturn.Selection.anchorOffset > objReturn.Selection.focusOffset || intPosition === Node.DOCUMENT_POSITION_PRECEDING) {
                    blnBackward = true;
                }
            }
            return blnBackward ? "RightToLeft" : "LeftToRight";
        };
        objReturn.RemoveAllRanges = () => {
            objReturn.Selection.removeAllRanges();
            CurrentTextRef.current.RemoveAllRange();
        };
        objReturn.GetTextEditor = () => { // returns immediate text editor.
            if (objReturn.Range.commonAncestorContainer.nodeType === 1 && // if the node is an element instead of text and ancestor is root text editor.
                objReturn.Range.commonAncestorContainer.classList.contains("text-editor-main")) {
                return objReturn.Range.commonAncestorContainer;
            } else {
                let objCommonAncestor = objReturn.Range.commonAncestorContainer;
                return objCommonAncestor.closest("div[contenteditable=true]");
            }
        };
        return objReturn;
    }
};

/**
 * @name GetWindowSelection
 * @summary this returns the selection and range from the window.
 */
export const GetWindowSelection = () => {
    let objReturn = {
        IsSourceTextEditor: false
    };
    objReturn.Selection = window.getSelection(); // Set Selection.
        objReturn.Range = window.getSelection().getRangeAt(0);
        if (objReturn.Range.commonAncestorContainer.nodeType === 1 && // if the node is an element instead of text and ancestor is root text editor.
            objReturn.Range.commonAncestorContainer.classList.contains("text-editor-main")) {
            objReturn.SourceElement = objReturn.Range.commonAncestorContainer;
            objReturn.IsSourceTextEditor = true;
        } else {
            objReturn.SourceElement = objReturn.Range.commonAncestorContainer.parentNode;
        }
    return objReturn;
};

/**
 * @name CollapseToEnd
 * @summary this collapse the selection to the end.
 * */
export const CollapseToEnd = () => {
    let objSelection = GetSelection();
    let objRange = objSelection.Range;
    objRange.collapse();
    objRange.insertNode(document.createTextNode(" "));
    objRange.collapse();
};

/**
 * @name SetCursorToEnd
 * @param {int} intElementId 
 * @param {Ref} objTextDomRef 
 * @param {Ref} objTextRef
 * @summary this set the cursor to the end. 
 */
export const SetCursorToEnd = (intElementId, objTextDomRef,objTextRef) => {   
     let objSelection = GetSelection();
    if(objSelection && objSelection !== null){
        let objSelectedElement = objTextDomRef.current.querySelector('[ielementid="' + intElementId + '"]');
      if(objSelection.Selection.containsNode(objSelectedElement)){
            let objNewRange = new Range();
            let objElement = objSelectedElement;
            objNewRange.setStartAfter(objElement);
            objNewRange.setEndAfter(objElement); 
            objNewRange.collapse(false);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(objNewRange);
           UpdateSelection(objNewRange, objTextRef);       
     }
  }
};

/**
 * @name SetActiveTableCursor
 * @summary this set the cursor for the active table.
 */
export const SetActiveTableCursor = () => {
  let objActiveTable = Common.GetActiveWrapDetailFromStore(); // active div tag within element to be rendered
  let objSelection = GetSelection();
  if (objSelection && objSelection !== null) {
    if (objActiveTable && objActiveTable != null && objActiveTable.WrapId) {
      // wrap detail exist in store.
      let strWrapId = objActiveTable.WrapId;
      let objTextEditor = objSelection.GetTextEditor();
      let objWrapSpan = objTextEditor.querySelector("span[id='" + strWrapId + "']");
      let objTable = objWrapSpan.querySelector("table");
      let objNewRange = new Range();
      objNewRange.setStart(objTable.rows[0].cells[0], 0);
      objNewRange.setEnd(objTable.rows[0].cells[0], 0);
      let objWinSelection = window.getSelection();
      objWinSelection.removeAllRanges();
      objWinSelection.addRange(objNewRange);
      UpdateSelection(objNewRange, objTextEditor);
    }
  }
};

/**
 * @name UpdateSelection
 * @param {HTML_Range} objRange selection range object.
 * @param {Ref} objRef Text_Editor Ref.
 * @summary this changes the active range. 
 */
export const UpdateSelection = (objRange, objRef) => {
    objRef = objRef ? objRef : EditorState.GetProperty("CurrentTextRef");
    if (objRef && objRef.current && objRef.current.GetSelection) {
        let objSelectionRef = objRef.current.GetSelectionRef();
        objSelectionRef.current = {
            ...objSelectionRef.current,
            Range: objRange
        };
    }
};

/**
 * @name UpdateTaskEditStatus
 * @param {object} objRef
 * @name UpdateTaskEditStatus
 * @summary this update the task edit status of active text.
 */
export const UpdateTaskEditStatus = (objRef) => {
    objRef = objRef ? objRef : EditorState.GetProperty("CurrentTextRef");
    if(objRef.current && objRef.current.UpdateTaskEditStatus){
        objRef.current.UpdateTaskEditStatus();
    }
}

/**
 * @name AddElementAtCaret
 * @param {HTML_object} objContent html element to be added.
 * @param {string} strType type of element.
 * @summary wrap and add objContent to the carat position.
 */
export const AddElementAtCaret = (objContent, strType) => {
    let objSelection = GetSelection();
    let objRange = objSelection.Range;
    if (objRange && objRange !== null) {
        objRange.deleteContents();
        let divNode = document.createElement('span');
        divNode.style.position = "relative";
        divNode.style.top = "5px";
        divNode.contentEditable = false;
        divNode.setAttribute('type', strType);
        divNode.className = "d-ib";
        divNode.appendChild(objContent);
        objRange.insertNode(divNode);
    }
    let objRangeCloned = objRange.cloneRange();
    objRangeCloned.collapse(false);
    UpdateSelection(objRangeCloned);
    GetSelection();
};

/**
 * @name AddTextAtCaret
 * @param {string} strContent text content.
 * @param {Ref} objTextRef text ref.
 * @summary this add text at the caret position.
 */
export const AddTextAtCaret = (strContent, objTextRef) => {
    let objSelection = GetSelection(objTextRef);
    let objRange = objSelection.Range;
    if (objRange && objRange !== null) {
        objRange.deleteContents();
        let textNode = document.createTextNode(strContent);
        objRange.insertNode(textNode);
    }
    let objRangeCloned = objRange.cloneRange();
    objRangeCloned.collapse(false);
    UpdateSelection(objRangeCloned);
    UpdateSelection(objRangeCloned);
    GetSelection(objTextRef);
};

export const ChangeActiveSelection = (divRef) => {
    if (window.getSelection && document.createRange && window.getSelection().rangeCount > 0) {
        let range = window.getSelection().getRangeAt(0);
        let saveNode = range.startContainer;
        let startNode = range.startContainer;
        let endNode = range.endContainer;
        let startOffset = range.startOffset;  // where the range starts
        let endOffset = range.endOffset;      // where the range ends
        let nodeData = saveNode.data;                       // the actual selected text
        let nodeHTML = saveNode.parentElement.innerHTML;    // parent element innerHTML
        let nodeTagName = saveNode.parentElement.tagName;   // parent element tag name
        let preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(divRef.current);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        let start = preSelectionRange.toString().length;
        let objActiveSelection = {
            "intStart": start,
            "intEnd": start + range.toString().length,
            "divId": divRef.current.id,
            "TextEditorId": divRef.current.id,
            "endOffset": endOffset,
            "startOffset": startOffset,
            "saveNode": saveNode,
            "nodeData": nodeData,
            "startNode": startNode,
            "endNode": endNode,
            "nodeHTML": nodeHTML,
            "nodeTagName": nodeTagName
        };
        EditorState.SetProperty("objActiveSelection", {
            ...GetActiveSelection(),
            ...objActiveSelection
        });
        //  EditorState.SetProperty("objActiveSelection", objActiveSelection);
    }
};

/**
 * @name ChangeActiveSelection_New
 * @param {ref} divRef Ref
 * @param {ref} SelectionRef Ref
 */
export const ChangeActiveSelection_New = (divRef, SelectionRef) => {
    if (window.getSelection && document.createRange && window.getSelection().rangeCount > 0) {
        let range = window.getSelection().getRangeAt(0);
        let objClonedRange = window.getSelection().getRangeAt(0).cloneRange();
        let saveNode = range.startContainer;
        let startNode = range.startContainer;
        let endNode = range.endContainer;
        let startOffset = range.startOffset;  // where the range starts
        let endOffset = range.endOffset;      // where the range ends
        let nodeData = saveNode.data;                       // the actual selected text
        let nodeHTML = saveNode.parentElement.innerHTML;    // parent element innerHTML
        let nodeTagName = saveNode.parentElement.tagName;   // parent element tag name
        let preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(divRef.current);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        let start = preSelectionRange.toString().length;
        let objActiveSelection = {
            "intStart": start,
            "intEnd": start + range.toString().length,
            "divId": divRef.current.id,
            "TextEditorId": divRef.current.id,
            "endOffset": endOffset,
            "startOffset": startOffset,
            "saveNode": saveNode,
            "nodeData": nodeData,
            "startNode": startNode,
            "endNode": endNode,
            "nodeHTML": nodeHTML,
            "nodeTagName": nodeTagName
        };
        SelectionRef.current = {
            ...GetActiveSelection_New(SelectionRef),
            ...objActiveSelection,
            Range: objClonedRange
        };
    }
};

/**
 * @name CreateRangeFromActiveSelection
 * @param {ref} objRef ref
 * @summary Creates the range from active selection and returns it else returns null
 * @returns {object} created range or null
 */
export const CreateRangeFromActiveSelection = (objRef) => {
    objRef = objRef ? objRef : EditorState.GetProperty("CurrentTextRef");
    if (objRef && objRef.current && objRef.current.GetSelection) {
        let savedSel = objRef.current.GetSelection();
        if (document.createRange && window.getSelection) {
            let charIndex = 0, range = document.createRange();
            range.setStart(document.getElementById(savedSel.divId), 0); // set start from the active contenteditable
            range.collapse(true);
            let nodeStack = [document.getElementById(savedSel.divId)], node, foundStart = false, stop = false;
            while (!stop && (node = nodeStack.pop())) {
                if (node.nodeType === 3) {
                    let nextCharIndex = charIndex + node.length;
                    if (!foundStart && savedSel.intStart >= charIndex && savedSel.intStart <= nextCharIndex) {
                        range.setStart(node, savedSel.intStart - charIndex);
                        foundStart = true;
                    }
                    if (foundStart && savedSel.intEnd >= charIndex && savedSel.intEnd <= nextCharIndex) {
                        range.setEnd(node, savedSel.intEnd - charIndex);
                        stop = true;
                    }
                    charIndex = nextCharIndex;
                }
                else {
                    let i = node.childNodes.length;
                    while (i--) {
                        nodeStack.push(node.childNodes[i]);
                    }
                }
            }
            return range;
        }
    }
    return null;
};

/**
 * @name BuildRange
 * @param {ref} objRef ref
 * @summary build range from saved range properties.
 * @returns {range} Range
 */
export const BuildRange = (objRef) => {
    let CurrentTextRef = objRef ? objRef : EditorState.GetProperty("CurrentTextRef");
    let { startOffset, endOffset, startNode, endNode, TextEditorId } = CurrentTextRef.current.GetSelection();
    if (document.getElementById(TextEditorId).contains(startNode) && document.getElementById(TextEditorId).contains(endNode)) {
        let range = document.createRange();
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);
        return range;
    } else {
        return CreateRangeFromActiveSelection(objRef);
    }
};

/**
 * @name SetFocus
 * @param {object} objNode Node
 * @param {int} position Position
 * @summary Set the focus to the node
 */
export const SetFocus = (objNode, position) => {
    let range = document.createRange();
    position = position || 0;
    let sel = window.getSelection();
    range.setStart(objNode, position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    objNode.focus();
};

// to be deleted
export const GetFocusElement = () => {
    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    var node = document.createElement('span');
    range.insertNode(node);
    range = range.cloneRange();
    range.selectNodeContents(node);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    var activeDiv = node.parentNode;
    node.parentNode.removeChild(node);
    return activeDiv;
};

export const PasteHtmlAtCaret = (objNode) => {
    let sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            let el = document.createElement("div");
            el.appendChild(objNode);
            let frag = document.createDocumentFragment(), node, lastNode;
            while (node === el.firstChild) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type !== "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
};

/**
 * @name PreserveSelection
 * @param {ref} objRef ref
 * @summary Preserves the selection from the application state.
 * @returns {selection} selection
 */
export const PreserveSelection = (objRef) => {
    //  let range = CreateRangeFromActiveSelection();
    let range = BuildRange(objRef);
    if (range && range !== null) {
        let sel = window.getSelection();
        sel.removeAllRanges(); // removing all ranges before adding 
        sel.addRange(range); // adding the selected range to the selection
    }
    return window.getSelection();
};

/**
 * @name GetSelectedContent
 * @summary Returns the content of the selected html
 * @returns {any} Selected Content
 */
export const GetSelectedContent = () => {
    PreserveSelection();
    let objRange = window.getSelection().getRangeAt(0);
    return objRange.extractContents();
};

/**
 * @name GetSelectedContentAsElement
 * @summary Returns the selected html as an element by wrapping it in a div.
 * @returns {any} Selected content as DOM Element.
 */
export const GetSelectedContentAsElement = () => {
    PreserveSelection();
    let objRange = window.getSelection().getRangeAt(0);
    let clonedSelection = objRange.cloneContents();
    let divElement = document.createElement('div');
    divElement.appendChild(clonedSelection);
    return divElement;
};

/**
 * @name GetSelectedContentHtml
 * @summary Returns the selected HTML.
 * @returns {any} Selected content's HTML
 */
export const GetSelectedContentHtml = () => {
    PreserveSelection();
    let divElement = GetSelectedContentAsElement();
    let strSelectedHtml = divElement.innerHTML;
    return strSelectedHtml;
};

/**
 * @name GetSelectedContentText
 * @param {ref} objRef ref
 * @summary Preserves the selection and returns the selected text.
 * @returns {string} Selcted content as text.
 */
export const GetSelectedContentText = (objRef) => {
    PreserveSelection(objRef);
    let strSelectedText = window.getSelection().getRangeAt(0).toString();
    return strSelectedText;
};

/**
 * this method select the text based on the start and end value stored in state
 * 
 */
//export const PreserveSelection = () => {
//    let savedSel = GetActiveSelection(); // last active content editable and selected text
//    if (savedSel && savedSel.divId) {
//        if (document.createRange && window.getSelection) {
//            let charIndex = 0, range = document.createRange();
//            range.setStart(document.getElementById(savedSel.divId), 0); // set start from the active contenteditable
//            range.collapse(true);
//            let nodeStack = [document.getElementById(savedSel.divId)], node, foundStart = false, stop = false;
//            while (!stop && (node = nodeStack.pop())) {
//                if (node.nodeType == 3) {
//                    let nextCharIndex = charIndex + node.length;
//                    if (!foundStart && savedSel.intStart >= charIndex && savedSel.intStart <= nextCharIndex) {
//                        range.setStart(node, savedSel.intStart - charIndex);
//                        foundStart = true;
//                    }
//                    if (foundStart && savedSel.intEnd >= charIndex && savedSel.intEnd <= nextCharIndex) {
//                        range.setEnd(node, savedSel.intEnd - charIndex);
//                        stop = true;
//                    }
//                    charIndex = nextCharIndex;
//                } else {
//                    let i = node.childNodes.length;
//                    while (i--) {
//                        nodeStack.push(node.childNodes[i]);
//                    }
//                }
//            }
//            let sel = window.getSelection();
//            sel.removeAllRanges(); // removing all ranges before adding 
//            sel.addRange(range); // adding the selected range to the selection
//        } else {
//            var textRange = document.body.createTextRange();
//            textRange.moveToElementText(document.getElementById(savedSel.divId));
//            textRange.collapse(true);
//            textRange.moveEnd(savedSel.intEnd);
//            textRange.moveStart(savedSel.intStart);
//            textRange.select();
//        }
//    }
//};

/**
 * @name SaveSelection
 * @summary this method save the selection of the text to the store
 * @param {HTML_Event} objEvt Event
 */
export const SaveSelection = (objEvt) => {
    PreserveSelection();
    if ((objEvt && objEvt.target && objEvt.target.getAttribute('iElementType') && objEvt.target.getAttribute('iElementType').toLowerCase() === 'overlay') || (objEvt && objEvt.updateSelection)) {
        //Do something
    }
    else {
        EditorState.SetProperty("ActiveChangeEvent", onContentChange_Callbck); // storing it to application state to trigger it after the ribbon action completes
        if (window.getSelection && document.createRange) {
            let range = window.getSelection().getRangeAt(0);
            let preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(divRef.current);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            let start = preSelectionRange.toString().length;
            EditorState.SetProperty("objActiveSelection", {
                intStart: start,
                intEnd: start + range.toString().length,
                divId: state.divId
            });
        } else if (document.selection && document.body.createTextRange) {
            let selectedTextRange = document.selection.createRange();
            let preSelectionTextRange = document.body.createTextRange();
            preSelectionTextRange.moveToElementText(divRef.current);
            preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
            let start = preSelectionTextRange.text.length;
            EditorState.SetProperty("objActiveSelection", {
                intStart: start,
                intEnd: start + range.toString().length,
                divId: state.divId
            });
        }
    }
};

/**
 * @name GetDomSelection
 * @returns {selection} Selection and Range Object {SelectionObject : , RangeObject}
 * 
 */
export const GetDomSelection = () => {
    PreserveSelection();
    let objSelection = {};
    objSelection.SelectionObject = window.getSelection();
    objSelection.RangeObject = window.getSelection().getRangeAt(0);
    objSelection.SourceElement = window.getSelection().focusNode.parentElement;
    return objSelection;
};

/**
 * @name GetSelectionDirection
 * @summary Provides the direction of selection. Returns a Json object. {"From": "", "Right": ""}
 * @returns {object} Direction Json
 */
export const GetSelectionDirection = () => {
    let blnIsSelectionBackward = false;
    if (window.getSelection) {
        let objSelection = window.getSelection();
        if (!objSelection.isCollapsed) {
            let objRange = document.createRange();
            objRange.setStart(objSelection.anchorNode, objSelection.anchorOffset);
            objRange.setEnd(objSelection.focusNode, objSelection.focusOffset);
            blnIsSelectionBackward = objRange.collapsed;
        }
    }
    if (blnIsSelectionBackward) {
        return {
            "From": "Right",
            "To": "Left"
        };
    }
    else {
        return {
            "From": "Left",
            "To": "Right"
        };
    }
};

/**
 * @name SetCaretAtLast
 * @param {string} strDivId Div Id
 * @param {boolean} blnSetAtlastOfParentElement true/false
 * @summary Sets the cursor position at the end of the wiki
 */
export const SetCaretAtLast = (strDivId, blnSetAtlastOfParentElement = false) => {
    let objElement = document.getElementById(strDivId);
    if (blnSetAtlastOfParentElement) {
        objElement = objElement.parentElement;
    }
    let objRange = document.createRange();
    let objSelection = window.getSelection();
    objRange.setStart(objElement.childNodes[objElement.childNodes.length - 1], objElement.childNodes[objElement.childNodes.length - 1].data.length);
    objRange.collapse(false);
    objSelection.removeAllRanges();
    objSelection.addRange(objRange);
    objElement.focus();
};

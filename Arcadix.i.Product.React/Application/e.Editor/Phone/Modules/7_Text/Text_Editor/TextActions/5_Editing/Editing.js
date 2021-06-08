//store related import.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Selection related import.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

/**
 * @name ApplyPaintFormat
 * @summary this applies the paint format styles to the selected text.
 * */
const ApplyPaintFormat = () => {
    /* develblock:start */
    global.ApplicationLog.Log("Editing.ApplyPaintFormat: Entered");
    /* develblock:end */
    document.body.style.cursor = "auto";
    let objSelectionJson = Selection.GetSelection();
    if (objSelectionJson.SourceElement != null && EditorState.GetProperty("PaintFormat") && !objSelectionJson.Selection.isCollapsed) {
        let objCopiedStyles = EditorState.GetProperty("PaintFormat");
        EditorState.RemoveProperty("PaintFormat");
        document.execCommand("fontSize", false, "7");
        objSelectionJson = Selection.GetSelection();
        let objDiv = objSelectionJson.IsSourceTextEditor ? objSelectionJson.SourceElement : objSelectionJson.SourceElement.parentElement;
        objDiv.querySelectorAll("font[size]").forEach(objFontSizeNode => {
            Object.keys(objCopiedStyles).forEach(strKey => {
                objFontSizeNode.style[strKey] = objCopiedStyles[strKey];
            });
            objFontSizeNode.removeAttribute("size");
        });
    }
    document.removeEventListener("mouseup", ApplyPaintFormat);
    /* develblock:start */
    global.ApplicationLog.Log("Editing.ApplyPaintFormat: Exited");
    /* develblock:end */
}

/**
 * @name PaintFormat
 * @summary this copies the selected text styles and update it to store that can be applied on selected text.
 * */
export const PaintFormat = () => {
    /* develblock:start */
    global.ApplicationLog.Log("Editing.PaintFormat: Entered");
    /* develblock:end */
    let objSelectionJson = Selection.GetSelection();
    if (objSelectionJson.SourceElement != null && !objSelectionJson.Selection.isCollapsed) {
        let objInFocus = objSelectionJson.SourceElement;
        if (objSelectionJson.Selection.focusNode) {
            objInFocus = objSelectionJson.Selection.focusNode.parentNode;
        }
        else {
            objInFocus = objSelection.Selection.commonAncestorContainer;
        }
        let objCopiedStyles = {
            "fontFamily": objInFocus.style.fontFamily,
            "color": objInFocus.style.color,
            "backgroundColor": objInFocus.style.backgroundColor,
            "fontSize": objInFocus.style.fontSize,
            "fontWeight": objInFocus.style.fontWeight,
            "fontStyle": objInFocus.style.fontStyle,
            "textDecoration": objInFocus.style.textDecoration
        };
        EditorState.SetProperty("PaintFormat", objCopiedStyles);
        document.body.style.cursor = "text";
        document.addEventListener("mouseup", ApplyPaintFormat);
    }
    /* develblock:start */
    global.ApplicationLog.Log("Editing.PaintFormat: Exited");
    /* develblock:end */
};

/**
 * @name ChangeChildrenLineHeight
 * @param objContainer html element to be checked for line-height update.
 * @param intLineHeightValue line height value to be updated.
 * @summary this method change the child node line-height if any node with attribute LineSpace is present.
 */
const ChangeChildrenLineHeight = (objContainer, intLineHeightValue) => {
    /* develblock:start */
    global.ApplicationLog.Log("Editing.ChangeChildrenLineHeight: Entered");
    /* develblock:end */
    objContainer.querySelectorAll("[type='LineSpace']").forEach(objLineSpace => {
        objLineSpace.style.lineHeight = intLineHeightValue;
    });
    /* develblock:start */
    global.ApplicationLog.Log("Editing.ChangeChildrenLineHeight: Exited");
    /* develblock:end */
};

/**
 * @name InsertLineHeight
 * @param {number} intLineHeightValue line height value.
 * @summary this method add the line height to the selected text.
 */
export const InsertLineHeight = (intLineHeightValue) => {
    /* develblock:start */
    global.ApplicationLog.Log("Editing.InsertLineHeight: Entered");
    /* develblock:end */
    let objSelection = Selection.GetSelection();
    let blnStarted = false;
    if (objSelection.Selection.focusNode) {
        let objFocusParent = objSelection.Selection.focusNode;
        while (objFocusParent.nodeType != 1){
            objFocusParent = objFocusParent.parentElement
        };
        let arrChildNodes = objFocusParent.closest("div[contenteditable='true']").children;
        for (let intIndex = 0; intIndex < arrChildNodes.length; intIndex++) {
            let objChildNode = arrChildNodes[intIndex];
            if (window.getSelection) { // browser supporting getSelection.
                if (objChildNode.contains(objSelection.Selection.focusNode.parentNode) || objChildNode.contains(objSelection.Selection.anchorNode.parentNode) ||
                    objChildNode.isAncestor(objSelection.Selection.focusNode.parentNode) || objChildNode.isAncestor(objSelection.Selection.anchorNode.parentNode)) {
                    if (blnStarted) {
                        if (objChildNode.getAttribute("type") == 'LineSpace') {
                            objChildNode.style.lineHeight = intLineHeightValue;
                            ChangeChildrenLineHeight(objChildNode,intLineHeightValue);
                        } else {
                            let objWrapDiv = document.createElement('div');
                            objWrapDiv.style.lineHeight = intLineHeightValue;
                            objWrapDiv.setAttribute("type", "LineSpace");
                            objChildNode.parentNode.insertBefore(objWrapDiv, objChildNode);
                            objWrapDiv.appendChild(objChildNode);
                            ChangeChildrenLineHeight(objWrapDiv, intLineHeightValue);
                        }                     
                    }
                    blnStarted = true;
                }
                if (blnStarted) {
                    if (objChildNode.getAttribute("type") == 'LineSpace') {
                        objChildNode.style.lineHeight = intLineHeightValue;
                        ChangeChildrenLineHeight(objChildNode,intLineHeightValue);
                    } else {
                        let objWrapDiv = document.createElement('div');
                        objWrapDiv.setAttribute("type", "LineSpace");
                        objWrapDiv.style.lineHeight = intLineHeightValue;
                        objChildNode.parentNode.insertBefore(objWrapDiv, objChildNode);
                        objWrapDiv.appendChild(objChildNode);
                        ChangeChildrenLineHeight(objWrapDiv, intLineHeightValue);
                    }
                    if (objSelection.Selection.anchorNode.parentNode == objSelection.Selection.focusNode.parentNode){
                        Selection.GetSelection();
                        return false;
                    }
                }
            }
        }
    }
    Selection.GetSelection();
    /* develblock:start */
    global.ApplicationLog.Log("Editing.InsertLineHeight: Exited");
    /* develblock:end */
};

/**
 * 
 * @param {string} intLineHeight 
 */
export const LineHeight = (intLineHeight) => {
    /* develblock:start */
    global.ApplicationLog.Log("Editing.LineHeight: Entered");
    /* develblock:end */
    Selection.PreserveSelection();
    let objSelection = Selection.GetDomSelection();
    let isCollapsed = window.getSelection().isCollapsed;
    let objWrapDiv = document.createElement('div'); // new div
    objWrapDiv.setAttribute('type', 'LineSpace');
    objWrapDiv.style.lineHeight = intLineHeight;
    objWrapDiv.style.minHeight = "23px";
    if (isCollapsed) { // if selection is collapsed

        objWrapDiv.appendChild(objSelection.RangeObject.extractContents()); // wrapping selection with div and line height
        objSelection.RangeObject.insertNode(objWrapDiv);
    } else {
        let isTextNode = objSelection.SelectionObject.focusNode.nodeType === 3; // is selected node is textnode
        let isFocusTextEditor = objSelection.SelectionObject.focusNode.parentNode.getAttribute('contenteditable') === "true"; //if selected node's parent node is texteditor
        let focusedElement = objSelection.SelectionObject.focusNode.parentNode; // focused element parent node
        let anchorElement = objSelection.SelectionObject.anchorNode.parentNode;

        if (isTextNode && isFocusTextEditor) {
            objWrapDiv.appendChild(objSelection.RangeObject.extractContents()); // wrapping selection with div and line height
            RemoveLineHeight(objWrapDiv);
            objSelection.RangeObject.insertNode(objWrapDiv);
        } else if (isTextNode && !isFocusTextEditor) {
            let blnIsParentTextEditor = focusedElement.parentNode.getAttribute('contenteditable') === "true";
            if (blnIsParentTextEditor) { // if immidiate parent is texteditor
                objWrapDiv.appendChild(objSelection.RangeObject.extractContents()); // wrapping selection with div and line height
                RemoveLineHeight(objWrapDiv);
                objSelection.RangeObject.insertNode(objWrapDiv);

            } else { // if immediate parent is not texteditor
                if (focusedElement.parentElement.getAttribute('type') === 'LineSpace' && anchorElement.previousSibling == null && focusedElement.nextSibling == null) {
                    console.log('LineSpace div')
                    focusedElement.parentElement.style.lineHeight = intLineHeight;
                } else if (anchorElement.previousSibling != null || focusedElement.nextSibling != null) {
                    RemoveLineHeight(objWrapDiv);
                    objWrapDiv.appendChild(objSelection.RangeObject.extractContents()); // wrapping selection with div and line height
                    objSelection.RangeObject.insertNode(objWrapDiv);
                }
                else {
                    focusedElement.parentElement.setAttribute('type', 'LineSpace');
                    focusedElement.parentElement.style.lineHeight = intLineHeight;
                }
            }
        }
    }
    /* develblock:start */
    global.ApplicationLog.Log("Editing.LineHeight: Exited");
    /* develblock:end */
};

const RemoveLineHeight = (objWrapDiv) => {
    /* develblock:start */
    global.ApplicationLog.Log("Editing.RemoveLineHeight: Entered");
    /* develblock:end */
    for (let i = 0; i < objWrapDiv.children.length; i++) {
        objWrapDiv.children[i].style.removeProperty('line-height');
    }
    /* develblock:start */
    global.ApplicationLog.Log("Editing.RemoveLineHeight: Exited");
    /* develblock:end */
}

export const GetLineHeight = () => {
    /* develblock:start */
    global.ApplicationLog.Log("Editing.RemoveLineHeight: Entered");
    /* develblock:end */
    let objSelectionNode = Selection.GetDomSelection();
    let focusNode = objSelectionNode.SelectionObject.focusNode.parentNode;
    let type = focusNode.getAttribute("type");
    let lineHeight = "";
    if (type != null && type === 'LineSpace') {
        lineHeight = focusNode.style.LineHeight;
    } else {
        let closestElement = focusNode.closest('[type="LineSpace"]');
        if (closestElement != null) {
            lineHeight = closestElement.style.lineHeight;
        }
    }
    /* develblock:start */
    global.ApplicationLog.Log("Editing.RemoveLineHeight: Exited");
    /* develblock:end */
    return lineHeight;
}

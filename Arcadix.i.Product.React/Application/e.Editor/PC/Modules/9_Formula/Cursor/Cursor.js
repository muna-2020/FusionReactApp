//Editor State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";


/**
    * @param {*} objNode 
    * @param {*} blnCheck 
    * @summary returns objNode Parent immediate sibling.
    */
const GetParentNextSibling = (objNode, blnCheck) => {
    let objReturn = new Object();
    if (objNode && objNode != null) {
        objReturn.Current = objNode;
        objReturn.Next = GetNextWithChild(objNode);
        if (objReturn.Next == undefined || objReturn.Next == null) {
            if (objReturn.Current.getAttribute("id") == null || blnCheck)
                objReturn = GetParentNextSibling(objNode.parentElement.tagName.toLowerCase() == "div" ? null : objNode.parentElement, false);
        }
    }
    return objReturn;
};

/**
 * @param {*} objNode 
 * @summary returns objNode immediate sibling.
 */
const GetNextWithChild = (objNode) => {
    let objReturn = objNode.nextSibling;
    if (objReturn != null && objReturn.getAttribute("id") == null && objReturn.querySelector("[id]") == null) {
        objReturn = GetNextWithChild(objReturn);
    }
    return objReturn;
};

/**
 * 
 * @param {*} objNode 
 */
const GetPrevWithChild = (objNode) => {
    let objReturn = objNode.previousSibling
    if (objReturn != null && objReturn.getAttribute("id") == null && objReturn.querySelector("[id]") == null) {
        objReturn = GetPrevWithChild(objReturn);
    }
    return objReturn;
};

/**
 * 
 * @param {*} objNode 
 * @param {*} blnCheck 
 */
const GetParentPreviewSibling = (objNode, blnCheck) => {
    let objReturn = new Object();
    if (objNode && objNode != null) {
        objReturn.Current = objNode;
        objReturn.Prev = GetPrevWithChild(objNode);
        if (objReturn.Prev == null) {
            if (objReturn.Current.getAttribute("id") == null || blnCheck)
                objReturn = GetParentPreviewSibling(objNode.parentElement.tagName.toLowerCase() == "div" ? null : objNode.parentElement, false);
        }
    }
    let objReturnNew = objReturn
    //console.log("objReturnNew", objReturnNew);
    return objReturnNew;
};


/**
 * 
 * @param {*} objNode 
 */
const GetLastChildSibling_Old = (objNode) => {
    let arrReturn = [];
    let objReturn;
    let arrChildrens = objNode.children;
    for (let i = 0; i < arrChildrens.length; i++) {
        if (arrChildrens[i].getAttribute("id") != null) {
            arrReturn = [...arrChildrens, arrChildrens[i]];
        }
    }
    if (arrReturn.length <= 0) {
        if (objNode && objNode != null && objNode.children.length > 0) {
            let objlast = objNode.children[objNode.children.length - 1];
            if (objlast.querySelector("[id]") != null)
                objReturn = GetLastChildSibling_Old(objlast);
            else
                objReturn = GetLastChildSibling_Old(GetPrevWithChild(objlast));
        }
        else
            objReturn = objNode;
    }
    return objReturn; // test pening
};


const GetLastSibling = (objNode) => {
    if (!objNode.nextSibling || objNode.nextSibling == null) {
        return objNode
    } else {
        GetLastSibling(objNode.nextSibling);
    }
}

const GetLastChildSibling = (objNode) => {
    let objReturn = objNode.querySelectorAll("[id]");
    if (objReturn.length <= 0) {
        if (objNode.children.length > 0) {
            let objLast = objNode.lastChild;
            if (objLast.querySelectorAll("[id]").length > 0)
                objReturn = GetLastChildSibling(objLast);
            else
                objReturn = GetLastChildSibling(GetPrevWithChild(objLast));
        } else
            objReturn = objNode;
    }
    return objReturn[objReturn.length - 1];
}

/**
 * @name GetCursorImage
 * @summary returns the cursor image if it is present on the dom else create image element with style and return.
 */
export const GetCursorImage = (objContext) => {
    if (document.getElementById("imgJFormulaEditorCursor") != null) {
        return document.getElementById("imgJFormulaEditorCursor");
    } else {
        let objCursorImg = document.createElement('img');
        objCursorImg.style['position'] = "absolute";
        objCursorImg.style['top'] = "0px";
        objCursorImg.style['left'] = "0px";
        objCursorImg.style['display'] = "none";
        objCursorImg.style["z-index"] = 10000000;
        objCursorImg.src = objContext.props.JConfiguration.EditorSkinPath + "/Images/Common/BlinkingCurser.gif";
        objCursorImg.id = 'imgJFormulaEditorCursor';
        document.body.appendChild(objCursorImg);
        return document.getElementById('imgJFormulaEditorCursor');
    }
};

/**
* @name SetCursor
* @param {HTML object} objJFormulaEditorNewFocusedElement 
* @param {string} strCursorPosition
* @summary to set the cursor and to add data.
*/
export const SetCursor = (objJFormulaEditorNewFocusedElement, strCursorPosition, objContext) => {
    let intJFormulaEditorPlaceholderId = objJFormulaEditorNewFocusedElement.closest('span[type="JFormulaEditorPlaceholder"]').getAttribute('id');
    let objFormulaPlaceholderDom = objJFormulaEditorNewFocusedElement.closest('span[type="JFormulaEditorPlaceholder"]');
    if (intJFormulaEditorPlaceholderId == undefined) {
        intJFormulaEditorPlaceholderId = objJFormulaEditorNewFocusedElement.closest('span[type="JFormulaEditorFixedPlaceholder"]').getAttribute("id");
        if (intJFormulaEditorPlaceholderId == undefined) {
            intJFormulaEditorPlaceholderId = objJFormulaEditorNewFocusedElement.getAttribute("id");
        }
    }
    if (objFormulaPlaceholderDom != null && objFormulaPlaceholderDom.parentElement.querySelector('[id="imgJFormulaEditorCursor"]') == null) {
        objFormulaPlaceholderDom.parentElement.appendChild(GetCursorImage(objContext));
    }
    objFormulaPlaceholderDom.parentElement.style.position = 'relative';
    if (intJFormulaEditorPlaceholderId && GetHiddenMathMl("divFormula_", objContext) != null) {
        ReturnFocus();
        GetCursorImage(objContext).style.display = "block";
        let intimgJFormulaEditorCursorLeft = objJFormulaEditorNewFocusedElement.getBoundingClientRect().left - objFormulaPlaceholderDom.parentElement.getBoundingClientRect().left + objFormulaPlaceholderDom.parentElement.scrollLeft// - $(objJFormulaEditorNewFocusedElement).closest('#tdJFormulaEditorPlacHolder').scrollLeft();
        let intimgJFormulaEditorCursorTop = objJFormulaEditorNewFocusedElement.getBoundingClientRect().top - objFormulaPlaceholderDom.parentElement.getBoundingClientRect().top + objFormulaPlaceholderDom.parentElement.scrollTop;// - $(objJFormulaEditorNewFocusedElement).closest('#tdJFormulaEditorPlacHolder').scrollTop();
        let intimgJFormulaEditorCursorHeight = objJFormulaEditorNewFocusedElement.getBoundingClientRect().height;
        if (intimgJFormulaEditorCursorHeight <= 0) {
            intimgJFormulaEditorCursorHeight = parseFloat(objJFormulaEditorNewFocusedElement.style.fontSize.split("px")[0]);
        }

        let intWidth = objJFormulaEditorNewFocusedElement.getBoundingClientRect().width;
        intWidth += parseFloat(objJFormulaEditorNewFocusedElement.style.marginLeft.split("px")[0]);
        intWidth += parseFloat(objJFormulaEditorNewFocusedElement.style.marginRight.split("px")[0]);
        intWidth += parseFloat(objJFormulaEditorNewFocusedElement.style.paddingLeft.split("px")[0]);
        intWidth += parseFloat(objJFormulaEditorNewFocusedElement.style.paddingRight.split("px")[0]);

        if (objJFormulaEditorNewFocusedElement.innerText == "□") {
            intimgJFormulaEditorCursorLeft = intimgJFormulaEditorCursorLeft + (Math.round(objJFormulaEditorNewFocusedElement.getBoundingClientRect().width) / 2) - 1;
        }
        else if (strCursorPosition == "After") {
            intimgJFormulaEditorCursorLeft = intimgJFormulaEditorCursorLeft + Math.round(objJFormulaEditorNewFocusedElement.getBoundingClientRect().width);
        }
        intimgJFormulaEditorCursorHeight = Math.round(objJFormulaEditorNewFocusedElement.getBoundingClientRect().height);
        let CursorImage = GetCursorImage(objContext);
        CursorImage.style.top = (intimgJFormulaEditorCursorTop + 2) + 'px';
        CursorImage.style.left = intimgJFormulaEditorCursorLeft + 'px';
        CursorImage.style.position = 'absolute';
        CursorImage.style.width = "1px";
        CursorImage.style.height = intimgJFormulaEditorCursorHeight + 'px';
        CursorImage.style.display = "block";

        document.getElementById('txtJFormulaEditor').style.top = intimgJFormulaEditorCursorTop;
        document.getElementById('txtJFormulaEditor').style.left = intimgJFormulaEditorCursorLeft;

        SetFormulaEditorPlaceholderId(intJFormulaEditorPlaceholderId);
        SetFormulaSelectedNodeId(objJFormulaEditorNewFocusedElement.getAttribute("id"));
        SetFormulaEditorCursorPosition(strCursorPosition);
        document.querySelectorAll('span[type="JFormulaEditorPlaceholder"]').forEach(objFormula => {
            let objSelected = objFormula.querySelector('[IsSelected="IsSelected"]');
            if (objSelected != null) {
                objFormula.querySelector('[IsSelected="IsSelected"]').style.backgroundColor = "";
                objFormula.removeAttribute('IsSelected');
            }

        });
        objJFormulaEditorNewFocusedElement.closest('[id]').setAttribute('IsSelected', 'IsSelected');
        objJFormulaEditorNewFocusedElement.closest('[id]').style.backgroundColor = "#D1E8FF";
        objJFormulaEditorNewFocusedElement.parentElement.setAttribute('IsSelected', 'IsSelected');
        objJFormulaEditorNewFocusedElement.parentElement.backgroundColor = "#D1E8FF";
    }
    else if (intJFormulaEditorPlaceholderId && GetHiddenMathMl("divFixedFormula_", objContext) != null) {

    } else {
        ResetCursor();
    }
};
/**
 * @name ResetCursor
 * @summary reset the cursor position.
 */
export const ResetCursor = () => {
    document.getElementById("txtJFormulaEditor").blur();
    document.querySelectorAll('span[type="JFormulaEditorPlaceholder"]').forEach(objFormula => {
        objFormula.style.border = "1px solid transparent";
        objFormula.style.backgroundColor = "";
        objFormula.querySelectorAll('[IsSelected="IsSelected"]').forEach(objSelected => {
            objSelected.removeAttribute('IsSelected');
        });
    });
    let objCursorImage = GetCursorImage();
    SetFormulaSelectedNodeId("");
    SetFormulaEditorPlaceholderId("");
    SetFormulaEditorCursorPosition("");
    objCursorImage.style.display = "none";
};

/**
 * @name ReturnFocus
 * @summary to set focus of the input to handle keypress events.
 */
export const ReturnFocus = () => {
    let objSelection;
    if (document.selection && document.selection.empty)
        document.selection.empty();
    else if (window.getSelection) {
        objSelection = window.getSelection();
        if (objSelection && objSelection.removeAllRanges)
            objSelection.removeAllRanges();
    }
    setTimeout(function () {
        document.getElementById('txtJFormulaEditor').style = 'block';
        document.getElementById('txtJFormulaEditor').focus();
    }, 100);
};

/**
 * @param {any} strPrefix prefix of id (divFormula_,divFixedFormula)
 * @param {any} objContext
 * @summary this method returns the hidden formula based on StrPrefix
 * @returns {HTML}
 */
export const GetHiddenMathMl = (strPrefix, objContext) => {
    let iElementId, objFormulaRoot;
    if (GetFormulaEditorPlaceholderId() && GetFormulaEditorPlaceholderId() != "") {
        iElementId = GetFormulaEditorPlaceholderId();
    } else {
        iElementId = objContext.props.ElementJson.iElementId;
    }
    if (GetActiveFormulaDomNode() && GetActiveFormulaDomNode() != "") {
        objFormulaRoot = GetActiveFormulaDomNode();
    } else {
        objFormulaRoot = objContext.objFormulaRef.current;
    }
    let strId = strPrefix + iElementId;
    let objFormulaParent = objFormulaRoot.closest("span[ielementid='" + iElementId + "']");
    //console.log(objFormulaParent);
    //console.trace("GetHiddenField trace");
    return objFormulaParent.querySelector("#" + strId);
};



/**
 * @name MoveCursor
 * @param {bool} blnNext 
 * @summary move cursor.
 */
export const MoveCursor = (blnNext, objContext) => {
    let intJFormulaEditorPlaceholderId = GetFormulaEditorPlaceholderId();
    if (intJFormulaEditorPlaceholderId != "") {
        let intFormulaSelectedNodeId = GetFormulaSelectedNodeId();
        if (intFormulaSelectedNodeId != "") {
            let objPresentNode = GetHiddenMathMl("divFormula_", objContext).querySelector('[id="' + intFormulaSelectedNodeId + '"]')
            let objNodeAndPosition = new Object();
            objNodeAndPosition.NewNode = null;
            objNodeAndPosition.CursorPosition = GetFormulaEditorCursorPosition();
            if (objPresentNode.getAttribute("jump") == 'true') {
                if (blnNext)
                    objNodeAndPosition.CursorPosition = "After";
                else
                    objNodeAndPosition.CursorPosition = "Before";
            }
            if (blnNext) {
                if (objNodeAndPosition.CursorPosition == "After") {
                    let objNode = GetParentNextSibling(objPresentNode, true);
                    objNodeAndPosition.NewNode = objNode.Next;
                    if (objNode.Current.getAttribute("id") == objPresentNode.parentElement.closest("[id]").id) {
                        objNodeAndPosition.NewNode = objNode.Current;
                        objNodeAndPosition.CursorPosition = "After";
                    }
                    else if (objNode.Current.getAttribute("id") != null && objNode.Next == null) {
                        objNodeAndPosition.NewNode = objNode.Current;
                        objNodeAndPosition.CursorPosition = "After";
                    }
                    else if (objNodeAndPosition.NewNode != null && objNodeAndPosition.NewNode.querySelector('[id]') != null) {
                        objNodeAndPosition.NewNode = objNodeAndPosition.NewNode.querySelector('[id]');
                        if (objNodeAndPosition.NewNode.innerText == "□")
                            objNodeAndPosition.CursorPosition = "After";
                        else
                            objNodeAndPosition.CursorPosition = "Before";
                    } else {
                        objNodeAndPosition.CursorPosition = "After";
                    }
                } else {
                    objNodeAndPosition.NewNode = objPresentNode;
                    if (objNodeAndPosition.NewNode != null && objNodeAndPosition.NewNode.querySelector('[id]') != null) {
                        objNodeAndPosition.NewNode = objNodeAndPosition.NewNode.querySelector('[id]');
                        if (objNodeAndPosition.NewNode.innerText == "□")
                            objNodeAndPosition.CursorPosition = "After";
                        else
                            objNodeAndPosition.CursorPosition = "Before";
                    } else {
                        objNodeAndPosition.CursorPosition = "After";
                    }
                }
            } else {
                if (objNodeAndPosition.CursorPosition == "Before") {
                    let objNodeSibling = GetParentPreviewSibling(objPresentNode, true);
                    objNodeAndPosition.NewNode = objNodeSibling.Prev;
                    if (objNodeSibling.Current.getAttribute("id") == objPresentNode.parentElement.closest("[id]").getAttribute("id")) {
                        objNodeAndPosition.NewNode = objNodeSibling.Current;
                        objNodeAndPosition.CursorPosition = "Before";
                    }
                    else if (objNodeSibling.Current.getAttribute("id") != null && objNodeSibling.Prev == null) {
                        objNodeAndPosition.NewNode = objNodeSibling.Current;
                        objNodeAndPosition.CursorPosition = "Before";
                    }
                    else if (objNodeAndPosition.NewNode != null && objNodeAndPosition.NewNode.querySelector('[id]') != null) {
                        objNodeAndPosition.NewNode = GetLastChildSibling(objNodeAndPosition.NewNode);
                        objNodeAndPosition.CursorPosition = "After";
                    } else {
                        objNodeAndPosition.CursorPosition = "Before";
                    }
                } else {
                    objNodeAndPosition.NewNode = objPresentNode;
                    if (objNodeAndPosition.NewNode != null && objNodeAndPosition.NewNode.querySelector('[id]') != null) {
                        objNodeAndPosition.NewNode = GetLastChildSibling(objNodeAndPosition.NewNode);
                        objNodeAndPosition.CursorPosition = "After";
                    } else {
                        objNodeAndPosition.CursorPosition = "Before";
                    }
                }
            }
            if (objNodeAndPosition.NewNode != null) {
                document.getElementById('txtJFormulaEditor').blur()
                let objToFocus = GetFormulaPlaceholderDom().querySelector('[id="' + objNodeAndPosition.NewNode.getAttribute("id") + '"]');
                SetCursor(objToFocus, objNodeAndPosition.CursorPosition);
            }
            else {
                FormulaBlur(blnNext, intJFormulaEditorPlaceholderId);
            }
        }
    }
};

/**
 * @name ResetPosition
 * @summary reset the cursor position to updated Placeholder and selected formula.
 */
export const ResetPosition = () => {
    //let intJFormulaEditorPlaceholderId = GetFormulaEditorPlaceholderId();
    let intFormulaSelectedNodeId = GetFormulaSelectedNodeId();
    SetCursor(GetFormulaPlaceholderDom().querySelector('[id="' + intFormulaSelectedNodeId + '"]'), GetFormulaEditorCursorPosition());
};

/**
 * @name GetFormulaEditorPlaceholderId
 * @summary return formula placeholder id.
 */
export const GetFormulaEditorPlaceholderId = () => {
    return EditorState.GetProperty('Cursor')['FormulaEditorPlaceholderId'];
};

/**
 * @name GetFormulaSelectedNodeId
 * @summary returns formula selected nodeid.
 */
export const GetFormulaSelectedNodeId = () => {
    return EditorState.GetProperty('Cursor')['FormulaSelectedNodeId'];
};

/**
 * @name GetActiveFormulaDomNode
 * */
export const GetActiveFormulaDomNode = () => {
    return EditorState.GetProperty("Cursor")["FormulaSelectedDomNode"];
};

/**
 * @name GetFormulaEditorCursorPosition
 * @summary returns the forumula editor cursor position.
 */
export const GetFormulaEditorCursorPosition = () => {
    return EditorState.GetProperty('Cursor')['FormulaEditorCursorPosition'];
};

/**
 * @name SetFormulaEditorPlaceholderId
 * @param {int} intFormulaEditorPlaceholderId
 */
export const SetFormulaEditorPlaceholderId = (intFormulaEditorPlaceholderId) => {
    let objCursor = EditorState.GetProperty('Cursor');
    return EditorState.SetProperty('Cursor', {
        ...objCursor, ["FormulaEditorPlaceholderId"]: intFormulaEditorPlaceholderId
    });
};

/**
 * @name SetFormulaSelectedNodeId
 * @param {imt} intFormulaSelectedNodeId 
 */
export const SetFormulaSelectedNodeId = (intFormulaSelectedNodeId) => {
    let objCursor = EditorState.GetProperty('Cursor');
    return EditorState.SetProperty('Cursor', {
        ...objCursor, ["FormulaSelectedNodeId"]: intFormulaSelectedNodeId
    });
};

/**
 * @name GetActiveFormulaDomNode
 * */
export const SetActiveFormulaDomNode = (objSelectedNode) => {
    let objCursor = EditorState.GetProperty('Cursor');
    return EditorState.SetProperty('Cursor', {
        ...objCursor, ["FormulaSelectedDomNode"]: objSelectedNode
    });
};


/**
 * @name SetFormulaEditorCursorPosition
 * @param {*} strFormulaEditorCursorPosition 
 */
export const SetFormulaEditorCursorPosition = (strFormulaEditorCursorPosition) => {
    let objCursor = EditorState.GetProperty('Cursor');
    return EditorState.SetProperty('Cursor', {
        ...objCursor, ["FormulaEditorCursorPosition"]: strFormulaEditorCursorPosition
    });
};

/**
 * @name GetFormulaPlaceholderDom
 * @summary this method returns the formula root dom node with type=JFormulaEditorPlaceholder and iElementId as id.
 * @returns {HTML} formula dom node.
 * */
export const GetFormulaPlaceholderDom = () => {
    let intFormulaPlaceholderId = GetFormulaEditorPlaceholderId();
    let objFormulaDom = GetActiveFormulaDomNode();
    if (intFormulaPlaceholderId != null && intFormulaPlaceholderId != "" && objFormulaDom != "") {
        return objFormulaDom.querySelector("span[id='" + intFormulaPlaceholderId + "']")
    }
    return null;
};

/**
 * @name GetFormulaSelectedNodeDom
 * @summary this method returns the selected mathMl node.
 * @returns {HTML} selected formula dom node.
 * */
export const GetFormulaSelectedNodeDom = () => {
    let intFormulaSelectedNodeId = GetFormulaSelectedNodeId();
    let objFormulaPlaceholder = GetFormulaPlaceholderDom();
    if (objFormulaPlaceholder != null) {
        return objFormulaPlaceholder.querySelector("span[id='" + intFormulaSelectedNodeId + "']");
    }
    return null;
};

/**
 * @param {any} strMathMl
 * @summary this method replaces all ids with {Idholder}.
 */
export const ReplaceIdWithHolder = (strMathMl) => {
    let objTempDiv = document.createElement("div");
    objTempDiv.innerHTML = strMathMl;
    objTempDiv.querySelectorAll('[id]').forEach(objMath => {
        objMath.removeAttribute('id');
        objMath.setAttribute('Idholder', "");
    });
    let strTempMathMl = objTempDiv.innerHTML;
    while (strTempMathMl.indexOf('Idholder=""') > 0) {
        strTempMathMl = strTempMathMl.replace('Idholder=""', '{Idholder}');
    }
    while (strTempMathMl.indexOf('idholder=""') > 0) {
        strTempMathMl = strTempMathMl.replace('idholder=""', '{Idholder}');
    }
    return strTempMathMl;
};

/**
 * @param {any} strMathMl
 * @summary this method replaces all {Idholder} with id.
 */
export const ReplaceHolderWithId = (strMathMl) => {
    let strNewMathMl = strMathMl;
    while ((strNewMathMl.indexOf('{Idholder}') > 0)) {
        strNewMathMl = strNewMathMl.replace('{Idholder}', "id='" + UniqueId.GetUniqueId() + "' ");
    }
    return strNewMathMl;
};

//Selection related import.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

/**
 * @name Family
 * @param {string} strKey commandId ex: FontName.
 * @param {string} strValue name of the font.
 * @param {object} objContext component context object to be sent in callback.
 * @param {function} stateChangeCallback state callback to be run after dom manipulation.
 * @summary changes font-family of the selected text.
 * @status updated
 */
export const Family = (strKey, strValue, objContext, stateChangeCallback) => {
    /* develblock:start */
    global.ApplicationLog.Log("Font.RenderTd: Entered");
    /* develblock:end */
    Selection.GetSelection();
    document.execCommand(strKey, false, strValue); // exec command.
    let objSelection = Selection.GetSelection();
    let objNode = objSelection.IsSourceTextEditor ? objSelection.SourceElement : objSelection.SourceElement.parentNode;
        objNode.querySelectorAll("font[face]").forEach(objNodeTemp => {
            objNodeTemp.querySelectorAll("font[class]").forEach(objFontClass => {
                objFontClass.removeAttribute("face");
                objFontClass.style.fontFamily = strValue;
            });
            objNodeTemp.removeAttribute("face"); // remove all the face attribute.
            objNodeTemp.style.fontFamily = strValue;  // add the style font-family.
        });
    if (stateChangeCallback) {
        stateChangeCallback(objContext, strValue);
    }
    /* develblock:start */
    global.ApplicationLog.Log("Font.RenderTd: Exited");
    /* develblock:end */
};

/**
 * @name Size
 * @param {string} strKey commandId ex : FontSize.
 * @param {number} strValue font size.
 * @param {object} objContext component context object to be sent in callback.
 * @param {function} stateChangeCallback state callback to be run after dom manipulation.
 * @summary This Method is Used Set the Font Size for the Selected Text.
 * @status updated
 */
export const Size = (strKey, strValue, objContext, stateChangeCallback) => {
    /* develblock:start */
    global.ApplicationLog.Log("Font.Size: Entered");
    /* develblock:end */
    Selection.GetSelection();
    document.execCommand(strKey, false, strValue);
    let strInPx = strValue + "px";
    let objSelection = Selection.GetSelection();
    let objSourceParent = objSelection.IsSourceTextEditor ? objSelection.SourceElement : objSelection.SourceElement.parentNode;
    objSourceParent.querySelectorAll("font[size]").forEach(objFontSize => {
        objFontSize.querySelectorAll("font").forEach(objFontTemp => {
            let blnNotPresent = objFontTemp.getAttribute("face") == null && objFontTemp.getAttribute("size") == null &&
                objFontTemp.getAttribute("color") == null && (objFontTemp.style.backgroundColor == "" || !objFontTemp.style.backgroundColor);
            if (blnNotPresent) {
                objFontTemp.outerHTML = objFontTemp.innerHTML;
            } else {
                objFontTemp.style.fontSize = "";
            }
        });
    });
    objSourceParent.querySelectorAll("font[size]").forEach(objFaceNodeTemp => {
        objFaceNodeTemp.querySelectorAll("font[class]").forEach(objClassNodeTemp => {
            objClassNodeTemp.removeAttribute("size");
            objClassNodeTemp.style.fontSize = strInPx
        });
        objFaceNodeTemp.removeAttribute("size");
        objFaceNodeTemp.style.fontSize = strInPx
    });
    if (stateChangeCallback) {
        stateChangeCallback(objContext, strValue);
    }
    /* develblock:start */
    global.ApplicationLog.Log("Font.Size: Exited");
    /* develblock:end */
};

/**
 * @name RemoveFormatting
 * @summary This Method is Used to Remove the Styles
 */
export const RemoveFormatting = () => {
    /* develblock:start */
    global.ApplicationLog.Log("Font.RemoveFormatting: Entered");
    /* develblock:end */
    document.execCommand('RemoveFormat');
    /* develblock:start */
    global.ApplicationLog.Log("Font.RemoveFormatting: Exited");
    /* develblock:end */
};

/**
 * @name ApplyStyles
 * @param {string} strKey  Represents Key to which style to be applied
 * @param {string} strValue name="value" type="string" optional="false" mayBeNull="false"
 * @summary This Method is Used to Apply the Styles such as bold,italics,underline etc..
 */
export const ApplyStyles_Old = (strKey, strValue) => {
    /* develblock:start */
    global.ApplicationLog.Log("Font.ApplyStyles_Old: Entered");
    /* develblock:end */
    switch (strKey) {
        case 'fontWeight': WeightAndStyle(strKey.toLowerCase(), "Bold", 'b,strong'); // old
            break;
        case 'fontStyle': WeightAndStyle(strKey.toLowerCase(), "Italic", 'em,i'); // old
            break;
        case 'Text-Decoration': TextDecoration('underline', 'underline', 'u'); // old
            break;
        case 'StrikeThrough': TextDecoration('StrikeThrough', 'line-through', 'strike'); // old
            break;
        case 'Text-Align':TextAlignSuperScriptSubScript(strValue); // old
            break;
        case 'SuperScript': TextAlignSuperScriptSubScript(strKey); // old
            break;
        case 'SubScript': TextAlignSuperScriptSubScript(strKey); // old
            break;
        case 'Normal': AddFontClass(strValue); // old
            break;
        default: break;
    }
    /* develblock:start */
    global.ApplicationLog.Log("Font.ApplyStyles_Old: Exited");
    /* develblock:end */
};

/** 
 * @name WeightAndStyle
 * @param {string} strKey Represents Key to which style to be applied (ex : fontweight for Bold, fontstyle for Italic).
 * @param {string} strValue command value (ex : Bold, Italic).
 * @summary This Method is used to Apply the Styles such as bold,italics.
 */
export const WeightAndStyle = (strKey, strValue) => {
    /* develblock:start */
    global.ApplicationLog.Log("Font.WeightAndStyle: Entered");
    /* develblock:end */
    strKey = strKey.toLowerCase();
    let strTags;
    if (strKey.toLowerCase() == "fontweight") {
        strTags = 'b,strong';
    } else if (strKey.toLowerCase() == 'fontstyle') {
        strTags = 'em,i';
    }
    if (strTags && strValue) {
        Selection.GetSelection();
        document.execCommand(strValue);
        let objSelection = Selection.GetSelection();
        let objNode = objSelection.IsSourceTextEditor ? objSelection.SourceElement : objSelection.SourceElement.parentNode;
        if (objNode.querySelectorAll(strTags).length > 0) {
            objNode.querySelectorAll(strTags).forEach(objTag => {
                objTag.querySelectorAll('font[class]').forEach(objFontClass => {
                    objFontClass.style[strKey] = strValue;
                });
            });
        } else {
            objNode.querySelectorAll('font[class]').style[strKey] = strValue;
        }
    }
    /* develblock:start */
    global.ApplicationLog.Log("Font.WeightAndStyle: Exited");
    /* develblock:end */
};

/**
 * @name TextDecoration
 * @param {string} strKey Represents Key to which style to be applied (ex : underline,StrikeThrough).
 * @summary this method is used to apply text decoration styles like underline and strike through.
 */
export const TextDecoration = (strKey) => {
    /* develblock:start */
    global.ApplicationLog.Log("Font.TextDecoration: Entered");
    /* develblock:end */
    let strValue, strTags;
    if (strKey.toLowerCase() == "underline") {
        strValue = 'underline';
        strTags = 'u';
    } else if (strKey.toLowerCase() == "strikethrough") {
        strValue = 'line-through';
        strTags = 'strike';
    }
    if (strTags && strValue) {
        Selection.GetSelection();
        document.execCommand(strKey, false);
        let objSelection = Selection.GetSelection();
        let objNode = objSelection.IsSourceTextEditor ? objSelection.SourceElement : objSelection.SourceElement.parentNode;
        if (objNode.querySelectorAll(strTags).length > 0) {
            objNode.querySelectorAll(strTags).forEach(objTagNode => {
                objTagNode.querySelectorAll("font[class]").forEach(objClassNode => {
                    let strCss = objClassNode.style.textDecoration.replace("none", "").trim();
                    strCss = strCss ? strCss + " " + strValue : strValue;
                    objClassNode.style.textDecoration = strCss;
                });
            });
        } else {
            objNode.querySelectorAll("font[class]").forEach(objClassNode => {
                let strCss = objClassNode.style.textDecoration.replace("none", "").replace(strValue, "").trim();
                objClassNode.style.textDecoration = strCss;
            });
        }
    }
    /* develblock:start */
    global.ApplicationLog.Log("Font.TextDecoration: Exited");
    /* develblock:end */
};

/**
 * @name FontTextAlignSuperScriptSubScript
 * @param {string} strValue command value for text-align, super-script, sub-script (ex : SuperScript, SuperScript).
 * @summary This Method is Used to aligning the font or to add text as sub or super script.
 */
export const SuperScriptSubScript = (strValue) => {
    /* develblock:start */
    global.ApplicationLog.Log("Font.SuperScriptSubScript: Entered");
    /* develblock:end */
    Selection.GetSelection();
    document.execCommand(strValue);
    Selection.GetSelection();
    /* develblock:start */
    global.ApplicationLog.Log("Font.SuperScriptSubScript: Exited");
    /* develblock:end */
};

/**
 * @name Color
 * @param {string} strKey command name (ForeColor). 
 * @param {string} strValue color to be applied.
 * @param {object} objContext component context object.
 * @param {function} fnCallback callback to be called after dom manipulation.
 * @summary This Method is Used to Apply the Color for selected text.
 */
export const Color = (strKey, strValue, objContext, fnCallback) => {
    /* develblock:start */
    global.ApplicationLog.Log("Font.Color: Entered");
    /* develblock:end */
    Selection.GetSelection();
    document.execCommand(strKey, false, strValue);
    let objSelection = Selection.GetSelection();
    let objNode = objSelection.GetParent();
    objNode.querySelectorAll("font[color]").forEach(objFontColorNode => {
        objFontColorNode.style.color = strValue;
        objFontColorNode.removeAttribute("color");
    });
    if (fnCallback) {
        fnCallback(objContext, strValue);
    }
    /* develblock:start */
    global.ApplicationLog.Log("Font.Color: Exited");
    /* develblock:end */
};

/**
 * @name BckgTextColor
 * @param {string} strKey  command id (BackColor).
 * @param {string} strValue color to be applied.
 * @param {object} objContext component context object.
 * @param {function} fnCallback callback to be called after dom manipulation.
 * @summary changes text backgroung color.
 */
export const BckgTextColor = (strKey, strValue, objContext, fnCallback) => {
    /* develblock:start */
    global.ApplicationLog.Log("Font.BckgTextColor: Entered");
    /* develblock:end */
    Selection.GetSelection();
    document.execCommand(strKey, false, strValue);
    Selection.GetSelection();
    if (fnCallback) {
        fnCallback(objContext, strValue);
    }
    /* develblock:start */
    global.ApplicationLog.Log("Font.BckgTextColor: Exited");
    /* develblock:end */
};


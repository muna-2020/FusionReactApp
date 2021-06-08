
//Selection related import.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

//Text Font Actions.
import * as Font from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/2_Font/Font";

/**
 * @name ApplyStyleClass
 * @param {string} strValue classname for the selected text (ex : PageOutputContentLargeText, PageOutputContentTitle, PageOutputContentText).
 * @summary This Method is Used to Apply the class for selected text.
 */
export const ApplyStyleClass = (strValue, fnCallback) => {
    /* develblock:start */
    global.ApplicationLog.Log("Styles.ApplyStyleClass: Entered");
    /* develblock:end */
    Selection.GetSelection();
    Font.RemoveFormatting();
    document.execCommand("fontSize", false, "7");
    let objSelection = Selection.GetSelection();
    let objNode = objSelection.IsSourceTextEditor ? objSelection.SourceElement : objSelection.SourceElement.parentNode;
    objNode.querySelectorAll("font[size]").forEach(objFontNode => {
        objFontNode.removeAttribute('size');
        objFontNode.classList.add(strValue);
    });
    if(fnCallback){
        fnCallback();
    }
    /* develblock:start */
    global.ApplicationLog.Log("Styles.ApplyStyleClass: Exited");
    /* develblock:end */
};
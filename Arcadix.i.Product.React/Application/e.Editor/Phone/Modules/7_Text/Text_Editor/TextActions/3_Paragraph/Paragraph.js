//store related import.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Selection related import.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

/**
 * @name ToggleList
 * @param {string} strValue exec command Id (ex : InsertUnorderedList, InsertOrderedList,)
 * @summary This Method is used to Apply Order and UnOrdered List(Bullets,numberings etc..)
 */
export const ToggleList = (strValue) => {
    /* develblock:start */
    global.ApplicationLog.Log("Paragraph.ToggleList: Entered");
    /* develblock:end */
    Selection.GetSelection();
    document.execCommand(strValue);
    Selection.GetSelection();
    /* develblock:start */
    global.ApplicationLog.Log("Font.ToggleList: Exited");
    /* develblock:end */
};

/**
 * @name SetIndent
 * @param {string} strValue exec command Id (ex : Outdent,Indent).
 * @summary this set the indent for the selected text.
 */
export const SetIndent = (strValue) => {
    /* develblock:start */
    global.ApplicationLog.Log("Paragraph.SetIndent: Entered");
    /* develblock:end */
    Selection.GetSelection();
    document.execCommand(strValue);
    Selection.GetSelection();
    /* develblock:start */
    global.ApplicationLog.Log("Paragraph.SetIndent: Exited");
    /* develblock:end */
};

/**
 * @name FontTextAlignSuperScriptSubScript
 * @param {string} strValue command value for text-align (ex :  JustifyLeft, JustifyCenter, JustifyRight, JustifyFull).
 * @summary This Method is Used to aligning the font or to add text as sub or super script.
 */
export const TextAlign = (strValue) => {
    /* develblock:start */
    global.ApplicationLog.Log("Paragraph.TextAlign: Entered");
    /* develblock:end */
    Selection.GetSelection();
    document.execCommand(strValue);
    Selection.GetSelection();
    /* develblock:start */
    global.ApplicationLog.Log("Paragraph.TextAlign: Entered");
    /* develblock:end */
};

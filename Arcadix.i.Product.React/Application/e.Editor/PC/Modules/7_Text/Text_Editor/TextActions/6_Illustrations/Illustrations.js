
//Selection related import.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

/**
 * @name AddEmoticon
 * @param {HtML object} objEmoticon Event object.
 * @param {string} strType type
 * @summary add emoticon to the TextEditor.
 */
export const AddEmoticon = (objEmoticon) => {
    /* develblock:start */
    global.ApplicationLog.Log("Illustration.AddEmoticon: Entered");
    /* develblock:end */
    Selection.AddElementAtCaret(objEmoticon, "emoticon");
    /* develblock:start */
    global.ApplicationLog.Log("Illustration.AddEmoticon: Exited");
    /* develblock:end */
}

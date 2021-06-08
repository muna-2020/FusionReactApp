//Selection related import.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

/**
 * @name AddSymbol
 * @param {string} strSymbol
 * @summary add symbol at the caret positon.
 */
export const AddSymbol = (strSymbol) => {
    /* develblock:start */
    global.ApplicationLog.Log("Symbol.AddSymbol: Entered");
    /* develblock:end */
    Selection.AddTextAtCaret(strSymbol);
    Selection.UpdateTaskEditStatus();
    /* develblock:start */
    global.ApplicationLog.Log("Symbol.AddSymbol: Exited");
    /* develblock:end */
}
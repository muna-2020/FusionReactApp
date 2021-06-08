//Application state Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Selection related import.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

//Text Clipboard Actions.
import * as Clipboard from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/1_Clipboard/Clipboard";

//Text Font Actions.
import * as Font from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/2_Font/Font";

//Text Pargraph Actions.
import * as Pargraph from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/3_Paragraph/Paragraph";

//Text Styles Actions.
import * as Styles from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/4_Styles/Styles";

//Text Editing Actions.
import * as Editing from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/5_Editing/Editing";

//Text  Illustrations Actions.
import * as Illustrations from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/6_Illustrations/Illustrations";

//Text Symbol Actions.
import * as Symbol from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/7_Symbol/Symbol";

//Text Symbol Actions.
import * as SpellCheck from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/8_SpellCheck/SpellCheck";

//Text Link Actions.
import * as Link from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/9_Link/Link";

//Text Tables related Actions.
import * as TextTable from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/10_TextTable/TextTable";

//Text Tables related Actions.
import * as Common from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/11_Common/Common";

/**
 * @name AddSubElement
 * @param {object} objSubElementJson sub-element json.
 * @summary this add the sub element to the caret position of the active text editor.
 */
const AddSubElement = (objSubElementJson) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextActions.AddSubElement: Entered");
    /* develblock:end */
    const objTextRef = EditorState.GetReference("CurrentTextRef");
    if (objTextRef && objTextRef.current && objTextRef.current.AddSubElement) {
        objTextRef.current.AddSubElement(objSubElementJson);
    }
    /* develblock:start */
    global.ApplicationLog.Log("TextActions.AddSubElement: Exited");
    /* develblock:end */
};

/**
 * @name InsertClipart
 * @param {object} objImage
 * @summary this insert the clipart image to the html.
 */
const InsertClipart = (objImage) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextActions.InsertClipart: Entered");
    /* develblock:end */
    Selection.AddElementAtCaret(objImage, "clipart");
    /* develblock:start */
    global.ApplicationLog.Log("TextActions.InsertClipart: Exited");
    /* develblock:end */
}


/**
 * @name AddSpace
 * @summary add space to the current selection.
 */
const AddSpace = (props) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextActions.AddSpace: Entered");
    /* develblock:end */
    let objSpace = document.createElement('img');
    objSpace.src = props.JConfiguration.EditorSkinPath + "/Images/2_OfficeRibbon/2_Insert/Space/Space.gif";
    objSpace.style.height = "2px";
    objSpace.style.width = "2px";
    objSpace.align = "center";
    Selection.AddElementAtCaret(objSpace, "space");
    /* develblock:start */
    global.ApplicationLog.Log("TextActions.AddSpace: Exited");
    /* develblock:end */
};

//main export this group all the imported actions and export them in group.
export { Clipboard, Font, Pargraph, Styles, Editing, Illustrations, Symbol, AddSubElement, AddSpace, SpellCheck, Link, TextTable, Common, InsertClipart};
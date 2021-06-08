// Base Module object
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Store related imports
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//Text action related imports.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

/**
 * @name StartTab_ModuleProcessor
 * @summary module processor for Start tab. 
 */
class StartTab_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList
     * returns stored mapped properties.
     * */
    static StoreMapList() {
        return [{ "StoreKey": "EditorState", "DataKey": "StartState" }];
    }

    /**
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @param {string} strFont font name.
     * @summary changes the selected text font.
     */
    ChangeFont(objContext, strFont) {
        TextActions.Font.Family("FontName", strFont, objContext, objContext.StartTab_ModuleProcessor.ChangeFont_Callback);
    }

    /**
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @param {string} intFontSize font size value. 
     * @summary changes the font size of selected text.
     */
    ChangeFontSize(objContext, intFontSize) {
        TextActions.Font.Size('FontSize', intFontSize, objContext, objContext.StartTab_ModuleProcessor.ChangeFontSize_Callback);
    }

    /**
     * @name RemoveFormatting
     * @summary apply styles for the selected text.
     */
    RemoveFormatting() {
        TextActions.Font.RemoveFormatting();
    }

    /**
     * @name SetState
     * @param {object} objProps state properties to be updated.
     * @param {object} objContext { state, dispatch, props, ["StartTab_ModuleProcessor"] }.
     * @summary entry method to change the state of Start tab.
     */
    SetState(objProps, objContext) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                ...objContext.state, 
                ...objProps 
            }
        })
    }

    /**
    * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
    * @summary display the font drop down.
    */
    ShowFonts(objContext) {
        let boolStatus = objContext.state.Font.blnShowFonts ? false : true;
        objContext.StartTab_ModuleProcessor.SetState({ blnShowFonts: boolStatus }, objContext);
    }

    /**
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @param {string} strColor color.
     * @summary changes background text color.
     */
    ChangeBckgTextColor(objContext, strColor) {
        TextActions.Font.BckgTextColor("BackColor", strColor, objContext, objContext.StartTab_ModuleProcessor.ChangeBckgTextColor_Callback);
    }

    /**
     * @name ChangeTextColor
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @param {string} strColor  color.
     * @summary changes text color.
     */
    ChangeTextColor(objContext, strColor) {
        TextActions.Font.Color("ForeColor", strColor, objContext, objContext.StartTab_ModuleProcessor.ChangeTextColor_Callback);
    };

    /**
     * changes the font of selected text.
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @param {string} strFont font name.
     */
    ChangeFont_Callback(objContext, strFont) {
        objContext.StartTab_ModuleProcessor.SetState({ font: strFont, strActiveFont: strFont }, objContext);

    };

    /**
    * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
    * @param {int} intFontSize new font size to be changed.
    * @summary changes font size of selected text.
    */
    ChangeFontSize_Callback(objContext, intFontSize) {
        objContext.StartTab_ModuleProcessor.SetState({ fontSize: intFontSize, intActiveFontSize: intFontSize }, objContext);
    }

    /**    
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @param {string} strFontColor new font color to be changed.
     * @summary changes selected text color.
     */
    ChangeTextColor_Callback(objContext, strFontColor) {
        objContext.StartTab_ModuleProcessor.SetState({ fontColor: strFontColor }, objContext);
    };

    /**
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @param {string} strBckgColor new background color to be changed.
     * @summary changes the background of selected text.
     */
    ChangeBckgTextColor_Callback(objContext, strBckgColor) {
        objContext.StartTab_ModuleProcessor.SetState({ bckgColor: strBckgColor }, objContext);
    }

    /**
     * @name ShowLineHeight
     * @param {any} objEvt Event object.
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @param {string} strLineHeight Line height to be changed.
     * @summary display line height drop down to be deleted.
     */
    ShowLineHeight_Callback(objEvt, objContext, strLineHeight) {
        objEvt.nativeEvent.stopImmediatePropagation();
        objContext.StartTab_ModuleProcessor.SetState({ blnStatus: blnStatus, strLineHeight: strLineHeight }, objContext);
    }

    /**
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @summary display the text background color palate.
     */
    ShowBckgColorPalate(objContext) {
        let boolStatus = objContext.state.Font.blnShowBckgColorPalate ? false : true;
        objContext.StartTab_ModuleProcessor.SetState({ blnShowBckgColorPalate: boolStatus }, objContext);
    }

    /**
    * @name ChangeLineHeight
    * @param {any} intLineHeight line height value.
    * @summary changes the text line height.
    */
    ChangeLineHeight(intLineHeight) {
        TextActions.InsertLineHeight(intLineHeight);
    }

    /**
     * @name ShowLineHeight
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @param {any} objEvt click event object.
     * @summary display the line height.
     */
    ShowLineHeight_old(objContext, objEvt) {
        objEvt.nativeEvent.stopImmediatePropagation();
        let strLineHeight = TextActions.GetLineHeight();
        let blnStatus = objContext.state.Font.blnShowLineHeight ? false : true;
        objContext.StartTab_ModuleProcessor.SetState({ blnStatus: blnStatus, strLineHeight: strLineHeight }, objContext);
    }

    /**
     * @name ShowLineHeight
     * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
     * @param {any} objEvt click event object.
     * @summary display the line height.
     * @status pending.
     */
    ShowLineHeight(objContext, objEvt) {
        objEvt.nativeEvent.stopImmediatePropagation();
        let strLineHeight = TextActions.GetLineHeight();
        let blnStatus = objContext.state.Font.blnShowLineHeight ? false : true;
        objContext.StartTab_ModuleProcessor.ShowRHideStartPopup({ blnShowLineHeight: blnStatus, strLineHeight: strLineHeight }, objContext);
    }

    /**
     * @name NudgeUp
     * @summary mouse down element margin top margin bottom based on condition.
     */
    NudgeUp() {
        TextActions.Nudge('UP');
    }

    /**
     * @name NudgeUp
     * @summary mouse down element margin top margin bottom based on condition.
     */
    NudgeDown() {
        TextActions.Nudge('DOWN');
    }

    /**
    * @name ShowFontSizes
    * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
    * @summary display font size drop down.
    */
    ShowFontSizes(objContext) {
        let boolStatus = objContext.state.Font.blnShowFontSizes ? false : true;
        objContext.StartTab_ModuleProcessor.SetState({ blnShowFontSizes: boolStatus }, objContext);
    }

    /**
    * @name ShowBckgColorPalate
    * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
    * @summary display the text background color palate.
    */
    ShowBckgColorPalate(objContext) {
        let boolStatus = objContext.state.Font.blnShowBckgColorPalate ? false : true;
        objContext.StartTab_ModuleProcessor.SetState({ blnShowBckgColorPalate: boolStatus }, objContext);
    }

    /**
    * @name ShowFontColorPalate
    * @param {object} objContext {state, props, dispatch, StartTab_ModuleProcessor}.
    * @summary  display the text font color palate.
    */
    ShowFontColorPalate(objContext) {
        let boolStatus = objContext.state.Font.blnShowFontColorPalate ? false : true;
        objContext.StartTab_ModuleProcessor.SetState({ blnShowFontColorPalate: boolStatus }, objContext);
    }

    /**
     * @param {string} strOperation values for search or search and replace.
     * @summary display search and replay sidebar.
     */
    ShowSearchAndReplace(strOperation) {
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "ElementJson": {
                Operation: strOperation
            },
            "SidebarProps": {
                SidebarName: "SearchReplaceSidebar",
                Header: "Search",
                Title: "Search whole word",
                Status: 1,
                Operation: strOperation,
                AutoHide: true
            },
        });
    };

}
export default StartTab_ModuleProcessor;
//context-menu base class.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Text action related import.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name Text_Editor_ContextMenu
 * @summary Contains the context menu related methods of the Text_Editor.
 * */
class Text_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, Text_Editor_ModuleProcessor}.
     * @summary Forms an array with the ContextMenuOptions for the  element.
     * @returns {Array} Context Menu Options.
     */
    GetContextMenuOptions(objContext, blnShowTableContextMenu) {
        let objContainerData;
        if (objContext.props.ParentRef.current.GetContainerData) {
            objContainerData = objContext.props.ParentRef.current.GetContainerData();
        }
        let arrContextMenuOptions = [
            {
                ResourceKey: "Clipboard_Cut",
                ClickEvent: () => TextActions.Clipboard.Cut(),
                params: { objContext },
                Hidden: false
            },
            {
                ResourceKey: "Clipboard_Copy",
                ClickEvent: () => TextActions.Clipboard.Copy(),
                params: { objContext },
                Hidden: false
            },
            {
                ResourceKey: "Clipboard_Insert",
                ClickEvent: objContext.Text_Editor_ModuleProcessor.ShowClipboardPopup,
                params: { objContext },
                Hidden: false
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "SpellCheck_Suggestion",
                ClickEvent: objContext.Text_Editor_ModuleProcessor.GetSuggestionsAndShowContextMenu,
                params: { objContext },
                SubMenuModule: "Suggestions",
                Hidden: !objContext.SelectionRef.current["BadWord"]
            },
            {
                ResourceKey: "Clear_Text",
                ClickEvent: () => objContext.props.TextJson.TextRef.current.ResetText(""),
                params: { objContext },
                Hidden: false
            },
            {
                ResourceKey: "Insert_Picture",
                ClickEvent: objContext.Text_Editor_ModuleProcessor.InsertPicture,
                params: { objContext },
                Hidden: false
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "SpellCheck_Ignore",
                ClickEvent: () => objContext.Text_Editor_ModuleProcessor.IgnoreBadWord(objContext),
                params: { objContext },
                Hidden: !objContext.SelectionRef.current["BadWord"]
            },
            {
                ResourceKey: "SpellCheck_Ignore_All",
                ClickEvent: objContext.Text_Editor_ModuleProcessor.IgnoreAllBadWordWords,
                params: { objContext },
                Hidden: !objContext.SelectionRef.current["BadWord"]
            },
        ];
        if (objContainerData) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Show_Calculator",
                    ClickEvent: () => { objContext.props.ParentRef.current.ShowCalculator() },
                    Image: objContainerData.cShowCalculator === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                    params: { objContext },
                    Hidden: !objContext.state.TextJson.vElementJson.isQuestionOrAnswerType || objContext.state.TextJson.vElementJson.isQuestionOrAnswerType === "Question"
                }
            ];
        }

        if(blnShowTableContextMenu){
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Insert_Column_Left",
                    ClickEvent: () => { TextActions.TextTable.InsertColumnAt(0); },
                    params: { objContext }
                },
                {
                    ResourceKey: "Insert_Column_Right",
                    ClickEvent: () => { TextActions.TextTable.InsertColumnAt(1); },
                    params: { objContext }
                },
                {
                    ResourceKey: "Delete_Column",
                    ClickEvent: () => {  },
                    params: { objContext }
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: "Insert_Line_Above",
                    ClickEvent: () => { TextActions.TextTable.InsertRowAt(0);  },
                    params: { objContext }
                },
                {
                    ResourceKey: "Insert_Line_Below",
                    ClickEvent: () => { TextActions.TextTable.InsertRowAt(1)  },
                    params: { objContext }
                },
                {
                    ResourceKey: "Delete_A_Line",
                    ClickEvent: () => {  },
                    params: { objContext }
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: "Connect_Cell_Right",
                    ClickEvent: () => { TextActions.TextTable.ConnectCellToRight() },
                    params: { objContext }
                },
                {
                    ResourceKey: "Connect_Cell_Down",
                    ClickEvent: () => {  },
                    params: { objContext }
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: "Split_Cell_Horizontally",
                    ClickEvent: () => { TextActions.TextTable.SplitCell() },
                    params: { objContext }
                },
                {
                    ResourceKey: "Split_Cell_Vertically",
                    ClickEvent: () => {  },
                    params: { objContext }
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: "Table_Properties",
                    ClickEvent: () => { TextActions.TextTable.ShowTablePropertySidebar(); },
                    params: { objContext }
                }
            ]
        }

        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current != null
            && objContext.props.ParentRef.current.GetContextMenuOptions ? objContext.props.ParentRef.current.GetContextMenuOptions() : [];
        return [
            {
                Module: "Text",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/7_Text/Text"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, Text_Editor_ModuleProcessor}.
     * @param {number} intClientX X-Axis coordinates.
     * @param {number} intClientY Y-Axis coordinates.
     * @summary Opens the context menu.
     */
    OpenContextMenu({ objContext, objClientXY, blnShowTableContextMenu = false }) {
        objContext.Text_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY,
            arrContextMenuDetail: objContext.Text_Editor_ModuleProcessor.GetContextMenuOptions(objContext, blnShowTableContextMenu)
        });
    }

    /**
     * @param {object} objContext {state, props, dispatch, Text_Editor_ModuleProcessor}.
     * @param {string} strSuggestion correct word.
     * @summary this replaces the wrong word with suggested right word.
     */
    ReplaceBadWord(objContext, strSuggestion) {
        objContext.props.TextJson.TextRef.current.ReplaceBadWord(strSuggestion);
    }

    /**
     * @name IgnoreBadWord
     * @param {object} objContext {state, props, dispatch, Text_Editor_ModuleProcessor}.
     * @summary this remove the spell check mark for the selected wrong word.
     * */
    IgnoreBadWord(objContext) {
        objContext.props.TextJson.TextRef.current.IgnoreBadWord();
    }

    /**
     * @name IgnoreAllBadWordWords
     * @summary this remove the spell check mark for the whole task.
     * */
    IgnoreAllBadWordWords() {
        TextActions.SpellCheck.IgnoreAll();
    }

    /**
     * @param {any} objContext {state, props, dispatch, Text_Editor_ModuleProcessor}.
     * @param {any} arrSuggestions list of suggestion for the wrong word
     */
    GetSuggestionContextMenuOptions(objContext, arrSuggestions) {
        let arrContextMenuOptions = arrSuggestions.map(strSuggestion => {
            return {
                ["Text"]: strSuggestion,
                ["ClickEvent"]: () => { objContext.Text_Editor_ModuleProcessor.ReplaceBadWord(objContext, strSuggestion) },
                ["params"]: { objContext }
            }
        });
        return [
            {
                ["Module"]: "Suggestions",
                ["MenuList"]: arrContextMenuOptions,
                ["Visible"]: true
            }
        ];
    }

    /**
     * @param {any} objContext {state, props, dispatch, Text_Editor_ModuleProcessor}.
     * @summary this method get the suggestions for the selected suggestion and display the context-menu.
     */
    GetSuggestionsAndShowContextMenu({ objContext, objClientXY }) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        if (objContext.SelectionRef.current["BadWord"]) {
            let strBadWord = objContext.SelectionRef.current["BadWord"]
            TextActions.SpellCheck.GetSuggestions(strBadWord).then((objSuggestion) => {
                objContext.Text_Editor_ModuleProcessor.ShowContextMenu({
                    objContext,
                    objClientXY,
                    arrContextMenuDetail: [
                    ...objContext.Text_Editor_ModuleProcessor.GetSuggestionContextMenuOptions(objContext, objSuggestion.Suggestions),
                    ...objContext.Text_Editor_ModuleProcessor.GetContextMenuOptions(objContext)]
                });
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
    }

    /**
     * @name InsertPicture
     * @param {object} param0
     * @summary this adds the picture to the text.
     */
    InsertPicture({ objContext }) {
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": "Image"
            },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": '573px',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "GetElementJson": (objElementJson) => {
                    TextActions.AddSubElement(BaseCMSElement.AttachRef(objElementJson));
                }
            }
        });
    }

    /**
     * @name ShowClipboardPopup
     * @summary this show the clipboard insert popup to insert text into selection.
     * */
    ShowClipboardPopup({ objContext }) {
        TextActions.Clipboard.ShowClipboardPopup(objContext);
    }
};

export default Text_Editor_ContextMenu;

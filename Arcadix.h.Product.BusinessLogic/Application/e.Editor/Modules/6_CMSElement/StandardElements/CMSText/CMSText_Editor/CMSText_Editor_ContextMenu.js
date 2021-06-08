//contextmenu base class.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Application State classses.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Selection related imports.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

/**
 * @name CMSText_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSText
 * */
class CMSText_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name CloseInputSidebar
     * @summary Closes the side bar.
     */
    CloseInputSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSText_Editor_ModuleProcessor}.
     * @summary Returns the context menu options.
     * @returns {any} Context Menu Options.
     */
    GetContextMenuOptions(objContext) {
        let objTextEditorRef = EditorState.GetReference("CurrentTextRef");
        let strSelectedText = Selection.GetSelectedContentText(objTextEditorRef);
        let arrParentContextMenuOptions = [];
        let arrContextMenuOptions = [
            {
                ResourceKey: "WikiContextMenuOption",
                Hidden: strSelectedText ? false : true,
                ClickEvent: objContext.CMSText_Editor_ModuleProcessor.AddWikiToSelectedText,
                params: { objContext }
            },
            {
                ResourceKey: "OverlayContextMenuOption",
                Hidden: strSelectedText ? false : true,
                ClickEvent: objContext.CMSText_Editor_ModuleProcessor.AddOverlayToSelectedText,
                params: { objContext }
            }
        ];

        if (objContext.props.ElementJson.vElementJson.isQuestionOrAnswerType && objContext.props.ElementJson.vElementJson.isQuestionOrAnswerType.toLowerCase() === "question") {
            arrContextMenuOptions = [...arrContextMenuOptions, {
                ResourceKey: "Insert_Audio",
                ClickEvent: objContext.CMSText_Editor_ModuleProcessor.AddAudio,
                params: { objContext }
            }];
        }

        if (!objContext.props.ElementJson.vElementJson.isQuestionOrAnswerType && !objContext.props.IsSubElement) {
            arrContextMenuOptions = [...arrContextMenuOptions,
            //{
            //    Type: "Separator"
            //},
            {
                ResourceKey: "Align_Upwards",
                ClickEvent: objContext.CMSText_Editor_ModuleProcessor.AlignText,
                params: { objContext, strAlignText: "top" },
                Image: objContext.state.ElementJson.vContainerElementProperties.vElementVerticalAlignment === "top" ? "/Images/editor/Icon_Yes.gif" : null
            },
            {
                ResourceKey: "Align_Center",
                ClickEvent: objContext.CMSText_Editor_ModuleProcessor.AlignText,
                params: { objContext, strAlignText: "center" },
                Image: objContext.state.ElementJson.vContainerElementProperties.vElementVerticalAlignment === "center" ? "/Images/editor/Icon_Yes.gif" : null
            },
            {
                ResourceKey: "Align_Down",
                ClickEvent: objContext.CMSText_Editor_ModuleProcessor.AlignText,
                params: { objContext, strAlignText: "bottom" },
                Image: objContext.state.ElementJson.vContainerElementProperties.vElementVerticalAlignment === "bottom" ? "/Images/editor/Icon_Yes.gif" : null
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "Show_Frame",
                ClickEvent: objContext.CMSText_Editor_ModuleProcessor.ShowFrame,
                params: { objContext },
                Image: objContext.state.ElementJson.vElementJson.cIsWithBorder === "Y" ? "/Images/editor/Icon_Yes.gif" : null
            },
            {
                ResourceKey: "Toggle",
                ClickEvent: objContext.CMSText_Editor_ModuleProcessor.Toggle,
                params: { objContext },
                Image: objContext.state.ElementJson.vElementJson.cIsToggleText === "Y" ? "/Images/editor/Icon_Yes.gif" : null
            },
            {
                ResourceKey: "Content_Show_Time",
                Hidden: objContext.state.ElementJson.vElementJson.cIsToggleText === "Y" ? false : true,
                ClickEvent: objContext.CMSText_Editor_ModuleProcessor.ShowToggleSidebar,
                params: { objContext }
            }
            ];
        }

        if (!objContext.props.IsSubElement) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Delete_Interaction_Type",
                    ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                    params: {},
                    Hidden: objContext.props.ElementJson.vElementJson.isQuestionOrAnswerType
                }
            ];
        }

        arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], objContext.props.IsSubElement ? true : false, objContext.props.RevertData) : [];
        return [
            {
                Module: "CMSText",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSText"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSText_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objValue checkbox value
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objValue) {
        if (!objContext.props.blnDoNotShowContextMenu) {
            objContext.CMSText_Editor_ModuleProcessor.ShowContextMenu({
                "objContext": objContext,
                "objClientXY": { clientX: intClientX, clientY: intClientY },
                "arrContextMenuDetail": objContext.CMSText_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objValue)
            });
        }
    }

    /**
     * @name AlignText
     * @param {any} param0
     * @summary this align text based on strAlign.
     */
    AlignText({ objContext, strAlignText }) {
        objContext.CMSText_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vContainerElementProperties": {
                        ...objContext.state.ElementJson,
                        "vElementVerticalAlignment": strAlignText
                    }
                }
            }
        });
    }

    /**
     * @name Toggle
     * @param {any} param0
     * @summary this align text based on strAlign.
     */
    Toggle({ objContext }) {
        objContext.CMSText_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        let strToggleText = objContext.state.ElementJson.vElementJson.cIsToggleText === "Y" ? "N" : "Y";
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson.vElementJson,
                        "cIsToggleText": strToggleText,
                        "cIsWithBorder": "Y"
                    }
                }
            }
        });
    }

    /**
     * @name Toggle
     * @param {any} param0
     * @summary this align text based on strAlign.
     */
    ShowFrame({ objContext }) {
        objContext.CMSText_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        let strToggleText = objContext.state.ElementJson.vElementJson.cIsWithBorder === "Y" ? "N" : "Y";
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson.vElementJson,
                        "cIsWithBorder": strToggleText
                    }
                }
            }
        });
    }

    /**
     * @name ShowToggleSidebar
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objElementJson Element json to be sent to sidebar.
     * @summary Opens up the side bar.
     */
    ShowToggleSidebar({ objContext }) {
        objContext.CMSText_Editor_ModuleProcessor.CloseInputSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "ElementJson": { "iShowContentTime": objContext.state.ElementJson.vElementJson.iShowContentTime },
            "PassedEvents": {
                "UpdateContentShowTime": (intShowTime) => {
                    objContext = objContext.props.ElementRef.current.GetLatestContext();
                    objContext.dispatch({
                        type: "SET_STATE",
                        payload: {
                            ...objContext.state,
                            "ElementJson": {
                                ...objContext.state.ElementJson,
                                "vElementJson": {
                                    ...objContext.state.ElementJson.vElementJson,
                                    "iShowContentTime": parseInt(intShowTime)
                                }
                            }
                        }
                    });
                }
            },
            "SidebarProps": {
                "SidebarName": "ToggleSidebar",
                "Header": "Content Show Time",
                "Title": "Content Show Time",
                "Status": 1,
                "AutoHide": true
            }
        });
    }

    /**
     * @name AddAudio
     * @param {any} param0
     * @summary this add Audio to the container.
     */
    AddAudio({ objContext }) {
        if (objContext.props.ParentRef && objContext.props.ParentRef.current !== null) {
            objContext.props.ParentRef.current.AddElement(objContext.props.AudioOrder, "Audio");
        }
    }
}

export default CMSText_Editor_ContextMenu;

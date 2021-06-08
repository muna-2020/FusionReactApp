//Module related fies.
import CMSText_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_ContextMenu";

//Application State classses.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Selection related imports.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

//overlay import
import * as CMSOverlay_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Editor/CMSOverlay_Editor_MetaData";

/**
 * @name CMSText_Editor_ModuleProcessor
 * @summary Contains the text's editor version module specific methods.
 * */
class CMSText_Editor_ModuleProcessor extends CMSText_Editor_ContextMenu {

    /**
     * @name PreserveTextState
     * @summary this update the text state to the parent.
     * */
    PreserveTextState(objContext, objElementJson = null) {
        let PreserveState = objContext.props.IsSubElement ? "PreserveTextState" : "PreserveElementState";
        let objNewElementJson = objElementJson === null ? objContext.state.ElementJson : objElementJson
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current[PreserveState]) {
            objContext.props.ParentRef.current[PreserveState](
                {
                    ...objContext.state,
                    ["ElementJson"]: objNewElementJson,
                    Text_EditorState: objContext.Element_UndoRedoDataRef.current[objContext.state.ElementJson["iElementId"]]
                }
            );
        }
    }

    /**
     * @name PreserveText_EditorState
     * @summary Preserving text-editor state for undo-redo purposes.
     * @param {object} objContext Component Context object
     * @param {object} State state to be preserved.
     */
    PreserveText_EditorState(objContext, iElementId, State) {
        objContext.Element_UndoRedoDataRef.current = {
            ...objContext.Element_UndoRedoDataRef.current,
            [iElementId]: { ...State }
        };
        let PreserveState = objContext.props.IsSubElement ? "PreserveTextState" : "PreserveElementState";
        if (objContext.props.ParentRef && objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current[PreserveState]) {
            objContext.props.ParentRef.current[PreserveState]({ ...objContext.state, Text_EditorState: objContext.Element_UndoRedoDataRef.current[iElementId] });
        }
    }

    /**
     * @name AddOverlayToSelectedText
     * @param {object} objParams {objContext: {state, props, dispatch, CMSText_Editor_ModuleProcessor}, strSelectedText, TextEditorRef}
     * @summary Adds a overlay element json for the selected text.
     */
    AddOverlayToSelectedText(objParams) {
        let { objContext } = objParams;
        let objTextEditorRef = EditorState.GetReference("CurrentTextRef");
        let objTextResource = EditorState.GetReference("CommonTextResource");
        let strSelectedText = Selection.GetSelectedContentText(objTextEditorRef);
        let objSubElementJson = CMSOverlay_Editor_MetaData.GetDefaultElementJson(true, strSelectedText);
        objContext.CMSText_Editor_ModuleProcessor.CloseSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "Mode": "edit",
            "ContainerId": objContext.props.ContainerId,
            "FolderID": objContext.props.FolderID,
            "ElementJson": objSubElementJson,
            "PassedEvents": {
                UpdateElementJson: (objNewElementJson) => {
                    if (strSelectedText === objNewElementJson["vElementJson"]["Values"][0]["vOverlayKeyword"] && objTextEditorRef.current !== null) {
                        objTextEditorRef.current.AddSubElement(objNewElementJson);
                    }
                    objContext.CMSText_Editor_ModuleProcessor.CloseSidebar();
                },
                CloseSidebar: () => {
                    objContext.CMSText_Editor_ModuleProcessor.CloseSidebar();
                }
            },
            "ComponentController": objContext.props.ComponentController,
            "SidebarProps": {
                "SidebarName": "OverlaySidebar",
                "Header": objContext.CMSText_Editor_ModuleProcessor.TextFormatter(objTextResource, "Overlay_SidebarHeader"),
                "Title": objContext.CMSText_Editor_ModuleProcessor.TextFormatter(objTextResource, "Overlay_SidebarTitle"),
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name AddWikiToSelectedText
     * @param {object} objParams {objContext: {state, props, dispatch, CMSText_Editor_ModuleProcessor}, strSelectedText, TextEditorRef}
     * @summary Adds a wiki element json for the selected text.
     */
    AddWikiToSelectedText(objParams) {
        let { objContext } = objParams;
        let objTextEditorRef = EditorState.GetReference("CurrentTextRef");
        let strSelectedText = Selection.GetSelectedContentText(objTextEditorRef);
        let objTextResource = EditorState.GetReference("CommonTextResource");
        objContext.CMSText_Editor_ModuleProcessor.CloseSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        ApplicationState.SetProperty("blnShowAnimation", true);
        fnShowSidebar({
            "Mode": "edit",
            "ContainerId": objContext.props.ContainerId,
            "FolderID": objContext.props.FolderID,
            "WikiKeyword": strSelectedText,
            "PassedEvents": {
                UpdateElementJson: (objNewElementJson) => {
                    if (strSelectedText === objNewElementJson["vElementJson"]["Values"][0]["vWikiKeyword"] && objTextEditorRef.current !== null) {
                        objTextEditorRef.current.AddSubElement(objNewElementJson);
                    }
                    objContext.CMSText_Editor_ModuleProcessor.CloseSidebar();
                },
                CloseSidebar: () => {
                    objContext.CMSText_Editor_ModuleProcessor.CloseSidebar();
                }
            },
            "ComponentController": objContext.props.ComponentController,
            "SidebarProps": {
                "SidebarName": "WikiSidebar",
                "Header": objContext.CMSText_Editor_ModuleProcessor.TextFormatter(objTextResource, "Wiki_SidebarHeader"),
                "Title": objContext.CMSText_Editor_ModuleProcessor.TextFormatter(objTextResource, "Wiki_SidebarTitle"),
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name CloseSidebar
     * @summary Closes the sidebar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSText/CMSTextStyles.css"];
    }
}

export default CMSText_Editor_ModuleProcessor;
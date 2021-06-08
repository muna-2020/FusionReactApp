//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Editor State class/methods.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Selection related imports.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

/**
 * @name CMSTextMark_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSTextMark
 * */
class CMSTextMark_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSTextMark_Editor_ModuleProcessor}
     * @summary Returns the context menu
     * @returns {any} Context Menu Options array
     */
    GetContextMenuOptions(objContext) {
        let objTextMarkRef = EditorState.GetReference("ActiveTextMark");
        let strSelectedText = Selection.GetSelectedContentText(objTextMarkRef);
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        let arrContextMenuOptions = [];
        if (strSelectedText) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "WikiContextMenuOption",
                    Disable: strSelectedText ? false : true,
                    ClickEvent: objContext.CMSTextMark_Editor_ModuleProcessor.AddWikiToSelectedText,
                    params: { objContext, "strSelectedText": strSelectedText, "TextMarkRef": objTextMarkRef }
                },
                {
                    ResourceKey: "OverlayContextMenuOption",
                    Disable: strSelectedText ? false : true,
                    ClickEvent: objContext.CMSTextMark_Editor_ModuleProcessor.AddOverlayToSelectedText,
                    params: { objContext, "strSelectedText": strSelectedText, "TextMarkRef": objTextMarkRef }
                },
            ];
        }
        arrContextMenuOptions = [
            {
                ResourceKey: "Show_Frame",
                ClickEvent: objContext.CMSTextMark_Editor_ModuleProcessor.ToggleFrame,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cIsShowFrame"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            },
            {
                ResourceKey: "Collapse",
                ClickEvent: objContext.CMSTextMark_Editor_ModuleProcessor.ToggleCollapse,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cIsCollapsable"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            },
            {
                Type: "Separator"
            },
        ];
        if (blnIsPointOverride) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Point_Override",
                    ClickEvent: objContext.CMSTextMark_Editor_ModuleProcessor.ShowPointOverrideSidebar,
                    params: { objContext },
                    Image: objContext.state.ElementJson["vElementJson"]["cIsPointOverride"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                }
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Delete_Interaction_Type",
                ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                params: {}
            }
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSTextMark",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSTextMark"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSTextMark_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        objContext.CMSTextMark_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSTextMark_Editor_ModuleProcessor.GetContextMenuOptions(objContext)
        });
    }
}

export default CMSTextMark_Editor_ContextMenu;

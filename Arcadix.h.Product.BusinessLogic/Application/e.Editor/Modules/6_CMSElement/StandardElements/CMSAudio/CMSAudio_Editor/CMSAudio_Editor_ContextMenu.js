//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

import * as CMSAudio_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_MetaData';

/**
 * @name CMSAudio_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSAudio_Editor
 * */
class CMSAudio_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {props, state, dispatch}
     * @summary gets context menu list based on the slide element type
     * @returns {Array} slide context menu array
     */
    GetContextMenuOptions(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let arrContextMenuOptions = [
            {
                ResourceKey: "Insert_Audio",
                ClickEvent: objContext.CMSAudio_Editor_ModuleProcessor.OpenAddPopup,
                params: { objContext }
            },
            {
                ResourceKey: "Clear_Audio",
                ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                params: { objContext }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "OncePlayable",
                Image: objContext.state.ElementJson.vContainerElementProperties.iNumberOfMediaReplay === 1 ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSAudio_Editor_ModuleProcessor.SetNumberOfReplays,
                params: { objContext, "iNumberOfMediaReplay": 1 }
            },
            {
                ResourceKey: "TwicePlayable",
                Image: objContext.state.ElementJson.vContainerElementProperties.iNumberOfMediaReplay === 2 ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSAudio_Editor_ModuleProcessor.SetNumberOfReplays,
                params: { objContext, "iNumberOfMediaReplay": 2 }
            },
            {
                ResourceKey: "UnlimitedPlayable",
                Image: objContext.state.ElementJson.vContainerElementProperties.iNumberOfMediaReplay > 2 ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSAudio_Editor_ModuleProcessor.SetNumberOfReplays,
                params: { objContext, "iNumberOfMediaReplay": CMSAudio_Editor_MetaData.iNumberOfMediaReplay }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "Show_Header_Text",
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                ClickEvent: objContext.CMSAudio_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext }
            }
        ];
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
                Module: "CMSAudio",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSAudio"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSAudio_Editor_ContextMenu, CMSAudio_Common_ModuleProcessor}
     * @param {number} intClientX Client X
     * @param {number} intClientY Client Y
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        objContext.CMSAudio_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSAudio_Editor_ModuleProcessor.GetContextMenuOptions(objContext)
        });
    }
}

export default CMSAudio_Editor_ContextMenu;

//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSAudioRecorder_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSAudioRecorder_Editor
 * */
class CMSAudioRecorder_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

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
                ResourceKey: "Show_Header_Text",
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                ClickEvent: objContext.CMSAudioRecorder_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext }
            },
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
     * @param {object} objContext {state, props, dispatch, CMSAudioRecorder_Editor_ContextMenu, CMSAudio_Common_ModuleProcessor}
     * @param {number} intClientX Client X
     * @param {number} intClientY Client Y
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        objContext.CMSAudioRecorder_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSAudioRecorder_Editor_ModuleProcessor.GetContextMenuOptions(objContext)
        });
    }
}

export default CMSAudioRecorder_Editor_ContextMenu;

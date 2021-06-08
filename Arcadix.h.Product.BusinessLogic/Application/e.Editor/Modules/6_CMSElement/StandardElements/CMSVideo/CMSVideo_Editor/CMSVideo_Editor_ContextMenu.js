//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

import * as CMSVideo_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideo_Editor_MetaData';

/**
 * @name CMSVideo_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSVideo
 * */
class CMSVideo_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {props, state, dispatch, CMSVideo_Editor_ModuleProcessor}
     * @summary gets context menu list based on the slide element type
     * @returns {Array} slide context menu array
     */
    GetContextMenuOptions(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let arrContextMenuOptions = [
            {
                ResourceKey: "InsertVideo",
                ClickEvent: objContext.CMSVideo_Editor_ModuleProcessor.OpenAddPopup,
                params: objContext
            },
            {
                ResourceKey: "DeleteVideo",
                ClickEvent: () => {
                    objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]);
                },
                params: objContext
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "OncePlayable",
                Image: objContext.state.ElementJson.vContainerElementProperties.iNumberOfMediaReplay === 1 ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSVideo_Editor_ModuleProcessor.SetNumberOfReplays,
                params: { objContext, "iNumberOfMediaReplay": 1 }
            },
            {
                ResourceKey: "TwicePlayable",
                Image: objContext.state.ElementJson.vContainerElementProperties.iNumberOfMediaReplay === 2 ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSVideo_Editor_ModuleProcessor.SetNumberOfReplays,
                params: { objContext, "iNumberOfMediaReplay": 2 }
            },
            {
                ResourceKey: "UnlimitedPlayable",
                Image: objContext.state.ElementJson.vContainerElementProperties.iNumberOfMediaReplay > 2 ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSVideo_Editor_ModuleProcessor.SetNumberOfReplays,
                params: { objContext, "iNumberOfMediaReplay": CMSVideo_Editor_MetaData.iNumberOfMediaReplay }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "Properties",
                ClickEvent: objContext.CMSVideo_Editor_ModuleProcessor.ShowVideoPropertiesSidebar,
                params: objContext
            },
            {
                Type: "Separator"
            }
        ];
        if (!objContext.props.IsSubElement) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Show_Header_Text",
                    Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                    ClickEvent: objContext.CMSVideo_Editor_ModuleProcessor.ShowHeaderText,
                    params: { objContext }
                }
            ];
        }
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSVideo",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSVideo"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSVideo_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        objContext.CMSVideo_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSVideo_Editor_ModuleProcessor.GetContextMenuOptions(objContext)
        });
    }
}

export default CMSVideo_Editor_ContextMenu;

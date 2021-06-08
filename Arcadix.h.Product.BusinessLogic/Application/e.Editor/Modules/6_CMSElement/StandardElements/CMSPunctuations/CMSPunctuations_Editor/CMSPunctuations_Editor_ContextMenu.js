//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSPunctuations_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSPunctuations
 * */
class CMSPunctuations_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSPunctuations_Editor_ModuleProcessor}
     * @summary Returns the context menu
     * @returns {any} Context Menu Options array
     */
    GetContextMenuOptions(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        if (!objContext.props.IsSubElement) {
            var arrContextMenuOptions = [
                {
                    ResourceKey: "RandomOrder",
                    Image: objContext.state.ElementJson.vElementJson.cIsRandomDisplay === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                    ClickEvent: () => { objContext.CMSPunctuations_Editor_ModuleProcessor.SetRandomOrder(objContext) },
                    params: {}
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: "Delete_Interaction_Type",
                    ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                    params: {}
                },
                {
                    ResourceKey: "Show_Header_Text",
                    Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                    ClickEvent: objContext.CMSPunctuations_Editor_ModuleProcessor.ShowHeaderText,
                    params: { objContext }
                },
                {
                    ResourceKey: "Container",
                    SubMenuModule: "CMSPageContent"
                }
            ];
        }
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"]) : [];
        return [
            {
                Module: "CMSPunctuations",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSPunctuations"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSPunctuations_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        objContext.CMSPunctuations_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSPunctuations_Editor_ModuleProcessor.GetContextMenuOptions(objContext)
        });
    }
}

export default CMSPunctuations_Editor_ContextMenu;

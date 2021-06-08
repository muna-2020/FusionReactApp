//contextmenu base classe.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSMoveableElementHolder_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSMoveableElementHolder
 */
class CMSMoveableElementHolder_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @summary Forms an array with the ContextMenuOptions for the MoveableElementHolder element.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext, objValue, blnShowAsSubMenu = false) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let arrSubMenuOptions = [];
        let arrContextMenuOptions = [];
        if (objValue) {
            arrSubMenuOptions = [
                ...arrSubMenuOptions,
                {
                    ResourceKey: "BringOnTop",
                    ClickEvent: objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.BringOnTop,
                    params: { objContext, "Value": objValue }
                }
            ];
        }
        arrSubMenuOptions = [
            ...arrSubMenuOptions,
            {
                ResourceKey: "InteractionType",
                ClickEvent: objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.OpenInteractionTypeSidebar,
                params: { objContext }
            },
            {
                ResourceKey: "Properties",
                ClickEvent: objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.ShowPropertiesSidebar,
                params: { objContext }
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
                ClickEvent: objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            }
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        if (blnShowAsSubMenu) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    Text: "Moveable Element Holder",
                    SubMenuModule: "MoveableElementHolder"
                }
            ];
            return [
                {
                    Module: "MoveableElementHolder",
                    MenuList: arrSubMenuOptions,
                    Visible: true,
                    ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSMoveableElementHolder"
                },
                {
                    Module: "CMSMoveableElementHolder",
                    MenuList: arrContextMenuOptions,
                    Visible: true,
                    ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSMoveableElementHolder"
                },
                ...arrParentContextMenuOptions
            ];
        }
        else {
            return [
                {
                    Module: "CMSMoveableElementHolder",
                    MenuList: arrSubMenuOptions,
                    Visible: true,
                    ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSMoveableElementHolder"
                },
                ...arrParentContextMenuOptions
            ];
        }
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams { "Value": CMSMoveableElementHolder Value, "Type": string/null }
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objValue) {
        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objValue)
        });
    }
}

export default CMSMoveableElementHolder_Editor_ContextMenu;

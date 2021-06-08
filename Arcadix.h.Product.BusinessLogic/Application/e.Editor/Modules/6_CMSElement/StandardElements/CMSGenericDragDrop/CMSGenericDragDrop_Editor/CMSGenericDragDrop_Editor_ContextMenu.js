//contextmenu base classe.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSGenericDragDrop_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSGenericDragDrop
 */
class CMSGenericDragDrop_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
     * @summary Forms an array with the ContextMenuOptions for the GenericDragDrop element.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext, objValue, blnShowAsSubMenu = false) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let arrContextMenuOptions = [];
        if (objValue) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "BringOnTop",
                    ClickEvent: objContext.CMSGenericDragDrop_Editor_ModuleProcessor.BringOnTop,
                    params: { objContext, "Value": objValue }
                },
                {
                    Type: "Separator"
                },
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Show_Header_Text",
                ClickEvent: objContext.CMSGenericDragDrop_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            },
            {
                ResourceKey: "Delete_Interaction_Type",
                ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                params: {}
            }
        ];

        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];

        if (blnShowAsSubMenu) {
            let arrSubMenuMenuOptions = [
                {
                    Text: "Generic drag drop",
                    SubMenuModule: "GenericDragDrop"
                }
            ];
            return [
                {
                    Module: "GenericDragDrop",
                    MenuList: arrContextMenuOptions,
                    Visible: true,
                    ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSGenericDragDrop"
                },
                {
                    Module: "CMSGenericDragDrop",
                    MenuList: arrSubMenuMenuOptions,
                    Visible: true,
                    ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSGenericDragDrop"
                },
                ...arrParentContextMenuOptions
            ];
        }
        else {
            return [
                {
                    Module: "CMSGenericDragDrop",
                    MenuList: arrContextMenuOptions,
                    Visible: true,
                    ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSGenericDragDrop"
                },
                ...arrParentContextMenuOptions
            ];
        }
       
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams { "Value": CMSGenericDragDrop Value, "Type": string/null }
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objValue) {
        objContext.CMSGenericDragDrop_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSGenericDragDrop_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objValue)
        });
    }
}

export default CMSGenericDragDrop_Editor_ContextMenu;

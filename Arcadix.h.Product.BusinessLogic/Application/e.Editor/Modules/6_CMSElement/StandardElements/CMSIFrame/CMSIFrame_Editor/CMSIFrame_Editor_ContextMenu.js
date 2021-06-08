//contextmenu base classe.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSIFrame_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSIFrame
 */
class CMSIFrame_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSIFrame_Editor_ModuleProcessor}
     * @summary Forms an array with the ContextMenuOptions for the IFrame element.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let arrContextMenuOptions = [
            {
                ResourceKey: "Properties",
                ClickEvent: objContext.CMSIFrame_Editor_ModuleProcessor.ShowPropertiesSidebar,
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
                ClickEvent: objContext.CMSIFrame_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            }
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSIFrame",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSIFrame"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSIFrame_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams { "Value": CMSIFrame Value, "Type": string/null }
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSIFrame_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSIFrame_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSIFrame_Editor_ContextMenu;

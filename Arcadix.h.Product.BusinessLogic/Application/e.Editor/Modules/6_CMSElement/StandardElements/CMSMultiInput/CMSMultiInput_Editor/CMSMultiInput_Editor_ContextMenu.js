//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Application State classes.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name CMSMultiInput_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSMultiInput
 * */
class CMSMultiInput_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_Editor_ModuleProcessor}
     * @summary Forms an array with the ContextMenuOptions for the MultiInput element.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext) {
        let arrContextMenuOptions = [
            {
                ResourceKey: "CharactersticsContextMenuOptionText",
                ClickEvent: objContext.CMSMultiInput_Editor_ModuleProcessor.ShowMultiInputSidebar,
                params: objContext
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
                ClickEvent: objContext.CMSMultiInput_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            }
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSMultiInput",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSMultiInput"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSMultiInput_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        objContext.CMSMultiInput_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSMultiInput_Editor_ModuleProcessor.GetContextMenuOptions(objContext)
        });
    }
}

export default CMSMultiInput_Editor_ContextMenu;

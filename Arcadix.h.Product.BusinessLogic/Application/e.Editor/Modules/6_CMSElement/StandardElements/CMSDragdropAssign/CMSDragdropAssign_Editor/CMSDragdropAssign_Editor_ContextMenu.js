//Contextmenu base classe.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSDragdropAssign_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSDragdropAssign
 * */
class CMSDragdropAssign_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}
     * @param {object} objParams { "Value": CMSDragdropAssign Value, "Type": string/null }
     * @summary Returns the ContextMenu options for the component.
     * @returns {any} GetContextMenu Options
     */
    GetContextMenuOptions(objContext, objParams) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let { Value, Type, ElementTextId } = objParams;
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        let arrContextMenuOptions = [];
        if (!Type) {
            arrContextMenuOptions = [
                {
                    ResourceKey: "Reset_Answer",
                    ClickEvent: objContext.CMSDragdropAssign_Editor_ModuleProcessor.DeleteAnswer,
                    params: { objContext, "objValue": Value, "intElementTextId": ElementTextId }
                },
                {
                    ResourceKey: "Insert_Row_Above",
                    ClickEvent: objContext.CMSDragdropAssign_Editor_ModuleProcessor.InsertAbove,
                    params: { objContext, "objValue": Value, "intElementTextId": ElementTextId }
                },
                {
                    ResourceKey: "Insert_Row_Below",
                    ClickEvent: objContext.CMSDragdropAssign_Editor_ModuleProcessor.InsertBelow,
                    params: { objContext, "objValue": Value, "intElementTextId": ElementTextId }
                },
                {
                    ResourceKey: "Delete_Row",
                    Disable: objContext.state.ElementJson["vElementJson"]["Values"].length <= 1 ? true : false,
                    ClickEvent: objContext.CMSDragdropAssign_Editor_ModuleProcessor.RemoveRow,
                    params: { objContext, "objValue": Value, "intElementTextId": ElementTextId }
                },
                {
                    Type: "Separator"
                },
            ];
        }
        if (blnIsPointOverride) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Point_Override",
                    ClickEvent: objContext.CMSDragdropAssign_Editor_ModuleProcessor.ShowPointOverrideSidebar,
                    params: { objContext },
                    Image: objContext.state.ElementJson["vElementJson"]["cIsPointOverride"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                }
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Show_Header_Text",
                ClickEvent: objContext.CMSDragdropAssign_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            },
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
                Module: "CMSDragdropAssign",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSDragdropAssign"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams { "Value": CMSDragdropAssign Value, "Type": string/null }
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSDragdropAssign_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSDragdropAssign_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSDragdropAssign_Editor_ContextMenu;

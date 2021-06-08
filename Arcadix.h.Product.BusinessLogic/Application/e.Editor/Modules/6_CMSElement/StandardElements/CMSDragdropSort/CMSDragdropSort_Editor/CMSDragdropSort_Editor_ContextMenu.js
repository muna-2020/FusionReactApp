//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSDragdropSort_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSDragdropSort
 * */
class CMSDragdropSort_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSDragdropSort_Editor_ModuleProcessor}
     * @param {object} objParams { "Value": CMSDragdropSort Value, "Type": string/null }
     * @summary Forms an array with the ContextMenuOptions for the DragdropSort element.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext, objParams) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let { Value, Type } = objParams;
        let arrContextMenuOptions = [];
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        let blnIsHorizontal = objContext.state.ElementJson["vElementJson"]["cIsHorizontal"] === "Y" || objContext.state.ElementJson["vElementJson"]["cIsHorizontal"] === null || objContext.state.ElementJson["vElementJson"]["cIsHorizontal"] === "" ? true : false;
        if (!Type) {
            arrContextMenuOptions = [
                {
                    ResourceKey: blnIsHorizontal ? "Add_Coulumn_Left" : "Insert_Row_Above",
                    ClickEvent: objContext.CMSDragdropSort_Editor_ModuleProcessor.InsertAboveOrLeft,
                    params: { objContext, "objValue": Value }
                },
                {
                    ResourceKey: blnIsHorizontal ? "Add_Column_Right" : "Insert_Row_Below",
                    ClickEvent: objContext.CMSDragdropSort_Editor_ModuleProcessor.InsertDownOrRight,
                    params: { objContext, "objValue": Value }
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: "Delete_Cell",
                    Disable: objContext.state.ElementJson["vElementJson"]["Values"].length > 2 ? false : true,
                    ClickEvent: objContext.CMSDragdropSort_Editor_ModuleProcessor.DeleteRowOrColumn,
                    params: { objContext, "objValue": Value }
                },
                {
                    ResourceKey: "Delete_Cell_Content",
                    ClickEvent: objContext.CMSDragdropSort_Editor_ModuleProcessor.DeleteCellContent,
                    params: { objContext, "objValue": Value }
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: blnIsHorizontal ? "Move_Left" : "Move_Up",
                    Disable: objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue["iElementDragDropSortValueId"] === Value["iElementDragDropSortValueId"]) > 0 ? false : true,
                    ClickEvent: objContext.CMSDragdropSort_Editor_ModuleProcessor.MoveUpOrLeft,
                    params: { objContext, "objValue": Value }
                },
                {
                    ResourceKey: blnIsHorizontal ? "Move_Right" : "Move_Down",
                    Disable: objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue["iElementDragDropSortValueId"] === Value["iElementDragDropSortValueId"]) < objContext.state.ElementJson["vElementJson"]["Values"].length - 1 ? false : true,
                    ClickEvent: objContext.CMSDragdropSort_Editor_ModuleProcessor.MoveDownOrRight,
                    params: { objContext, "objValue": Value }
                },
                {
                    Type: "Separator"
                },
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Change_Orientation_Horizontal",
                ClickEvent: objContext.CMSDragdropSort_Editor_ModuleProcessor.ChangeOrientation,
                params: { objContext },
                Image: blnIsHorizontal ? "/Images/editor/Icon_Yes.gif" : null
            },
        ];
        if (blnIsPointOverride) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Point_Override",
                    ClickEvent: objContext.CMSDragdropSort_Editor_ModuleProcessor.ShowPointOverrideSidebar,
                    params: { objContext },
                    Image: objContext.state.ElementJson["vElementJson"]["cIsPointOverride"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                }
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Show_Header_Text",
                ClickEvent: objContext.CMSDragdropSort_Editor_ModuleProcessor.ShowHeaderText,
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
        return [
            {
                Module: "CMSDragdropSort",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSDragdropSort"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSDragdropSort_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams { "Value": CMSDragdropSort Value, "Type": string/null }
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSDragdropSort_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSDragdropSort_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSDragdropSort_Editor_ContextMenu;

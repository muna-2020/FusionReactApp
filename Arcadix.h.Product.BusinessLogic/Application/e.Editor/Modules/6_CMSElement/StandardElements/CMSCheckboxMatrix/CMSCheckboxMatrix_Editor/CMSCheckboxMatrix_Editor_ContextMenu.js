//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSCheckboxMatrix_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSCheckboxMatrix
 */
class CMSCheckboxMatrix_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext { state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor }
     * @param {object} objParams { "Value": CMSCheckboxMatrix Value, "Type": ROW/COLUMN/ROW_HEADER/ELEMENT_HEADER }
     * @summary Forms an array with the ContextMenuOptions for the CMSCheckboxMatrix element.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext, objParams) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let { Value, Type } = objParams;
        let arrContextMenuOptions = [];
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        switch (Type.toUpperCase()) {
            case "ROW":
                arrContextMenuOptions = [
                    {
                        ResourceKey: "Insert_Above",
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.InsertRowAbove,
                        params: { objContext, "objValue": Value }
                    },
                    {
                        ResourceKey: "Insert_Below",
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.InsertRowBelow,
                        params: { objContext, "objValue": Value }
                    },
                    {
                        ResourceKey: "Remove_Row",
                        Disable: objContext.state.ElementJson["vElementJson"]["MatrixRow"].length > 2 ? false : true,
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.DeleteRow,
                        params: { objContext, "objValue": Value }
                    },
                    {
                        Type: "Separator"
                    },
                    {
                        ResourceKey: "Move_Up",
                        Disable: objContext.state.ElementJson["vElementJson"]["MatrixRow"].findIndex(objMatrixRow => objMatrixRow["iElementCheckBoxMatrixRowId"] === Value["iElementCheckBoxMatrixRowId"]) > 0 ? false : true,
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.MoveRowUp,
                        params: { objContext, "objValue": Value }
                    },
                    {
                        ResourceKey: "Move_Down",
                        Disable: objContext.state.ElementJson["vElementJson"]["MatrixRow"].findIndex(objMatrixRow => objMatrixRow["iElementCheckBoxMatrixRowId"] === Value["iElementCheckBoxMatrixRowId"]) < objContext.state.ElementJson["vElementJson"]["MatrixRow"].length - 1 ? false : true,
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.MoveRowDown,
                        params: { objContext, "objValue": Value }
                    },
                    {
                        Type: "Separator"
                    },
                    {
                        ResourceKey: "Random_Display_Row",
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.RandomDisplay,
                        params: { objContext, "strGridField": "ROW" },
                        Image: objContext.state.ElementJson["vElementJson"]["cIsRandomizedRowDisplay"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                    },
                    {
                        ResourceKey: "Align_Top",
                        Disable: Value["vVerticalAlign"].toLowerCase() === "top" ? true : false,
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.AlignValue,
                        params: { objContext, "objValue": Value, "Align": "top" },
                        Image: Value["vVerticalAlign"].toLowerCase() === "top" ? "/Images/editor/Icon_Yes.gif" : null
                    },
                    {
                        ResourceKey: "Align_Center",
                        Disable: Value["vVerticalAlign"].toLowerCase() === "middle" ? true : false,
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.AlignValue,
                        params: { objContext, "objValue": Value, "Align": "middle" },
                        Image: Value["vVerticalAlign"].toLowerCase() === "middle" ? "/Images/editor/Icon_Yes.gif" : null
                    },
                    {
                        ResourceKey: "Align_Bottom",
                        Disable: Value["vVerticalAlign"].toLowerCase() === "bottom" ? true : false,
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.AlignValue,
                        params: { objContext, "objValue": Value, "Align": "bottom" },
                        Image: Value["vVerticalAlign"].toLowerCase() === "bottom" ? "/Images/editor/Icon_Yes.gif" : null
                    },
                    {
                        Type: "Separator"
                    },
                ];
                break;
            case "COLUMN":
                arrContextMenuOptions = [
                    {
                        ResourceKey: "Insert_Left",
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.InsertColumnLeft,
                        params: { objContext, "objValue": Value }
                    },
                    {
                        ResourceKey: "Insert_Right",
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.InsertColumnRight,
                        params: { objContext, "objValue": Value }
                    },
                    {
                        ResourceKey: "Remove_Column",
                        Disable: objContext.state.ElementJson["vElementJson"]["MatrixColumn"].length > 2 ? false : true,
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.DeleteColumn,
                        params: { objContext, "objValue": Value }
                    },
                    {
                        Type: "Separator"
                    },
                    {
                        ResourceKey: "Move_Left",
                        Disable: objContext.state.ElementJson["vElementJson"]["MatrixColumn"].findIndex(objColumn => objColumn["iElementCheckBoxMatrixColumnId"] === Value["iElementCheckBoxMatrixColumnId"]) > 0 ? false : true,
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.MoveColumnLeft,
                        params: { objContext, "objValue": Value }
                    },
                    {
                        ResourceKey: "Move_Right",
                        Disable: objContext.state.ElementJson["vElementJson"]["MatrixColumn"].findIndex(objColumn => objColumn["iElementCheckBoxMatrixColumnId"] === Value["iElementCheckBoxMatrixColumnId"]) < objContext.state.ElementJson["vElementJson"]["MatrixColumn"].length - 1 ? false : true,
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.MoveColumnRight,
                        params: { objContext, "objValue": Value }
                    },
                    {
                        Type: "Separator"
                    },
                    {
                        ResourceKey: "Random_Display_Column",
                        ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.RandomDisplay,
                        params: { objContext, "strGridField": "COLUMN" },
                        Image: objContext.state.ElementJson["vElementJson"]["cIsRandomizedColumnDisplay"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                    },
                    {
                        Type: "Separator"
                    },
                ];
                break;
            default: break;
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Show_Row_Title_Left",
                ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.ChangeOrientationOfRowHeader,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cIsTitleToLeft"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            },
            {
                ResourceKey: "LoadLikert",
                ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.LoadLikert,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            },
            {
                ResourceKey: "SetHeaderFooterAsTitle",
                Disable: objContext.state.ElementJson["vElementJson"]["cIsLikert"] === "N" ? true : false,
                ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.SetHeaderFooterAsTitle,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cSetHeaderFooterAsTitle"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            },
            {
                ResourceKey: "Look_N_Feel",
                ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.LookAndFeel,
                params: { objContext }
            },
        ];
        if (blnIsPointOverride) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Point_Override",
                    ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.ShowPointOverrideSidebar,
                    params: { objContext },
                    Image: objContext.state.ElementJson["vElementJson"]["cIsPointOverride"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                }
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
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
                ClickEvent: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            },
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSCheckboxMatrix",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSCheckboxMatrix"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams { "Value": CMSCheckboxMatrix Value, "Type": ROW/COLUMN/ROW_HEADER/ELEMENT_HEADER }
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSCheckboxMatrix_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSCheckboxMatrix_Editor_ContextMenu;

//contextmenu base classe.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSCheckbox_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSCheckbox
 */
class CMSCheckbox_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
     * @param {object} objParams { "Value": CMSCheckbox Value, "Type": string/null }
     * @summary Forms an array with the ContextMenuOptions for the Checkbox element.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext, objParams) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let { Value, Type } = objParams;
        let arrContextMenuOptions = [];
        let blnIsHorizontal = objContext.state.ElementJson["vElementJson"]["cIsHorizontal"] === "Y" ? true : false;
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        if (!Type) {
            arrContextMenuOptions = [
                {
                    ResourceKey: blnIsHorizontal ? "Insert_Checkbox_Left" : "Insert_Checkbox_Above",
                    ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.InsertAbove,
                    params: { objContext, "objValue": Value }
                },
                {
                    ResourceKey: blnIsHorizontal ? "Insert_Checkbox_Right" : "Insert_Checkbox_Below",
                    ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.InsertBelow,
                    params: { objContext, "objValue": Value }
                },
                {
                    ResourceKey: "Delete_Checkbox",
                    Disable: objContext.state.ElementJson["vElementJson"]["Values"].length > 2 ? false : true,
                    ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.Remove,
                    params: { objContext, "objValue": Value }
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: blnIsHorizontal ? "Move_Left" : "Move_Up",
                    Disable: objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue['iElementCheckBoxValueId'] === Value['iElementCheckBoxValueId']) > 0 ? false : true,
                    ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.MoveUp,
                    params: { objContext, "objValue": Value }
                },
                {
                    ResourceKey: blnIsHorizontal ? "Move_Right" : "Move_Down",
                    Disable: objContext.state.ElementJson["vElementJson"]["Values"].findIndex(objTempValue => objTempValue['iElementCheckBoxValueId'] === Value['iElementCheckBoxValueId']) < objContext.state.ElementJson["vElementJson"]["Values"].length - 1 ? false : true,
                    ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.MoveDown,
                    params: { objContext, "objValue": Value }
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: "Align_Top",
                    ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.AlignValue,
                    params: { objContext, "objValue": Value, "Align": "top" },
                    Image: Value["vVerticalAlign"].toLowerCase() === "top" ? "/Images/editor/Icon_Yes.gif" : null
                },
                {
                    ResourceKey: "Align_Center",
                    ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.AlignValue,
                    params: { objContext, "objValue": Value, "Align": "middle" },
                    Image: Value["vVerticalAlign"].toLowerCase() === "middle" ? "/Images/editor/Icon_Yes.gif" : null
                },
                {
                    ResourceKey: "Align_Bottom",
                    ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.AlignValue,
                    params: { objContext, "objValue": Value, "Align": "bottom" },
                    Image: Value["vVerticalAlign"].toLowerCase() === "bottom" ? "/Images/editor/Icon_Yes.gif" : null
                },
                {
                    Type: "Separator"
                },
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Random_Display",
                ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.RandomDisplay,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cIsRandomDisplay"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            },
            {
                ResourceKey: "Horizontal",
                Disable: objContext.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" ? true : false,
                ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.ChangeOrientation,
                params: { objContext, "strValue": "Y" },
                Image: blnIsHorizontal && objContext.state.ElementJson["vElementJson"]["cIsMatrixDisplay"] === "N" ? "/Images/editor/Icon_Yes.gif" : null
            },
            {
                ResourceKey: "Vertical",
                Disable: objContext.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" ? true : false,
                ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.ChangeOrientation,
                params: { objContext, "strValue": "N" },
                Image: !blnIsHorizontal && objContext.state.ElementJson["vElementJson"]["cIsMatrixDisplay"] === "N" ? "/Images/editor/Icon_Yes.gif" : null
            },
            {
                ResourceKey: "Look_N_Feel",
                ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.LookAndFeel,
                params: { objContext }
            },
            {
                ResourceKey: "Show_Likert",
                ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.Likert,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            },
            {
                ResourceKey: "Show_HeaderFooter",
                Disable: objContext.state.ElementJson["vElementJson"]["cIsLikert"] === "N" ? true : false,
                ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.ShowHeaderFooter,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" ? objContext.state.ElementJson["vElementJson"]["cShowHeaderFooter"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif" : null
            },
        ];
        if (blnIsPointOverride) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Point_Override",
                    ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.ShowPointOverrideSidebar,
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
                ResourceKey: "Matrix_Display",
                Disable: objContext.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" ? true : false,
                ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.ShowMatrixForm,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cIsMatrixDisplay"] === "Y" ? "/Images/editor/Icon_Yes.gif" : null
            },
            {
                ResourceKey: "Matrix_Properties",
                Disable: objContext.state.ElementJson["vElementJson"]["cIsMatrixDisplay"] === "N" ? true : false,
                ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.ShowMatrixPropertiesSidebar,
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
                ClickEvent: objContext.CMSCheckbox_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext },
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
            }
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSCheckbox",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSCheckbox"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams { "Value": CMSCheckbox Value, "Type": string/null }
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSCheckbox_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSCheckbox_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSCheckbox_Editor_ContextMenu;

import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSLineAssign_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSLineAssign
 * */
class CMSLineAssign_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    GetContextMenuOptions(objContext, objParams) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let { Value, Type } = objParams;
        let arrContextMenuOptions = [];
        if (Type) {
            arrContextMenuOptions = [
                {
                    ResourceKey: `Delete_${Type}`,
                    ClickEvent: objContext.CMSLineAssign_Editor_ModuleProcessor.DeleteQuestionOrAnswer,
                    params: { objContext, "strDeleteType": Type, "objSelectedValue": Value }
                }
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Add_Question",
                ClickEvent: objContext.CMSLineAssign_Editor_ModuleProcessor.AddQuestionOrAnswer,
                params: { objContext, "strAddType": "Question" }
            },
            {
                ResourceKey: "Add_Answer",
                ClickEvent: objContext.CMSLineAssign_Editor_ModuleProcessor.AddQuestionOrAnswer,
                params: { objContext, "strAddType": "Answer" }
            },
            {
                ResourceKey: "Show_Header_Text",
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                ClickEvent: objContext.CMSLineAssign_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext }
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
                Module: "CMSLineAssign",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSLineAssign"
            },
            ...arrParentContextMenuOptions
        ];
    }

    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSLineAssign_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSLineAssign_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSLineAssign_Editor_ContextMenu;
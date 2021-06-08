//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSDragdrop_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSDragdrop.
 * */
class CMSDragdrop_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}
     * @param {object} objParams { "Value": CMSDragdrop Value, "Type": string/null }
     * @summary Contains the Context menu options.
     * @returns {any} Context Menu Module Details
     */
    GetContextMenuOptions(objContext, objParams) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let { Value, Type } = objParams;
        let EditorRef = EditorState.GetReference("EditorRef");
        let blnIsPointOverride = EditorRef.current.GetPointOverrideStatus();
        let objQuestion, objAnswer, objValue;
        switch (Type.toLowerCase()) {
            case "value":
                objValue = Value;
                objQuestion = objContext.state.ElementJson["vElementJson"]["Questions"].find(objTempData => objTempData["iElementDragDropQuestionId"] === Value["iElementDragDropQuestionId"]);
                objAnswer = objContext.state.ElementJson["vElementJson"]["Answers"].find(objTempData => objTempData["iElementDragDropAnswerId"] === Value["iElementDragDropAnswerId"]);
                break;
            case "question":
                objQuestion = Value;
                objValue = objContext.state.ElementJson["vElementJson"]["Values"].find(objTempData => objTempData["iElementDragDropQuestionId"] === Value["iElementDragDropQuestionId"]);
                objAnswer = objContext.state.ElementJson["vElementJson"]["Answers"].find(objTempData => objTempData["iElementDragDropAnswerId"] === objValue["iElementDragDropAnswerId"]);
                break;
            case "answer":
                objAnswer = Value;
                objValue = objContext.state.ElementJson["vElementJson"]["Values"].find(objTempData => objTempData["iElementDragDropAnswerId"] === Value["iElementDragDropAnswerId"]);
                objQuestion = objContext.state.ElementJson["vElementJson"]["Questions"].find(objTempData => objTempData["iElementDragDropQuestionId"] === objValue["iElementDragDropQuestionId"]);
                break;
        }
        let arrContextMenuOptions = [];
        if (Type === null || Type !== "ELEMENT_HEADER") {
            arrContextMenuOptions = [
                {
                    ResourceKey: "Insert_Row_Above",
                    ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.InsertAbove,
                    params: { objContext, "objValue": objValue }
                },
                {
                    ResourceKey: "Insert_Row_Below",
                    ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.InsertBelow,
                    params: { objContext, "objValue": objValue }
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: "Delete_Cell_Contents",
                    Disable: Type.toLowerCase() === "value" ? true : false,
                    ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.DeleteCellContent,
                    params: { objContext, "objValue": Value }
                },
                {
                    ResourceKey: "Delete_Row",
                    Disable: objContext.state.ElementJson["vElementJson"]["Values"].length <= 2 ? true : false,
                    ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.RemoveRow,
                    params: { objContext, "objAnswer": objAnswer, "objQuestion": objQuestion, "objValue": objValue }
                },
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: "Move_Up",
                    Disable: objValue["iDisplayOrder"] > 1 ? false : true,
                    ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.MoveUp,
                    params: { objContext, "objValue": objValue }
                },
                {
                    ResourceKey: "Move_Down",
                    Disable: objValue["iDisplayOrder"] <= objContext.state.ElementJson["vElementJson"]["Values"].length - 1 ? false : true,
                    ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.MoveDown,
                    params: { objContext, "objValue": objValue }
                },
                {
                    Type: "Separator"
                },
                // {
                //     ResourceKey: "Add_Answer",
                //     ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.AddQuestionOrAnswer,
                //     params: { objContext, "objValue": objAnswer }
                // },
                // {
                //     ResourceKey: "Add_Question",
                //     ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.AddQuestionOrAnswer,
                //     params: { objContext, "objValue": objQuestion }
                // },
                {
                    ResourceKey: "Hide_Question",
                    ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.ShowOrHideQuestionOrAnswerField,
                    params: { objContext, "objQuestion": objQuestion, "strKeyName": "objQuestion", "strDragdropField": "Questions" },
                    Image: objQuestion["cIsHidden"] === "Y" ? "/Images/editor/Icon_Yes.gif" : null
                },
                {
                    ResourceKey: "Hide_Answer",
                    ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.ShowOrHideQuestionOrAnswerField,
                    params: { objContext, "objAnswer": objAnswer, "strKeyName": "objAnswer", "strDragdropField": "Answers" },
                    Image: objAnswer["cIsHidden"] === "Y" ? "/Images/editor/Icon_Yes.gif" : null
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
                    ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.ShowPointOverrideSidebar,
                    params: { objContext },
                    Image: objContext.state.ElementJson["vElementJson"]["cIsPointOverride"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                }
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Delete_Interaction_Type",
                ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                params: {}
            },
        ];
        if (!objContext.props.IsSubElement) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Show_Header_Text",
                    ClickEvent: objContext.CMSDragdrop_Editor_ModuleProcessor.ShowHeaderText,
                    params: { objContext },
                    Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif"
                },
                {
                    ResourceKey: "Container",
                    SubMenuModule: "CMSPageContent"
                }
            ];
        }
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSDragdrop",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSDragdrop"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @param {object} objParams { "Value": CMSDragdrop Value, "Type": string/null }
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY, objParams) {
        objContext.CMSDragdrop_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSDragdrop_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams)
        });
    }
}

export default CMSDragdrop_Editor_ContextMenu;

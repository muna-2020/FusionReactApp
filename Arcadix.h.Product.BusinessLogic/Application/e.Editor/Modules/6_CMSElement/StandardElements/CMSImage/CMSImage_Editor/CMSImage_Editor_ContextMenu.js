//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSImage_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSImage
 * */
class CMSImage_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
    * @name GetContextMenuOptions
    * @param {object} objContext {props, state, dispatch}
    * @summary gets context menu list based on the slide element type
    * @returns {Array} slide context menu array
    */
    GetContextMenuOptions(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let arrContextMenuOptions = [
            {
                ResourceKey: "InsertPicture",
                ClickEvent: objContext.CMSImage_Editor_ModuleProcessor.OpenAddPopup,
                params: objContext
            },
            {
                ResourceKey: "ClearImage",
                //ClickEvent: objContext.props.IsSubElement ? objContext.CMSImage_Editor_ModuleProcessor.HandleClearImage : () => {
                //    objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]);
                //},
                ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]) },
                params: objContext
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "AlignUpwards",
                Image: objContext.state.ElementJson["vContainerElementProperties"]["vElementVerticalAlignment"] === "top" ? "/Images/editor/Icon_Yes.gif" : "",
                ClickEvent: objContext.CMSImage_Editor_ModuleProcessor.SetImageAligment,
                params: { objContext, "AlignType": "vertical", "AlignValue": "top" }
            },
            {
                ResourceKey: "AlignMiddle",
                ClickEvent: objContext.CMSImage_Editor_ModuleProcessor.SetImageAligment,
                Image: objContext.state.ElementJson["vContainerElementProperties"]["vElementVerticalAlignment"] === "middle" ? "/Images/editor/Icon_Yes.gif" : "",
                params: { objContext, "AlignType": "vertical", "AlignValue": "middle" }
            },
            {
                ResourceKey: "AlignDown",
                ClickEvent: objContext.CMSImage_Editor_ModuleProcessor.SetImageAligment,
                Image: objContext.state.ElementJson["vContainerElementProperties"]["vElementVerticalAlignment"] === "bottom" ? "/Images/editor/Icon_Yes.gif" : "",
                params: { objContext, "AlignType": "vertical", "AlignValue": "bottom" }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "AlignLeft",
                ClickEvent: objContext.CMSImage_Editor_ModuleProcessor.SetImageAligment,
                Image: objContext.state.ElementJson["vContainerElementProperties"]["vElementHorizontalAlignment"] === "left" ? "/Images/editor/Icon_Yes.gif" : "",
                params: { objContext, "AlignType": "horizontal", "AlignValue": "left" }
            },
            {
                ResourceKey: "AlignCenter",
                ClickEvent: objContext.CMSImage_Editor_ModuleProcessor.SetImageAligment,
                Image: objContext.state.ElementJson["vContainerElementProperties"]["vElementHorizontalAlignment"] === "center" ? "/Images/editor/Icon_Yes.gif" : "",
                params: { objContext, "AlignType": "horizontal", "AlignValue": "center" }
            },
            {
                ResourceKey: "AlignRight",
                ClickEvent: objContext.CMSImage_Editor_ModuleProcessor.SetImageAligment,
                Image: objContext.state.ElementJson["vContainerElementProperties"]["vElementHorizontalAlignment"] === "right" ? "/Images/editor/Icon_Yes.gif" : "",
                params: { objContext, "AlignType": "horizontal", "AlignValue": "right" }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "Properties",
                ClickEvent: objContext.CMSImage_Editor_ModuleProcessor.ShowImageSidebar,
                params: objContext
            },
            {
                Type: "Separator"
            }
        ];
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Show_Header_Text",
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                ClickEvent: objContext.CMSImage_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext }
            }
        ];
        //if (objContext.props.IsSubElement !== "Y") {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    ResourceKey: "Delete_Interaction_Type",
                    ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]) },
                    params: {}
                }
            ];
        //}
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSImage",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSImage"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSImage_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        objContext.CMSImage_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSImage_Editor_ModuleProcessor.GetContextMenuOptions(objContext)
        });
    }
}

export default CMSImage_Editor_ContextMenu;

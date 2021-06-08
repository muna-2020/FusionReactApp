//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSMultiPageElement_Common_ContextMenu
 * @summary Contains the context menu related methods of the CMSMultiPageElement
 * */
class CMSMultiPageElement_Common_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {props, state, dispatch}
     * @summary gets context menu list based on the slide element type
     * @returns {Array} slide context menu array
     */
    GetContextMenuOptions(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        let arrContextMenuOptions;
        if (objContext.state.objCurrentSlideElementJson.vElementTypeName.toLowerCase() === "empty") {
            arrContextMenuOptions = [
                {
                    ResourceKey: "Interaction_Type",
                    "ClickEvent": objContext.CMSContainer_Editor_ModuleProcessor.OpenInteractionTypeSidebar,
                    "params": objContext
                }
            ];
        }
        else {
            arrContextMenuOptions = [
                {
                    Type: "Separator"
                },
                {
                    ResourceKey: "Features_Slide_Show",
                    ClickEvent: objContext.CMSMultiPageElement_Editor_ModuleProcessor.OpenSlideShowSidebar,
                    params: objContext
                },
                {
                    ResourceKey: "Delete_Slide_Element",
                    ClickEvent: objContext.CMSMultiPageElement_Editor_ModuleProcessor.DeleteElement,
                    params: objContext
                },
                {
                    Type: "Separator"
                }
            ];
        }
        arrContextMenuOptions = [
            ...arrContextMenuOptions,
            {
                ResourceKey: "Insert_Slide_Before",
                ClickEvent: objContext.CMSMultiPageElement_Editor_ModuleProcessor.AddSlideBeforeOrAfterwards,
                params: { ...objContext, "slideIndex": -1 }
            },
            {
                ResourceKey: "Insert_Slide_Afterwards",
                ClickEvent: objContext.CMSMultiPageElement_Editor_ModuleProcessor.AddSlideBeforeOrAfterwards,
                params: { ...objContext, "slideIndex": 1 }
            },
            {
                ResourceKey: "Delete_Current_Slide",
                ClickEvent: objContext.CMSMultiPageElement_Editor_ModuleProcessor.DeleteCurrentSlide,
                params: objContext
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "Delete_Slide_Show",
                ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                params: { ...objContext }
            }
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions(objContext.props.ElementJson["iElementId"], true) : [];
        return [
            {
                Module: "CMSMultiPageElement",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSMultiPageElement"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @summary Opens the context menu.
     */
    OpenContextMenu(objContext, intClientX, intClientY) {
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSMultiPageElement_Editor_ModuleProcessor.GetContextMenuOptions(objContext)
        });
    }
}

export default CMSMultiPageElement_Common_ContextMenu;

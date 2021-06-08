//contextmenu base classe.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSContainer_Editor_ContextMenu
 * @summary Contains the container's editor version context menu methods.
 */
class CMSContainer_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"] }.
     * @param {boolean} blnShowContainerContextMenu true if the container context menu is to be shown else false.
     * @param {number} intOrder order of the element.
     * @summary Forms an array with the ContextMenuOptions for the CMSContainer.
     * @returns {Array} Context Menu Options.
     */
    GetContextMenuOptions(objContext, blnShowContainerContextMenu = false, intOrder = null) {
        objContext = objContext.Container_HandlerRef.current.GetLatestContext();
        let intContainerId = objContext.state.ContainerJson.iContainerId;
        let arrContextMenuOptions = [];
        if (blnShowContainerContextMenu) {
            if (!objContext.props.ContentUsageGroupId || objContext.props.ContentUsageGroupId == null || objContext.props.ContentUsageGroupId == "PageContentGroup") {
                arrContextMenuOptions = [
                    {
                        "ResourceKey": "InteractionType",
                        "ClickEvent": objContext.CMSContainer_Editor_ModuleProcessor.OpenInteractionTypeSidebar,
                        "params": objContext
                    }
                ];
            }
            else {
                arrContextMenuOptions = [
                    {
                        "ResourceKey": "Text",
                        "ClickEvent": objContext.CMSContainer_Editor_ModuleProcessor.AddElement,
                        "params": { objContext, intOrder, "strElementTypeName": "Text" }
                    },
                    {
                        "ResourceKey": "Video",
                        "ClickEvent": objContext.CMSContainer_Editor_ModuleProcessor.OpenMultiMediaPopUp,
                        "params": { objContext, intOrder, ["strElementTypeName"]: "Video" }
                    },
                    {
                        "ResourceKey": "Image",
                        "ClickEvent": objContext.CMSContainer_Editor_ModuleProcessor.OpenMultiMediaPopUp,
                        "params": { objContext, intOrder, ["strElementTypeName"]: "Image" }
                    },
                    {
                        "ResourceKey": "Audio",
                        "ClickEvent": objContext.CMSContainer_Editor_ModuleProcessor.OpenMultiMediaPopUp,
                        "params": { objContext, intOrder, ["strElementTypeName"]: "Audio" }
                    }
                ];
            }
        }
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current !== null
            && objContext.props.ParentRef.current.GetContextMenuOptions(intContainerId, true);
        return [
            {
                Module: "CMSContainer",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/5_CMSContainer/CMSContainer"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"] }.
     * @param {number} intClientX X-Axis Coordinates of click.
     * @param {number} intClientY Y-Axis Coordinates of click.
     * @param {number} intOrder Order where the element has to be added.
     * @summary Context menu to add new elements.
     */
    OpenContextMenu(objContext, intClientX, intClientY, intOrder = null) {
        objContext.CMSContainer_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSContainer_Editor_ModuleProcessor.GetContextMenuOptions(objContext, true, intOrder)
        });
    }
}

export default CMSContainer_Editor_ContextMenu;

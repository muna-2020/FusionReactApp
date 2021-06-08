//contextmenu base class.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name CMSPageContent_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSPageContent
 */
class CMSPageContent_Editor_ContextMenu extends ContextMenuBase_ModuleProcessor {

    /**
     * @name GetContextMenuOptions
     * @param {object} objContext {state, props, dispatch, CMSPageContent_Editor_ModuleProcessor}.
     * @param {object} objContainerJson Container'sJson to be deleted, or above or below which a new container has to be added.
     * @summary Forms an array with the ContextMenuOptions for the CMSPageContent.
     * @returns {any} Context Menu Options
     */
    GetContextMenuOptions(objContext, objContainerJson = null, blnShowAsSubMenu = false) {
        objContext = objContext.PageContent_HandlerRef.current.GetLatestContext();
        let arrContextMenuOptions = [];
        let arrSubMenuOptions = [
            {
                ResourceKey: objContainerJson !== null ? "ReplaceContainer" : "InsertContainer",
                // Disable: objContainerJson !== null ? true : false,
                ClickEvent: objContext.CMSPageContent_Editor_ModuleProcessor.InsertContainer,
                params: { objContext, objContainerJson }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "InsertContainerAbove",
                Disable: objContainerJson === null ? true : false,
                ClickEvent: objContext.CMSPageContent_Editor_ModuleProcessor.InsertAbove,
                params: { objContext, objContainerJson }
            },
            {
                ResourceKey: "InsertContainerBelow",
                Disable: objContainerJson === null ? true : false,
                ClickEvent: objContext.CMSPageContent_Editor_ModuleProcessor.InsertBelow,
                params: { objContext, objContainerJson }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "DeleteContainer",
                Disable: objContainerJson === null ? true : false,
                ClickEvent: objContext.CMSPageContent_Editor_ModuleProcessor.RemoveContainer,
                params: { objContext, objContainerJson }
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "MoveContainerUp",
                Disable: objContainerJson === null ? true : false,
                ClickEvent: objContext.CMSPageContent_Editor_ModuleProcessor.MoveUp,
                params: { objContext, objContainerJson }
            },
            {
                ResourceKey: "MoveContainerDown",
                Disable: objContainerJson === null ? true : false,
                ClickEvent: objContext.CMSPageContent_Editor_ModuleProcessor.MoveDown,
                params: { objContext, objContainerJson }
            }
        ];
        if (blnShowAsSubMenu) {
            arrContextMenuOptions = [
                ...arrContextMenuOptions,
                {
                    Text: "Container",
                    SubMenuModule: "PageContent"
                }
            ];
            return [
                {
                    Module: "PageContent",
                    MenuList: arrSubMenuOptions,
                    Visible: true,
                    ResourcePath: "/e.Editor/Modules/4_CMSPageContent/CMSPageContent"
                },
                {
                    Module: "CMSPageContent",
                    MenuList: arrContextMenuOptions,
                    Visible: true,
                    ResourcePath: "/e.Editor/Modules/4_CMSPageContent/CMSPageContent"
                }
            ];
        }
        else {
            arrContextMenuOptions = arrSubMenuOptions;
            return [
                {
                    Module: "CMSPageContent",
                    MenuList: arrContextMenuOptions,
                    Visible: true,
                    ResourcePath: "/e.Editor/Modules/4_CMSPageContent/CMSPageContent"
                }
            ];
        }
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext { state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}.
     * @param {number} intClientX X-axis coordinates of clicked event.
     * @param {number} intClientY Y-axis coordinates of clicked event.
     * @param {object} objContainerJson Container'sJson to be deleted, or above or below which a new container has to be added
     * @summary add a context menu to the DOM and display various context menu operation
     */
    OpenContextMenu(objContext, intClientX, intClientY, objContainerJson = null) {
        objContext.CMSPageContent_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: objContext.CMSPageContent_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objContainerJson)
        });
    }
}

export default CMSPageContent_Editor_ContextMenu;
